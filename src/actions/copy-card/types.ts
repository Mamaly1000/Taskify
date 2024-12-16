import { z } from "zod";
import { CopyCardSchema } from "./schema";
import { Card } from "@prisma/client";
import { ActionState } from "@/lib/use-safe-action";

export type InputType = z.infer<typeof CopyCardSchema>;
export type ReturnType = ActionState<InputType, Card>;
