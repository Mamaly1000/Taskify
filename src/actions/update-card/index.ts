"use server";
import { auth } from "@clerk/nextjs/server";
import { InputType, ReturnType } from "./types";
import { db } from "@/lib/db";
import { createSafeAction } from "@/lib/use-safe-action";
import { UpdateCardSchema } from "./schema";
import { revalidatePath } from "next/cache";
import { CreateAuditLog } from "@/lib/create-audit-log";
import { ACTION, ENTITY_TYPE } from "@prisma/client";

const handler = async (data: InputType): Promise<ReturnType> => {
  const { userId, orgId } = auth();
  if (!userId || !orgId) {
    return { error: "Unauthorized" };
  }
  const { id, boardId, ...values } = data;

  try {
    const board = await db.board.findUnique({ where: { id: boardId, orgId } });
    if (!board) {
      return {
        error: "Board not found!",
      };
    }

    const updatedCard = await db.card.update({
      where: { id, list: { boardId: board.id, board: { orgId } } },
      data: { ...values },
    });
    await CreateAuditLog({
      action: ACTION.UPDATE,
      entityId: updatedCard.id,
      entityTitle: updatedCard.title,
      entityType: ENTITY_TYPE.CARD,
    });
    revalidatePath(`/board/${board.id}`);
    return {
      data: updatedCard,
    };
  } catch (error) {
    return {
      error: "failed to update list!",
    };
  }
};
export const updateCard = createSafeAction(UpdateCardSchema, handler);
