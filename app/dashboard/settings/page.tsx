'use client';
import { useState } from 'react'
import withAuth from '../../middlewares/withAuth'; // ajuste o caminho conforme necessário

import Cookies from 'js-cookie';
import axios from 'axios';

function SettingsPage(){
    const [waid, setWaId] = useState('');
    const [acesstoken, setAcessToken] = useState('');
    const [phone, setPhoneNumber] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
    
        try {
          const response = await fetch('http://157.173.107.5/3005/user/tokens', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'authorization': `${Cookies.get('token')}`,
    
            },
            body: JSON.stringify({ waid, acesstoken, phone}, ),
          });
    
          if (response.ok) {
            const data = await response.json();
            console.log('Número enviado com sucesso:', data);
            
          } else {
            console.error('Erro ao enviar o número:', response.statusText);
          }
        } catch (error) {
          console.error('Erro na solicitação:', error);
        }
      };

    return(
        <div>
            <form onSubmit={handleSubmit} className="flex items-center">
          <input
            type="text"
            value={acesstoken}
            onChange={(e) => setAcessToken(e.target.value)}
            placeholder="Digite o Acess Token"
            className="p-2 border rounded mr-4"
            required
          />
          <input
            type="text"
            value={waid}
            onChange={(e) => setWaId(e.target.value)}
            placeholder="Digite o WaId"
            className="p-2 border rounded mr-4"
            required
          />
          <input
            type="text"
            value={phone}
            onChange={(e) => setPhoneNumber(e.target.value)}
            placeholder="Digite o número de telefone"
            className="p-2 border rounded mr-4"
            required
          />
          <button
            type="submit"
            className="bg-blue-500 text-white p-2 rounded"
          >
            Enviar
          </button>
        </form>
        </div>
    )
}

export default withAuth(SettingsPage);

