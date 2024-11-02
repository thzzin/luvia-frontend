'use client'

import { Search } from "lucide-react"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

import { Input } from "@/components/ui/input"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

export default function Clients() {
    return (
        <Card className="w-full p-4 px-8">
                <div className="flex items-center justify-between px-4 py-8 ">
                <div className="flex flex-col">
                    <CardTitle className="bold text-2xl">Clientes</CardTitle>
                    <CardDescription>Janeiro - Dezembro 2024</CardDescription>
                </div>
                <div className="flex items-center gap-4">
                    <div className="relative">
                        <Input type="text" placeholder="Pesquisar..." className="pl-10" />
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    </div>
                    <Select>
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Últimos 30D" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectItem value="30d">Últimos 30D</SelectItem>
                                <SelectItem value="7d">Últimos 7D</SelectItem>
                                <SelectItem value="3m">Últimos 3 meses</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>
                </div>
            <CardContent>
                <Table className="w-full">
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[100px] text-center">ID</TableHead>
                            <TableHead className="text-center">Nome</TableHead>
                            <TableHead className="text-center">Número</TableHead>
                            <TableHead className="text-center">Email</TableHead>
                            <TableHead className="text-center">Tag</TableHead>
                            <TableHead className="text-center">Estado</TableHead>
                            <TableHead className="text-center">Cadastro</TableHead>
                            <TableHead className="text-center">Ultima Interação</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        <TableRow>
                            <TableCell className="text-center">#1</TableCell>
                            <TableCell className="text-center">Thiago Leblanc</TableCell>
                            <TableCell className="text-center">13991250485</TableCell>
                            <TableCell className="text-center">thzzinlb@gmail.com</TableCell>
                            <TableCell className="text-center">TAG1</TableCell>
                            <TableCell className="text-center">SP</TableCell>
                            <TableCell className="text-center">05/09/2024</TableCell>
                            <TableCell className="text-center">08/09/2024</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    )
}
