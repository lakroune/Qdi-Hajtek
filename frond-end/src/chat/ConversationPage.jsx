import { useState, useRef, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import {
    ArrowLeft, Send, Banknote, Paperclip,
    Check, CheckCheck, MoreVertical,
    Star, CreditCard, CheckCircle2, ShieldCheck,
    RefreshCw
} from 'lucide-react';
import axiosClient from '../api/axios-client';
import toast from 'react-hot-toast';
import { formatDistanceToNow, parseISO } from 'date-fns';
import { fr } from 'date-fns/locale';

import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import CheckoutForm from '../components/CheckoutForm/CheckoutForm';
import Logo from '../components/logo/Logo';
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

const ConversationPage = () => {
    const messagesEndRef = useRef(null);
    const [newMessage, setNewMessage] = useState('');
    const [showAttachment, setShowAttachment] = useState(false);
    const [showStatusDommande, setShowStatusDommande] = useState(false);

    const [confirmationCode, setConfirmationCode] = useState('');
    const [isConfirmed, setIsConfirmed] = useState(false);
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');

    const [messages, setMessages] = useState([]);
    const [showModelAction, setShowModelAction] = useState(false);
    const [infoConversation, setInfoConversation] = useState({});
    const { conversation_id } = useParams();
    const [amount, setAmount] = useState(0);
    const [currentUserId, setCurrentUserId] = useState(null);
    const [isAccepting, setIsAccepting] = useState(false);
    const [isLoadingMessages, setIsLoadingMessages] = useState(false);
    const [showModelFinMission, setShowModelFinMission] = useState(false);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [clientSecret, setClientSecret] = useState('');
    const [selectedAmount, setSelectedAmount] = useState(0);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    useEffect(() => {
        const fetchMessages = async () => {
            setIsLoadingMessages(true);
            try {
                const response = await axiosClient.get(
                    `/conversations/${conversation_id}/messages`
                );

                const apiData = response.data;

                // ✅ Nouvelle structure : messages.data
                const messagesArray = apiData.messages.data;
                const userId = apiData.currentUser.id;
                const is_client = apiData.currentUser.is_client;

                const conversation = apiData.conversation;
                const conversable = conversation.conversable; // DemandeDirecte

                const subject = conversation.subject;
                const statut = conversable?.statut ?? 'en_attente';
                const isCompleted = conversable?.is_completed ?? false;
                const prix_final = conversable?.prix_final ?? 0;
                const offre_service_id = conversable?.service?.id ?? null;

                const payment = conversation.paiement;
                const isPaid = payment?.statut === 'paid'
                    || payment?.statut === 'escrow'
                    || payment?.statut === 'released';
                const timePaid = payment?.paid_at ?? null;

                setCurrentUserId(userId);

                setInfoConversation({
                    subject,
                    statut,
                    offre_service_id,
                    prix_final,
                    is_client,
                    is_paid: isPaid,
                    time_paid: timePaid,
                    is_completed: isCompleted,
                });

                const formattedMessages = messagesArray.map(msg => ({
                    id: msg.id,
                    text: msg.contenu_message,
                    isMe: msg.sender_id === userId,
                    time: formatDistanceToNow(parseISO(msg.created_at), {
                        addSuffix: true,
                        locale: fr
                    }),
                    status: msg.is_read ? 'read' : 'sent',
                    senderName: msg.sender_id === userId
                        ? 'You'
                        : `${msg.sender.firstname} ${msg.sender.lastname}`
                }));

                setMessages(formattedMessages);
            } catch (error) {
                console.error("Erreur lors du chargement des messages", error);
            } finally {
                setIsLoadingMessages(false);
            }
        };

        if (conversation_id) fetchMessages();
    }, [conversation_id]);

    useEffect(() => {
        if (conversation_id && window.Echo && currentUserId) {
            const channel = window.Echo
                .private(`conversation.${conversation_id}`)
                .listen('.new-message', (e) => {
                    setMessages((prevMessages) => {
                        const isDuplicate = prevMessages.some(msg => msg.id === e.message.id);
                        if (isDuplicate) return prevMessages;

                        return [...prevMessages, {
                            id: e.message.id,
                            text: e.message.contenu_message ?? e.message.content,
                            isMe: e.message.sender_id === currentUserId,
                            time: formatDistanceToNow(parseISO(e.message.created_at), {
                                addSuffix: true,
                                locale: fr
                            }),
                            status: e.message.is_read ? 'read' : 'sent',
                            senderName: e.message.sender
                                ? `${e.message.sender.firstname ?? ''} ${e.message.sender.lastname ?? ''}`.trim()
                                : 'Inconnu'
                        }];
                    });
                });

            return () => {
                window.Echo.leave(`conversation.${conversation_id}`);
            };
        }
    }, [conversation_id, currentUserId]);

    const sendeMessage = async (e) => {
        e.preventDefault();
        if (!newMessage.trim()) return;

        const messageContent = newMessage.trim();
        setNewMessage('');

        try {
            const response = await axiosClient.post(`/conversations/${conversation_id}/messages`, {
                contenu_message: messageContent,
                conversation_id: conversation_id
            });

            if (response.data) {
                // Support both flat and nested response shapes
                const msg = response.data.data ?? response.data;
                const myNewMsg = {
                    id: msg.id,
                    text: msg.contenu_message ?? msg.content,
                    isMe: true,
                    time: formatDistanceToNow(parseISO(msg.created_at), {
                        addSuffix: true,
                        locale: fr
                    }),
                    status: 'sent',
                    senderName: "You"
                };

                setMessages(prev => {
                    if (prev.find(m => m.id === msg.id)) return prev;
                    return [...prev, myNewMsg];
                });
            }
        } catch (error) {
            console.error("Erreur:", error);
            setNewMessage(messageContent);
        }
    };

    const getStatusIcon = (status) => {
        if (status === 'read') return <CheckCheck className="w-3 h-3 text-[#D35400]" />;
        return <Check className="w-3 h-3 text-gray-400" />;
    };

    const acceptOffer = async () => {
        setIsAccepting(true);
        if (!amount || amount <= 0) {
            toast.error("merci de fournir un montant valide");
            setIsAccepting(false);
            return;
        }

        try {
            const response = await axiosClient.post(`/conversations/${conversation_id}/accept-offer`, {
                prix_final: amount
            });

            if (response.status === 200) {
                toast.success("votre offre a ete acceptee");
                setInfoConversation(prev => ({
                    ...prev,
                    statut: 'accepte',
                    prix_final: amount
                }));
                setShowModelAction(false);
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Une erreur est survenue");
        } finally {
            setIsAccepting(false);
        }
    };

    const handleOpenPayment = async (amountToPay) => {
        try {
            setSelectedAmount(amountToPay);
            const res = await axiosClient.post('/payments/initiate', {
                amount: amountToPay,
                conversation_id: conversation_id
            });
            setClientSecret(res.data.clientSecret);
            setIsModalOpen(true);
        } catch (error) {
            toast.error("Erreur lors de l'initialisation du paiement");
        }
    };

    const confirmPayment = async () => {
        try {
            const res = await axiosClient.post(`/payments/confirm`, {
                stripe_payment_id: clientSecret.split('_secret')[0]
            });
            if (res.status === 200) {
                setInfoConversation(prev => ({ ...prev, is_paid: true }));
                setIsModalOpen(false);
                toast.success("Paiement réussi !");
            }
        } catch (e) {
            toast.error("Erreur de confirmation");
        }
    };

    const handleCompleteMission = async () => {
        try {
            const response = await axiosClient.post(`/conversations/${conversation_id}/complete-mission`);
            if (response.status === 200) {
                toast.success("Mission marquée comme terminée !");
                setInfoConversation(prev => ({ ...prev, statut: 'terminee' }));
            }
        } catch (error) {
            toast.error("Erreur lors de la confirmation");
        } finally {
            setShowModelFinMission(false);
        }
    };

    const handleConfirmCode = async () => {
        if (confirmationCode.length !== 6) {
            toast.error("merci de fournir un code de confirmation valide");
            return;
        }

        try {
            const response = await axiosClient.post(`/conversations/${conversation_id}/confirm-code`, {
                code: confirmationCode
            });
            if (response.status === 200) {
                toast.success("votre code de confirmation a ete acceptee");
                setIsConfirmed(true);
                setInfoConversation(prev => ({ ...prev, statut: 'termine' }));
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Une erreur est survenue");
        }
    };

    const handleSendReview = async () => {
        if (rating === 0 || !comment) {
            toast.error("merci de fournir un avis valide");
            return;
        }

        try {
            const response = await axiosClient.post(`/conversations/${conversation_id}/review`, {
                rating,
                comment
            });
            if (response.status === 200) {
                toast.success("votre avis a ete envoye");
                setInfoConversation(prev => ({ ...prev, is_completed: true }));
                setRating(0);
                setComment('');
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Une erreur est survenue");
        }
    };


    const RenderStatusDommande = () => (
        <div className="flex flex-col gap-6">
            <div className="flex items-center justify-between border-b pb-2">
                <h3 className="text-[14px] font-bold text-[#1B4F72]">Suivi de Commande</h3>
                <span className="text-[10px] bg-gray-100 px-2 py-1 text-gray-500 font-mono">#DM-{conversation_id}</span>
            </div>
            {/* etp 1 */}
            <div className="space-y-2">
                <div className="flex items-center gap-2 text-[12px] font-semibold text-gray-700">
                    <span className={`w-5 h-5 flex items-center justify-center rounded-full text-[10px] text-white transition-colors duration-300
                        ${(infoConversation.statut === 'accepte' || infoConversation.is_paid || infoConversation.statut === 'terminee' || infoConversation.statut === 'termine')
                            ? 'bg-green-500' : 'bg-[#1B4F72]'}`}>
                        {(infoConversation.statut === 'accepte' || infoConversation.is_paid || infoConversation.statut === 'terminee' || infoConversation.statut === 'termine')
                            ? <Check className="w-3 h-3" /> : '1'}
                    </span>
                    Validation du devis
                </div>

                {infoConversation.statut === 'en_attente' && !infoConversation.is_client && (
                    <button
                        onClick={() => setShowModelAction(true)}
                        className="w-full py-2 flex items-center justify-center gap-2 text-[12px] border transition-all bg-white border-gray-300 hover:bg-gray-50 hover:border-[#D35400] text-[#1B4F72]"
                    >
                        <CheckCircle2 className="w-4 h-4 text-[#D35400]" />
                        Accepter l'offre
                    </button>
                )}

                {infoConversation.statut === 'en_attente' && infoConversation.is_client && (
                    <div className="flex items-center gap-2 p-2 bg-orange-50  animate-pulse ">
                        <RefreshCw className="w-3 h-3 text-orange-500 animate-spin" />
                        <p className="text-[11px] text-orange-600 font-medium italic">
                            En attente d'acceptation par l'artisan...
                        </p>
                    </div>
                )}

                {(infoConversation.statut === 'accepte' || infoConversation.is_paid || infoConversation.statut === 'terminee' || infoConversation.statut === 'termine') && (
                    <div className="flex items-center gap-2 px-1">
                        <p className="text-[11px] text-green-600 font-semibold flex items-center gap-1">
                            <CheckCircle2 className="w-3 h-3" /> Offre acceptée
                        </p>
                        {infoConversation.prix_final > 0 && (
                            <span className="text-[10px] text-gray-400 font-mono">({infoConversation.prix_final} MAD)</span>
                        )}
                    </div>
                )}
            </div>

            {/* etp 2 */}
            <div className={`space-y-2 transition-all duration-300
                ${(!infoConversation.is_paid && infoConversation.statut !== 'accepte' && infoConversation.statut !== 'terminee' && infoConversation.statut !== 'termine')
                    ? 'opacity-40 pointer-events-none' : ''}`}>
                <div className="flex items-center gap-2 text-[12px] font-semibold text-gray-700">
                    <span className={`w-5 h-5 flex items-center justify-center rounded-full text-[10px] text-white transition-colors
                        ${infoConversation.is_paid || infoConversation.statut === 'terminee' || infoConversation.statut === 'termine'
                            ? 'bg-green-500' : 'bg-[#1B4F72]'}`}>
                        {infoConversation.is_paid || infoConversation.statut === 'terminee' || infoConversation.statut === 'termine'
                            ? <Check className="w-3 h-3" /> : '2'}
                    </span>
                    Paiement
                </div>

                {infoConversation.statut === 'accepte' && infoConversation.is_client && !infoConversation.is_paid && (
                    <button
                        onClick={() => handleOpenPayment(infoConversation.prix_final)}
                        className="w-full py-2 flex items-center justify-center gap-2 text-[12px] border  border-[#D35400] text-[#D35400] bg-white font-bold hover:bg-[#D35400] hover:text-white transition-all  "
                    >
                        <CreditCard className="w-4 h-4" />
                        Payer {infoConversation.prix_final} MAD
                    </button>
                )}

                {infoConversation.statut === 'accepte' && !infoConversation.is_client && !infoConversation.is_paid && (
                    <div className="flex items-center gap-2 p-2  bg-orange-50  animate-pulse ">
                        <RefreshCw className="w-3 h-3 text-orange-500 animate-spin" />
                        <p className="text-[11px] text-orange-600 font-medium italic">En attente du paiement par le client...</p>
                    </div>
                )}

                {(infoConversation.is_paid || infoConversation.statut === 'terminee' || infoConversation.statut === 'termine') && (
                    <div className="space-y-1 px-1">
                        <p className="text-[11px] text-green-600 font-semibold flex items-center gap-1">
                            <CheckCircle2 className="w-3 h-3" /> Paiement sécurisé effectué
                        </p>
                        {infoConversation.time_paid && (
                            <p className="text-[9px] text-gray-400 font-mono">
                                Payé le : {new Date(infoConversation.time_paid).toLocaleDateString('fr-FR')}
                            </p>
                        )}
                    </div>
                )}
            </div>

            {/* etp 3 */}
            <div className={`space-y-2 transition-all duration-300 ${!infoConversation.is_paid ? 'opacity-40 pointer-events-none' : ''}`}>
                <div className="flex items-center gap-2 text-[12px] font-semibold text-gray-700">
                    <span className={`w-5 h-5 flex items-center justify-center rounded-full text-[10px] text-white transition-colors
                        ${(infoConversation.statut === 'termine') ? 'bg-green-500' : 'bg-[#1B4F72]'}`}>
                        {(infoConversation.statut === 'termine') ? <Check className="w-3 h-3" /> : '3'}
                    </span>
                    Réalisation & Fin de mission
                </div>

                {!infoConversation.is_client && infoConversation.statut !== 'terminee' && infoConversation.statut !== 'termine' && (
                    <div className="space-y-2">
                        <p className="text-[10px] text-gray-500 italic">Une fois le travail terminé, confirmez-le ici.</p>
                        <button
                            onClick={() => setShowModelFinMission(true)}
                            className="w-full py-2 flex items-center justify-center gap-2 text-[12px]   bg-white text-[#1B4F72] font-bold hover:bg-[#1B4F72] hover:text-white transition-all "
                        >
                            <CheckCircle2 className="w-4 h-4" />
                            Confirmer la fin du travail
                        </button>
                    </div>
                )}

                {infoConversation.is_client && infoConversation.is_paid && infoConversation.statut !== 'termine' && (
                    <div className="flex items-center gap-2 p-2 bg-orange-50   animate-pulse">
                        <RefreshCw className="w-3 h-3 text-orange-500 animate-spin" />
                        <p className="text-[11px] text-orange-600 font-medium italic">L'artisan travaille sur votre demande...</p>
                    </div>
                )}

                {(infoConversation.statut === 'terminee' || infoConversation.statut === 'termine') && (
                    <div className="p-2 bg-green-50   ">
                        <p className="text-[11px] text-green-700 font-bold flex items-center gap-1">
                            <CheckCircle2 className="w-3 h-3 text-green-600" />
                            Mission accomplie par l'artisan !
                        </p>
                        <p className="text-[10px] text-green-600/70 mt-1">
                            {infoConversation.is_client
                                ? "Veuillez passer à l'étape suivante pour valider avec votre code."
                                : "En attente de validation finale par le client."}
                        </p>
                    </div>
                )}
            </div>

            {/* etp 4 */}
            <div className={`space-y-2 transition-all duration-300
                ${(infoConversation.statut !== 'terminee' && infoConversation.statut !== 'termine') ? 'opacity-40 pointer-events-none' : ''}`}>
                <div className="flex items-center gap-2 text-[12px] font-semibold text-gray-700">
                    <span className={`w-5 h-5 flex items-center justify-center rounded-full text-[10px] text-white transition-colors
                        ${(infoConversation.is_completed && infoConversation.statut === 'termine') ? 'bg-green-500' : 'bg-[#1B4F72]'}`}>
                        {(infoConversation.is_completed && infoConversation.statut === 'termine') ? <Check className="w-3 h-3" /> : '4'}
                    </span>
                    Sécurité (Code PIN)
                </div>

                {infoConversation.is_client ? (
                    <div className="space-y-3">
                        {(!infoConversation.is_completed && infoConversation.statut === 'termine') ? (
                            <>
                                <p className="text-[10px] text-gray-500 leading-relaxed italic">
                                    Veuillez fournir le code PIN de votre compte pour confirmer la fin de la mission.
                                </p>
                                <div className="flex gap-2">
                                    <input
                                        type="text"
                                        maxLength={6}
                                        placeholder="AB12CD"
                                        value={confirmationCode}
                                        onChange={(e) => setConfirmationCode(e.target.value.toUpperCase())}
                                        className="flex-1 border-2 border-gray-200 p-2 text-center text-[14px] focus:border-[#D35400]  outline-none uppercase"
                                    />
                                    <button
                                        onClick={handleConfirmCode}
                                        disabled={confirmationCode.length !== 6}
                                        className="px-4 bg-[#D35400] text-white text-[12px] font-bold hover:bg-[#A04000] disabled:bg-gray-300 disabled:cursor-not-allowed "
                                    >
                                        ok
                                    </button>
                                </div>
                            </>
                        ) : (
                            <div className="flex items-center gap-2 p-2 bg-green-50 border border-green-100 rounded-sm">
                                <ShieldCheck className="w-4 h-4 text-green-600" />
                                <p className="text-[11px] text-green-700 font-bold">Transaction sécurisée - Code validé</p>
                            </div>
                        )}
                    </div>
                ) : (
                    <div className="p-2 ">
                        {infoConversation.statut === 'termine' && infoConversation.is_completed ? (
                            <p className="text-[11px] text-green-600 font-medium flex items-center gap-1">
                                <CheckCircle2 className="w-3 h-3" /> Le client a validé le code. Paiement libéré !
                            </p>
                        ) : (
                            <p className="text-[11px] text-[#1B4F72] font-medium flex items-center gap-2 animate-pulse">
                                <RefreshCw className="w-3 h-3 text-orange-500 animate-spin" />
                                <span className=" text-[11px] text-orange-600 font-medium italic">En attente de validation par le client...</span>
                            </p>
                        )}
                    </div>
                )}
            </div>

            <div className={`space-y-3 transition-all duration-300
                ${(infoConversation.statut === 'termine' && infoConversation.is_completed) ? '' : 'opacity-40 pointer-events-none'}`}>
                <div className="flex items-center gap-2 text-[12px] font-semibold text-gray-700">
                    <span className={`w-5 h-5 flex items-center justify-center text-[10px] text-white transition-colors
                        ${infoConversation.is_completed ? 'bg-green-500' : 'bg-[#1B4F72]'}`}>
                        {infoConversation.is_completed ? <Check className="w-3 h-3" /> : '5'}
                    </span>
                    Laisser un avis
                </div>

                {infoConversation.is_client ? (
                    <div className="bg-gray-50 p-4 border border-gray-300 space-y-4 rounded-sm">
                        <div className="flex flex-col items-center gap-2">
                            <p className="text-[10px] text-gray-500 uppercase tracking-wider font-bold">Votre Note</p>
                            <div className="flex justify-center gap-2">
                                {[1, 2, 3, 4, 5].map((s) => (
                                    <Star
                                        key={s}
                                        onClick={() => setRating(s)}
                                        className={`w-6 h-6 cursor-pointer transition-transform hover:scale-110
                                            ${s <= rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
                                    />
                                ))}
                            </div>
                        </div>

                        <div className="space-y-1">
                            <p className="text-[10px] text-gray-500 font-medium">Commentaire (Optionnel)</p>
                            <textarea
                                className="w-full border border-gray-200 p-3 text-[12px] focus:border-[#1B4F72] focus:ring-0 outline-none transition-all resize-none rounded-sm bg-white"
                                placeholder="Comment s'est déroulée la prestation ?"
                                rows={3}
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                            />
                        </div>

                        <button
                            onClick={handleSendReview}
                            disabled={rating === 0 || infoConversation.is_completed}
                            className="w-full py-2.5 bg-[#1B4F72] text-white text-[12px] font-bold hover:bg-[#154360] transition-all shadow-md disabled:bg-gray-300 disabled:shadow-none"
                        >
                            {infoConversation.is_completed ? 'Avis déjà publié' : 'Publier mon avis'}
                        </button>
                    </div>
                ) : (
                    <div className="p-3 bg-gray-50 border border-gray-100 rounded-sm">
                        {infoConversation.is_completed ? (

                            <div className="flex items-center gap-2">
                                <RefreshCw className="w-3 h-3 text-orange-400 animate-spin" />
                                <p className="text-[11px] text-orange-600 font-medium italic">En attente de l'avis du client...</p>
                            </div>
                        ) : (
                            <p className="text-[11px] text-green-600 font-medium flex items-center gap-2">
                                <CheckCircle2 className="w-3 h-3" /> Merci ! Le client a laissé son évaluation.
                            </p>
                        )}
                    </div>
                )}
            </div>
        </div>
    );

    const RenderStatusDommandeCharger = () => (
        <div className="flex flex-col gap-6">
            <div className="flex items-center justify-between border-b pb-2">
                <h3 className="text-[14px] font-bold text-[#1B4F72]">Suivi de Commande</h3>
                <span className="text-[10px] bg-gray-100 px-2 py-1 text-gray-500 font-mono"></span>
            </div>
            {[1, 2, 3, 4, 5].map(i => (
                <div key={i} className="h-[15vh] w-full bg-gray-200 p-3 animate-pulse" />
            ))}
        </div>
    );

    const RenderPaymentModal = () => {
        if (!isModalOpen || !clientSecret) return null;
        return (
            <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4">
                <div
                    className="absolute inset-0 bg-[#1B4F72]/40 backdrop-blur-md animate-in fade-in duration-300"
                    onClick={() => setIsModalOpen(false)}
                />
                <div className="relative bg-white w-full max-w-md shadow-2xl overflow-hidden animate-in zoom-in duration-300">
                    <div className="bg-[#1B4F72] p-6 text-white flex justify-between items-center">
                        <Logo className="h-6" />
                        <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-white/10 rounded-full">
                            <span className="text-xl">✕</span>
                        </button>
                    </div>
                    <div className="p-8">
                        <div className="flex justify-between items-center mb-6 p-4 bg-gray-50 border border-gray-200">
                            <span className="text-sm text-gray-500 font-medium">Total à payer</span>
                            <span className="text-2xl font-black text-[#1B4F72]">
                                {selectedAmount} <small className="text-sm font-normal">MAD</small>
                            </span>
                        </div>
                        <div className="w-full min-h-[50vh] max-h-[50vh] overflow-y-scroll">
                            <Elements stripe={stripePromise} options={{ clientSecret }}>
                                <CheckoutForm onSuccess={confirmPayment} />
                            </Elements>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    if (showModelAction) return (
        <div className="fixed inset-0 z-[999] flex items-center justify-center p-4" role="dialog" aria-modal="true">
            <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px] transition-opacity animate-in fade-in duration-200" />
            <div className="relative w-full max-w-xs bg-white shadow-2xl border border-gray-100 transform transition-all animate-in zoom-in-95 duration-200">
                <div className="p-6">
                    <div className="flex items-center gap-4 mb-6">
                        <div className="w-10 h-10 bg-[#D35400]/10 flex items-center justify-center">
                            <Banknote className="w-5 h-5 text-[#D35400]" />
                        </div>
                        <div>
                            <h3 className="text-[14px] font-bold text-[#1B4F72]">Offre de travail</h3>
                            <p className="text-[11px] text-gray-400 leading-none mt-1">confirmation de la mission</p>
                        </div>
                    </div>
                    <p className="text-[12px] text-gray-600 mb-3">Voulez-vous vraiment accepter cette offre ?</p>
                    <input
                        onChange={(e) => setAmount(e.target.value)}
                        type="number"
                        placeholder="0000.00"
                        className="border m-2 w-9/12 border-gray-300 p-1 text-center text-[11px] tracking-widest focus:ring-1 focus:ring-[#D35400] outline-none"
                    />
                    <div className="grid grid-cols-2 gap-3">
                        <button onClick={() => setShowModelAction(false)} className="py-2 text-[12px] text-gray-400 hover:text-gray-600 font-medium">Non</button>
                        <button
                            disabled={isAccepting}
                            onClick={acceptOffer}
                            className="py-2 bg-[#1B4F72] text-white text-[12px] font-bold hover:bg-[#D35400] transition-colors text-center"
                        >
                            {isAccepting
                                ? <div className="flex items-center justify-center gap-2"><RefreshCw className="w-4 h-4 animate-spin" /> en cours</div>
                                : 'Accepter'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );

    if (showModelFinMission) return (
        <div className="fixed inset-0 z-[999] flex items-center justify-center p-4" role="dialog" aria-modal="true">
            <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px] transition-opacity animate-in fade-in duration-200" />
            <div className="relative w-full max-w-xs bg-white shadow-2xl border border-gray-100 transform transition-all animate-in zoom-in-95 duration-200">
                <div className="p-6">
                    <div className="flex items-center gap-4 mb-6">
                        <div className="w-10 h-10 bg-[#D35400]/10 flex items-center justify-center">
                            <Banknote className="w-5 h-5 text-[#D35400]" />
                        </div>
                        <div>
                            <h3 className="text-[14px] font-bold text-[#1B4F72]">Fin de Mission</h3>
                            <p className="text-[11px] text-gray-400 leading-none mt-1">Confirmation de la mission</p>
                        </div>
                    </div>
                    <p className="text-[12px] text-gray-600 mb-3">Voulez-vous vraiment terminer cette mission ?</p>
                    <div className="grid grid-cols-2 gap-3">
                        <button onClick={() => setShowModelFinMission(false)} className="py-2 text-[12px] text-gray-400 hover:text-gray-600 font-medium">Non</button>
                        <button
                            disabled={isAccepting}
                            onClick={handleCompleteMission}
                            className="py-2 bg-[#1B4F72] text-white text-[12px] font-bold hover:bg-[#D35400] transition-colors text-center"
                        >
                            {isAccepting
                                ? <div className="flex items-center justify-center gap-2"><RefreshCw className="w-4 h-4 animate-spin" /> en cours</div>
                                : 'Confirmer'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-gray-50">
            <RenderPaymentModal />
            <div className="max-w-6xl mx-auto mt-16 h-[calc(100vh-64px)]">
                <div className="flex h-full border border-gray-200 bg-white">
                    <div className="w-16 hidden md:flex border-r border-gray-100 bg-gray-50 flex-col items-center py-4">
                        <Link to="/messages" className="p-2 text-gray-400 hover:text-[#D35400] transition-colors">
                            <ArrowLeft className="w-5 h-5" />
                        </Link>
                    </div>

                    <div className="flex-1 flex flex-col">
                        <div className="flex items-center justify-between p-3 border-b border-gray-100 bg-white">
                            <div className="flex items-center gap-3">
                                <Link to="/messages" className="md:hidden">
                                    <ArrowLeft className="w-5 h-5 text-gray-400" />
                                </Link>
                                <div className="w-10 h-10 bg-[#1B4F72]/10 flex items-center justify-center font-bold text-[#1B4F72] text-sm">
                                    {infoConversation?.subject?.charAt(0)}
                                </div>
                                <h2 className="text-[13px] font-semibold text-[#1B4F72]">{infoConversation?.subject}</h2>
                            </div>
                            <button onClick={() => setShowStatusDommande(!showStatusDommande)} className="lg:hidden p-2 text-gray-400">
                                <MoreVertical className="w-5 h-5" />
                            </button>
                        </div>

                        <div className="flex-1 overflow-y-auto p-4 bg-gray-50 space-y-4">
                            {messages.map((msg) => (
                                <div key={msg.id} className={`flex ${msg.isMe ? 'justify-end' : 'justify-start'}`}>
                                    <div className={`max-w-[75%] px-3 py-2 border rounded
                                        ${msg.isMe ? 'bg-[#150b50] text-white' : 'bg-[#d5d3d2] border border-gray-100 text-gray-700'}`}>
                                        <p className="text-[12px] font-semibold">{!msg.isMe && msg.senderName}</p>
                                        <p className="text-[12px]">{msg.text}</p>
                                        <div className={`flex items-center justify-end gap-1 mt-1 text-[9px] ${msg.isMe ? 'text-white/70' : 'text-gray-400'}`}>
                                            {msg.time} {msg.isMe && getStatusIcon(msg.status)}
                                        </div>
                                    </div>
                                </div>
                            ))}
                            {isLoadingMessages && (
                                <div className="flex items-center justify-center mt-4">
                                    <RefreshCw className="w-4 h-4 animate-spin text-[#D35400]" />
                                </div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>

                        <div className="p-4 border-t border-gray-100 bg-white">
                            <form onSubmit={sendeMessage} className="flex items-center gap-2">
                                <button type="button" onClick={() => setShowAttachment(!showAttachment)} className="p-2 text-gray-400 hover:text-[#D35400]">
                                    <Paperclip className="w-5 h-5" />
                                </button>
                                <input
                                    type="text"
                                    value={newMessage}
                                    onChange={(e) => setNewMessage(e.target.value)}
                                    placeholder="Message..."
                                    className="flex-1 px-4 py-2 text-[12px] border border-gray-200 focus:outline-none focus:border-[#D35400] bg-gray-50"
                                />
                                <button type="submit" disabled={!newMessage.trim()} className="p-2.5 bg-[#D35400] text-white disabled:opacity-50">
                                    <Send className="w-4 h-4" />
                                </button>
                            </form>
                        </div>
                    </div>

                    <div className="w-80 border-l border-gray-100 bg-white p-5 hidden lg:block overflow-y-auto">
                        {isLoadingMessages ? <RenderStatusDommandeCharger /> : RenderStatusDommande()}
                    </div>

                    {showStatusDommande && (
                        <div className="fixed inset-0 bg-black/50 z-50 lg:hidden flex items-end">
                            <div className="bg-white w-full max-h-[90vh] p-6 overflow-y-auto">
                                <div className="w-12 h-1.5 bg-gray-200 mx-auto mb-6" onClick={() => setShowStatusDommande(false)} />
                                {isLoadingMessages ? <RenderStatusDommandeCharger /> : RenderStatusDommande()}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ConversationPage;