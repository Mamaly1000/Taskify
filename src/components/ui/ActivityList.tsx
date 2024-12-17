import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import React, { Suspense } from "react";
import ActivityItem from "./ActivityItem";
import ActivityListSkeleton from "./ActivityListSkeleton";

const ActivityList = async () => {
  const { userId, orgId } = auth();
  if (!userId) {
    return redirect("/sign-in");
  }
  if (!orgId) {
    return redirect("/select-org");
  }
  const activities = await db.auditLog.findMany({
    where: {
      orgId: orgId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  return (
    <Suspense fallback={<ActivityListSkeleton />}>
      <ol className="space-y-4 mt-4">
        <p className="hidden last:block text-xs text-center text-muted-foreground capitalize">
          no activity found inside this organization
        </p>
        {activities.map((log) => (
          <ActivityItem log={log} key={log.id} />
        ))}
      </ol>
    </Suspense>
  );
};

export default ActivityList;
