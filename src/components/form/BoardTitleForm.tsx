"use client";
import { Board } from "@prisma/client";
import React, { ElementRef, useRef, useState } from "react";
import { Button } from "../ui/button";
import FormInput from "./FormInput";
import { useAction } from "@/hooks/use-action";
import { updateBoard } from "@/actions/update-board";
import { toast } from "sonner";
interface BoardTitleFormProps {
  board: Board;
}
const BoardTitleForm = ({ board }: BoardTitleFormProps) => {
  const { execute, fieldErrors } = useAction(updateBoard, {
    onSuccess: (data) => {
      toast.success(`Board "${data.title}" updated!`);
    },
    onError: () => {
      toast.error(`Board "${board.title}" failed to update!`);
    },
  });

  const formRef = useRef<ElementRef<"form">>(null);
  const inputRef = useRef<ElementRef<"input">>(null);

  const [isEditing, setIsEditing] = useState(false);

  const enableEditing = () => {
    setIsEditing(true);
    setTimeout(() => {
      inputRef.current?.focus();
      inputRef.current?.select();
    });
  };

  const disbleEditing = () => {
    if (inputRef.current?.value === board.title) {
      setIsEditing(false);
    } else {
      setIsEditing(false);
      formRef.current?.requestSubmit();
    }
  };

  const onSubmit = (data: FormData) => {
    const title = data.get("title") as string;
    if (title !== board.title) {
      execute({
        id: board.id,
        title,
      });
    }
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <form
        action={onSubmit}
        ref={formRef}
        className="flex items-center gap-x-2 "
      >
        <FormInput
          errors={fieldErrors}
          id="title"
          className="text-lg font-bold px-[7px] py-2 h-8 bg-transparent outline-none focus-visible:ring-transparent focus-visible:outline-none border-white "
          onBlur={() => disbleEditing()}
          defaultValue={board.title}
          ref={inputRef}
        />
      </form>
    );
  }

  return (
    <Button
      variant={"transparent"}
      className="font-bold text-lg w-auto h-auto p-1 px-2"
      onClick={enableEditing}
    >
      {board.title}
    </Button>
  );
};

export default BoardTitleForm;
