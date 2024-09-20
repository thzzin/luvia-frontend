"use client";
import { useRouter } from "next/navigation"; // Para redirecionamento
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function ChatsSide({ chats }) {
    const router = useRouter();

    const handleChatClick = (senderId) => {
        // Redireciona para a página da conversa, passando o sender.id
        router.push(`/dashboard/chats/${senderId}`);
    };

    return (
        <div className="w-full pt-8">
            {chats && chats.length > 0 ? (
                chats.map((chat) => {
                    const phone = chat.contatoPhone;
                    const lastMessage = chat.lastMessage || "Sem mensagens";
                    const name = chat.contatoName;
                    const avatar = chat.contatoThumbnail
                    return (
                        <button 
                            key={chat.id} 
                            className="w-full text-left p-4 pr-12 border-b flex justify-between items-center hover:bg-gray-100"
                            onClick={() => handleChatClick(chat.id)}
                        >
                            <div className="flex items-start justify-start mr-4">
                                <Avatar className="h-14 w-14">
                                    {/* Usa um fallback se não houver thumbnail */}
                                    <AvatarImage src={avatar || "https://via.placeholder.com/150"} />
                                    <AvatarFallback>{name?.charAt(0)}</AvatarFallback>
                                </Avatar>

                                <div className="ml-2">
                                    <h2 className="font-semibold">
                                        {name || "Sem nome"} <strong className="text-gray-600 text-sm">{phone}</strong>
                                    </h2>
                                    <h2 className="ml-2 text-sm text-gray-600">{lastMessage}</h2>
                                </div>
                            </div>
                        </button>
                    );
                })
            ) : (
                <p>Nenhum chat encontrado</p>
            )}
        </div>
    );
}
