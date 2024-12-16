"use client";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { UseCardModal } from "@/hooks/use-card-modal";
import { fetcher } from "@/lib/fetcher";
import { Card_with_List } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { LoaderCircle } from "lucide-react";
import React from "react";
import { toast } from "sonner";
import CardModalHeader from "./header";
import CardModalDescription from "./description";
import CardModalActions from "./actions";

const CardModal = () => {
  const { isOpen, onClose, onOpen, id } = UseCardModal();
  const {
    data: cardData,
    error,
    isLoading,
  } = useQuery<Card_with_List>({
    queryKey: ["card", id],
    queryFn: () => fetcher(`/api/cards/${id}`),
    enabled: !!id,
  });
  return (
    <Dialog onOpenChange={onClose} open={isOpen}>
      <DialogContent>
        <CardModalHeader isLoading={isLoading} card={cardData} />
        <div className="grid grid-cols-1 md:grid-cols-4 md:gap-4">
          <div className="col-span-3">
            <div className="w-full space-y-6">
              <CardModalDescription card={cardData} isLoading={isLoading} />
            </div>
          </div>
          <CardModalActions card={cardData} isLoading={isLoading} />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CardModal;
