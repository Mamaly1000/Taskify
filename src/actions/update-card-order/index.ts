"use server";
import { auth } from "@clerk/nextjs/server";
import { InputType, ReturnType } from "./types";
import { db } from "@/lib/db";
import { createSafeAction } from "@/lib/use-safe-action";
import { UpdateCardOrder } from "./schema";
import { revalidatePath } from "next/cache";

const handler = async (data: InputType): Promise<ReturnType> => {
  const { userId, orgId } = auth();
  if (!userId || !orgId) {
    return { error: "Unauthorized" };
  }
  const { items, boardId } = data;

  let updatedCards;

  try {
    const board = await db.board.findUnique({ where: { id: boardId, orgId } });
    if (!board) {
      return {
        error: "Board not found!",
      };
    }

    const transaction = items.map((card) =>
      db.card.update({
        where: { id: card.id, list: { board: { orgId } } },
        data: { order: card.order, listId: card.listId },
      })
    );
    updatedCards = await db.$transaction(transaction);

    revalidatePath(`/board/${board.id}`);
    return {
      data: updatedCards,
    };
  } catch (error) {
    console.log(`[Internall-error]`, error);
    return {
      error: "failed to Reorder!",
    };
  }
};
export const updateCardOrder = createSafeAction(UpdateCardOrder, handler);
