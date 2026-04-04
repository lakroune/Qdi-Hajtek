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
import { fr, is } from 'date-fns/locale';
const ConversationPage = () => {
    const messagesEndRef = useRef(null);
    const [newMessage, setNewMessage] = useState('');
    const [showAttachment, setShowAttachment] = useState(false);
    const [showStatusDommande, setShowStatusDommande] = useState(false);

    const [isPaid, setIsPaid] = useState(false);
    const [isTerminated, setIsTerminated] = useState(false);
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

                const apiData = response.data.data;
                const messagesArray = apiData.messages.data;
                const userId = apiData.currentUser.id;
                const type = apiData.conversation.conversable_type.split('\\').pop();
                const isClient = apiData.conversation.conversable.client_id ? apiData.conversation.conversable.client_id === userId && type === 'DemandeDirecte' : false;
                const isArtisan = apiData.conversation.conversable.artisan_id ? apiData.conversation.conversable.artisan_id === userId && type === 'Proposition' : false;
                const prix_final = apiData.conversation.conversable.prix_final ?? 0;
                const offre_service_id = apiData.conversation.conversable.service_id ?? apiData.conversation.conversable.offreTravail_id;
                const statut = apiData.conversation.conversable.statut ?? apiData.conversation.conversable.statut_proposition;
                setCurrentUserId(userId);

                const conversation = {
                    subject: apiData.conversation.subject,
                    type: type,
                    statut: statut,
                    offre_service_id: offre_service_id,
                    prix_final: prix_final,
                    is_client: isClient,
                    is_artisan: isArtisan

                }
                setInfoConversation(conversation);
                console.log("conversation", conversation);
                const formattedMessages = messagesArray.map(msg => ({
                    id: msg.id,
                    text: msg.contenu_message,
                    isMe: msg.sender_id === userId,

                    time: formatDistanceToNow(parseISO(msg.created_at), {
                        addSuffix: true,
                        locale: fr
                    }),
                    status: msg.is_read ? 'read' : 'sent',
                    senderName: msg.sender_id === userId ? 'You' : `${msg.sender.firstname} ${msg.sender.lastname}`
                }));

                setMessages(formattedMessages);
            } catch (error) {
                console.error("Erreur lors du chargement des messages", error);
            }
            finally {
                setIsLoadingMessages(false);
            }
        };
        if (conversation_id) {
            fetchMessages();
        }
    }, [conversation_id]);


    useEffect(() => {
        if (conversation_id && window.Echo && currentUserId) {
            const channel = window.Echo
                .private(`chat.${conversation_id}`)
                .listen('.message-sent', (e) => {

                    setMessages((prevMessages) => {
                        const isDuplicate = prevMessages.some(
                            msg => msg.id === e.message.id
                        );
                        if (isDuplicate) return prevMessages;

                        const receivedMessage = {
                            id: e.message.id,
                            text: e.message.contenu_message,
                            isMe: e.message.sender_id === currentUserId,

                            time: formatDistanceToNow(parseISO(e.message.created_at), {
                                addSuffix: true,
                                locale: fr
                            }),
                            status: e.message.is_read ? 'read' : 'sent',
                            senderName: `${e.message.sender.firstname || ''} ${e.message.sender.lastname || ''}`.trim()

                        };

                        return [...prevMessages, receivedMessage];
                    });
                });

            return () => {
                window.Echo.leave(`chat.${conversation_id}`);
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

            if (response.data && response.data.data) {
                const msg = response.data.data;
                const myNewMsg = {
                    id: msg.id,
                    text: msg.contenu_message,
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
                    conversable: {
                        ...prev.conversable,
                        statut: 'accepte',
                        prix_final: amount
                    }
                }));
                setShowModelAction(false);
            }
        } catch (error) {
            const errorMsg = error.response?.data?.message || "Une erreur est survenue";
            toast.error(errorMsg);
        }
        finally {
            setIsAccepting(false);
        }
    };


    const RenderStatusDommande = () => (
        <div className="flex flex-col gap-6">
            <div className="flex items-center justify-between border-b pb-2">
                <h3 className="text-[14px] font-bold text-[#1B4F72]">Suivi de Commande</h3>
                <span className="text-[10px] bg-gray-100 px-2 py-1    text-gray-500 font-mono">#DM-001</span>
            </div>
            {/* etp 1 */}
            <div className="space-y-2">
                <div className="flex items-center gap-2 text-[12px] font-semibold text-gray-700">
                    <span className={`w-5 h-5 flex items-center justify-center rounded-full text-[10px] ${infoConversation.statut === 'accepte' ? 'bg-green-500' : 'bg-[#1B4F72]'} text-white`}>
                        {infoConversation.statut == 'accepte' ? <Check className="w-3 h-3" /> : '1'}
                    </span>
                    Validation du devis
                </div>
                {infoConversation.statut === 'en_attente' && (
                    <button
                        onClick={() => setShowModelAction(true)}
                        className="w-full py-2 flex items-center justify-center gap-2 text-[12px] border transition-colors bg-white border-gray-300 hover:bg-gray-50"
                    >
                        <CheckCircle2 className="w-4 h-4" />
                        Accepter l'offre
                    </button>
                )}
                {infoConversation.statut === 'accepte' && <p className="text-[11px] text-green-600 font-medium">Offre acceptée </p>}
            </div>
            {/* etp 2 */}
            <div className={`space-y-2 ${infoConversation.statut === 'accepte' && 'opacity-40 pointer-events-none'}`}>
                <div className="flex items-center gap-2 text-[12px] font-semibold text-gray-700">
                    <span className="w-5 h-5 flex items-center justify-center bg-[#1B4F72] text-white rounded-full text-[10px]">2</span>
                    Paiement
                </div>
                <button
                    onClick={() => setIsPaid(true)}
                    className={`w-full py-2 flex items-center justify-center gap-2 text-[12px] border transition-colors ${isPaid ? 'bg-green-50 border-green-500 text-green-700' : 'bg-white border-gray-300 hover:bg-gray-50'}`}
                >
                    <CreditCard className="w-4 h-4" />
                    {isPaid ? 'Payé avec succès' : 'Payer maintenant'}
                </button>
            </div>

            {/* etp 3 */}
            <div className={`space-y-2 ${!isPaid && 'opacity-40 pointer-events-none'}`}>
                <div className="flex items-center gap-2 text-[12px] font-semibold text-gray-700">
                    <span className="w-5 h-5 flex items-center justify-center bg-[#1B4F72] text-white   -full text-[10px]">3</span>
                    Fin de mission
                </div>
                <button
                    onClick={() => setIsTerminated(true)}
                    className={`w-full py-2 flex items-center justify-center gap-2 text-[12px] border    transition-colors ${isTerminated ? 'bg-blue-50 border-blue-500 text-blue-700' : 'bg-white border-gray-300 hover:bg-gray-50'}`}
                >
                    <CheckCircle2 className="w-4 h-4" />
                    {isTerminated ? 'Mission Terminée' : 'Confirmer la fin'}
                </button>
            </div>

            {/* etp 4 */}
            <div className={`space-y-2 ${!isTerminated && 'opacity-40 pointer-events-none'}`}>
                <div className="flex items-center gap-2 text-[12px] font-semibold text-gray-700">
                    <span className="w-5 h-5 flex items-center justify-center bg-[#1B4F72] text-white   -full text-[10px]">4</span>
                    Sécurité (Code PIN)
                </div>
                <div className="flex gap-2">
                    <input
                        type="text" maxLength={4} placeholder="0000"
                        value={confirmationCode}
                        onChange={(e) => setConfirmationCode(e.target.value)}
                        className="flex-1 border border-gray-300 p-2 text-center text-[13px] tracking-widest focus:ring-1 focus:ring-[#D35400] outline-none"
                    />
                    <button
                        onClick={() => setIsConfirmed(true)}
                        disabled={confirmationCode.length !== 4 || isConfirmed}
                        className="px-4 py-2 bg-[#D35400] text-white text-[12px]    disabled:bg-gray-300"
                    >
                        {isConfirmed ? <ShieldCheck className="w-4 h-4" /> : 'OK'}
                    </button>
                </div>
            </div>

            {/* etp 5 - Avis    s */}
            <div className={`space-y-2 ${!isConfirmed && 'opacity-40 pointer-events-none'}`}>
                <div className="flex items-center gap-2 text-[12px] font-semibold text-gray-700">
                    <span className="w-5 h-5 flex items-center justify-center bg-[#1B4F72] text-white   -full text-[10px]">5</span>
                    Laisser un avis
                </div>
                <div className="bg-gray-50 p-3    border border-dashed border-gray-300 space-y-3">
                    <div className="flex justify-center gap-1">
                        {[1, 2, 3, 4, 5].map((s) => (
                            <Star key={s} onClick={() => setRating(s)} className={`w-5 h-5 cursor-pointer ${s <= rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} />
                        ))}
                    </div>
                    <textarea
                        className="w-full border border-gray-200 p-2 text-[11px] focus:outline-none"
                        placeholder="Commentaire..." rows={2}
                        value={comment} onChange={(e) => setComment(e.target.value)}
                    />
                    <button className="w-full py-1.5 bg-[#1B4F72] text-white text-[11px]   ">Publier</button>
                </div>
            </div>
        </div>
    );
    const RenderStatusDommandeCharger = () => (
        <div className="flex flex-col gap-6">
            <div className="flex items-center justify-between border-b pb-2">
                <h3 className="text-[14px] font-bold text-[#1B4F72]">Suivi de Commande</h3>
                <span className="text-[10px] bg-gray-100 px-2 py-1    text-gray-500 font-mono"></span>
            </div>
            <div className=" h-[15vh] w-full bg-gray-200 p-3 animate-pulse  ">
            </div><div className=" h-[15vh] w-full bg-gray-200 p-3 animate-pulse  ">
            </div><div className=" h-[15vh] w-full bg-gray-200 p-3 animate-pulse  ">
            </div><div className=" h-[15vh] w-full bg-gray-200 p-3 animate-pulse  ">
            </div><div className=" h-[15vh] w-full bg-gray-200 p-3 animate-pulse  ">
            </div>
        </div>
    );

    if (showModelAction)
        return (

            <div
                className="fixed inset-0 z-[999] flex items-center justify-center p-4"
                role="dialog"
                aria-modal="true"
            >
                <div
                    className="absolute inset-0 bg-black/40 backdrop-blur-[2px] transition-opacity animate-in fade-in duration-200"

                />
                <div className={`relative w-full max-w-xs  bg-white shadow-2xl border border-gray-100 transform transition-all animate-in zoom-in-95 duration-200`}>


                    <div className="p-6">
                        <div className="flex items-center gap-4 mb-6">
                            <div className="w-10 h-10 bg-[#D35400]/10 flex items-center justify-center  ">
                                <Banknote className="w-5 h-5 text-[#D35400]" />
                            </div>
                            <div>
                                <h3 className="text-[14px] font-bold text-[#1B4F72]"> Offre de travail</h3>
                                <p className="text-[11px] text-gray-400 leading-none mt-1">confirmation de la mission</p>
                            </div>
                        </div>
                        <p className="text-[12px] text-gray-600 mb-3">Voulez-vous vraiment accepter cette offre ?</p>
                        <input onChange={(e) => setAmount(e.target.value)}
                            type="number"
                            placeholder="0000.00"
                            className="border m-2 w-9/12 border-gray-300 p-1 text-center text-[11px] tracking-widest focus:ring-1 focus:ring-[#D35400] outline-none" />
                        <div className="grid grid-cols-2 gap-3">
                            <button onClick={() => setShowModelAction(false)} className="py-2 text-[12px] text-gray-400 hover:text-gray-600 font-medium">Non</button>
                            <button
                                disabled={isAccepting}
                                onClick={() => { acceptOffer(); }}
                                className="py-2 bg-[#1B4F72] text-white text-[12px] font-bold hover:bg-[#D35400] transition-colors text-center  "
                            >
                                {isAccepting ? <div className="flex items-center justify-center gap-2"><RefreshCw className=" w-4 h-4  animate-spin" /> en cours</div> : 'Accepter'}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-6xl mx-auto mt-16 h-[calc(100vh-64px)]">
                <div className="flex h-full border border-gray-200 bg-white   ">
                    <div className="w-16 hidden md:flex border-r border-gray-100 bg-gray-50 flex-col items-center py-4">
                        <Link to="/messages" className="p-2 text-gray-400 hover:text-[#D35400] transition-colors"><ArrowLeft className="w-5 h-5" /></Link>
                    </div>

                    <div className="flex-1 flex flex-col">
                        <div className="flex items-center justify-between p-3 border-b border-gray-100 bg-white">
                            <div className="flex items-center gap-3">
                                <Link to="/messages" className="md:hidden"><ArrowLeft className="w-5 h-5 text-gray-400" /></Link>
                                <div className="w-10 h-10 bg-[#1B4F72]/10 flex items-center justify-center   -full font-bold text-[#1B4F72] text-sm">
                                    {infoConversation?.subject?.charAt(0)}
                                </div>
                                <h2 className="text-[13px] font-semibold text-[#1B4F72]"> {infoConversation?.subject}</h2>
                            </div>
                            <button onClick={() => setShowStatusDommande(!showStatusDommande)} className="lg:hidden p-2 text-gray-400"><MoreVertical className="w-5 h-5" /></button>
                        </div>

                        <div className="flex-1 overflow-y-auto p-4 bg-gray-50 space-y-4">
                            {messages.map((msg) => (
                                <div key={msg.id} className={`flex ${msg.isMe ? 'justify-end' : 'justify-start'}`}>
                                    <div className={`max-w-[75%] px-3 py-2  border rounded  ${msg.isMe ? 'bg-[#150b50] text-white' : ' bg-[#d5d3d2] border border-gray-100 text-gray-700'}`}>
                                        <p className="text-[12px] font-semibold">{!msg.isMe && msg.senderName} </p>
                                        <p className="text-[12px]">{msg.text}</p>
                                        <div className={`flex items-center justify-end gap-1 mt-1 text-[9px] ${msg.isMe ? 'text-white/70' : 'text-gray-400'}`}>
                                            {msg.time} {msg.isMe && getStatusIcon(msg.status)}
                                        </div>
                                    </div>
                                </div>
                            ))}
                            {isLoadingMessages && <div className="flex items-center justify-center mt-4"><RefreshCw className="w-4 h-4 animate-spin text-[#D35400]" /></div>}
                            <div ref={messagesEndRef} />
                        </div>

                        <div className="p-4 border-t border-gray-100 bg-white">
                            <form onSubmit={sendeMessage} className="flex items-center gap-2">
                                <button type="button" onClick={() => setShowAttachment(!showAttachment)} className="p-2 text-gray-400 hover:text-[#D35400]"><Paperclip className="w-5 h-5" /></button>
                                <input type="text" value={newMessage} onChange={(e) => setNewMessage(e.target.value)} placeholder="Message..." className="flex-1 px-4 py-2 text-[12px] border border-gray-200   -full focus:outline-none focus:border-[#D35400] bg-gray-50" />
                                <button type="submit" disabled={!newMessage.trim()} className="p-2.5 bg-[#D35400] text-white   -full disabled:opacity-50"><Send className="w-4 h-4" /></button>
                            </form>
                        </div>
                    </div>

                    <div className="w-80 border-l border-gray-100 bg-white p-5 hidden lg:block overflow-y-auto">
                        {
                            isLoadingMessages ?
                                <RenderStatusDommandeCharger /> :
                                <RenderStatusDommande />
                        }
                    </div>
                    {showStatusDommande && (
                        <div className="fixed inset-0 bg-black/50 z-50 lg:hidden flex items-end">
                            <div className="bg-white w-full max-h-[90vh]   -t-2xl p-6 overflow-y-auto">
                                <div className="w-12 h-1.5 bg-gray-200   -full mx-auto mb-6" onClick={() => setShowStatusDommande(false)}></div>
                                {isLoadingMessages ? <RenderStatusDommandeCharger /> : <RenderStatusDommande />}
                            </div>
                        </div>
                    )}
                </div>
            </div>

        </div>
    );
};

export default ConversationPage;