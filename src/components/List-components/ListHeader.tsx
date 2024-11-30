"use client";
import { useAction } from "@/hooks/use-action";
import { useParams, useRouter } from "next/navigation";
import React, { ElementRef, useRef, useState } from "react";
import { toast } from "sonner";
import { useEventListener, useOnClickOutside } from "usehooks-ts";
import FormInput from "../form/FormInput";
import { updateList } from "@/actions/update-list";
import ListOptions from "./ListOptions";
import { List_with_Cards } from "@/types";

interface ListHeaderProps {
  list: List_with_Cards;
  onAddCard: () => void;
}

const ListHeader = ({ list, onAddCard }: ListHeaderProps) => {
  const formRef = useRef<ElementRef<"form">>(null);
  const inputRef = useRef<ElementRef<"input">>(null);

  const [title, setTitle] = useState(list.title);
  const [isEditing, setIsEditing] = useState(false);

  const params = useParams();
  const router = useRouter();

  const { isLoading, execute, fieldErrors } = useAction(updateList, {
    onSuccess: (data) => {
      toast.success(`List "${data.title}" Updated!`);
      disableEditing();
      router.refresh();
    },
    onError: (error) => {
      setTitle(list.title);
      toast.error(error);
    },
  });

  const enableEditing = () => {
    setIsEditing(true);
    setTimeout(() => {
      inputRef.current?.focus();
      inputRef.current?.select();
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
    if (title !== list.title) {
      setTitle(title);
      execute({
        id: list.id,
        title,
        boardId: params.boardId as string,
      });
    } else {
      disableEditing();
    }
  };
  return (
    <div className="px-2 pt-2 font-semibold text-sm flex justify-between items-start gap-x-2">
      {isEditing ? (
        <form ref={formRef} className="flex-1 px-[2px]" action={onSubmit}>
          <FormInput
            id="title"
            disabled={isLoading}
            errors={fieldErrors}
            ref={inputRef}
            onBlur={() => {
              if (!isLoading) {
                formRef.current?.requestSubmit();
              }
            }}
            placeholder="Enter List Title..."
            defaultValue={title}
            className="text-sm px-[7px] py-1 h-7 font-medium border-transparent hover:border-input focus:border-input transition truncate bg-transparent focus:bg-white w-full"
          />
        </form>
      ) : (
        <div
          className="w-full text-sm px-2.5 py-1 h-7 font-medium border-transparent cursor-pointer"
          onClick={enableEditing}
        >
          {list.title}
        </div>
      )}
      <ListOptions list={list} onAddCard={onAddCard} />
    </div>
  );
};

export default ListHeader;
