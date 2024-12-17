import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { ENTITY_TYPE } from "@prisma/client";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { cardId: string } }
) {
  const { userId, orgId } = auth();
  if (!userId || !orgId) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  try {
    const cardsAuditLogs = await db.auditLog.findMany({
      where: {
        entityId: params.cardId,
        entityType: ENTITY_TYPE.CARD,
        orgId,
      },
      orderBy: {
        createdAt: "desc",
      },
      take: 3,
    });
    return NextResponse.json(cardsAuditLogs);
  } catch (error) {
    return new NextResponse("Internal Error", { status: 500 });
  }
}
