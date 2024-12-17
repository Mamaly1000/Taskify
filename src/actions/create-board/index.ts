"use server";

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { InputType, ReturnType } from "./types";
import { auth } from "@clerk/nextjs/server";
import { createSafeAction } from "@/lib/use-safe-action";
import { createBoardSchema } from "./schema";
import { CreateAuditLog } from "@/lib/create-audit-log";
import { ACTION, ENTITY_TYPE } from "@prisma/client";
import { incrementAvailableCount, isAvailableBoard } from "@/lib/org-limit";

const handler = async (data: InputType): Promise<ReturnType> => {
  const { userId, orgId } = auth();
  if (!userId || !orgId) {
    return {
      error: "Unauthorized!",
    };
  }

  const canCreate = await isAvailableBoard();

  if (!canCreate) {
    return {
      error:
        "You have reached your limit of free boards. Please upgrade to create more.",
    };
  }

  let board;
  const { title, image } = data;
  const [imageId, imageThumbUrl, imageFullUrl, imageHtmlLink, imageUserName] =
    image.split("|");
  if (
    !imageId ||
    !imageThumbUrl ||
    !imageFullUrl ||
    !imageHtmlLink ||
    !imageUserName
  ) {
    return {
      error: "Missing fields, failed to create the board!",
    };
  }
  try {
    board = await db.board.create({
      data: {
        title,
        orgId,
        imageFullUrl,
        imageHtmlLink,
        imageId,
        imageThumbUrl,
        imageUserName,
      },
    });
    await incrementAvailableCount();
    await CreateAuditLog({
      action: ACTION.CREATE,
      entityId: board.id,
      entityTitle: board.title,
      entityType: ENTITY_TYPE.BOARD,
    });
  } catch (error) {
    return {
      error: "failed to create a new board!",
    };
  }
  revalidatePath(`/board/${board.id}`);

  return {
    data: board,
  };
};

export const createBoard = createSafeAction(createBoardSchema, handler);
