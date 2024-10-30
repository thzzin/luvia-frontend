"use client";

import React, { useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Plus  } from 'lucide-react';

const UploadPlanilha = () => {
    const [newFile, setNewFile] = useState(null);
    const [dragOver, setDragOver] = useState(false);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setNewFile(file);
        }
    };

    const handleFileDrop = (e) => {
        e.preventDefault();
        setDragOver(false); // Reset drag over state
        const file = e.dataTransfer.files[0];
        if (file) {
            setNewFile(file);
        }
    };

    const handleDragOver = (e) => {
        e.preventDefault(); // Prevent default behavior (Prevent file from being opened)
        setDragOver(true);
    };

    const handleDragLeave = () => {
        setDragOver(false); // Reset drag over state
    };

    const handleFileSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        
        if (newFile) {
            formData.append('file', newFile);
        }

        try {
            await axios.post('https://getluvia.com.br:3005/user/planilha', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    authorization: `${Cookies.get('token')}`,
                },
            });
            alert("Planilha enviada com sucesso!");
            setNewFile(null); // Reset file after successful upload
        } catch (error) {
            console.error("Erro ao enviar planilha:", error);
        }
    };

    return (
        <Card className="max-w-3xl mx-auto py-12 mt-8 px-8 flex justify-center align-middle">
            <div className="flex-grow px-8 mt-8">
                <h1 className="text-2xl font-bold mb-4">Atualizar de Planilha</h1>
                <form onSubmit={handleFileSubmit} className="space-y-4">
                    <div className="flex flex-col items-center mb-4">
                        <div
                            className={`border-dashed border-2 ${dragOver ? 'border-blue-500' : 'border-gray-300'} w-full h-32 flex justify-center items-center`}
                            onDrop={handleFileDrop}
                            onDragOver={handleDragOver}
                            onDragLeave={handleDragLeave}
                        >
                            <Input
                                type="file"
                                accept=".xlsx, .xls"
                                onChange={handleFileChange}
                                className="hidden"
                                id="file-input"
                            />
                            <label 
                                htmlFor="file-input" 
                                className="cursor-pointer flex flex-col items-center justify-center h-full">
                                <span className="text-gray-500">Clique ou arraste um arquivo aqui</span>

                                <span className="text-gray-400">(.xlsx)</span>

                            </label>
                        </div>
                        {newFile && (
                            <div className="mt-2">
                                <span className="font-medium text-gray-700">{newFile.name}</span>
                                <span className="text-gray-500"> ({(newFile.size / 1024).toFixed(2)} KB)</span>
                            </div>
                        )}
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-[#DB636F] text-white py-2 rounded-md hover:bg-[#D34E5C]"
                    >
                        Enviar Planilha
                    </button>
                </form>
            </div>
        </Card>
    );
};

export default UploadPlanilha;
