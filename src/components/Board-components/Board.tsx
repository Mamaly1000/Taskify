import Hint from "../ui/Hint";
import { HelpCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { Board as BoardType } from "@prisma/client";
import Link from "next/link";
import { Skeleton } from "../ui/skeleton"; 

const Board = ({
  className,
  board,
  isSkeleton,
  limit = 0,
}: {
  limit?: number;
  board?: BoardType;
  className?: string;
  isSkeleton?: boolean;
}) => {
  if (isSkeleton) {
    return <Skeleton className="w-full h-full p-2 aspect-video" />;
  }

  if (!board) {
    return (
      <div
        role="button"
        className={cn(
          "aspect-video relative h-full w-full bg-muted rounded-sm flex flex-col gap-y-1 items-center justify-center hover:opacity-75 transition",
          className
        )}
      >
        <p className="capitalize text-sm">create new board</p>
        <span className=" text-xs">{limit} remaining</span>
        <Hint
          side="bottom"
          description={`free workspaces can have up to ${limit} open boards. for unlimited boards upgrade this workspace.`}
          sideOffset={40}
        >
          <HelpCircle className="absolute bottom-2 right-2 w-[14px] h-[14px]" />
        </Hint>
      </div>
    );
  }
  return (
    <Link
      href={`/board/${board.id}`}
      className="group relative aspect-video bg-no-repeat bg-center bg-cover bg-sky-700 rounded-sm w-full h-full p-2 overflow-hidden"
      style={{
        backgroundImage: `url(${board.imageThumbUrl})`,
      }}
    >
      <div className="absolute  inset-0 bg-black/30 group-hover:bg-black/40 transition">
        <p className="relative font-semibold text-white p-2 capitalize group-hover:text-lg transition-all duration-100">
          {board.title}
        </p>
        <span className="absolute bottom-2 left-2 z-10 text-white text-[10px] capitalize font-semibold transition-all -translate-x-[110%] group-hover:translate-x-0">
          created at {new Date(board.createdAt).toLocaleString()}
        </span>
      </div>
    </Link>
  );
};

export default Board;
