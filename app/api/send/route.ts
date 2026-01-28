import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, message } = body;

    // Validación básica
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Faltan campos obligatorios" },
        { status: 400 },
      );
    }

    // Envío del email
    const data = await resend.emails.send({
      from: "Web Contact <onboarding@resend.dev>", // Usa este remitente temporalmente
      to: ["contact@lymitsolutions.com"], // <--- ¡PON TU EMAIL REAL AQUÍ!
      subject: `Nuevo Lead de LYMIT: ${name}`,
      replyTo: email, // Para responderle directo al usuario
      html: `
        <div style="font-family: sans-serif; padding: 20px; border: 1px solid #e0e0e0; border-radius: 10px;">
          <h2 style="color: #000;">Nuevo Mensaje de la Web</h2>
          <p><strong>Nombre:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <hr style="border: 0; border-top: 1px solid #eaeaea; margin: 20px 0;">
          <p><strong>Mensaje:</strong></p>
          <p style="background-color: #f5f5f7; padding: 15px; border-radius: 5px; color: #333;">${message}</p>
        </div>
      `,
    });

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
