import dbConnect from "@/lib/mongodb";
import User from "@/models/User";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { signToken } from "@/lib/jwt";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { user, password } = body;

  // Comprobamos si el user y la contraseña están presentes
  if (!user || !password) {
    return NextResponse.json(
      { message: "Usuario y contraseña son requeridos" },
      { status: 400 }
    );
  }

  try {
    // Conectar a la base de datos
    await dbConnect();

    // Buscar usuario por email
    const user_data = await User.findOne({ user });

    // Comparar contraseñas
    const passwordMatch = await bcrypt.compare(password, user_data.password);
    if (!passwordMatch) {
      return NextResponse.json(
        { message: "Usuario y/o Contraseña incorrecta" },
        { status: 401 }
      );
    }

    // Crear token JWT
    const token = await signToken({
      id: user_data._id,
    });

    // Usuario autenticado correctamente
    const response = NextResponse.json({
      message: "Login exitoso",
      token: token,
    });

    response.cookies.set(process.env.TOKEN_KEY || 'tkn', token, {
      httpOnly: true,
      path: "/",
      maxAge: 60 * 60 * 24 * 1, // 1 días
    });

    return response;
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Error en el servidor" },
      { status: 500 }
    );
  }
}
