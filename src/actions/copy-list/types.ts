import { z } from "zod";
import { CopyListSchema } from "./schema";
import { List } from "@prisma/client";
import { ActionState } from "@/lib/use-safe-action";

export type InputType = z.infer<typeof CopyListSchema>;
export type ReturnType = ActionState<InputType, List>;
