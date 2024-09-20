'use client'

import Cookies from 'js-cookie';
import axios from 'axios';
import { useEffect } from 'react';


const LogoutPage = () => {

  useEffect(() => {
    const handleLogout = async () => {
        console.log('caiu no logout')
      try {
        const token = Cookies.get('token');

        if (token) {
          await axios.post('http://localhost.com:3005/auth/logout', {token},{
            headers: {
              Authorization: `Bearer ${Cookies.get('token')}`,
            },
          }); 
        }

        Cookies.remove('token'); 
        window.location.href = '/auth/login';       
      } catch (error) {
        Cookies.remove('token'); 
        window.location.href = '/auth/login';
      }
    };

    handleLogout();
  }, []);

  return null;
};

export default LogoutPage;