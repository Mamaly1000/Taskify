"use server";

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { InputType, ReturnType } from "./types";
import { auth } from "@clerk/nextjs/server";
import { createSafeAction } from "@/lib/use-safe-action";
import { createBoardSchema } from "./schema";

const handler = async (data: InputType): Promise<ReturnType> => {
  const { userId } = auth();
  if (!userId) {
    return {
      error: "Unauthorized!",
    };
  }
  let board;
  const { title } = data;
  try {
    board = await db.board.create({
      data: { title },
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
