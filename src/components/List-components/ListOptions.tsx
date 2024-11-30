"use client";
import React, { ElementRef, useRef } from "react";

import { List_with_Cards } from "@/types";

import {
  PopoverClose,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "../ui/button";
import { MoreHorizontal, X } from "lucide-react";
import FormButton from "../form/FormButton";
import { Separator } from "../ui/separator";
import { useAction } from "@/hooks/use-action";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { deleteList } from "@/actions/delete-list";
import { copyList } from "@/actions/copy-list";

interface ListOptionsProps {
  onAddCard: () => void;
  list: List_with_Cards;
}

const ListOptions = ({ list, onAddCard }: ListOptionsProps) => {
  const closeButtonRef = useRef<ElementRef<"button">>(null);
  const router = useRouter();
  const { execute: OnDeleteExecute, isLoading: isDeletingLoading } = useAction(
    deleteList,
    {
      onSuccess: (data) => {
        toast.success(`List "${data.title}" deleted!`);
        router.refresh();
      },
      onError: (err) => {
        toast.error(err);
      },
      onComplete: () => {
        closeButtonRef.current?.click();
      },
    }
  );
  const { execute: OnCopyExecute, isLoading: isCopyingLoading } = useAction(
    copyList,
    {
      onSuccess: (data) => {
        toast.success(`List "${list.title}" copied!`);
        toast.success(`List "${data.title}" created!`);
        router.refresh();
      },
      onError: (err) => {
        toast.error(err);
      },
      onComplete: () => {
        closeButtonRef.current?.click();
      },
    }
  );
  const isLoading = isDeletingLoading || isCopyingLoading;

  const onDelete = () => {
    OnDeleteExecute({
      id: list.id,
      boardId: list.boardId,
    });
  };
  const onCopy = () => {
    OnCopyExecute({ boardId: list.boardId, id: list.id });
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button className="w-auto h-auto p-2" variant={"ghost"}>
          <MoreHorizontal className="w-4 h-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="px-0 pt-3 pb-3" side="bottom" align="start">
        <div className="text-sm text-neutral-600 pb-4 font-medium text-center">
          List Actions
        </div>
        <PopoverClose asChild>
          <Button
            ref={closeButtonRef}
            className="w-auto h-auto p-2 absolute top-2 right-2 text-neutral-600"
            variant={"ghost"}
            disabled={isLoading}
          >
            <X className="w-4 h-4" />
          </Button>
        </PopoverClose>
        <Button
          className="capitalize rounded-none w-full h-auto p-2 px-5 justify-start font-normal text-sm"
          variant={"ghost"}
          onClick={onAddCard}
          disabled={isLoading}
        >
          add card...
        </Button>
        <form action={onCopy} className="">
          <FormButton
            className="capitalize rounded-none w-full h-auto p-2 px-5 justify-start font-normal text-sm"
            variant={"ghost"}
            disabled={isLoading}
          >
            Copy list...
          </FormButton>
        </form>
        <Separator />
        <form action={onDelete} className="">
          <FormButton
            className="capitalize rounded-none w-full h-auto p-2 px-5 justify-start font-normal text-sm"
            variant={"ghost"}
            disabled={isLoading}
          >
            delete list
          </FormButton>
        </form>
      </PopoverContent>
    </Popover>
  );
};

export default ListOptions;
