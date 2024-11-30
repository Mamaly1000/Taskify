"use client";
import React, { ReactNode } from "react";
import { useFormStatus } from "react-dom";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";

interface FormButtonProps {
  children?: ReactNode;
  variant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link"
    | "primary"
    | null
    | undefined;
  type?: "button" | "reset" | "submit";
  className?: string;
  disabled?: boolean;
  size?: "default" | "sm" | "lg" | "icon" | null;
}

const FormButton = ({
  children,
  className,
  disabled,
  variant = "primary",
  type = "submit",
  size = "sm",
}: FormButtonProps) => {
  const { pending } = useFormStatus();

  return (
    <Button
      size={size}
      className={cn("", className)}
      variant={variant}
      type={type}
      disabled={disabled || pending}
    >
      {children}
    </Button>
  );
};

export default FormButton;
