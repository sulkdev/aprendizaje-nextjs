/* src/app/api/check/route.ts */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { verifyAuth } from "@/lib/auth";
import dbConnect from "@/lib/mongodb";
import Check from "@/models/Check";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const auth = await verifyAuth(request);

  // Si verifyAuth devuelve un NextResponse → hubo error → regresamos directamente
  if (auth instanceof NextResponse) {
    return auth;
  }

  const body = await request.json();
  const { id, observaciones } = body;

  // Comprobamos si el ID y las observaciones están presentes
  if (!id) {
    return NextResponse.json(
      { message: "El identificador es requerido" },
      { status: 400 }
    );
  }

  // Aquí puedes realizar la lógica para verificar el ID en la base de datos
  // y devolver una respuesta adecuada.
  try {
    // Conectar a la base de datos
    await dbConnect();

    // Buscar usuario por email
    const user_data = await Check.create({ identificador: id, observaciones });

    if (!user_data) {
      return NextResponse.json(
        { message: "Error al crear el registro, inténtelo más tarde" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      message: "registro exitoso",
    });
  } catch (error: any) {
    console.error(error);
    if (error.code === 11000) {
      return NextResponse.json(
        { message: "El identificador ya existe" },
        { status: 409 }
      );
    }
    return NextResponse.json(
      { message: "Error en el servidor" },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  const auth = await verifyAuth(request);

  // Si verifyAuth devuelve un NextResponse → hubo error → regresamos directamente
  if (auth instanceof NextResponse) {
    return auth;
  }

  // Obtener los datos de la base de datos a partir de un identificador haciendo un GET
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  // Comprobamos si el ID está presente
  if (!id) {
    return NextResponse.json(
      { message: "El identificador es requerido" },
      { status: 400 }
    );
  }
  // Aquí puedes realizar la lógica para verificar el ID en la base de datos
  // y devolver una respuesta adecuada.
  try {
    // Conectar a la base de datos
    await dbConnect();

    // Buscar usuario por email
    const check_data = await Check.findOne({ identificador: id });
    if (!check_data) {
      return NextResponse.json(
        { message: "Error al buscar el check" },
        { status: 404 }
      );
    }
    return NextResponse.json({
      message: "Check encontrado",
      data: check_data,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Error en el servidor" },
      { status: 500 }
    );
  }
}
