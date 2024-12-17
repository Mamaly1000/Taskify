"use server";

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { InputType, ReturnType } from "./types";
import { auth } from "@clerk/nextjs/server";
import { createSafeAction } from "@/lib/use-safe-action";
import { deleteBoardSchema } from "./schema";
import { CreateAuditLog } from "@/lib/create-audit-log";
import { ACTION, ENTITY_TYPE } from "@prisma/client";
import { decrementAvailableCount } from "@/lib/org-limit";
const handler = async (data: InputType): Promise<ReturnType> => {
  const { userId, orgId } = auth();
  if (!userId || !orgId) {
    return {
      error: "Unauthorized!",
    };
  }
  let board;
  const { id } = data;

  try {
    board = await db.board.delete({
      where: {
        id,
        orgId,
      },
    });
    await decrementAvailableCount();
    await CreateAuditLog({
      action: ACTION.DELETE,
      entityId: board.id,
      entityTitle: board.title,
      entityType: ENTITY_TYPE.BOARD,
    });
  } catch (error) {
    console.log(`[Internall-error]`, error);
    return {
      error: "failed to delete the board!",
    };
  }
  revalidatePath(`/organization/${orgId}`);

  return {
    data: board,
  };
};

export const deleteBoard = createSafeAction(deleteBoardSchema, handler);
