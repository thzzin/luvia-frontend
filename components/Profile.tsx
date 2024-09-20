'use client'

import { ModeToggle } from "./ModeToggle";
import UserItem from "./UserItem";
import { ProfileAvatar } from "./ProfileAvatar";
import { useState, useEffect } from 'react';

import axios from 'axios'
import Cookies from 'js-cookie';

export default function Profile() {
    const [username, setUsername] = useState('')

    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await axios.get(
              'http://157.173.107.5/3005/user/info',
              {
                headers: {
                    authorization: `${Cookies.get('token')}`,
                },
              }
            );
    
            const res = response.data;
            const username = res.pageInfo.name
            setUsername(username);
          } catch (error) {
            console.error('Erro ao obter usuario:');
          }
        };
    
        fetchData();
      }, []);
    return (
        <div className="w-full flex items-center justify-center mb-4 pb-4  border-b">
                        <ProfileAvatar />
        </div>
    )
}
