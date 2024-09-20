'use client';

import { UserAvatar } from "./UserAvatar";

export default function UserItem() {
    return (
        <div className="flex items-center justify-end gap-2 justify-self-end">          
            <div>
                <p className="text-[16px] font-bold">Thiago Paiva</p>
                <p className="text-[12px] text-neutral-500">thzzinlb@gmail.com</p>
            </div>
            <UserAvatar />
        </div>
    );
}
