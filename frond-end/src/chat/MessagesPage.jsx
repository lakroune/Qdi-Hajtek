import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { 
    Search, MoreHorizontal, Phone, Video, 
    Image as ImageIcon, Send, Smile, Check, CheckCheck,
    ArrowLeft, Clock
} from 'lucide-react';
import Header from '../components/Header/Header';
import AvatarUpload from '../components/inputs/AvatarUpload';
import Input from '../components/inputs/Input';

const MessagesPage = () => {
    const [conversations, setConversations] = useState([
        {
            id: 1,
            user: { id: 101, name: 'Karim Plombier', avatar: null, isOnline: true, isArtisan: true },
            lastMessage: { text: 'Je serai là demain à 14h', time: '14:30', isRead: true, isMe: false },
            unreadCount: 0
        },
        {
            id: 2,
            user: { id: 102, name: 'Youssef Élec', avatar: null, isOnline: false, isArtisan: true },
            lastMessage: { text: 'D\'accord, merci !', time: 'Hier', isRead: false, isMe: true },
            unreadCount: 0
        },
        {
            id: 3,
            user: { id: 103, name: 'Sofia Menuiserie', avatar: null, isOnline: true, isArtisan: true },
            lastMessage: { text: 'Vous avez reçu mon devis ?', time: 'Lun', isRead: false, isMe: false },
            unreadCount: 1
        },
        {
            id: 4,
            user: { id: 104, name: 'Ahmed Client', avatar: null, isOnline: false, isArtisan: false },
            lastMessage: { text: 'Bonjour, je cherche un plombier', time: 'Dim', isRead: true, isMe: false },
            unreadCount: 0
        }
    ]);

    const [searchQuery, setSearchQuery] = useState('');
    const [selectedConv, setSelectedConv] = useState(null);

    const filteredConversations = conversations.filter(conv => 
        conv.user.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-gray-50">
            <Header isAuthenticated={true} userType="client" userName="Ahmed" />

            <div className="max-w-6xl mx-auto mt-16 h-[calc(100vh-64px)]">
                <div className="flex h-full border border-gray-200 bg-white">
                    
                    {/* Sidebar - Liste des conversations */}
                    <div className="w-80 border-r border-gray-200 flex flex-col">
                        {/* Header */}
                        <div className="p-4 border-b border-gray-200">
                            <h1 className="text-[15px] font-bold text-[#1B4F72] mb-3">Messages</h1>
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                <input
                                    type="text"
                                    placeholder="Rechercher..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full pl-9 pr-3 py-2 text-[11px] border border-gray-200 focus:border-[#D35400] focus:outline-none bg-gray-50"
                                />
                            </div>
                        </div>

                        {/* Liste */}
                        <div className="flex-1 overflow-y-auto">
                            {filteredConversations.map((conv) => (
                                <Link
                                    key={conv.id}
                                    to={`/messages/${conv.id}`}
                                    onClick={() => setSelectedConv(conv.id)}
                                    className={`
                                        flex items-center gap-3 p-3 border-b border-gray-100 hover:bg-gray-50 transition-colors
                                        ${selectedConv === conv.id ? 'bg-[#D35400]/5 border-l-4 border-l-[#D35400]' : ''}
                                        ${conv.unreadCount > 0 ? 'bg-[#1B4F72]/5' : ''}
                                    `}
                                >
                                    {/* Avatar avec statut online */}
                                    <div className="relative">
                                        <div className="w-12 h-12 bg-[#1B4F72]/10 flex items-center justify-center">
                                            <span className="text-[14px] font-bold text-[#1B4F72]">
                                                {conv.user.name.charAt(0)}
                                            </span>
                                        </div>
                                        {conv.user.isOnline && (
                                            <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white"></div>
                                        )}
                                    </div>

                                    {/* Info */}
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center justify-between mb-0.5">
                                            <h3 className={`
                                                text-[12px] font-medium truncate
                                                ${conv.unreadCount > 0 ? 'text-[#1B4F72] font-semibold' : 'text-gray-700'}
                                            `}>
                                                {conv.user.name}
                                                {conv.user.isArtisan && (
                                                    <span className="ml-1 text-[9px] text-[#D35400]">(Artisan)</span>
                                                )}
                                            </h3>
                                            <span className="text-[10px] text-gray-400">{conv.lastMessage.time}</span>
                                        </div>
                                        <p className={`
                                            text-[11px] truncate
                                            ${conv.unreadCount > 0 ? 'text-[#1B4F72] font-medium' : 'text-gray-500'}
                                        `}>
                                            {conv.lastMessage.isMe && 'Vous: '}
                                            {conv.lastMessage.text}
                                        </p>
                                    </div>

                                    {/* Unread badge */}
                                    {conv.unreadCount > 0 && (
                                        <div className="w-5 h-5 bg-[#D35400] text-white text-[10px] font-medium flex items-center justify-center">
                                            {conv.unreadCount}
                                        </div>
                                    )}
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Empty state */}
                    <div className="flex-1 flex items-center justify-center bg-gray-50">
                        <div className="text-center">
                            <div className="w-16 h-16 bg-[#1B4F72]/10 flex items-center justify-center mx-auto mb-4">
                                <Send className="w-8 h-8 text-[#1B4F72]" />
                            </div>
                            <h2 className="text-[13px] font-bold text-[#1B4F72] mb-1">Vos messages</h2>
                            <p className="text-[11px] text-gray-500">Sélectionnez une conversation pour commencer</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MessagesPage;