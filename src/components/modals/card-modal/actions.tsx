"use client";
import { copyCard } from "@/actions/copy-card";
import { deleteCard } from "@/actions/delete-card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useAction } from "@/hooks/use-action";
import { UseCardModal } from "@/hooks/use-card-modal";
import { Card_with_List } from "@/types";
import { Copy, Trash } from "lucide-react";
import { useParams } from "next/navigation";
import React from "react";
import { toast } from "sonner";

const CardModalActions = ({
  card,
  isLoading,
}: {
  isLoading?: boolean;
  card?: Card_with_List;
}) => {
  const params = useParams();
  const boardId = params.boardId as string;
  const { onClose } = UseCardModal();

  const { execute: executeCopyCard, isLoading: CopyCardLoading } = useAction(
    copyCard,
    {
      onSuccess: (data) => {
        toast.success(`Card "${data.title}" copied!`);
        onClose();
      },
      onError: (err) => {
        toast.error(err);
      },
    }
  );
  const { execute: executeDeleteCard, isLoading: DeleteCardLoading } =
    useAction(deleteCard, {
      onSuccess: (data) => {
        toast.success(`Card "${data.title}" deleted!`);
        onClose();
      },
      onError: (err) => {
        toast.error(err);
      },
    });

  const isExecuting = CopyCardLoading || DeleteCardLoading;

  const onCopy = () => {
    if (card) {
      executeCopyCard({ id: card.id, boardId });
    }
  };

  const onDelete = () => {
    if (card) {
      executeDeleteCard({ id: card.id, boardId });
    }
  };

  if (isLoading || !card) {
    return <CardModalActions.Skeleton />;
  } else
    return (
      <div className="space-y-2 mt-2">
        <p className="text-xs font-semibold">Actions</p>
        <Button
          onClick={onCopy}
          disabled={isExecuting}
          className="w-full justify-start"
          size={"inline"}
          variant={"gray"}
        >
          <Copy className="w-4 h-4 mr-2" /> Copy
        </Button>
        <Button
          onClick={onDelete}
          disabled={isExecuting}
          className="w-full justify-start"
          size={"inline"}
          variant={"destructive"}
        >
          <Trash className="w-4 h-4 mr-2" />
          Delete
        </Button>
      </div>
    );
};

export default CardModalActions;
CardModalActions.Skeleton = () => {
  return (
    <div className="space-y-2 mt-2">
      <Skeleton className="bg-neutral-200 w-20 h-4" />
      <Skeleton className="bg-neutral-200 w-full h-8" />
      <Skeleton className="bg-neutral-200 w-full h-8" />
    </div>
  );
};
