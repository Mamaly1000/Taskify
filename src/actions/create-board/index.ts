"use server";

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { InputType, ReturnType } from "./types";
import { auth } from "@clerk/nextjs/server";
import { createSafeAction } from "@/lib/use-safe-action";
import { createBoardSchema } from "./schema";
import { redirect } from "next/navigation";

const handler = async (data: InputType): Promise<ReturnType> => {
  const { userId, orgId } = auth();
  if (!userId || !orgId) {
    return {
      error: "Unauthorized!",
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
