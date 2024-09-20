'use client'

import { MessageCircleMore } from "lucide-react"

export default function FinallyTotal() {
    return (
        <div className="w-full flex items-center justify-center p-4 border-r-2">
            <div className="flex justify-center items-center">
                <div className="relative h-16 w-16 rounded-full bg-[#DB636F] flex items-center justify-center text-cyan-50">
                    <MessageCircleMore className="h-8 w-8" /> {/* Ajuste de tamanho para centralização */}
                </div>
                <div className="pl-4 flex flex-col">
                    <p className="text-sm text-gray-500">Conversas</p> {/* Texto menor e cinza */}
                    <p className="text-3xl font-semibold text-black">400</p>
                </div>
            </div>
        </div>
    )
}
