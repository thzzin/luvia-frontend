import Link from 'next/link';
import { User, MessageCircleMore, Tag } from "lucide-react";
import { ProfileAvatar } from './ProfileAvatar';


const MobileMenu = () => {
  return (
    <div className="fixed bottom-0 left-0 right-0 flex justify-around items-center bg-white border-t p-4">
      <Link href="/dashboard/usuarios">
        <User className="text-gray-600 hover:text-black transition-colors" size={28} />
      </Link>
      <Link href="/dashboard/chats">
        <MessageCircleMore className="text-gray-600 hover:text-black transition-colors" size={28} />
      </Link>
      <Link href="/dashboard/etiquetas">
        <Tag className="text-gray-600 hover:text-black transition-colors" size={28} />
      </Link>
      <Link href="/dashboard/perfil">
        <ProfileAvatar /> {/* Ícone para o perfil */}
      </Link>
    </div>
  );
};

export default MobileMenu;
