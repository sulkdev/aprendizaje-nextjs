"use client";
import Button from "@/components/button";
import Input from "@/components/input";
import { GetServerSideProps } from "next";
import { useState } from "react";

export default function Consultadatos() {
  const [data, setData] = useState<{
    existe: string;
    observaciones?: string;
    fecha?: Date;
  } | null>(null);

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  return (
    <div className="bg-white p-10 rounded-xl border border-gray-200">
      <form
        className="flex items-end gap-4 justify-center"
        onSubmit={async (e) => {
          e.preventDefault();
          if (loading) return;
          setLoading(true);
          setError("");
          const formData = new FormData(e.currentTarget);
          const identificador = formData.get("identificador") as string;

          if (!identificador) {
            setError("El identificador es requerido");
            setLoading(false);
            return;
          }

          const esIdentificadorValido = (id: string) => {
            const regex =
              /^(?:(\d{8}[A-HJ-NP-TV-Z])|([XYZ]\d{7}[A-HJ-NP-TV-Z])|([A-HJ-NP-SUVW]\d{7}[0-9A-J]))$/i;
            return regex.test(id);
          };

          // Comprobar si el identificador tiene el formato correcto
          // (8 dígitos + letra, o X + 7 dígitos + letra, o letra + 7 dígitos + letra)
          if (!esIdentificadorValido(identificador)) {
            setError("El identificador no tiene el formato correcto");
            setLoading(false);
            return;
          }

          const res = await fetch(
            `/api/check?id=${identificador.toUpperCase()}`
          );

          setLoading(false);

          if (res.status === 404) {
            setData({ existe: "No" });
            return;
          }
          if (!res.ok) {
            setError(
              "Error al consultar el identificador, inténtelo de nuevo o más tarde, por favor."
            );
            setData(null);
            return;
          }

          const data = await res.json();
          console.log(data);

          setData({
            existe: "Si",
            observaciones: data.data.observaciones,
            fecha: data.data.createdAt,
          });
        }}
      >
        <Input label="Introduzca el identificador" name="identificador" />
        <Button label={loading ? "Consultando..." : "Consultar"} />
      </form>
      {error && (
        <p className="text-red-500 text-sm text-center mt-2">{error}</p>
      )}

      {data && (
        <div>
          <div className="w-full h-[1px] bg-black/10 my-5"></div>
          <div>
            <span className="font-semibold text-green-700">Existe: </span>{" "}
            {data.existe}
          </div>
          {(data.observaciones || data.existe == "Si") && (
            <div>
              <span className="font-semibold text-green-700">
                Observaciones:{" "}
              </span>
              {data.observaciones || "No hay observaciones"}
            </div>
          )}
          {data.fecha && (
            <div>
              <span className="font-semibold text-green-700">
                Fecha de registro:{" "}
              </span>
              {data.fecha
                ? new Date(data.fecha).toLocaleDateString("es-ES", {
                    year: "numeric",
                    month: "2-digit",
                    day: "2-digit",
                  })
                : "No hay fecha de registro"}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const identificador = context.query.identificador || "";

  try {
    // Llamar a tu API desde el servidor
    const res = await fetch(
      `http://localhost:3000/api/consultar?identificador=${identificador}`
    );
    const data = await res.json();

    return {
      props: {
        data: data || null,
      },
    };
  } catch (error) {
    return {
      props: {
        data: null,
      },
    };
  }
};
