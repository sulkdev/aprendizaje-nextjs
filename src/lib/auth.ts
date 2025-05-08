import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "./jwt";
import { parse } from "cookie";

export async function verifyAuth(request: NextRequest) {
  const authHeader = request.cookies.get(process.env.TOKEN_KEY || "tkn")?.value;

  if (!authHeader) {
    return NextResponse.json(
      { message: "No autorizado, falta token" },
      { status: 401 }
    );
  }

  try {
    console.log(authHeader);
    
    const payload = verifyToken(authHeader);
    return payload; // Si todo bien, regresamos el payload (datos del usuario)
  } catch(error) {
    console.error("Error al verificar el token:", error);
    return NextResponse.json(
      { message: "Token inválido o expirado" },
      { status: 401 }
    );
  }
}
