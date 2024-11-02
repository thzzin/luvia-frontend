'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Card } from "@/components/ui/card";
import { User, MessageCircleMore, Tag } from "lucide-react";
import Image from 'next/image';

export default function DropdownMenu() {
  const [isOpen, setIsOpen] = useState(false); // Estado para controlar se o dropdown está aberto

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
      ],
    },
  ];

  return (
    <div className="relative">
      <button
        className="p-2 bg-gray-200 rounded hover:bg-gray-300 transition duration-200"
        onClick={() => setIsOpen(!isOpen)} // Alterna o estado do dropdown
      >
        Menu
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 w-full bg-white border border-gray-300 z-10 shadow-lg">
          <Card>
            <Command>
              <CommandList>
                {menuList.map((menu, key) => (
                  <CommandGroup key={key} heading={menu.group}>
                    {menu.items.map((option, optionKey) => (
                      <Link href={option.link} key={optionKey}>
                        <CommandItem className="flex items-center cursor-pointer p-3 my-2 rounded hover:bg-gray-200">
                          <span className="flex items-center justify-center text-2xl">
                            {option.icon}
                          </span>
                          <span className="ml-2">{option.link}</span>
                        </CommandItem>
                      </Link>
                    ))}
                  </CommandGroup>
                ))}
              </CommandList>
            </Command>
          </Card>
        </div>
      )}
    </div>
  );
}
