"use client";
import { useRouter } from "next/navigation"; // Para redirecionamento
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

export default function ChatHeader({avatar, name, phone}) {

    return (
        <div className="w-full flex items-start justify-between p-4">
            <div className="w-full flex items-center justify-between p-4 border-b">
                <div className="flex items-start flex-1">
                    <Avatar className="h-14 w-14">
                        <AvatarImage src={avatar} alt="@shadcn" />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col justify-center pl-4">
                        <h2>{name}</h2>
                        <h2 className="text-gray-400">{phone}</h2>
                    </div>
                </div>
                <Select>
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Pendente" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectLabel>Status</SelectLabel>
                            <SelectItem value="Finalizado">Finalizado</SelectItem>
                            <SelectItem value="Proposta Enviada">Proposta Enviada</SelectItem>
                            <SelectItem value="Cliente">Cliente</SelectItem>
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </div>

        </div>
    )
}