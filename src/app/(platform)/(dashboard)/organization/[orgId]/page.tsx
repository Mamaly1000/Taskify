import BoardList from "@/components/Board-components/BoardList";
import BoardListSkeleton from "@/components/Board-components/BoardListSkeleton";
import Info from "@/components/ui/Info";
import { Separator } from "@/components/ui/separator";
import React, { Suspense } from "react";

const OrganizationPage = async () => {
  return (
    <div className="w-full mb-20">
      <Info />
      <Separator className="my-4" />
      <Suspense fallback={<BoardListSkeleton />}>
        <BoardList />
      </Suspense>
    </div>
  );
};

export default OrganizationPage;
