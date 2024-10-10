import { useRef, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Plus } from 'lucide-react';
import { ImageIcon, File, Music } from 'lucide-react';

export default function UploadDoc({ phone, idchat, contactId, addMessage  }) {
    const fileInputRef = useRef(null);
    const documentInputRef = useRef(null);
    const audioInputRef = useRef(null); // Para arquivos de áudio
    const [loading, setLoading] = useState(false);

   const handleFileUpload = async (event) => {
    const files = event.target.files;

    if (files.length > 0) {
        setLoading(true); // Inicia o loading
        const formData = new FormData();
        formData.append('file', files[0]);
        formData.append('conversation_id', idchat);
        formData.append('contactId', contactId);
        formData.append('phonecontact', phone);

        // Verificando o tipo de arquivo
        const mimeType = files[0].type;
        let fileType;
        let messageType;

        if (mimeType.startsWith("image/")) {
            fileType = "image";
            messageType = "image";
        } else if (mimeType.startsWith("audio/")) {
            fileType = "audio";
            messageType = "audio";
        } else if (mimeType.startsWith("video/")) {
            fileType = "video";
            messageType = "video";
        } else if (mimeType === "application/pdf" || mimeType.startsWith("application/vnd") || mimeType === "text/plain") {
            fileType = "document";
            messageType = "document";
        } else {
            console.error('Tipo de arquivo não suportado:', mimeType);
            setLoading(false);
            return;
        }

        // Adicionando a mensagem imediatamente ao estado do chat
        addMessage({
            id: Date.now(), // ID temporário
            messageType: "sent",
            content: "Enviando " + (messageType === "document" ? "documento" : messageType),
            type: messageType,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        });

        try {
            const url = 'https://getluvia.com.br:3005/user/postmedia';
            const response = await axios.post(url, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    authorization: `${Cookies.get('token')}`,
                },
            });

            // Atualizando a mensagem com o conteúdo correto após o upload
            // Você pode querer fazer isso de forma diferente para evitar duplicações
            // Atualize conforme a lógica do seu ID
            addMessage(prevMessages => prevMessages.map(msg => {
                if (msg.id === Date.now() - 1) {
                    return { ...msg, content: response.data.fileUrl };
                }
                return msg;
            }));

            console.log('Arquivo enviado com sucesso:', response.data);
        } catch (error) {
            console.error('Erro ao enviar o arquivo:', error);
        } finally {
            setLoading(false);
        }
    }
};



    const handleFileUploadClick = (type) => {
        if (type === 'image') {
            fileInputRef.current.click();
        } else if (type === 'document') {
            documentInputRef.current.click();
        } else if (type === 'audio') {
            audioInputRef.current.click();
        }
    };

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button><Plus /></Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto">
                <div className="flex flex-col gap-2">
                    <Button 
                        variant="outline" 
                        className="w-full justify-start text-left" 
                        onClick={() => handleFileUploadClick('image')}
                    >
                        <ImageIcon className="mr-2 h-4 w-4" /> Fotos e Vídeos
                    </Button>
                    <Button 
                        variant="outline" 
                        className="w-full justify-start text-left" 
                        onClick={() => handleFileUploadClick('document')}
                    >
                        <File className="mr-2 h-4 w-4" /> Documento
                    </Button>
                    <Button 
                        variant="outline" 
                        className="w-full justify-start text-left" 
                        onClick={() => handleFileUploadClick('audio')}
                    >
                        <Music className="mr-2 h-4 w-4" /> Áudio
                    </Button>
                    <input 
                        type="file" 
                        ref={fileInputRef} 
                        style={{ display: 'none' }} 
                        accept="image/jpeg,image/png" // Para imagens
                        onChange={handleFileUpload} 
                    />
                    <input 
                        type="file" 
                        ref={documentInputRef} 
                        style={{ display: 'none' }} 
                        accept=".pdf,.doc,.docx,.ppt,.pptx,.xls,.xlsx,.txt" // Para documentos
                        onChange={handleFileUpload} 
                    />
                    <input 
                        type="file" 
                        ref={audioInputRef} 
                        style={{ display: 'none' }} 
                        accept=".aac,.amr,.mp3,.m4a,.ogg" // Para áudio
                        onChange={handleFileUpload} 
                    />
                </div>
            </PopoverContent>
        </Popover>
    );
}
