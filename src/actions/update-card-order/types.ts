import { ActionState } from "@/lib/use-safe-action";
import { Card, List } from "@prisma/client";
import { z } from "zod";
import { UpdateCardOrder } from "./schema";

export type InputType = z.infer<typeof UpdateCardOrder>;
export type ReturnType = ActionState<InputType, Card[]>;
