"use client";
import React from "react";
import { useFormStatus } from "react-dom";
import { Input } from "./input";
import { Button } from "./button";

const FormInput = () => {
  const { pending } = useFormStatus();
  return (
    <div className="flex items-center justify-between space-x-2">
      <Input
        disabled={pending}
        className="p-2 border border-gray-50 capitalize rounded-md shadow-sm outline-none disabled:opacity-50 transition-all checked:border-red-500 focus:border-gray-50 "
        id="title"
        name="title"
        required
        placeholder="enter board title..."
      />
      <Button disabled={pending} type="submit">
        create
      </Button>
    </div>
  );
};

export default FormInput;
