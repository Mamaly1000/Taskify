"use server";

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

export const DeleteBoard = async ({
  id,
  orgId,
}: {
  orgId: string;
  id: string;
}) => {
  await db.board.delete({ where: { id } });
  revalidatePath(`/organizations/${orgId}`);
};
