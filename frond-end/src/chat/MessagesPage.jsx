import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Send } from 'lucide-react';
import axiosClient from '../api/axios-client';
import { formatDistanceToNow, parseISO } from 'date-fns';
import { fr } from 'date-fns/locale';

const MessagesPage = () => {
    const [conversations, setConversations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedConv, setSelectedConv] = useState(null);

    const filteredConversations = conversations.filter(conv =>
        conv.subject.toLowerCase().includes(searchQuery.toLowerCase())
    );

    useEffect(() => {
        const fetchConversations = async () => {
            try {
                const response = await axiosClient.get('/conversations');

                const mappedData = response.data.data.map(conv => {
                    const lastMessage = conv.messages && conv.messages.length > 0
                        ? conv.messages[0]
                        : null;

                    const typeLabel = conv.type
                        ? conv.type.charAt(0).toUpperCase()
                        : 'I';

                    return {
                        id: conv.id,
                        subject: conv.subject || 'Général',
                        type: typeLabel,
                        time: formatDistanceToNow(parseISO(conv.last_message_at.replace(' ', 'T')), {
                            addSuffix: true,
                            locale: fr
                        }),
                        message: lastMessage ? lastMessage.content : 'Aucun message',
                        unread: conv.unread_count || 0
                    };
                });

                setConversations(mappedData);
            } catch (error) {
                console.error('Error fetching conversations:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchConversations();
    }, []);


    const skeletonconversations = () => {
        return (
            <>
                {[...Array(5)].map((_, index) => (
                    <div key={index} className="flex items-center gap-3 p-3 border-b border-gray-100 hover:bg-gray-50 transition-colors">
                        <div className="w-10 h-10 flex items-center justify-center shrink-0  bg-gray-300 animate-pulse" />
                        <div className="flex-1">
                            <div className="h-4 bg-gray-300 mb-2 animate-pulse" />
                            <div className="h-3 bg-gray-300 animate-pulse" />
                        </div>
                    </div>
                ))}
            </>
        );
    }
    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-6xl mx-auto mt-16 h-[calc(100vh-64px)]">
                <div className="flex h-full border border-gray-200 bg-white">

                    <div className="w-full md:w-1/2 border-r border-gray-200 flex flex-col">
                        <div className="p-4 border-b border-gray-200">
                            <h1 className="text-[15px] font-bold text-[#1B4F72] mb-3">Messages</h1>
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                <input
                                    type="text"
                                    placeholder="Rechercher par sujet..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full pl-9 pr-3 py-2 text-[11px] border border-gray-200 focus:border-[#D35400] focus:outline-none bg-gray-50"
                                />
                            </div>
                        </div>

                        <div className="flex-1 overflow-y-auto">
                            {loading ? (
                                skeletonconversations()
                            ) : filteredConversations.map((conv) => (
                                <Link
                                    key={conv.id}
                                    to={`/messages/${conv.id}`}
                                    onClick={() => setSelectedConv(conv.id)}
                                    className={`
                                        flex items-center gap-3 p-3 border-b border-gray-100 hover:bg-gray-50 transition-colors
                                        ${selectedConv === conv.id ? 'bg-[#D35400]/5 border-l-4 border-l-[#D35400]' : ''}
                                    `}
                                >
                                    <div className={`w-10 h-10 flex items-center justify-center shrink-0
                                        ${conv.type === 'D' ? 'bg-[#f3d5a1]' : conv.type === 'P' ? 'bg-[#81abc7]' : 'bg-[#dad9d293]'}
                                    `}>
                                        <span className="text-[14px] font-bold text-[#1B4F72]">
                                            {conv.type}
                                        </span>
                                    </div>

                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center justify-between mb-0.5">
                                            <h3 className="text-[12px] font-bold truncate text-[#1B4F72]">
                                                {conv.subject}
                                            </h3>
                                            <span className="text-[10px] text-gray-400">{conv.time}</span>
                                        </div>

                                        <div className="flex items-center gap-2">
                                            <p className="text-[10px] truncate text-gray-400 flex justify-between w-full">
                                                {conv.message}
                                                {conv.unread > 0 && (
                                                    <span className="text-[10px] font-bold text-[#ff103c] bg-[#ff103c]/10 px-2 py-0.5 rounded-full">
                                                        {conv.unread}
                                                    </span>
                                                )}
                                            </p>
                                        </div>
                                    </div>
                                </Link>
                            ))}

                            {filteredConversations.length === 0 && !loading && (
                                <p className="text-center text-[11px] mt-4">Aucune conversation trouvée</p>
                            )}
                        </div>
                    </div>

                    <div className="hidden md:flex flex-1 items-center justify-center bg-gray-50">
                        <div className="text-center">
                            <div className="w-16 h-16 bg-[#1B4F72]/10 flex  items-center animate-bounce justify-center mx-auto mb-4">
                                <Send className="w-8 h-8 text-[#1B4F72] animate-pulse" />
                            </div>
                            <h2 className="text-[13px] font-bold text-[#1B4F72] mb-1">Vos messages</h2>
                            <p className="text-[11px] text-gray-500">Sélectionnez une conversation pour voir les détails</p>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default MessagesPage;