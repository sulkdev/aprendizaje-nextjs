import { JWTPayload, jwtVerify, SignJWT  } from "jose";

const JWT_SECRET = process.env.SIGNING_KEY || "TOKEN_SECRET";

if (!JWT_SECRET) {
  throw new Error("JWT_SECRET no está definido en las variables de entorno");
}


export async function signToken(payload: JWTPayload) {
  const secret = new TextEncoder().encode(JWT_SECRET);

  const jwt = await new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })  // Algoritmo de firma
    .setExpirationTime('1d')  // Establece la expiración a 1 día
    .sign(secret);  // Firma el token con el secreto

  return jwt;
}

export async function verifyToken(token: string) {
  try {
    const { payload } = await jwtVerify(
      token,
      new TextEncoder().encode(JWT_SECRET)
    );
    return payload;
  } catch  {
    throw new Error("Token inválido o expirado");
  }
}
