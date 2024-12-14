"use server";
import { auth } from "@clerk/nextjs/server";
import { InputType, ReturnType } from "./types";
import { db } from "@/lib/db";
import { createSafeAction } from "@/lib/use-safe-action";
import { UpdateListOrder } from "./schema";
import { revalidatePath } from "next/cache";

const handler = async (data: InputType): Promise<ReturnType> => {
  const { userId, orgId } = auth();
  if (!userId || !orgId) {
    return { error: "Unauthorized" };
  }
  const { items, boardId } = data;

  let lists;

  try {
    const board = await db.board.findUnique({ where: { id: boardId, orgId } });
    if (!board) {
      return {
        error: "Board not found!",
      };
    }

    const transaction = items.map((list) =>
      db.list.update({
        where: {
          id: list.id,
          board: { orgId },
        },
        data: {
          order: list.order,
        },
      })
    );

    lists = await db.$transaction(transaction);

    // revalidatePath(`/board/${board.id}`);
    return {
      data: lists,
    };
  } catch (error) {
    return {
      error: "failed to Reorder!",
    };
  }
};
export const updateListOrder = createSafeAction(UpdateListOrder, handler);
