import BoardNavbar from "@/components/layouts/BoardNavbar";
import { db } from "@/lib/db"; 
import { auth } from "@clerk/nextjs/server";
import { startCase } from "lodash";
import { redirect } from "next/navigation";
import React, { ReactNode } from "react";

export async function generateMetadata({
  params,
}: {
  params: { boardId: string };
}) {
  const { orgSlug } = auth();
  const board = await db.board.findUnique({ where: { id: params.boardId } });
  return {
    title:
      startCase(board?.title || "board") +
      " | " +
      startCase(orgSlug || "organization"),
  };
}

const BoardIdLayout = async ({
  children,
  params,
}: {
  params: { boardId: string };
  children: ReactNode;
}) => {
  const { orgId } = auth();
  if (!orgId) {
    return redirect("/select-org");
  }
  const board = await db.board.findUnique({
    where: {
      id: params.boardId,
      orgId,
    },
  });

  if (!board) {
    return redirect(`/organization/${orgId}`);
  }

  return (
    <div
      className="relative h-full bg-no-repeat bg-cover bg-center"
      style={{
        backgroundImage: `url(${board.imageFullUrl})`,
      }}
    >
      <BoardNavbar board={board} params={params} />
      <div className="absolute inset-0 bg-black/10" />
      <main className="relative pt-28 h-full">{children}</main>
    </div>
  );
};

export default BoardIdLayout;
