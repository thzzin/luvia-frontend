'use client';
import { useState, useEffect } from 'react';
import withAuth from '../../middlewares/withAuth'; // ajuste o caminho conforme necessário
import Cookies from 'js-cookie';
import axios from 'axios';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";

function SettingsPage() {
  const [waid, setWaId] = useState('');
  const [acesstoken, setAcessToken] = useState('');
  const [phone, setPhoneNumber] = useState('');
  const [idassistent, setIdassistent] = useState('')

  // Função para carregar os tokens salvos
  const loadTokens = async () => {
    try {
      const response = await axios.get('https://getluvia.com.br:3005/user/tokens', {
        headers: {
          authorization: `${Cookies.get('token')}`,
        },
      });
      const { idNumero, acessToken, phone, idassistent } = response.data.infos;
      setWaId(idNumero);
      setAcessToken(acessToken);
      setPhoneNumber(phone);
      setIdassistent(idassistent)
    } catch (error) {
      console.error("Erro ao carregar tokens:", error);
    }
  };

  useEffect(() => {
    loadTokens();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        'https://getluvia.com.br:3005/user/tokens',
        { waid, acesstoken, phone, idgpt: idassistent },
        {
          headers: {
            'Content-Type': 'application/json',
            authorization: `${Cookies.get('token')}`,
          },
        }
      );

      if (response.status === 200) {
        console.log('Número enviado com sucesso:', response.data);
      } else {
        console.error('Erro ao enviar o número:', response.statusText);
      }
    } catch (error) {
      console.error('Erro na solicitação:', error);
    }
  };

  return (
    <div className="flex justify-center mt-8">
      <Card className="max-w-md w-full p-6 space-y-6">
        <h2 className="text-xl font-bold">Configurações de Token</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <div>
            <Label>Assistent ID</Label>
            <Input
              type="text"
              value={idassistent}
              onChange={(e) => setIdassistent(e.target.value)}
              placeholder="Digite o ID Assistente"
              required
            />
          </div>
            <Label>Acess Token</Label>
            <Input
              type="text"
              value={acesstoken}
              onChange={(e) => setAcessToken(e.target.value)}
              placeholder="Digite o Acess Token"
              required
            />
          </div>
          <div>
            <Label>WaId</Label>
            <Input
              type="text"
              value={waid}
              onChange={(e) => setWaId(e.target.value)}
              placeholder="Digite o WaId"
              required
            />
          </div>
          <div>
            <Label>Telefone</Label>
            <Input
              type="text"
              value={phone}
              onChange={(e) => setPhoneNumber(e.target.value)}
              placeholder="Digite o número de telefone"
              required
            />
          </div>
          <Button type="submit" className="w-full bg-blue-500 text-white">
            Enviar
          </Button>
        </form>
      </Card>
    </div>
  );
}

export default withAuth(SettingsPage);
