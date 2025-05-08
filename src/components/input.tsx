"use client";
import React, { forwardRef, useRef, useId } from "react";

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
};

const Input = forwardRef<HTMLInputElement, InputProps>(({ label, id, className, ...props }, ref) => {
  const internalRef = useRef<HTMLInputElement>(null);
  const generatedId = useId(); // genera un ID único por componente
  const inputId = id ?? generatedId;

  return (
    <div className={`flex flex-col gap-1 ${className}`}>
      {label && <label className="text-green-700 font-semibold text-sm tracking-wide" htmlFor={inputId}>{label}</label>}
      <input className="border border-green-500 p-1 rounded text-black" ref={ref ?? internalRef} id={inputId} {...props} />
    </div>
  );
});

Input.displayName = "Input"; // Necesario cuando usamos forwardRef en Next.js para evitar advertencias

export default Input;
