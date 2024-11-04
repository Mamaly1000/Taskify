"use server";

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { z } from "zod";

export type Create_Board_InitialState_Type = {
  message?: string | null;
  errors?: {
    title?: string[];
  };
  orgId: string;
};

const propTypes = z.object({
  title: z.string().min(3, {
    message: "min length is 3 character",
  }),
});

export async function createBoard(
  prev: Create_Board_InitialState_Type,
  formdata: FormData
): Promise<Create_Board_InitialState_Type> {
  const validatedFields = propTypes.safeParse({ title: formdata.get("title") });
  if (!validatedFields.success) {
    return {
      ...prev,
      errors: validatedFields.error.flatten().fieldErrors,
      message: "missing fields.",
    };
  }

  const { title } = validatedFields.data;
  try {
    await db.board.create({
      data: {
        title: title,
      },
    });

    return {
      ...prev,
      message: "board created successfully!",
      errors: {},
    };
  } catch (error) {
    return {
      ...prev,
      message: "Database Error!",
      errors: {},
    };
  } finally {
    revalidatePath(`/organization/${prev?.orgId}`);
  }
}
