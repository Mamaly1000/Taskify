"use client";
import React, { forwardRef, KeyboardEventHandler } from "react";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { cn } from "@/lib/utils";
import FormErrors from "./FormErrors";
import { useFormStatus } from "react-dom";

interface FormTextAreaProps {
  id: string;
  label?: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  errors?: Record<string, string[] | undefined>;
  className?: string;
  onBlur?: () => void;
  onClick?: () => void;
  onKeyDown?: KeyboardEventHandler<HTMLTextAreaElement>;
  defaultValue?: string;
}

const FormTextArea = forwardRef<HTMLTextAreaElement, FormTextAreaProps>(
  (
    {
      id,
      className,
      defaultValue,
      disabled,
      errors,
      label,
      onBlur,
      onClick,
      onKeyDown,
      placeholder,
      required,
    },
    ref
  ) => {
    const { pending } = useFormStatus();

    return (
      <div className="space-y-2 w-full">
        <div className="space-y-1 w-full">
          {label ? (
            <Label
              htmlFor={id}
              className="text-xs font-semibold text-neutral-700"
            >
              {label}
            </Label>
          ) : null}
          <Textarea
            onKeyDown={onKeyDown}
            onBlur={onBlur}
            onClick={onClick}
            ref={ref}
            required={required}
            disabled={pending || disabled}
            name={id}
            id={id}
            placeholder={placeholder}
            className={cn(
              "resize-none focus-visible:ring-offset-0 focus-visible:ring-0 ring-0 focus:ring-0 outline-none shadow-sm",
              className
            )}
            defaultValue={defaultValue}
            aria-describedby={`${id}-error`}
          />
        </div>
        <FormErrors errors={errors} id={id} />
      </div>
    );
  }
);

FormTextArea.displayName = "FormTextArea";

export default FormTextArea;
