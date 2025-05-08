import dbConnect from "@/lib/mongodb";
import User from "@/models/User";
import { NextResponse } from "next/server";

const IP_PERMITIDA = process.env.IP_PERMITIDA || "localhost";

export async function POST(request: Request) {
  const forwarded = request.headers.get("x-forwarded-for");
  const ip = forwarded?.split(",")[0]?.trim() || "IP_DESCONOCIDA";

  if (ip !== IP_PERMITIDA) {
    return NextResponse.json({path: "Not found"}, { status: 404 });
  }

  const body = await request.json();
  const { user, password, name } = body;

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
    const user_data = await User.create({ user, password, name });

    if (!user_data) {
      return NextResponse.json(
        { message: "Error al crear el usuario" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      message: "RegistroF exitoso",
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Error en el servidor" },
      { status: 500 }
    );
  }
}
