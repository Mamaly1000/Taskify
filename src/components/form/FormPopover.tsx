"use client";
import React, { ElementRef, ReactNode, useRef } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
  PopoverClose,
} from "@/components/ui/popover";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import FormInput from "./FormInput";
import FormButton from "./FormButton";
import { createBoard } from "@/actions/create-board";
import { useAction } from "@/hooks/use-action";
import Error from "../ui/Error";
import { toast } from "sonner";
import FormPicker from "./FormPicker";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

interface FormPopoverProps {
  children: ReactNode;
  align?: "start" | "center" | "end";
  side?: "right" | "left" | "top" | "bottom";
  sideOffset?: number;
  className?: string;
}

const FormPopover = ({
  align,
  children,
  side = "bottom",
  sideOffset = 0,
  className,
}: FormPopoverProps) => {
  const closeRef = useRef<ElementRef<"button">>(null);
  const router = useRouter();

  const { error, execute, fieldErrors, isLoading, setError, setFieldErrors } =
    useAction(createBoard, {
      onError: (error) => {
        toast.error(error);
      },
      onSuccess: (data) => {
        toast.success(`${data.title} board created!`);
        closeRef.current?.click();
        router.refresh();
        router.push(`/board/${data.id}`);
      },
    });

  const onSubmit = (data: FormData) => {
    const title = data.get("title") as string;
    const image = data.get("image") as string;

    execute({ title, image });
  };

  return (
    <Popover
      onOpenChange={() => {
        setError(undefined);
        setFieldErrors(undefined);
      }}
    >
      <PopoverTrigger asChild>{children}</PopoverTrigger>

      <PopoverContent
        align={align}
        side={side}
        sideOffset={sideOffset}
        className={cn("w-80 pt-3", className)}
      >
        <PopoverClose ref={closeRef} asChild>
          <Button
            variant={"ghost"}
            size={"icon"}
            onClick={() => {
              setError(undefined);
              setFieldErrors(undefined);
            }}
            className="h-auto w-auto p-2 absolute top-2 right-2 text-neutral-600 outline-none border-none outline-0 checked:outline-none focus-visible:outline-none"
          >
            <X className="w-4 h-4" />
          </Button>
        </PopoverClose>
        <span className="w-full capitalize font-semibold text-center text-sm">
          create new board
        </span>
        <form action={onSubmit} className="space-y-2 pt-2">
          <FormPicker errors={fieldErrors} id="image" />
          <div className="space-y-2">
            <FormInput
              disabled={isLoading}
              placeholder="my further project...."
              errors={fieldErrors as any}
              id="title"
              label="board title"
            />
          </div>
          <FormButton children={"create"} className="w-full capitalize" />
        </form>
      </PopoverContent>
    </Popover>
  );
};

export default FormPopover;
