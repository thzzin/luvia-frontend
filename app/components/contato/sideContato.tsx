"use client"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function ContatoSide() {
    return (
        <div className="flex justify-between p-4 border-b items-center">
            <div className="flex flex-1 items-start justify-start mr-4">
                <div>
                    <h2>Todos os Contatos</h2>
                </div>

                <div className="ml-2">
                    <h2>Thzzin  <strong>+5513991250485</strong></h2>

                    <h2 className="ml-2">Vai Corinthias Krl</h2>
                </div>
            </div>
        </div>
    )
}

