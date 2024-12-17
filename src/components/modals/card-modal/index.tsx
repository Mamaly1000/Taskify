"use client";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { UseCardModal } from "@/hooks/use-card-modal";
import { fetcher } from "@/lib/fetcher";
import { Card_with_List } from "@/types";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import CardModalHeader from "./header";
import CardModalDescription from "./description";
import CardModalActions from "./actions";
import { AuditLog } from "@prisma/client";
import CardActivities from "./activities";

const CardModal = () => {
  const { isOpen, onClose, id } = UseCardModal();

  const { data: cardData, isLoading: cardDataError } = useQuery<Card_with_List>(
    {
      queryKey: ["card", id],
      queryFn: () => fetcher(`/api/cards/${id}`),
      enabled: !!id,
    }
  );

  const { data: cardAuditLogs, isLoading: cardAudotLogError } = useQuery<
    AuditLog[]
  >({
    queryKey: ["card-audit-logs", id],
    queryFn: () => fetcher(`/api/cards/${id}/logs`),
    enabled: !!id,
  });

  const isLoading = cardDataError || cardAudotLogError;

  return (
    <Dialog onOpenChange={onClose} open={isOpen}>
      <DialogContent>
        <CardModalHeader isLoading={isLoading} card={cardData} />
        <div className="grid grid-cols-1 md:grid-cols-4 md:gap-4">
          <div className="col-span-3">
            <div className="w-full space-y-6">
              <CardModalDescription card={cardData} isLoading={isLoading} />
              <CardActivities isLoading={isLoading} logs={cardAuditLogs} />
            </div>
          </div>
          <CardModalActions card={cardData} isLoading={isLoading} />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CardModal;
