// app/middlewares/withAuth.js

import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';
import api from '@/lib/utils/api';

const withAuth = (WrappedComponent) => {
  const WithAuthComponent = (props) => {

    const verifyToken = async () => {
      const token = Cookies.get('token');
      if (!token) {
        window.location.href = '/auth/login';
        return;
      }

      try {
        const response = await api.post('/verify', { token });
        if (!response.data.valid) {
          console.log('Token inválido');
          window.location.href = '/auth/login';
          return;
        } else {
          startHeartbeats(); // Iniciar os batimentos cardíacos
        }
      } catch (error) {
        console.error('Erro ao verificar o token:', error);
        window.location.href = '/auth/login';
        return;
      }
    };

    const startHeartbeats = async () => {
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Aguarde 1 segundo

      const heartbeatInterval = setInterval(async () => {
        try {
          await api.post('/heartbeat', { token: Cookies.get('token') });
        } catch (error) {
          console.error('Erro no batimento cardíaco:', error);
          window.location.href = '/auth/login';
          clearInterval(heartbeatInterval);
        }
      }, 7200000); // 5 minutos em milissegundos

      // Limpar intervalo e remover token do cookie ao desmontar
      return () => {
        clearInterval(heartbeatInterval);
        Cookies.remove('token');
      };
    };

    verifyToken(); // Verificar o token imediatamente

    return <WrappedComponent {...props} />;
  };

  return WithAuthComponent;
};

export default withAuth;