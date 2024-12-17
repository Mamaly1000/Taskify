import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const CardModalActionsSkeleton = () => {
  return (
    <div className="space-y-2 mt-2">
      <Skeleton className="bg-neutral-200 w-20 h-4" />
      <Skeleton className="bg-neutral-200 w-full h-8" />
      <Skeleton className="bg-neutral-200 w-full h-8" />
    </div>
  );
};

export default CardModalActionsSkeleton;
