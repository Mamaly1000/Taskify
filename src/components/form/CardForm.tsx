"use client";
import React, { forwardRef } from "react";
import { Button } from "../ui/button";
import { Plus, X } from "lucide-react";
import FormTextArea from "./FormTextArea";
import FormButton from "./FormButton";

interface props {
  listId: string;
  isEditing: boolean;
  disableEditing: () => void;
  enableEditing: () => void;
}

const CardForm = forwardRef<HTMLTextAreaElement, props>(
  ({ disableEditing, enableEditing, isEditing, listId }, ref) => {
    if (isEditing) {
      return (
        <form className="m-1 py-0.5 px-1 space-y-4">
          <FormTextArea
            id="title"
            onKeyDown={() => {}}
            ref={ref}
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
