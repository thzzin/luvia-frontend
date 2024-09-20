'use client'

import { ModeToggle } from "./ModeToggle";
import UserItem from "./UserItem";

export default function Header({avatar, number, name, tags}) {
    return (
        <div className="w-full flex items-center justify-between p-4 border-b">
            {/* <div className="flex items-start flex-1">
                <h2 className="mr-4">avatar{avatar}</h2>
                <div>
                <h2>name{name}</h2>
                <h2>number{number}</h2>
                </div>
                
            </div>
                <h2>tags{tags}</h2> */}
        </div>
    )
}
