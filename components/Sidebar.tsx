'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Command, CommandGroup, CommandItem, CommandList } from "@/components/ui/command";
import { Card } from "@/components/ui/card";
import { User, MessageCircleMore, Tag } from "lucide-react";
import Image from 'next/image';
import Profile from './Profile';
import { ModeToggle } from './ModeToggle';
import { NavigationMenu, NavigationMenuList, NavigationMenuItem } from "@/components/ui/navigation-menu";

export default function Sidebar() {
  const [selectedItem, setSelectedItem] = useState('/');

  const menuList = [
    {
      group: "",
      items: [
        { link: "/dashboard/usuarios", icon: <User /> },
        { link: "/dashboard/chats", icon: <MessageCircleMore /> },
        { link: "/dashboard/etiquetas", icon: <Tag /> },
      ]
    },
  ];

  return (
    <div className="fixed bottom-0 left-0 w-full md:w-[100px] md:flex md:flex-col md:min-h-screen md:border-r p-4 bg-white shadow md:bg-transparent z-50 flex justify-around items-center">
      {/* Logo */}
      <div className="flex justify-center items-center">
        <Image src="/logowhite.png" alt="Logo" width={50} height={50} />
      </div>

      {/* Menu */}
<div className="flex flex-row md:flex-col items-center py-2 justify-center w-full">
        <NavigationMenu className="w-full max-w-[300px] md:max-w-full">
          <Card className="w-full">
            <NavigationMenuList className="flex flex-row gap-4 md:flex-col items-center justify-center">
              {menuList.map((menu, key) => (
                <div key={key} className="flex flex-row gap-2 py-2 md:flex-col items-center">
                  {menu.items.map((option, optionKey) => (
                    <NavigationMenuItem key={optionKey}>
                      <Link href={option.link} onClick={() => setSelectedItem(option.link)}>
                        <span
                          className={`flex items-center justify-center cursor-pointer p-3 rounded-full transition-all duration-300 ${
                            selectedItem === option.link ? 'bg-[#DB636F] text-white' : 'hover:bg-gray-200 text-stone-600'
                          }`}
                        >
                          <span className="flex items-center justify-center text-2xl">
                            {option.icon}
                          </span>
                        </span>
                      </Link>
                    </NavigationMenuItem>
                  ))}
                </div>
              ))}
            </NavigationMenuList>
          </Card>
        </NavigationMenu>
      </div>



      {/* Toggle e Perfil */}
     <div className="flex flex-row md:flex-col items-center justify-center gap-4 h-full">
  <div className="flex items-center justify-center h-full">
    <ModeToggle />
  </div>
  <div className="flex items-center justify-center h-full">
    <Profile />
  </div>
</div>

    </div>
  );
}
