"use client";
import { useState, useEffect, useRef } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import axios from 'axios';
import Cookies from 'js-cookie';
import ChatHeader from "./headerChat";
import UploadDoc from './uploadDoc';
import { Mic, StopCircle, Trash2 } from 'lucide-react';

function MessageSent({ content, timestamp, type }) {
    return (
        <div className="flex justify-end mb-6 mr-6 ">
            <div 
                className={`relative max-w-md overflow-hidden whitespace-pre-wrap ${
                    type === "image" ? "border border-gray-300 p-0" : "bg-[#DB636F] text-white p-4 rounded-lg"
                }`}
            >
                {type === "audio" ? (
                    <audio controls className="max-w-full">
                        <source src={content} type="audio/ogg" />
                        <source src={content.replace('.ogg', '.wav')} type="audio/wav" />
                        <source src={content.replace('.ogg', '.mp3')} type="audio/mpeg" />
                        Seu navegador não suporta o elemento de áudio.
                    </audio>
                ) : type === "image" ? (
                    <img 
                        src={content} 
                        alt="Imagem enviada" 
                        className="max-w-full h-auto rounded-lg" 
                    />
                ) : type === "document" ? (
                    <a 
                        href={content} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="text-blue-400 underline"
                    >
                        Baixar Documento
                    </a>
                ) : (
<p className="py-4 break-words max-w-full">{content}</p>
                )}
                
                {type === "image" && (
                    
                    
                                        <img src={content} alt="Imagem" className="max-w-full h-auto rounded-lg" />

                    
                )}
                
                {type !== "image" && (
                    <span className="text-xs text-gray-200">{timestamp}</span>
                )}
            </div>
        </div>
    );
}




function MessageReceived({ content, timestamp, type }) {
    return (
        <div className="flex justify-start mb-6 ml-6">
            <div className="bg-gray-300 text-black p-2 rounded-lg max-w-md overflow-hidden whitespace-pre-wrap">
                {type === "image" ? (
                    <img src={content} alt="Imagem" className="max-w-full h-auto rounded-lg" />
                ) : type === "audio" ? (
                    <audio controls className="max-w-full">
                        <source src={content} type="audio/wav" />
                        Seu navegador não suporta o elemento de áudio.
                    </audio>
                ) : (
                    <p className="p-2">{content}</p>
                )}
                <span className="text-xs text-gray-500 p-2">{timestamp}</span>
            </div>
        </div>
    );
}

