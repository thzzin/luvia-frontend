'use client'
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuShortcut, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import Link from "next/link";
import { ModeToggle } from "./ModeToggle";
import { User, Settings, MessageSquareMore, Tag, LogOut, TrendingUpDown } from "lucide-react";

export function ProfileAvatar() {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-14 w-14 rounded-full">
                    <Avatar className="h-14 w-14">
                        <AvatarImage src="/avatars/02.png" alt="" />
                        <AvatarFallback>SR</AvatarFallback>
                    </Avatar>
                    
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56 z-[99998]">
                 <DropdownMenuItem>
                  <ModeToggle />  
                </DropdownMenuItem>
                <DropdownMenuGroup>
                    <DropdownMenuItem>
                    <User  className="w-4 h-4 mr-1"/>
                    <Link href="/dashboard/perfil">Meu Perfil</Link>
                    </DropdownMenuItem>
                   
                    {/* <DropdownMenuItem>
                    <Settings   className="w-4 h-4 mr-1"/>
                    <Link href="/dashboard/settings">Configurações</Link>
                    </DropdownMenuItem> */}
                </DropdownMenuGroup>
                <DropdownMenuItem>
                    <MessageSquareMore   className="w-4 h-4 mr-1"/>

                        Suporte
                    </DropdownMenuItem>
              
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-red-600	">
                <LogOut className="w-4 h-4 mr-1"/>
                <Link href="/dashboard/logout">Logout</Link>

                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}