import { NextResponse, NextRequest } from "next/server";
import twilio from "twilio";

export async function POST(request: NextRequest) {
  const accountSid = process.env.TWILIO_ACCOUNT_SID;
  const authToken = process.env.TWILIO_AUTH_TOKEN;
  const twilioPhoneNumber = process.env.TWILIO_PHONE_NUMBER;
  const recipientPhoneNumber = process.env.TWILIO_RECIPIENT_PHONE;
  
  if (!accountSid || !authToken || !twilioPhoneNumber) {
    return NextResponse.json(
      { error: "Configurações da Twilio não encontradas" },
      { status: 500 }
    );
  }

  try {
    // coleta os dados da requisição
    const data = await request.json();

    const whatsappMessage = `
*Pedido de Bolo*
👤 *Nome:* ${data.name}
📧 *E-mail:* ${data.email}
📱 *Telefone:* ${data.phone}

🍰 *Detalhes do Bolo*
- Tamanho: ${data.cakeSize}
- Sabor: ${data.cakeFlavor}
- Modelo: ${data.cakeModel}

📅 *Entrega*
- Data: ${data.deliveryDate}
- Horário: ${data.deliveryTime}

${
  data.wantSweets
    ? `
🍬 *Doces*
- Tipo: ${data.sweetType}
- Sabores: ${data.sweetFlavors?.join(", ")}
- Quantidade: ${data.sweetQuantity}
`
    : "🚫 Sem doces"
}

💰 *Valor Total Docinhos:* R$ ${data.totalPrice}
    `.trim();

    const client = twilio(accountSid, authToken);
    
    const message = await client.messages.create({
      body: whatsappMessage,
      from: `whatsapp:${twilioPhoneNumber}`,
      to: `whatsapp:${recipientPhoneNumber}`,
    });
    
    return NextResponse.json({
      message: "Mensagem enviada com sucesso!",
      sid: message.sid,
    });
  } catch (error) {
    console.error("Erro ao enviar mensagem 2:", error);
    return NextResponse.json(
      {
        message: `Erro ao enviar mensagem 1: ${error} ${recipientPhoneNumber}`,
        error: error instanceof Error ? error.message : "Erro desconhecido",
      },
      { status: 500 }
    );
  }
}
