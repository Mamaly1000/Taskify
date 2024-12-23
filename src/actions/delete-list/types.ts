import { z } from "zod";
import { List } from "@prisma/client";

import { ActionState } from "@/lib/use-safe-action";
import { deleteListSchema } from "./schema";

export type InputType = z.infer<typeof deleteListSchema>;
export type ReturnType = ActionState<InputType, List>;
