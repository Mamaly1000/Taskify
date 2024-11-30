"use client";
import React, { ElementRef, useRef, useState } from "react";
import ListWrapper from "../List-components/ListWrapper";
import { Plus, X } from "lucide-react";
import { useEventListener, useOnClickOutside } from "usehooks-ts";
import FormInput from "./FormInput";
import { useParams, useRouter } from "next/navigation";
import FormButton from "./FormButton";
import { Button } from "../ui/button";
import { useAction } from "@/hooks/use-action";
import { createList } from "@/actions/create-list";
import { toast } from "sonner";

const ListForm = () => {
  const params = useParams();
  const router = useRouter();

  const { isLoading, execute, fieldErrors } = useAction(createList, {
    onSuccess: (data) => {
      toast.success(`List "${data.title}" created!`);
      disableEditing();
      router.refresh();
    },
    onError: (error) => toast.error(error),
  });

  const formRef = useRef<ElementRef<"form">>(null);
  const inputRef = useRef<ElementRef<"input">>(null);

  const [isEditing, setIsEditing] = useState(false);

  const enableEditing = () => {
    setIsEditing(true);
    setTimeout(() => {
      inputRef.current?.focus();
    });
  };
  const disableEditing = () => {
    if (!isLoading) setIsEditing(false);
  };

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Escape" && !isLoading) {
      disableEditing();
    }
  };

  useEventListener("keydown", onKeyDown);
  useOnClickOutside(formRef, disableEditing);

  const onSubmit = (data: FormData) => {
    const title = data.get("title") as string;
    execute({
      id: params.boardId as string,
      title,
    });
  };

  if (isEditing) {
    return (
      <ListWrapper>
        <form
          ref={formRef}
          action={onSubmit}
          className="w-full p-3 rounded-md bg-white space-y-4 shadow-md"
        >
          <FormInput
            errors={fieldErrors}
            ref={inputRef}
            id="title"
            disabled={isLoading}
            className="text-sm px-2 py-1 h-7 font-medium border-transparent hover:border-input focus:border-input transition"
          />
          <div className="flex items-center gap-x-1">
            <FormButton disabled={isLoading}>Add List</FormButton>
            <Button
              disabled={isLoading}
              onClick={(e) => {
                e.preventDefault();
                disableEditing();
              }}
              variant={"destructive"}
              size={"sm"}
              className="w-fit"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        </form>
      </ListWrapper>
    );
  }
  return (
    <ListWrapper>
      <button
        onClick={enableEditing}
        className="capitalize w-full rounded-md transition-all text-sm bg-white/80 hover:bg-white/50 p-3 flex items-center font-medium"
      >
        <Plus className="w-4 h-4 mr-2" />
        add a list
      </button>
    </ListWrapper>
  );
};

export default ListForm;
