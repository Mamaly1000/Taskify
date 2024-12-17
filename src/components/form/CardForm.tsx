"use client";
import React, {
  ElementRef,
  forwardRef,
  useRef,
  KeyboardEventHandler,
} from "react";
import { Button } from "../ui/button";
import { Plus, X } from "lucide-react";
import FormTextArea from "./FormTextArea";
import FormButton from "./FormButton";
import { useParams, useRouter } from "next/navigation";
import { useAction } from "@/hooks/use-action";
import { createCard } from "@/actions/create-card";
import { useEventListener, useOnClickOutside } from "usehooks-ts";
import { toast } from "sonner";

interface props {
  listId: string;
  isEditing: boolean;
  disableEditing: () => void;
  enableEditing: () => void;
}

const CardForm = forwardRef<HTMLTextAreaElement, props>(
  ({ disableEditing, enableEditing, isEditing, listId }, ref) => {
    const params = useParams();
    const router = useRouter();
    const formRef = useRef<ElementRef<"form">>(null);

    const { execute, fieldErrors } = useAction(createCard, {
      onSuccess: (data) => {
        toast.success(`card "${data.title}" created!`);
        formRef.current?.reset();
        disableEditing();
        router.refresh();
      },
      onError: (error) => {
        toast.error(error);
      },
    });

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        disableEditing();
      }
    };

    useOnClickOutside(formRef, disableEditing);
    useEventListener("keydown", onKeyDown);

    const onTextAreaKeyDown: KeyboardEventHandler<HTMLTextAreaElement> = (
      e
    ) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        formRef.current?.requestSubmit();
      }
    };

    const onSubmit = (e: FormData) => {
      const title = e.get("title") as string;
      const boardId = params.boardId as string;

      execute({
        boardId,
        listId,
        title,
      });
    };

    if (isEditing) {
      return (
        <form
          ref={formRef}
          action={onSubmit}
          className="m-1 py-0.5 px-1 space-y-4"
        >
          <FormTextArea
            id="title"
            onKeyDown={onTextAreaKeyDown}
            ref={ref}
            errors={fieldErrors}
            onBlur={disableEditing}
            placeholder="Enter a title for this card..."
          />
          <div className="flex items-center gap-x-1">
            <FormButton>Add card</FormButton>
            <Button variant={"ghost"} size={"sm"} onClick={disableEditing}>
              <X className="h-5 w-5" />
            </Button>
          </div>
        </form>
      );
    }
    return (
      <section className="pt-2 px-2">
        <Button
          className="h-auto px-2 py-1.5 w-full justify-start text-muted-foreground text-sm"
          variant={"ghost"}
          size={"sm"}
          onClick={enableEditing}
        >
          <Plus className="w-4 h-4 mr-2" />
          Add new card
        </Button>
      </section>
    );
  }
);

CardForm.displayName = "CardForm";

export default CardForm;
