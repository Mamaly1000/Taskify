import { ActionState } from "@/lib/use-safe-action";
import { Card } from "@prisma/client";
import { z } from "zod";
import { UpdateCardSchema } from "./schema";

export type InputType = z.infer<typeof UpdateCardSchema>;
export type ReturnType = ActionState<InputType, Card>;
