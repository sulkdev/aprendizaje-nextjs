// middleware.ts
import { NextRequest, NextResponse } from "next/server";
import { verifyAuth } from "./lib/auth";

export async function middleware(request: NextRequest) {
  console.log("[Middleware] Ruta:", request.nextUrl.pathname); // debug

  // Verifica si el token es válido llamando a la función `verifyAuth`
  const authResponse = await verifyAuth(request);

  // Si el token no es válido o no está presente, redirige o responde con 401
  if (authResponse instanceof NextResponse) {
    // return authResponse
    return NextResponse.redirect(new URL("/", request.url));
  }
  // Si el token es válido, continuar con la solicitud
  return NextResponse.next();
}

// 👇 Importante: configura el matcher para aplicar solo a rutas del frontend
export const config = {
  // runtime: 'nodejs', 
  matcher: ["/dashboard/:path*"],
};
