import { NextResponse } from "next/server";

export async function POST(req: Request) {
  // MODO SEGURO:
  // Como el frontend está en modo simulación, esta ruta no se llama.
  // Pero si se llegara a llamar, respondemos "OK" sin intentar enviar emails.

  return NextResponse.json(
    { message: "Endpoint desactivado temporalmente." },
    { status: 200 }
  );
}