export default function ChatPage({ idchat, setShowChatList }) {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    const [avatar, setAvatar] = useState("");
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [contactId, setContactId] = useState("");
    const [isRecording, setIsRecording] = useState(false);
    const [mediaRecorder, setMediaRecorder] = useState(null);
    const [audioURL, setAudioURL] = useState("");
    const [recordingDuration, setRecordingDuration] = useState(0);
    const messagesEndRef = useRef(null);
    const durationRef = useRef(null);
    const audioChunksRef = useRef([]);

    

    useEffect(() => {
        const searchChat = async () => {
            try {
                const response = await axios.get(
                    `https://getluvia.com.br:3005/user/conversa/${idchat}`, 
                    {
                        headers: {
                            authorization: `${Cookies.get('token')}`, 
                        },
                    }
                );

                const chatData = response.data; 
                const formattedMessages = chatData.mensagens.map((msg) => ({
                    id: msg.id,
                    messageType: msg.messageType,
                    content: msg.content,
                    type: msg.type,
                    timestamp: new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                }));

                setAvatar(chatData.contatoThumbnail);
                setName(chatData.contatoName);
                setPhone(chatData.contatoPhone);
                setContactId(chatData.contato_id);
                setMessages(formattedMessages); 
            } catch (error) {
                console.error("Erro ao obter mensagens do chat:", error);
            }
        };

        searchChat();
    }, [idchat]);

     const addMessage = (message) => {
    if (!message.content) return; // Ignora mensagens vazias
    setMessages(prevMessages => [...prevMessages, message]);
};


    const handleSendMessage = async () => {
        if (audioURL) {
            // Se há um áudio, enviar como áudio
            await handleSendAudio();
        } else {
            // Caso contrário, enviar a mensagem de texto
            const response = await axios.post(
                'https://getluvia.com.br:3005/user/addmsg',  
                {
                    content: newMessage,
                    conversation_id: idchat,
                    contactId: contactId,
                    message_type: 1,
                    status: "sent",
                    phonecontact: phone,
                },  
                {
                    headers: {
                        authorization: `${Cookies.get('token')}`,  
                    },
                }
            );

            setMessages(prevMessages => [
                ...prevMessages,
                {
                    id: response.data.id,
                    messageType: "sent",
                    content: newMessage,
                    type: "text",
                    timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                }
            ]);

            setNewMessage(""); 
            scrollToBottom();
        }
    };

    const handleStartRecording = async () => {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        const recorder = new MediaRecorder(stream);
        setMediaRecorder(recorder);
        setIsRecording(true);
        audioChunksRef.current = [];

        recorder.ondataavailable = event => {
            audioChunksRef.current.push(event.data);
        };

        recorder.onstop = () => {
            const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
            const audioUrl = URL.createObjectURL(audioBlob);
            setAudioURL(audioUrl);
            setIsRecording(false);
            clearInterval(durationRef.current);
            setRecordingDuration(0);
        };

        recorder.start();

        // Iniciar contagem do tempo de gravação
        setRecordingDuration(0);
        durationRef.current = setInterval(() => {
            setRecordingDuration(prev => prev + 1);
        }, 1000);
    };

    const handleStopRecording = () => {
        if (mediaRecorder) {
            mediaRecorder.stop();
        }
    };

    const handleSendAudio = async () => {
        if (!audioURL) return;

        // Converter blob URL para um arquivo
        const responseBlob = await fetch(audioURL);
        const audioBlob = await responseBlob.blob();
        const file = new File([audioBlob], "audio.wav", { type: "audio/wav" });

        // Criar um FormData para enviar o arquivo
        const formData = new FormData();
        formData.append('file', file);  // Adiciona o arquivo
        formData.append('conversation_id', idchat);
        formData.append('contactId', contactId);
        formData.append('message_type', 2); // Tipo para áudio
        formData.append('status', "sent");
        formData.append('phonecontact', phone);

        const uploadResponse = await axios.post(
            'https://getluvia.com.br:3005/user/addaudio',
            formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    authorization: `${Cookies.get('token')}`,
                },
            }
        );

        setMessages(prevMessages => [
            ...prevMessages,
            {
                id: uploadResponse.data.id,
                messageType: "sent",
                content: audioURL,
                type: "audio",
                timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            }
        ]);

        setAudioURL(""); // Limpa o URL do áudio após o envio
        scrollToBottom();
    };

    const scrollToBottom = () => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
        }
    };

    useEffect(() => {
        scrollToBottom(); 
    }, [messages]);

   


    return (
       <div className="flex flex-col max-h-[95vh]  md:h-screen">
  {/* Cabeçalho fixo no topo */}
  <div className="flex-none">
    <ChatHeader setShowChatList={setShowChatList} avatar={avatar} name={name} phone={phone} />
  </div>

  {/* Área de mensagens com rolagem */}
  <ScrollArea className="flex-grow overflow-y-auto p-4">
    <div className="flex flex-col gap-4 max-w-[80vw] px-4">
      {messages.length > 0 ? (
        messages.map((message) =>
          message.messageType === "sent" ? (
            <MessageSent key={message.id} type={message.type} content={message.content} timestamp={message.timestamp} />
          ) : (
            <MessageReceived key={message.id} content={message.content} timestamp={message.timestamp} type={message.type} />
          )
        )
      ) : (
        <p>Nenhuma mensagem encontrada</p>
      )}
      <div ref={messagesEndRef} />
    </div>
  </ScrollArea>

  {/* Caixa de entrada fixada na parte inferior */}
  <div className='py-12 md:py-2'>
  <div className="flex-none p-4 border-t flex items-center gap-2">
    <UploadDoc addMessage={addMessage} idchat={idchat} contactId={contactId} phone={phone} />
    <Input
      className="flex-grow py-2 px-2 resize-none overflow-y-auto"
      placeholder="Digite sua mensagem"
      value={newMessage}
      onChange={(e) => setNewMessage(e.target.value)}
      onKeyDown={(e) => {
        if (e.key === 'Enter') {
          e.preventDefault();
          handleSendMessage();
        }
      }}
       style={{
    maxHeight: '72px', // Altura para 3 linhas (3 * 24px)
    lineHeight: '24px' // Linha de 24px para consistência
  }}
    />



    {isRecording ? (
      <div className="flex items-center">
        <Button onClick={handleStopRecording} className="bg-red-500 text-white">
          <StopCircle className="mr-2" /> Parar
        </Button>
        <span className="px-6">{recordingDuration}s</span>
      </div>
    ) : (
      <Button onClick={handleStartRecording}>
        <Mic />
      </Button>
    )}
    <Button onClick={handleSendMessage} disabled={isRecording && !audioURL}>
      Enviar
    </Button>

    {audioURL && (
      <div className="flex items-center">
        <audio controls className="mr-2">
          <source src={audioURL} type="audio/wav" />
          Seu navegador não suporta o elemento de áudio.
        </audio>
        <Button onClick={() => setAudioURL("")} className="ml-2">
          <Trash2 />
        </Button>
      </div>
    )}
  </div>
  </div>
</div>


    );
}
