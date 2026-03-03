import React, { useState, useRef, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
    ArrowLeft, Phone, Video, MoreHorizontal, 
    Send, Image as ImageIcon, Smile, Paperclip,
    Check, CheckCheck, Clock, PhoneCall
} from 'lucide-react';
import Header from '../components/Header/Header';
import Input from '../components/inputs/Input';
import FileUpload from '../components/inputs/FileUpload';

const ConversationPage = () => {
    const { conversationId } = useParams();
    const messagesEndRef = useRef(null);
    const [newMessage, setNewMessage] = useState('');
    const [showAttachment, setShowAttachment] = useState(false);

    const [conversation, setConversation] = useState({
        id: 1,
        user: { 
            id: 101, 
            name: 'Karim Plombier', 
            avatar: null, 
            isOnline: true, 
            isArtisan: true,
            specialty: 'Plomberie',
            phone: '+212 6 12 34 56 78'
        }
    });

    const [messages, setMessages] = useState([
        { id: 1, text: 'Bonjour, je suis disponible pour votre intervention', time: '14:20', isMe: false, status: 'read' },
        { id: 2, text: 'Parfait, quel est votre tarif horaire ?', time: '14:22', isMe: true, status: 'read' },
        { id: 3, text: '250 DH/heure, déplacement inclus', time: '14:25', isMe: false, status: 'read' },
        { id: 4, text: 'D\'accord, pouvez-vous venir demain ?', time: '14:28', isMe: true, status: 'read' },
        { id: 5, text: 'Je serai là demain à 14h', time: '14:30', isMe: false, status: 'read', isLast: true },
    ]);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSend = (e) => {
        e.preventDefault();
        if (!newMessage.trim()) return;

        const msg = {
            id: Date.now(),
            text: newMessage,
            time: new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }),
            isMe: true,
            status: 'sent'
        };

        setMessages([...messages, msg]);
        setNewMessage('');
    };

    const getStatusIcon = (status) => {
        if (status === 'sent') return <Check className="w-3 h-3 text-gray-400" />;
        if (status === 'delivered') return <CheckCheck className="w-3 h-3 text-gray-400" />;
        if (status === 'read') return <CheckCheck className="w-3 h-3 text-[#D35400]" />;
        return <Clock className="w-3 h-3 text-gray-400" />;
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <Header isAuthenticated={true} userType="client" userName="Ahmed" />

            <div className="max-w-6xl mx-auto mt-16 h-[calc(100vh-64px)]">
                <div className="flex h-full border border-gray-200 bg-white">
                    
                    {/*  Navigation retour */}
                    <div className="w-16 border-r border-gray-200 bg-gray-50 flex flex-col items-center py-4">
                        <Link 
                            to="/messages" 
                            className="p-2 text-gray-400 hover:text-[#D35400] hover:bg-[#D35400]/10 transition-colors"
                        >
                            <ArrowLeft className="w-5 h-5" />
                        </Link>
                    </div>

                    {/* Zone de chat */}
                    <div className="flex-1 flex flex-col">
                        
                        {/* Header */}
                        <div className="flex items-center justify-between p-3 border-b border-gray-200 bg-white">
                            <div className="flex items-center gap-3">
                                <div className="relative">
                                    <div className="w-10 h-10 bg-[#1B4F72]/10 flex items-center justify-center">
                                        <span className="text-[14px] font-bold text-[#1B4F72]">
                                            {conversation.user.name.charAt(0)}
                                        </span>
                                    </div>
                                    {conversation.user.isOnline && (
                                        <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-white"></div>
                                    )}
                                </div>
                                <div>
                                    <h2 className="text-[13px] font-semibold text-[#1B4F72]">
                                        {conversation.user.name}
                                    </h2>
                                    <p className="text-[10px] text-gray-500">
                                        {conversation.user.isOnline ? 'En ligne' : 'Hors ligne'}
                                        {conversation.user.isArtisan && ` • ${conversation.user.specialty}`}
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-center gap-1">
                                <a 
                                    href={`tel:${conversation.user.phone}`}
                                    className="p-2 text-gray-400 hover:text-[#D35400] hover:bg-[#D35400]/10 transition-colors"
                                >
                                    <Phone className="w-4 h-4" />
                                </a>
                                <button className="p-2 text-gray-400 hover:text-[#D35400] hover:bg-[#D35400]/10 transition-colors">
                                    <MoreHorizontal className="w-4 h-4" />
                                </button>
                            </div>
                        </div>

                        {/* Messages */}
                        <div className="flex-1 overflow-y-auto p-4 bg-gray-50 space-y-3">
                            {messages.map((msg, idx) => (
                                <div 
                                    key={msg.id}
                                    className={`flex ${msg.isMe ? 'justify-end' : 'justify-start'}`}
                                >
                                    <div className={`
                                        max-w-[70%] px-3 py-2 
                                        ${msg.isMe 
                                            ? 'bg-[#1B4F72] text-white' 
                                            : 'bg-white border border-gray-200 text-gray-700'
                                        }
                                    `}>
                                        <p className="text-[12px] leading-relaxed">{msg.text}</p>
                                        <div className={`
                                            flex items-center justify-end gap-1 mt-1
                                            ${msg.isMe ? 'text-white/70' : 'text-gray-400'}
                                        `}>
                                            <span className="text-[9px]">{msg.time}</span>
                                            {msg.isMe && getStatusIcon(msg.status)}
                                        </div>
                                    </div>
                                </div>
                            ))}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Input zone */}
                        <div className="p-3 border-t border-gray-200 bg-white">
                            {showAttachment && (
                                <div className="mb-3 p-3 border border-gray-200 bg-gray-50">
                                    <FileUpload
                                        id="chat-file"
                                        label="Envoyer un fichier"
                                        accept="image/*,.pdf"
                                        maxSize={5}
                                        value={null}
                                        onChange={(file) => {
                                            console.log('File:', file);
                                            setShowAttachment(false);
                                        }}
                                    />
                                </div>
                            )}
                            
                            <form onSubmit={handleSend} className="flex items-end gap-2">
                                <button
                                    type="button"
                                    onClick={() => setShowAttachment(!showAttachment)}
                                    className="p-2 text-gray-400 hover:text-[#D35400] transition-colors"
                                >
                                    <Paperclip className="w-5 h-5" />
                                </button>
                                
                                <div className="flex-1 relative">
                                    <input
                                        type="text"
                                        value={newMessage}
                                        onChange={(e) => setNewMessage(e.target.value)}
                                        placeholder="Écrivez un message..."
                                        className="w-full px-3 py-2.5 text-[12px] border border-gray-200 focus:border-[#D35400] focus:outline-none bg-gray-50 pr-10"
                                    />
                                    <button
                                        type="button"
                                        className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#D35400]"
                                    >
                                        <Smile className="w-4 h-4" />
                                    </button>
                                </div>

                                <button
                                    type="submit"
                                    disabled={!newMessage.trim()}
                                    className="p-2.5 bg-[#D35400] hover:bg-[#A04000] text-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                >
                                    <Send className="w-4 h-4" />
                                </button>
                            </form>
                        </div>
                    </div>

                    {/* Sidebar droite - Infos */}
                    <div className="w-64 border-l border-gray-200 bg-gray-50 p-4 hidden lg:block">
                        <div className="text-center mb-4">
                            <div className="w-20 h-20 bg-[#1B4F72]/10 flex items-center justify-center mx-auto mb-2">
                                <span className="text-[24px] font-bold text-[#1B4F72]">
                                    {conversation.user.name.charAt(0)}
                                </span>
                            </div>
                            <h3 className="text-[13px] font-semibold text-[#1B4F72]">{conversation.user.name}</h3>
                            <p className="text-[10px] text-[#D35400]">{conversation.user.specialty}</p>
                        </div>

                        <div className="space-y-3 border-t border-gray-200 pt-4">
                            <div className="flex items-center gap-2 text-[11px] text-gray-600">
                                <PhoneCall className="w-4 h-4 text-[#1B4F72]" />
                                {conversation.user.phone}
                            </div>
                            <div className="flex items-center gap-2 text-[11px] text-gray-600">
                                <Clock className="w-4 h-4 text-[#1B4F72]" />
                                Répond en ~10 min
                            </div>
                        </div>

                        <div className="mt-6 pt-4 border-t border-gray-200">
                            <button className="w-full py-2 text-[11px] text-[#D35400] hover:bg-[#D35400]/10 transition-colors border border-[#D35400]">
                                Voir le profil
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ConversationPage;