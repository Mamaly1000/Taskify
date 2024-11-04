import Board from "@/components/ui/Board";
import Form from "@/components/ui/Form";
import { db } from "@/lib/db";
import React from "react";

const OrganizationPage = async ({ params }: { params: { orgId: string } }) => {
  const boards = await db.board.findMany();

  return (
    <div className="max-w-full text-wrap flex flex-col space-y-4 min-w-full md:min-w-fit">
      <h1 className="text-lg capitalize">organization page</h1>
      <Form orgId={params.orgId} />
      <div className="space-y-2">
        {boards.map((board) => (
          <Board
            orgId={params.orgId}
            key={board.id}
            id={board.id}
            title={board.title}
          />
        ))}
      </div>
    </div>
  );
};

export default OrganizationPage;
