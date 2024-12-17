"use server";
import { auth } from "@clerk/nextjs/server";
import { InputType, ReturnType } from "./types";
import { db } from "@/lib/db";
import { createSafeAction } from "@/lib/use-safe-action";
import { UpdateListSchema } from "./schema";
import { revalidatePath } from "next/cache";
import { CreateAuditLog } from "@/lib/create-audit-log";
import { ACTION, ENTITY_TYPE } from "@prisma/client";

const handler = async (data: InputType): Promise<ReturnType> => {
  const { userId, orgId } = auth();
  if (!userId || !orgId) {
    return { error: "Unauthorized" };
  }
  const { id, title, boardId } = data;

  try {
    const board = await db.board.findUnique({ where: { id: boardId, orgId } });
    if (!board) {
      return {
        error: "Board not found!",
      };
    }

    const updatedList = await db.list.update({
      where: { id, boardId: board.id, board: { orgId } },
      data: { title },
    });
    await CreateAuditLog({
      action: ACTION.UPDATE,
      entityId: updatedList.id,
      entityTitle: updatedList.title,
      entityType: ENTITY_TYPE.LIST,
    });
    revalidatePath(`/board/${board.id}`);
    return {
      data: updatedList,
    };
  } catch (error) {
    return {
      error: "failed to update list!",
    };
  }
};
export const updateList = createSafeAction(UpdateListSchema, handler);
