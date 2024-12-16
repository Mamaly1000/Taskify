"use client";
import { updateCard } from "@/actions/update-card";
import FormButton from "@/components/form/FormButton";
import FormTextArea from "@/components/form/FormTextArea";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useAction } from "@/hooks/use-action";
import { Card_with_List } from "@/types";
import { useQueryClient } from "@tanstack/react-query";
import { AlignLeft } from "lucide-react";
import { useParams } from "next/navigation";
import React, { ElementRef, useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { useEventListener, useOnClickOutside } from "usehooks-ts";

const CardModalDescription = ({
  card,
  isLoading,
}: {
  isLoading?: boolean;
  card?: Card_with_List;
}) => {
  const [description, setDescription] = useState(card?.description);
  const [isEditing, setIsEditing] = useState(false);

  const params = useParams();
  const queryClient = useQueryClient();

  const textAreaRef = useRef<ElementRef<"textarea">>(null);
  const formRef = useRef<ElementRef<"form">>(null);

  const {
    execute,
    isLoading: updatingLoading,
    fieldErrors,
  } = useAction(updateCard, {
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["card", data.id],
      });
      toast.success(`Card "${data.title}" updated!`);
      disableEditing();
    },
    onError: (err) => {
      toast.error(err);
    },
  });

  const enableEditing = () => {
    setIsEditing(true);
    setTimeout(() => {
      textAreaRef.current?.focus();
    });
  };
  const disableEditing = () => {
    setIsEditing(false);
  };

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Escape") {
      disableEditing();
    }
  };

  useEventListener("keydown", onKeyDown);
  useOnClickOutside(formRef, disableEditing);

  const onSubmit = (formData: FormData) => {
    const newDescription = formData.get("description") as string;
    const isNewDescription =
      card &&
      card.description?.toLowerCase().trim() !==
        newDescription.toLowerCase().trim();

    if (isNewDescription) {
      execute({
        boardId: params.boardId as string,
        id: card.id,
        description: newDescription.trim(),
        title: card.title,
      });
    }
  };

  useEffect(() => {
    setDescription(card?.description);
  }, [card?.description]);

  if (isLoading || !card) return <CardModalDescription.Sleketon />;
  else
    return (
      <div className="flex items-start gap-x-3 w-full">
        <AlignLeft className="h-5 w-5 mt-0.5 text-neutral-700" />
        <div className="w-full">
          <p className="font-semibold text-neutral-700 mb-2">Description</p>
          {isEditing ? (
            <form action={onSubmit} ref={formRef}>
              <FormTextArea
                ref={textAreaRef}
                id="description"
                defaultValue={description || undefined}
                errors={fieldErrors}
                disabled={updatingLoading}
                placeholder="Add a more detailed description..."
                className="w-full mt-2"
              />
              <div className="flex items-center gap-x-2 mt-2">
                <FormButton>Save</FormButton>
                <Button
                  size={"sm"}
                  onClick={disableEditing}
                  type="button"
                  variant={"ghost"}
                >
                  Cancel
                </Button>
              </div>
            </form>
          ) : (
            <div
              onClick={enableEditing}
              className="min-h-[78px] bg-neutral-200 text-sm font-medium py-3 px-3.5 rounded-md"
              role="button"
            >
              {card.description || "Add a more detailed description..."}
            </div>
          )}
        </div>
      </div>
    );
};

export default CardModalDescription;

CardModalDescription.Sleketon = () => {
  return (
    <div className="flex items-start gap-x-3 w-full">
      <Skeleton className="h-6 w-6 bg-neutral-200" />
      <div className="w-full">
        <Skeleton className="h-6 w-24 mb-2 bg-neutral-200" />
        <Skeleton className="h-[78px] w-full bg-neutral-200" />
      </div>
    </div>
  );
};
