"use server";

import { auth } from "@clerk/nextjs/server";
import { InputType, ReturnType } from "./types";
import { createSafeAction } from "@/lib/use-safe-action";
import { CopyCardSchema } from "./schema";
import { revalidatePath } from "next/cache";
import { db } from "@/lib/db";

const handler = async (data: InputType): Promise<ReturnType> => {
  const { userId, orgId } = auth();
  if (!userId || !orgId) {
    return {
      error: "Unauthorized",
    };
  }
  const { boardId, id } = data;
  let newCard;
  try {
    const board = await db.board.findUnique({
      where: { id: boardId, orgId },
    });
    if (!board) {
      return { error: "Board not found" };
    }
    const CardToCopy = await db.card.findUnique({
      where: { id, list: { board: { id: board.id, orgId } } },
    });
    if (!CardToCopy) {
      return { error: "Card not found" };
    }
    const lastCard = await db.card.findFirst({
      where: { listId: CardToCopy.listId },
      orderBy: { order: "desc" },
      select: { order: true },
    });

    const lastOrder = lastCard ? lastCard.order + 1 : 1;

    newCard = await db.card.create({
      data: {
        order: lastOrder,
        title: CardToCopy.title + " - Copy",
        description: CardToCopy.description,
        listId: CardToCopy.listId,
      },
    });
  } catch (error) {
    console.log(error);

    return {
      error: "failed to copy the card!",
    };
  }
  revalidatePath(`/board/${boardId}`);
  return {
    data: newCard,
  };
};

export const copyCard = createSafeAction(CopyCardSchema, handler);
