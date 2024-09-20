'use client';
import withAuth from './middlewares/withAuth';
import Chats from '@/app/components/home/graficos/chats';
import FinallyTotal from '@/app/components/home/graficos/finallyTotal';
import NewsTotal from '@/app/components/home/graficos/newschats';
import ChartChats from '@/app/components/home/graficos/newschatsgraph';
import Rate from '@/app/components/home/graficos/stars';
import NewsClientes from '@/app/components/home/graficos/newsClientes';
import Clients from '@/app/components/home/graficos/clients';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

function HomeComponent() {
  return (
    <div className="">
    <Card className='flex p-4 justify-around mx-4 mb-4'>
      <FinallyTotal />
      <NewsTotal />
      <Rate />
      <NewsClientes />
      </Card>
    <div className='flex'> {/* Ajustando para um layout flexível */}
      <div className="flex-[7] p-4"> {/* 80% para o componente Chats */}
        <Chats />
      </div>
      <div className="flex-[3] p-4"> {/* 20% para o componente ChartChats */}
        <ChartChats />
      </div>
    </div>
    <Clients />
  </div>
  );
}

export default withAuth(HomeComponent);
