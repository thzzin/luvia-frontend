"use client";
import { useRouter } from "next/navigation"; 
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function ChatsSide({ chats }) {
    const router = useRouter();

    const handleChatClick = (senderId) => {
        router.push(`/dashboard/chats/${senderId}`);
    };

    // Função para formatar a data da última mensagem
    const formatLastMessageTime = (createdAt) => {
        const messageDate = new Date(createdAt);
        const today = new Date();
        const yesterday = new Date();
        yesterday.setDate(today.getDate() - 1);

        // Verifica se a data da mensagem é hoje
        if (messageDate.toDateString() === today.toDateString()) {
            return messageDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        }

        // Verifica se a data da mensagem é ontem
        if (messageDate.toDateString() === yesterday.toDateString()) {
            return "Ontem";
        }

        // Retorna a data no formato DD/MM
        return messageDate.toLocaleDateString([], { day: '2-digit', month: '2-digit' });
    };

    return (
        <div className="w-full pt-8">
            {chats && chats.length > 0 ? (
                chats.map((chat) => {
                    const phone = chat.contatoPhone;
                    const lastMessage = chat.lastMessage;
                    const name = chat.contatoName;
                    const avatar = chat.contatoThumbnail;

                    let lastMessageContent;
if (lastMessage.type === "image") {
    lastMessageContent = "📷 Imagem";
} else if (lastMessage.type === "audio") {
    lastMessageContent = "🎵 Áudio";
} else if (lastMessage.type === "document") {
    lastMessageContent = "📄 Documento"; // Adicione esta linha para documentos
} else {
    lastMessageContent = lastMessage.content || "Sem conteúdo";
}


                    const lastMessageTime = formatLastMessageTime(lastMessage.createdAt);

                    return (
                        <button 
                            key={chat.id} 
                            className="w-full text-left p-4 pr-12 border-b flex justify-between items-center hover:bg-gray-100"
                            onClick={() => handleChatClick(chat.id)}
                        >
                            <div className="flex items-start justify-start mr-4">
                                <Avatar className="h-14 w-14">
                                    <AvatarImage src={avatar || "https://via.placeholder.com/150"} />
                                    <AvatarFallback>{name?.charAt(0)}</AvatarFallback>
                                </Avatar>

                                <div className="ml-2 flex justify-between w-full">
                                    <div>
                                        <h2 className="font-semibold">
                                            {name || "Sem nome"} <strong className="text-gray-600 text-sm">{phone}</strong>
                                        </h2>
                                        <h2 className="ml-2 text-sm text-gray-600">{lastMessageContent}</h2>
                                    </div>
                                </div>
                            </div>
                            <span className="text-gray-400 text-sm">{lastMessageTime}</span>
                        </button>
                    );
                })
            ) : (
                <p>Nenhum chat encontrado</p>
            )}
        </div>
    );
}
