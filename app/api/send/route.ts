import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

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

    // Configuración del transporte de Hostinger
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: true, // true para puerto 465
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    // Envío del email
    await transporter.sendMail({
      from: `"Web Contact" <${process.env.SMTP_USER}>`, // Debe ser tu mail de Hostinger
      to: "contact@lymitsolutions.com",
      replyTo: email, // Permite responderle directo al usuario
      subject: `Nuevo Lead de LYMIT: ${name}`,
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

    return NextResponse.json({ message: "Email enviado con éxito" });
  } catch (error) {
    console.error("Error en Nodemailer:", error);
    return NextResponse.json(
      { error: "Error al enviar el email" },
      { status: 500 },
    );
  }
}
