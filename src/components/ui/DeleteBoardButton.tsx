"use client";
import React from "react";
import { Button } from "./button";
import { useFormStatus } from "react-dom";

const DeleteBoardButton = () => {
  const { pending } = useFormStatus();
  return (
    <Button
      disabled={pending}
      type="submit"
      size={"sm"}
      variant={"destructive"}
    >
      delete
    </Button>
  );
};

export default DeleteBoardButton;
