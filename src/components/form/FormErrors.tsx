"use client";
import { XCircle } from "lucide-react";
import React from "react";

interface FormErrorsProps {
  id: string;
  errors?: Record<string, string[] | undefined>;
}

const FormErrors = ({ errors, id }: FormErrorsProps) => {
  if (!errors) {
    return null;
  }
  return (
    <div
      className="mt-2 text-xs text-rose-500"
      aria-live="polite"
      id={`${id}-error`}
    >
      {errors?.[id]?.map((error: string) => (
        <div
          key={error}
          className="flex items-center justify-start capitalize gap-2 font-medium p-2 border border-rose-500 bg-rose-500/10 rounded-sm"
        >
          <XCircle className="w-4 h-4" /> {error}
        </div>
      ))}
    </div>
  );
};

export default FormErrors;
