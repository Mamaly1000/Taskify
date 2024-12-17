"use client";
import LogItem from "@/components/ui/ActivityItem"; 
import { AuditLog } from "@prisma/client";
import { ActivityIcon } from "lucide-react";
import React from "react";
import CardActivitiesSkeleton from "./CardActivitiesSkeleton";

const CardActivities = ({
  logs = [],
  isLoading,
}: {
  isLoading?: boolean;
  logs?: AuditLog[];
}) => {
  if (isLoading) {
    return <CardActivitiesSkeleton />;
  } else
    return (
      <div className="flex items-start gap-x-3 w-full">
        <ActivityIcon className="w-5 h-5 mt-0.5 text-neutral-700" />
        <div className="w-full">
          <p className="font-semibold text-neutral-700 mb-2">Activity</p>
          <ol className="mt-2 space-y-4">
            {logs.length > 0 ? (
              logs.map((log) => <LogItem log={log} key={log.id} />)
            ) : (
              <p className="text-xs text-muted-foreground">
                there is no activities
              </p>
            )}
          </ol>
        </div>
      </div>
    );
};

export default CardActivities;
