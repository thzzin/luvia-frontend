'use client';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import UploadPlanilha from '@/app/components/perfil/uploadPlanilha';

const ProfilePage = () => {
    const [avatar, setAvatar] = useState("");
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [website, setWebsite] = useState("");
    const [description, setDescription] = useState("");
    const [email, setEmail] = useState("");
    const [newAvatar, setNewAvatar] = useState(null);

    // Função para carregar dados do perfil
    const loadProfile = async () => {
        try {
            const response = await axios.get('https://getluvia.com.br:3005/user/perfil', {
                headers: {
                    authorization: `${Cookies.get('token')}`,
                },
            });
            const { avatarurl, about, phone, address, website, description, email } = response.data;
            setAvatar(avatarurl);
            setName(about);
            setPhone(phone);
            setAddress(address);
            setWebsite(website);
            setDescription(description);
            setEmail(email);
            console.log('avatar', avatar)
        } catch (error) {
            console.error("Erro ao carregar perfil:", error);
        }   
    };

    useEffect(() => {
        loadProfile();
    }, []);

    // Manipulação do arquivo de avatar
    const handleAvatarChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setNewAvatar(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setAvatar(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    // Envio do novo avatar
    const handleAvatarSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();

        if (newAvatar) {
            formData.append('file', newAvatar); // Use 'file'
        }

        try {
            await axios.post('https://getluvia.com.br:3005/user/avatar', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    authorization: `${Cookies.get('token')}`,
                },
            });
            alert("Avatar atualizado com sucesso!");
            loadProfile(); // Recarrega os dados do perfil
        } catch (error) {
            console.error("Erro ao atualizar avatar:", error);
        }
    };

    // Envio das informações do perfil
   const handleSubmit = async (e) => {
    e.preventDefault();
    const updateData = {
        about: name,
        phone: phone,
        address: address,
        websites: [website, ''], // Aqui estamos enviando como um array
        description: description,
        email: email,
    };

    console.log("Dados a serem enviados:", updateData); // Adicione esta linha para depuração

    try {
        const response = await axios.put('https://getluvia.com.br:3005/user/perfil', updateData, {
            headers: {
                authorization: `${Cookies.get('token')}`,
            },
        });
        alert("Perfil atualizado com sucesso!");
        loadProfile(); // Recarrega os dados do perfil
    } catch (error) {
        console.error("Erro ao atualizar perfil:", error);
    }
};


    return (
        <div>
        <Card className="max-w-3xl mx-auto py-12 mt-24 px-8 flex flex-col md:flex-row justify-center align-middle">
                            <h1 className="text-2xl font-bold mb-4 align-middle text-center">Informações do Perfil</h1>

            {/* Seção do Avatar */}
            <div className="flex-shrink-0 mb-8 md:mb-0 md:mr-8">
                <div className="flex flex-col justify-center items-center">
                    <Avatar className="h-32 w-32 mb-4">
                        <AvatarImage src={avatar || "https://github.com/shadcn.png"} />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <form onSubmit={handleAvatarSubmit} className="flex flex-col items-center">
                        <Input
                            type="file"
                            accept="image/*"
                            onChange={handleAvatarChange}
                            className="mb-4"
                        />
                        <button
                            type="submit"
                            className="w-full bg-[#DB636F] text-white py-2 rounded-md hover:bg-[#D34E5C]"
                        >
                            Atualizar Foto
                        </button>
                    </form>
                </div>
            </div>

            {/* Seção para informações do perfil */}
            <div className="flex-grow">
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <Label className="block text-sm font-medium text-gray-300">Telefone</Label>
                        <Input
                            type="tel"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                            disabled
                        />
                    </div>
                    <div>
                        <Label className="block text-sm font-medium text-gray-300">Endereço</Label>
                        <Input
                            type="text"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                            required
                        />
                    </div>
                    <div>
                        <Label className="block text-sm font-medium text-gray-300">Descrição</Label>
                        <Input
                            type="text"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                            required
                        />
                    </div>
                    <div>
                        <Label className="block text-sm font-medium text-gray-300">Web Site</Label>
                        <Input
                            type="url"
                            value={website}
                            placeholder='https://'
                            onChange={(e) => setWebsite(e.target.value)}
                            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-[#DB636F] text-white py-2 rounded-md hover:bg-[#D34E5C]"
                    >
                        Atualizar Informações do Perfil
                    </button>
                </form>
            </div>
        </Card>

        {/* Seção de Upload de Planilha usando o novo componente */}
        <UploadPlanilha />
    </div>
    );
};

export default ProfilePage;

