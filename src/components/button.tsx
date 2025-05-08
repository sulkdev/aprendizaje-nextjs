"use client";
import React, { forwardRef, useRef } from "react";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  label: string;
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ label,  ...props }, ref) => {
    const internalRef = useRef<HTMLButtonElement>(null);

    return <button ref={ref ?? internalRef} className={`cursor-pointer bg-green-700 text-white py-1 px-3 rounded font-medimum ${props.className}` } {...props}> {label}</button>;
  }
);

Button.displayName = "Button"; // Necesario cuando usamos forwardRef en Next.js para evitar advertencias

export default Button;
