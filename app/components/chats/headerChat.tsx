"use client";
import { useRouter } from "next/navigation"; // Para redirecionamento
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useState, useEffect } from "react";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

import axios from 'axios';
import Cookies from 'js-cookie';

export default function ChatHeader({ avatar, name, phone, conversaId, etiquetaId }) {
    const [etiquetas, setEtiquetas] = useState([]);  // Initialize as an array
    const [selectedEtiqueta, setSelectedEtiqueta] = useState("");
    const [selectedEtiquetaData, setSelectedEtiquetaData] = useState(null); // Dados da etiqueta selecionada

    useEffect(() => {
        const fetchEtiquetas = async () => {
            try {
                const response = await axios.get(
                    `https://getluvia.com.br:3005/user/etiqueta`,
                    {
                        headers: {
                            authorization: `${Cookies.get('token')}`,
                        },
                    }
                );

                // Ensure response data is an array
                const etiquetaData = Array.isArray(response.data) ? response.data : [];
                setEtiquetas(etiquetaData); // Atualiza o estado com os dados da API
            } catch (error) {
                console.error("Erro ao obter etiquetas:", error);
                setEtiquetas([]); // Set empty array in case of error
            }
        };

        fetchEtiquetas();
    }, []);

    // Enviar a etiqueta selecionada para o backend quando mudar
    useEffect(() => {
        const assignEtiquetaToConversa = async () => {
            if (selectedEtiqueta) {
                try {
                    await axios.post(
                        `https://getluvia.com.br:3005/user/editchatetiqueta`,
                        {
                            conversaId: conversaId,  // ID da conversa
                            etiquetaId: selectedEtiqueta,  // ID da etiqueta selecionada
                        },
                        {
                            headers: {
                                authorization: `${Cookies.get('token')}`,
                            },
                        }
                    );
                } catch (error) {
                    console.error("Erro ao atribuir etiqueta à conversa:", error);
                }

                // Encontrar a etiqueta selecionada a partir da lista e armazená-la
                const selectedEtiquetaInfo = etiquetas.find(
                    (etiqueta) => etiqueta.id === selectedEtiqueta
                );
                setSelectedEtiquetaData(selectedEtiquetaInfo);
            }
        };

        assignEtiquetaToConversa();
    }, [selectedEtiqueta]); // Executa a função sempre que selectedEtiqueta mudar

    return (
        <div className="w-full flex items-start justify-between p-4">
            <div className="w-full flex items-center justify-between p-4 border-b">
                <div className="flex items-start flex-1">
                    <Avatar className="h-14 w-14">
                        <AvatarImage src={avatar} alt="Avatar" />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col justify-center pl-4">
                        <h2>{name}</h2>
                        <h2 className="text-gray-400">{phone}</h2>
                    </div>
                </div>

                <Select value={selectedEtiqueta} onValueChange={setSelectedEtiqueta}>
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Etiquetas">
                            {selectedEtiquetaData ? (
                                <span className="flex items-center">
                                    <span
                                        style={{
                                            backgroundColor: selectedEtiquetaData.color,
                                        }}
                                        className="block w-4 h-4 rounded-full mr-2"
                                    />
                                    {selectedEtiquetaData.name}
                                </span>
                            ) : (
                                <span>Etiquetas</span>
                            )}
                        </SelectValue>
                    </SelectTrigger>
                    <SelectContent>
                        {etiquetas.length > 0 ? (
                            etiquetas.map((etiqueta) => (
                                <SelectItem key={etiqueta.id} value={etiqueta.id}>
                                    <span className="flex items-center">
                                        <span
                                            style={{ backgroundColor: etiqueta.color }}
                                            className="block w-4 h-4 rounded-full mr-2"
                                        />
                                        {etiqueta.name}
                                    </span>
                                </SelectItem>
                            ))
                        ) : (
                            <p>Nenhuma etiqueta disponível</p>
                        )}
                    </SelectContent>
                </Select>
            </div>
        </div>
    );
}
