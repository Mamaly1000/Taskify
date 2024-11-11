"use client";
import React from "react";
import {
  Popover,
  PopoverClose,
  PopoverContent,
  PopoverTrigger,
} from "../ui/popover";
import { Button } from "../ui/button";
import { MoreHorizontal, X } from "lucide-react";
import { useAction } from "@/hooks/use-action";
import { deleteBoard } from "@/actions/delete-board";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useAuth } from "@clerk/nextjs";

const BoardOptions = ({ boardId }: { boardId: string }) => {
  const router = useRouter();
  const { orgId } = useAuth();
  const { execute, isLoading } = useAction(deleteBoard, {
    onSuccess: () => {
      toast.success("Board deleted");
      router.push(`/organization/${orgId}`);
    },
    onError: (error) => {
      toast.error(error);
    },
  });
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button size={"icon"} variant={"transparent"}>
          <MoreHorizontal className="w-4 h-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="px-0 py-3" align="center" side="bottom">
        <div className="text-sm font-medium text-center text-neutral-600 pb-4">
          Board Options
        </div>
        <PopoverClose asChild>
          <Button
            variant={"ghost"}
            size={"icon"}
            className="absolute top-1 right-1 text-neutral-600"
          >
            <X className="w-4 h-4" />
          </Button>
        </PopoverClose>
        <Button
          variant={"ghost"}
          className="rounded-none w-full h-auto p-2 px-5 justify-start font-normal text-sm"
          disabled={isLoading}
          onClick={() => {
            execute({ id: boardId });
          }}
        >
          Delete this board
        </Button>
      </PopoverContent>
    </Popover>
  );
};

export default BoardOptions;
