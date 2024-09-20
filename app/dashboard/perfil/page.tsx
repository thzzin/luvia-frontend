'use client';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { Input } from "@/components/ui/input"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
  
  import { Label } from "@/components/ui/label"

const ProfilePage = () => {
    const [avatar, setAvatar] = useState("");
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [newAvatar, setNewAvatar] = useState("");

    // Função para carregar dados do perfil (substitua pela sua lógica)
    const loadProfile = async () => {
        try {
            const response = await axios.get('/api/profile', {
                headers: {
                    authorization: `${Cookies.get('token')}`,
                },
            });
            const { avatar, name, phone } = response.data;
            setAvatar(avatar);
            setName(name);
            setPhone(phone);
        } catch (error) {
            console.error("Erro ao carregar perfil:", error);
        }
    };

    // Chame loadProfile quando o componente for montado
    useEffect(() => {
        loadProfile();
    }, []);

    const handleAvatarChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setNewAvatar(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put('/api/profile', {
                avatar: newAvatar || avatar,
                name,
                phone,
            }, {
                headers: {
                    authorization: `${Cookies.get('token')}`,
                },
            });
            alert("Perfil atualizado com sucesso!");
            // Opcional: recarregar os dados do perfil
            loadProfile();
        } catch (error) {
            console.error("Erro ao atualizar perfil:", error);
        }
    };

    return (
        <Card className="max-w-3xl mx-auto py-12 mt-24 px-8 flex">
        <div className="flex-shrink-0 mr-4"> {/* Espaço para o Avatar */}
            <div className='flex flex-col justify-center items-center'>
            <Avatar className="h-32 w-32 mb-4">
                <AvatarImage src={newAvatar || avatar || "https://github.com/shadcn.png"} />
                <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <Input
                type="file"
                accept="image/*"
                onChange={handleAvatarChange}
                className="mb-4"
            />
            </div>
        </div>
        <div className="flex-grow pl-4"> {/* Espaço para os Inputs */}
            <h1 className="text-2xl font-bold mb-4">Perfil</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <Label className="block text-sm font-medium text-gray-300">Nome</Label>
                    <Input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                        required
                    />
                </div>
                <div>
                    <Label className="block text-sm font-medium text-gray-300">Telefone</Label>
                    <Input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="w-full bg-[#DB636F] text-white py-2 rounded-md hover:bg-[#D34E5C]"
                >
                    Atualizar Perfil
                </button>
            </form>
        </div>
    </Card>
    );
};

export default ProfilePage;
