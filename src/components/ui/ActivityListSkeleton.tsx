import React from "react";
import { Skeleton } from "./skeleton";

const ActivityListSkeleton = () => {
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

export default ActivityListSkeleton;
