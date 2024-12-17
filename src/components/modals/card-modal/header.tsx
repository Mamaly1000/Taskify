"use client";
import { updateCard } from "@/actions/update-card";
import FormInput from "@/components/form/FormInput";
import { DialogTitle } from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";
import { useAction } from "@/hooks/use-action";
import { Card_with_List } from "@/types";
import { useQueryClient } from "@tanstack/react-query";
import { Layout } from "lucide-react";
import { useParams } from "next/navigation";
import React, { ElementRef, useEffect, useRef, useState } from "react";
import { toast } from "sonner";

const CardModalHeader = ({
  card,
  isLoading,
}: {
  isLoading?: boolean;
  card?: Card_with_List;
}) => {
  const queryclient = useQueryClient();
  const params = useParams();

  const {
    execute,
    isLoading: updatingLoading,
    fieldErrors,
  } = useAction(updateCard, {
    onSuccess: (data) => {
      queryclient.invalidateQueries({
        queryKey: ["card", data.id],
      });
      queryclient.invalidateQueries({
        queryKey: ["card-audit-logs", data.id],
      });
      toast.success(`Card "${data.title}" updated!`);
    },
    onError: (err) => {
      toast.error(err);
    },
  });

  const inputRef = useRef<ElementRef<"input">>(null);

  const [title, setTitle] = useState(card?.title);

  useEffect(() => {
    setTitle(card?.title);
  }, [card]);

  const onBlur = () => {
    inputRef.current?.form?.requestSubmit();
  };

  const onSubmit = (formData: FormData) => {
    const isNewTitle =
      !!card &&
      inputRef.current?.value.toLowerCase().trim() !==
        card.title.toLowerCase().trim();
    if (isNewTitle) {
      execute({
        boardId: params.boardId as string,
        id: card.id,
        title: formData.get("title") as string,
      });
    }
  };

  if (isLoading || !card) {
    return <CardModalHeaderSleketon />;
  } else {
    return (
      <DialogTitle className="flex items-center gap-x-3 w-full mb-6">
        <Layout className="h-5 w-5 text-neutral-700 mt-1" />
        <div className="w-full">
          <form action={onSubmit}>
            <FormInput
              onBlur={onBlur}
              id="title"
              errors={fieldErrors}
              disabled={updatingLoading}
              ref={inputRef}
              defaultValue={title}
              className="font-semibold text-xl px-1 text-neutral-700 bg-transparent border-transparent relative -left-1.5 w-[95%] focus-visible:bg-white focus-visible:border-input truncate mb-0.5"
            />
          </form>
          <p className="text-sm text-muted-foreground">
            in list <span className="underline">{card.list.title}</span>
          </p>
        </div>
      </DialogTitle>
    );
  }
};

export default CardModalHeader;

const CardModalHeaderSleketon = () => {
  return (
    <div className="flex items-start gap-x-3 mb-6">
      <Skeleton className="h-6 w-6 mb-1 bg-neutral-200" />
      <div className="">
        <Skeleton className="h-6 w-24 mb-1 bg-neutral-200" />
        <Skeleton className="h-4 w-12 mb-1 bg-neutral-200" />
      </div>
    </div>
  );
};
