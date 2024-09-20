'use client';

import { useState } from 'react';
import Link from 'next/link'; // Importe o componente Link do Next.js
import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command";

import { User, MessageCircleMore, Tag } from "lucide-react";
import Image from 'next/image';
import Profile from './Profile';
import { ModeToggle } from './ModeToggle';

export default function Sidebar() {
  const [selectedItem, setSelectedItem] = useState('/'); // Ou qualquer caminho padrão

  const menuList = [
    {
      group: "",
      items: [
        {
          link: "/dashboard/usuarios",
          icon: <User />,
        },
        {
          link: "/dashboard/chats",
          icon: <MessageCircleMore />,
        },
        {
          link: "/dashboard/etiquetas",
          icon: <Tag />,
        },
      ]
    },
  ];

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
      <div className="flex-grow flex items-center justify-center">
        <Command style={{ overflow: 'visible' }}>
          <CommandList style={{ overflow: 'visible' }} className="w-full">
            {menuList.map((menu, key) => (
              <CommandGroup key={key} heading={menu.group} className="w-full">
                {menu.items.map((option, optionKey) => (
                  <Link href={option.link} key={optionKey} onClick={() => setSelectedItem(option.link)}>
                    <CommandItem
                      className={`flex items-center justify-center cursor-pointer p-3 my-2 rounded-full transition-all duration-300 w-full ${selectedItem === option.link
                          ? 'bg-[#DB636F] text-white'
                          : 'hover:bg-gray-200 text-stone-600'
                        }`}
                    >
                      <span className="flex items-center justify-center text-2xl">
                        {option.icon}
                      </span>
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
