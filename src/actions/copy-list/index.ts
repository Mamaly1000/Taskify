"use server";

import { auth } from "@clerk/nextjs/server";
import { InputType, ReturnType } from "./types";
import { createSafeAction } from "@/lib/use-safe-action";
import { CopyListSchema } from "./schema";
import { revalidatePath } from "next/cache";
import { db } from "@/lib/db";
import { CreateAuditLog } from "@/lib/create-audit-log";
import { ACTION, ENTITY_TYPE } from "@prisma/client";

const handler = async (data: InputType): Promise<ReturnType> => {
  const { userId, orgId } = auth();
  if (!userId || !orgId) {
    return {
      error: "Unauthorized",
    };
  }
  const { boardId, id } = data;
  let list;
  try {
    const board = await db.board.findUnique({
      where: { id: boardId, orgId },
    });
    if (!board) {
      return { error: "Board not found" };
    }
    const listToCopy = await db.list.findUnique({
      where: { id, boardId: board.id, board: { orgId } },
      include: { cards: true },
    });
    if (!listToCopy) {
      return { error: "List not found" };
    }
    const lastList = await db.list.findFirst({
      where: { boardId: board.id },
      orderBy: { order: "desc" },
      select: { order: true },
    });
    const lastOrderNumber = lastList ? lastList.order + 1 : 1;
    const List_To_Copy_Has_Card = listToCopy.cards.length > 0;
    list = await db.list.create({
      data: {
        order: lastOrderNumber,
        title: `${listToCopy?.title} - Copy`,
        boardId: board.id,
        cards: List_To_Copy_Has_Card
          ? {
              createMany: {
                data: listToCopy.cards.map((card) => ({
                  description: card.description,
                  title: card.title,
                  order: card.order,
                })),
              },
            }
          : undefined,
      },
      include: {
        cards: true,
      },
    });
    await CreateAuditLog({
      action: ACTION.CREATE,
      entityId: list.id,
      entityTitle: list.title,
      entityType: ENTITY_TYPE.LIST,
    });
  } catch (error) {
    console.log(error);

    return {
      error: "failed to copy the list!",
    };
  }
  revalidatePath(`/board/${boardId}`);
  return {
    data: list,
  };
};

export const copyList = createSafeAction(CopyListSchema, handler);
