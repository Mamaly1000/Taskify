"use server";

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { InputType, ReturnType } from "./types";
import { auth } from "@clerk/nextjs/server";
import { createSafeAction } from "@/lib/use-safe-action";
import { DeleteCardSchema } from "./schema";

const handler = async (data: InputType): Promise<ReturnType> => {
  const { userId, orgId } = auth();
  if (!userId || !orgId) {
    return {
      error: "Unauthorized!",
    };
  }
  let deletedCard;
  const { id, boardId } = data;

  try {
    const board = await db.board.findUnique({ where: { id: boardId, orgId } });
    if (!board) {
      return {
        error: "Board not found!",
      };
    }
    deletedCard = await db.card.delete({
      where: { id, list: { board: { orgId, id: board.id } } },
    });
  } catch (error) {
    return {
      error: "failed to delete the card!",
    };
  }
  revalidatePath(`/board/${boardId}`);

  return {
    data: deletedCard,
  };
};

export const deleteCard = createSafeAction(DeleteCardSchema, handler);
