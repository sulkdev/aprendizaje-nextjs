"use client";

export default function DelSession() {
  return (
    <div
      className="text-red-400"
      onClick={async () => {
        await fetch("/api/protected", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        window.location.href = "/"; // Redirigir a la página de inicio o login
      }}
    >
      Cerrar sesión
    </div>
  );
}
