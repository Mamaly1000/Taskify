import React from "react";
import { Button } from "./button";
import { DeleteBoard } from "@/actions/DeleteBoards.server";
import DeleteBoardButton from "./DeleteBoardButton";

const Board = ({
  title,
  id,
  orgId,
}: {
  title: string;
  id: string;
  orgId: string;
}) => {
  const DeleteBoardWithId = DeleteBoard.bind(null, { id, orgId });

  return (
    <form
      action={DeleteBoardWithId}
      className="w-full flex items-center justify-between space-x-2"
    >
      <span>{title}</span>
      <DeleteBoardButton />
    </form>
  );
};

export default Board;
