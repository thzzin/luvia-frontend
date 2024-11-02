// pages/politica-de-privacidade.js
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';


export default function PoliticaDePrivacidade() {
  return (
    <Card className="py-8">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold">
            Política de Privacidade - WhatsApp Meta
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
        
            <p>
              Bem-vindo à nossa Política de Privacidade. Sua privacidade é
              extremamente importante para nós e temos o compromisso de
              protegê-la. Esta Política de Privacidade descreve como coletamos,
              usamos, compartilhamos e protegemos as suas informações no
              contexto do uso do WhatsApp, de propriedade da Meta Platforms, Inc.
            </p>
       

          <h4 >1. Informações que Coletamos</h4>
      
            <p>
              Ao usar o WhatsApp, coletamos diferentes tipos de informações,
              incluindo:
            </p>
            <ul className="list-disc ml-6 space-y-2">
              <li>Informações de contato, como nome e número de telefone.</li>
              <li>Dados de uso e navegação dentro do aplicativo.</li>
              <li>Localização, caso seja permitida por você.</li>
              <li>Mensagens enviadas e recebidas.</li>
            </ul>
     

          <h4 >2. Como Usamos Suas Informações</h4>
            <p>
              Utilizamos as informações coletadas para fornecer nossos serviços,
              personalizar sua experiência e melhorar o desempenho do
              aplicativo. Isso inclui:
            </p>
            <ul className="list-disc ml-6 space-y-2">
              <li>Fornecer suporte técnico e atender às suas solicitações.</li>
              <li>Personalizar a experiência do usuário com base nas interações.</li>
              <li>Analisar o comportamento do usuário para aprimorar nossos serviços.</li>
            </ul>

          <h4 >3. Compartilhamento de Informações</h4>
       
            <p>
              Nós compartilhamos suas informações apenas com terceiros em
              circunstâncias limitadas, como:
            </p>
            <ul className="list-disc ml-6 space-y-2">
              <li>Com parceiros de serviço que auxiliam na operação do WhatsApp.</li>
              <li>Quando exigido por lei ou para proteger nossos direitos.</li>
              <li>Com o seu consentimento explícito para outros compartilhamentos.</li>
            </ul>
        

          <h4 >4. Segurança dos Dados</h4>
          
            <p>
              Adotamos medidas de segurança apropriadas para proteger suas
              informações contra acesso não autorizado, alteração ou destruição.
            </p>
            <p>
              No entanto, apesar dos nossos esforços, nenhuma medida de
              segurança é completamente impenetrável.
            </p>
        

          <h4 >5. Seus Direitos</h4>
            <p>
              Você tem o direito de acessar, corrigir ou excluir suas
              informações pessoais. Caso queira exercer qualquer um desses
              direitos, entre em contato conosco por meio do suporte do WhatsApp.
            </p>

          <h4 >6. Alterações nesta Política</h4>
            <p>
              Esta política pode ser atualizada de tempos em tempos. Notificaremos
              você sobre qualquer mudança significativa por meio de um aviso no
              WhatsApp ou outros meios apropriados.
            </p>
        </CardContent>
      </Card>
    </Card>
  );
}
