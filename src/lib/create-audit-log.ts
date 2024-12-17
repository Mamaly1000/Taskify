import { auth, currentUser } from "@clerk/nextjs/server";
import { ACTION, ENTITY_TYPE } from "@prisma/client";
import { db } from "./db";

interface props {
  entityType: ENTITY_TYPE;
  entityId: string;
  entityTitle: string;
  action: ACTION;
}

export const CreateAuditLog = async (props: props) => {
  try {
    const { orgId } = auth();
    const user = await currentUser();

    if (!user || !orgId) {
      throw new Error("User not found!");
    }

    const { action, entityId, entityTitle, entityType } = props;

    await db.auditLog.create({
      data: {
        action,
        entityId,
        entityTitle,
        entityType,
        orgId,
        userId: user.id,
        userImage: user?.imageUrl,
        userName: user.firstName + " " + user.lastName,
      },
    });
  } catch (error) {
    console.log("[create audit log error]", error);
  }
};
