"use server";

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { InputType, ReturnType } from "./types";
import { auth } from "@clerk/nextjs/server";
import { createSafeAction } from "@/lib/use-safe-action";
import { deleteListSchema } from "./schema";
import { CreateAuditLog } from "@/lib/create-audit-log";
import { ACTION, ENTITY_TYPE } from "@prisma/client";

const handler = async (data: InputType): Promise<ReturnType> => {
  const { userId, orgId } = auth();
  if (!userId || !orgId) {
    return {
      error: "Unauthorized!",
    };
  }
  let list;
  const { id, boardId } = data;

  try {
    const board = await db.board.findUnique({ where: { id: boardId, orgId } });
    if (!board) {
      return {
        error: "Board not found!",
      };
    }
    list = await db.list.delete({
      where: { id, boardId: board.id, board: { orgId } },
    });
    await CreateAuditLog({
      action: ACTION.DELETE,
      entityId: list.id,
      entityTitle: list.title,
      entityType: ENTITY_TYPE.LIST,
    });
  } catch (error) {
    console.log(`[Internall-error]`, error);
    return {
      error: "failed to delete the list!",
    };
  }
  revalidatePath(`/board/${boardId}`);

  return {
    data: list,
  };
};

export const deleteList = createSafeAction(deleteListSchema, handler);
