import { auth } from "@clerk/nextjs/server";
import { db } from "./db";
import { MAX_FREE_BOARDS } from "@/constants/boards";

export const incrementAvailableCount = async () => {
  const { orgId } = auth();
  if (!orgId) {
    throw new Error("Unauthorized!");
  }
  const boardLimits = await db.orgLimit.findUnique({
    where: { orgId },
  });
  if (boardLimits) {
    await db.orgLimit.update({
      where: { orgId },
      data: { limit: boardLimits.limit + 1 },
    });
  } else {
    await db.orgLimit.create({
      data: {
        orgId,
        limit: 1,
      },
    });
  }
};
export const decrementAvailableCount = async () => {
  const { orgId } = auth();
  if (!orgId) {
    throw new Error("Unauthorized!");
  }
  const boardLimits = await db.orgLimit.findUnique({
    where: { orgId },
  });
  if (boardLimits) {
    await db.orgLimit.update({
      where: { orgId },
      data: { limit: boardLimits.limit > 0 ? boardLimits.limit - 1 : 0 },
    });
  } else {
    await db.orgLimit.create({
      data: {
        orgId,
        limit: 1,
      },
    });
  }
};
export const isAvailableBoard = async (): Promise<boolean> => {
  const { orgId } = auth();
  if (!orgId) {
    throw new Error("Unauthorized!");
  }
  const orgLimits = await db.orgLimit.findUnique({
    where: { orgId },
  });
  if (!orgLimits || orgLimits.limit < MAX_FREE_BOARDS) {
    return true;
  } else {
    return false;
  }
};
export const getAvailableLimit = async (): Promise<number> => {
  const { orgId } = auth();
  if (!orgId) {
    return 0;
  }
  const orgLimits = await db.orgLimit.findUnique({ where: { orgId } });
  if (!orgLimits) {
    return MAX_FREE_BOARDS;
  }
  return MAX_FREE_BOARDS - orgLimits.limit;
};
