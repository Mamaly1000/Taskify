"use client";
import { cn } from "@/lib/utils";
import React, { forwardRef } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import FormErrors from "./FormErrors";
import { useFormStatus } from "react-dom";

interface FormInputProps {
  id: string;
  label?: string;
  type?: React.HTMLInputTypeAttribute;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  errors: Record<string, string[] | undefined>;
  className?: string;
  defaultValue?: string;
  onBlur?: () => void;
}
const FormInput = forwardRef<HTMLInputElement, FormInputProps>(
  (
    {
      id,
      label,
      type,
      placeholder,
      required,
      disabled,
      errors,
      className,
      defaultValue,
      onBlur,
    },
    ref
  ) => {
    const { pending } = useFormStatus();
    return (
      <div className="space-y-2">
        <div className="space-y-2">
          {label ? (
            <Label
              htmlFor={id}
              className="text-xs font-semibold text-neutral-700 capitalize"
            >
              {label}
            </Label>
          ) : null}
          <Input
            className={cn("text-sm px-2 py-1 h-7", className)}
            ref={ref}
            onBlur={onBlur}
            defaultValue={defaultValue}
            name={id}
            id={id}
            placeholder={placeholder}
            type={type}
            disabled={disabled || pending}
            required={required}
            aria-describedby={`${id}-error`}
          />
        </div>
        <FormErrors errors={errors} id={id} />
      </div>
    );
  }
);
FormInput.displayName = "FormInput";
export default FormInput;
