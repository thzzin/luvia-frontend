'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link'; // Importe o componente Link do Next.js
import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command";


import { User, Gauge, MessageCircleMore, Tag, LogOut, TrendingUpDown } from "lucide-react";
import Image from 'next/image';
import Profile from './Profile';
import { ModeToggle } from './ModeToggle'

export default function Sidebar() {
  const [selectedItem, setSelectedItem] = useState('/'); // Ou qualquer caminho padrão

  const menuList = [
    {
      group: "Geral",
      items: [
        {
          link: "/dashboard/usuarios",
          icon: <User />,
          text: "Contatos"
        },
        {
          link: "/dashboard/chats",
          icon: <MessageCircleMore />,
          text: "Chats"
        },
        {
          link: "/dashboard/etiquetas",
          icon: <Tag />,
          text: "Etiquetas"
        },
      ]
    },
  ];

  useEffect(() => {
    const currentPath = window.location.pathname;
    setSelectedItem(currentPath);
  }, []);



  return (
    <div className="fixed flex flex-col gap-4 w-[100px] min-w-[100px] border-r min-h-screen p-4">
      <div className="flex justify-start items-start">
        <Image
          src="/logowhite.png"
          alt="Logo"
          width={60}
          height={60}
        />
      </div>
      <div className="flex-grow">
        <Command style={{ overflow: 'visible' }}>
          <CommandList style={{ overflow: 'visible' }}>
            {menuList.map((menu, key) => (
              <CommandGroup key={key} heading={menu.group}>
                {menu.items.map((option, optionKey) => (
                  <Link href={option.link} key={optionKey}>
                    <CommandItem
                      className={`flex gap-2 cursor-pointer p-3 my-2 rounded-full transition-all duration-300 ${selectedItem === option.link
                          ? 'bg-[#DB636F] text-white border-center-center-radius: 0.5rem 	;'
                          : 'hover:bg-gray-200  border-center-center-radius: 0.5rem text-stone-600;'
                        }`}
                      onClick={() => setSelectedItem(option.link)}
                    >
                      {option.icon}
                    </CommandItem>
                  </Link>
                ))}
              </CommandGroup>
            ))}
          </CommandList>
        </Command>
      </div>
      <div className="flex flex-col items-center justify-center h-full">
        <ModeToggle />
        <Profile />

      </div>

    </div>
  );
}
