"use client"; 
import React from "react";
import Error from "../ui/Error";

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
        <Error error={error} key={error} />
      ))}
    </div>
  );
};

export default FormErrors;
