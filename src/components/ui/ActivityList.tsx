import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server"; 
import { redirect } from "next/navigation";
import React, { Suspense } from "react";
import ActivityItem from "./ActivityItem";
import { Skeleton } from "./skeleton";

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
    <Suspense fallback={<ActivityList.Skeleton />}>
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

ActivityList.Skeleton = () => {
  return (
    <ol className="space-y-4 mt-4">
      <Skeleton className="w-[75%] h-14" />
      <Skeleton className="w-[55%] h-14" />
      <Skeleton className="w-[87%] h-14" />
      <Skeleton className="w-[56%] h-14" />
      <Skeleton className="w-[76%] h-14" />
      <Skeleton className="w-[65%] h-14" />
      <Skeleton className="w-[60%] h-14" />
      <Skeleton className="w-[78%] h-14" />
      <Skeleton className="w-[66%] h-14" />
    </ol>
  );
};
