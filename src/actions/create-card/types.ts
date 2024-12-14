import { ActionState } from "@/lib/use-safe-action";
import { Card } from "@prisma/client";
import { z } from "zod";
import { CreateCardSchema } from "./schema";

export type InputType = z.infer<typeof CreateCardSchema>;
export type ReturnType = ActionState<InputType, Card>;
