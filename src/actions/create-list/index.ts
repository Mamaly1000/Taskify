"use server";
import { auth } from "@clerk/nextjs/server";
import { InputType, ReturnType } from "./types";
import { db } from "@/lib/db";
import { createSafeAction } from "@/lib/use-safe-action";
import { CreateListSchema } from "./schema";
import { revalidatePath } from "next/cache";

const handler = async (data: InputType): Promise<ReturnType> => {
  const { userId, orgId } = auth();
  if (!userId || !orgId) {
    return { error: "Unauthorized" };
  }
  const { id, title } = data;

  try {
    const board = await db.board.findUnique({ where: { id, orgId } });
    if (!board) {
      return {
        error: "Board not found!",
      };
    }

    const lastList = await db.list.findFirst({
      where: { boardId: id },
      orderBy: { order: "desc" },
      select: { order: true },
    });
    const lastOrder = lastList ? lastList.order + 1 : 1;
    const newList = await db.list.create({
      data: {
        title,
        boardId: board.id,
        order: lastOrder,
      },
    });
    revalidatePath(`/board/${board.id}`);
    return {
      data: newList,
    };
  } catch (error) {
    return {
      error: "failed to create new list!",
    };
  }
};
export const createList = createSafeAction(CreateListSchema, handler);
