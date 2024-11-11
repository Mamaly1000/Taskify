import { Board } from "@prisma/client";
import React from "react";
import BoardTitleForm from "../form/BoardTitleForm";
import BoardOptions from "../Board-components/BoardOptions";

const BoardNavbar = ({
  params,
  board,
}: {
  board: Board;
  params: { boardId: string };
}) => {
  return (
    <div className="fixed top-14 flex items-center px-6 gap-x-4 text-white w-full h-14 z-[40] bg-black/50 ">
      <BoardTitleForm board={board} />
      <div className="ml-auto">
        <BoardOptions boardId={board.id} />
      </div>
    </div>
  );
};

export default BoardNavbar;
