"use client";
import Input from "@/components/input";
import { useState } from "react";

export default function Home() {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-green-50 to-green-100 p-4">
      <div className="w-full max-w-md">
        <div className="bg-white shadow-md rounded-lg p-6">
          <div>
            <h1 className="text-2xl font-bold text-center text-green-800 mb-0.5">
              AgroCheck
            </h1>
            <p className="text-black/40 text-center mb-4 text-sm">
              Ingresa tus credenciales para acceder al sistema
            </p>
          </div>
          {error && (
            <p className="text-red-500 text-sm text-center mt-2">{error}</p>
          )}
          <form
            className="flex flex-col gap-4"
            onSubmit={async (e) => {
              if (loading) return;
              e.preventDefault();
              setLoading(true);
              setError("");

              const response = await fetch("/api/login", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({ user, password }),
              });

              const data = await response.json();

              if (response.ok) {
                // Redirigir al dashboard o a la página deseada
                window.location.href = "/dashboard";
              } else {
                setError(data.message); // Muestra el mensaje de error si la autenticación falla
              }
              setLoading(false);
            }}
          >
            <Input
              label="Usuario"
              onChange={(e) => {
                setUser(e.target.value);
              }}
            />
            <Input
              label="Contraseña"
              type="password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
            <button
              className="bg-green-600 p-2.5 rounded font-semibold tracking-wide text-sm"
              disabled={loading}
            >
              {loading ? (
                <svg
                  className="animate-spin h-5 w-5 text-white mx-auto"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="currentColor"
                    d="M12 2a10 10 0 1 0 10 10A10.011 10.011 0 0 0 12 2Zm0 18a8 8 0 1 1 8-8A8.009 8.009 0 0 1 12 20Z"
                  />
                </svg>
              ) : (
                "Iniciar sesión"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
