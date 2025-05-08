import Button from "@/components/button";
import Input from "@/components/input";
import { useRef, useState } from "react";

export default function AgregarRegistro() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const formRef = useRef<HTMLFormElement>(null);

  return (
    <div className="bg-white p-10 rounded-xl border border-gray-200">
      <form
        ref={formRef}
        className="flex flex-col gap-4 justify-center"
        onSubmit={async (e) => {
          e.preventDefault();

          if (loading) return;
          setLoading(true);
          setMessage("");

          const formData = new FormData(e.currentTarget);
          const identificador = (
            formData.get("identificador") as string
          ).toUpperCase();
          const observaciones = formData.get("observaciones") as string;

          if (!identificador) {
            alert("El identificador es requerido");
            setLoading(false);
            return;
          }

          const esIdentificadorValido = (id: string) => {
            const regex =
              /^(?:(\d{8}[A-HJ-NP-TV-Z])|([XYZ]\d{7}[A-HJ-NP-TV-Z])|([A-HJ-NP-SUVW]\d{7}[0-9A-J]))$/i;
            return regex.test(id);
          };

          if (!esIdentificadorValido(identificador)) {
            alert("El identificador no tiene el formato correcto");
            setLoading(false);
            return;
          }

          const resp = await fetch(`/api/check`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ id: identificador, observaciones }),
          });

          setLoading(false);

          if (resp.ok) {
            setMessage("Registro añadido correctamente");

            // Limpiar el formulario después de un registro exitoso
            formRef.current?.reset();
            return;
          } else {
            const data = await resp.json();
            alert(
              data.message ||
                "Error al registrar, inténtelo de nuevo o más tarde, por favor."
            );
            return;
          }
        }}
      >
        <Input
          label="Introduzca el identificador"
          className="w-[200px]"
          name="identificador"
          defaultValue={""}
        />
        <Input
          label="Observaciones (Opcional)"
          name="observaciones"
          defaultValue={""}
        />
        <Button label={loading ? "Registrando..." : "Registrar"} />
      </form>
      {message && (
        <div className="text-green-500 text-center mt-4">{message}</div>
      )}
    </div>
  );
}
