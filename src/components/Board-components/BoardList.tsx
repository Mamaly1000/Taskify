import { User2 } from "lucide-react";
import React from "react";
import Board from "./Board";
import FormPopover from "../form/FormPopover";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { getAvailableLimit } from "@/lib/org-limit";
import { MAX_FREE_BOARDS } from "@/constants/boards";

const BoardList = async () => {
  const { orgId } = auth();
  if (!orgId) {
    return redirect("/select-org");
  }
  const maxLimit = await getAvailableLimit();
  const boards = await db.board.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div className="space-y-4">
      <div className="capitalize flex items-center font-semibold text-lg text-neutral-700">
        <User2 className="h-6 w-6 mr-2" />
        your boards
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {boards.map((board) => (
          <Board board={board} key={board.id} />
        ))}
        {!!(maxLimit < MAX_FREE_BOARDS) && (
          <>
            <FormPopover
              sideOffset={10}
              side="right"
              className="sm:block hidden"
            >
              <Board limit={maxLimit} className="sm:flex hidden" />
            </FormPopover>

            <FormPopover
              sideOffset={5}
              align="center"
              side="top"
              className="sm:hidden"
            >
              <Board className="sm:hidden" limit={maxLimit} />
            </FormPopover>
          </>
        )}
      </div>
    </div>
  );
};

export default BoardList;


