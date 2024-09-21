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

export default function ChatHeader({ avatar, name, phone }) {
    const [etiquetas, setEtiquetas] = useState([]);
    const [labelColor, setLabelColor] = useState(""); // Cor padrão

    useEffect(() => {
        const fetchEtiquetas = async () => {
            try {
                const response = await axios.get(
                    `https://getluvia.com.br:3005/user/etiquetas`,
                    {
                        headers: {
                            authorization: `${Cookies.get('token')}`,
                        },
                    }
                );

                const etiquetaData = response.data;
                setEtiquetas(etiquetaData); // Atualiza o estado com os dados da API
            } catch (error) {
                console.error("Erro ao obter etiquetas:", error);
            }
        };

        fetchEtiquetas();
    }, []);

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
                <Select value={labelColor} onValueChange={setLabelColor}>
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Etiquetas" />
                    </SelectTrigger>
                    <SelectContent>
                        {etiquetas.length > 0 ? (
                            etiquetas.map((etiqueta) => (
                                <SelectItem key={etiqueta.id} value={etiqueta.color}>
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
