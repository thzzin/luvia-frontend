'use client'

import { MessageCircleMore } from "lucide-react"

export default function NewsClientes() {
    return (
        <div className="w-full flex items-center justify-center p-4">
        <div className="flex justify-center items-center">
            <div className="relative h-16 w-16 rounded-full bg-[#DB636F] flex items-center justify-center text-cyan-50">
                <MessageCircleMore className="h-8 w-8" /> {/* Ajuste de tamanho para centralização */}
            </div>
            <div className="pl-4 flex flex-col">
                <p className="text-sm text-gray-500">Mensagens Enviadas</p> {/* Texto menor e cinza */}
                <p className="text-3xl font-semibold text-black">50</p> {/* Texto maior para o número */}
            </div>
        </div>
    </div>
    )
}
