"use server";

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { InputType, ReturnType } from "./types";
import { auth } from "@clerk/nextjs/server";
import { createSafeAction } from "@/lib/use-safe-action";
import { deleteListSchema } from "./schema";

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
  } catch (error) {
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
