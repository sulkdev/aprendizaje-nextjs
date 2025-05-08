"use client";
import AgregarRegistro from "@/section/agregarregsitro";
import Consultadatos from "@/section/consultadatos";
import { useState } from "react";

export default function Page() {
  const [mostrarAgr, setAgr] = useState(false);

  return (
    <div>
      <h1 className="text-3xl text-green-800 font-bold pb-4">
        Panel de consultas
      </h1>
      <div className="flex justify-between bg-[#f3f2f2] p-1.5 rounded mb-6">
        <div
          className={
            !mostrarAgr
              ? "bg-green-600 flex-1 text-center p-2 font-semibold text-sm rounded text-white cursor-pointer"
              : " flex-1 text-center p-2 font-semibold text-sm text-black/40 cursor-pointer"
          }
          onClick={() => {
            if (mostrarAgr) {
              setAgr(false);
            }
          }}
        >
          Consulta de Datos
        </div>
        <div
          className={
            mostrarAgr
              ? "bg-green-600 flex-1 text-center p-2 font-semibold text-sm rounded text-white cursor-pointer"
              : " flex-1 text-center p-2 font-semibold text-sm text-black/40 cursor-pointer"
          }
          onClick={() => {
            if (!mostrarAgr) {
              setAgr(true);
            }
          }}
        >
          Agregar Registro
        </div>
      </div>
      {/* CONSULTA DATOS */}
      {!mostrarAgr && <Consultadatos />}
      {/* AGREGAR REGISTRO */}
      {mostrarAgr && <AgregarRegistro />}   
    </div>
  );
}
