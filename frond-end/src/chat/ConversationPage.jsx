import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
    ArrowLeft, Send, Smile, Paperclip,
    Check, CheckCheck, Clock, MoreVertical,
    Star, CreditCard, CheckCircle2, MessageSquare, ShieldCheck
} from 'lucide-react';
import FileUpload from '../components/inputs/FileUpload';
import Select from '../components/selects/Select';

const ConversationPage = () => {
    const messagesEndRef = useRef(null);
    const [newMessage, setNewMessage] = useState('');
    const [showAttachment, setShowAttachment] = useState(false);
    const [showStatusDommande, setShowStatusDommande] = useState(false);

    // Form States
    const [status, setStatus] = useState('');
    const [isPaid, setIsPaid] = useState(false);
    const [isTerminated, setIsTerminated] = useState(false);
    const [confirmationCode, setConfirmationCode] = useState('');
    const [isConfirmed, setIsConfirmed] = useState(false);
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');

    const [conversation] = useState({
        id: 1,
        user: { name: 'Karim Plombier', avatar: null, isOnline: true }
    });

    const [messages, setMessages] = useState([
        { id: 1, text: 'Bonjour, je suis disponible pour votre intervention', time: '14:20', isMe: false, status: 'read' },
        { id: 2, text: 'Parfait, quel est votre tarif horaire ?', time: '14:22', isMe: true, status: 'read' },
        { id: 3, text: '250 DH/heure, déplacement inclus', time: '14:25', isMe: false, status: 'read' },
        { id: 4, text: 'D\'accord, pouvez-vous venir demain ?', time: '14:28', isMe: true, status: 'read' },
        { id: 5, text: 'Je serai là demain à 14h', time: '14:30', isMe: false, status: 'read' },
    ]);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const handleSend = (e) => {
        e.preventDefault();
        if (!newMessage.trim()) return;
        setMessages([...messages, {
            id: Date.now(),
            text: newMessage,
            time: new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }),
            isMe: true,
            status: 'sent'
        }]);
        setNewMessage('');
    };

    const getStatusIcon = (status) => {
        if (status === 'read') return <CheckCheck className="w-3 h-3 text-[#D35400]" />;
        return <Check className="w-3 h-3 text-gray-400" />;
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
                    <span className="w-5 h-5 flex items-center justify-center bg-[#1B4F72] text-white   -full text-[10px]">1</span>
                    Validation du devis
                </div>
                <Select
                    name="status"
                    label={"choisissez une option"}
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    options={[
                        { value: 'accepter', label: 'Accepter dommande' },
                        { value: 'refuser', label: 'Refuser' },
                    ]}
                />
            </div>

            {/* etp 2 */}
            <div className={`space-y-2 ${status !== 'accepter' && 'opacity-40 pointer-events-none'}`}>
                <div className="flex items-center gap-2 text-[12px] font-semibold text-gray-700">
                    <span className="w-5 h-5 flex items-center justify-center bg-[#1B4F72] text-white   -full text-[10px]">2</span>
                    Paiement
                </div>
                <button
                    onClick={() => setIsPaid(true)}
                    className={`w-full py-2 flex items-center justify-center gap-2 text-[12px] border    transition-colors ${isPaid ? 'bg-green-50 border-green-500 text-green-700' : 'bg-white border-gray-300 hover:bg-gray-50'}`}
                >
                    <CreditCard className="w-4 h-4" />
                    {isPaid ? 'Payé avec succès' : ' Payé'}
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
                                    {conversation.user.name.charAt(0)}
                                </div>
                                <h2 className="text-[13px] font-semibold text-[#1B4F72]">{conversation.user.name}</h2>
                            </div>
                            <button onClick={() => setShowStatusDommande(!showStatusDommande)} className="lg:hidden p-2 text-gray-400"><MoreVertical className="w-5 h-5" /></button>
                        </div>

                        <div className="flex-1 overflow-y-auto p-4 bg-gray-50 space-y-4">
                            {messages.map((msg) => (
                                <div key={msg.id} className={`flex ${msg.isMe ? 'justify-end' : 'justify-start'}`}>
                                    <div className={`max-w-[75%] px-3 py-2   -lg    ${msg.isMe ? 'bg-[#1B4F72] text-white' : 'bg-white border border-gray-100 text-gray-700'}`}>
                                        <p className="text-[12px]">{msg.text}</p>
                                        <div className={`flex items-center justify-end gap-1 mt-1 text-[9px] ${msg.isMe ? 'text-white/70' : 'text-gray-400'}`}>
                                            {msg.time} {msg.isMe && getStatusIcon(msg.status)}
                                        </div>
                                    </div>
                                </div>
                            ))}
                            <div ref={messagesEndRef} />
                        </div>

                        <div className="p-4 border-t border-gray-100 bg-white">
                            <form onSubmit={handleSend} className="flex items-center gap-2">
                                <button type="button" onClick={() => setShowAttachment(!showAttachment)} className="p-2 text-gray-400 hover:text-[#D35400]"><Paperclip className="w-5 h-5" /></button>
                                <input type="text" value={newMessage} onChange={(e) => setNewMessage(e.target.value)} placeholder="Message..." className="flex-1 px-4 py-2 text-[12px] border border-gray-200   -full focus:outline-none focus:border-[#D35400] bg-gray-50" />
                                <button type="submit" disabled={!newMessage.trim()} className="p-2.5 bg-[#D35400] text-white   -full disabled:opacity-50"><Send className="w-4 h-4" /></button>
                            </form>
                        </div>
                    </div>

                    <div className="w-80 border-l border-gray-100 bg-white p-5 hidden lg:block overflow-y-auto">
                        <RenderStatusDommande />
                    </div>

                    {showStatusDommande && (
                        <div className="fixed inset-0 bg-black/50 z-50 lg:hidden flex items-end">
                            <div className="bg-white w-full max-h-[90vh]   -t-2xl p-6 overflow-y-auto">
                                <div className="w-12 h-1.5 bg-gray-200   -full mx-auto mb-6" onClick={() => setShowStatusDommande(false)}></div>
                                <RenderStatusDommande />
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ConversationPage;