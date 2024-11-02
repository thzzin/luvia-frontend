'use client';
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import axios from 'axios';
import Cookies from 'js-cookie';
//import { useToast } from "@/components/hooks/use-toast"
import { Toaster } from "@/components/ui/toaster"
import { toast } from "sonner" 

const EditContactPopover = ({ contact, onContactUpdated  }) => {
  const [name, setName] = useState(contact.name);
  const [phone, setPhone] = useState(contact.phone_number);
      

  const handleEditContact = async () => {
    try {
      await axios.put('https://getluvia.com.br:3005/user/contato', {
        oldPhone: contact.phone_number, // Passa o número antigo
        nome: name,
        phone: phone, // Novo número
      }, {
        headers: {
          authorization: `${Cookies.get('token')}`,
        },
      });
        
        toast('Contato atualizado com sucesso!', {
          action: {
            label: "Ok",
            onClick: () => console.log("Undo"),
          }
        });
    
      onContactUpdated()
      // Aqui você pode atualizar o estado ou a lista de contatos, se necessário
    } catch (error) {
      console.error('Erro ao editar contato:', error);
      alert('Erro ao atualizar contato.');
    }
  };

  return (
    <div>
<Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">Editar</Button>
      </PopoverTrigger>
      <PopoverContent>
        <div>
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Nome"
          />
          <Input
            className='my-4'
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Telefone"
          />
          <Button onClick={handleEditContact}>Salvar</Button>
        </div>
      </PopoverContent>
    </Popover>
                <Toaster />

    </div>
    
  );
};

export default EditContactPopover;
