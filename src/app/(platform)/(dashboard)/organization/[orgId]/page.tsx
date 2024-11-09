import BoardList from "@/components/Board-components/BoardList";
import Info from "@/components/ui/Info";
import { Separator } from "@/components/ui/separator";
import React, { Suspense } from "react";

const OrganizationPage = async ({ params }: { params: { orgId: string } }) => {
  return (
    <div className="w-full mb-20">
      <Info />
      <Separator className="my-4" />
      <Suspense fallback={<BoardList.Skeleton />}>
        <BoardList />
      </Suspense>
    </div>
  );
};

export default OrganizationPage;
