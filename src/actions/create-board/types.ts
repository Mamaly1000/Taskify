import { z } from "zod";
import { Board } from "@prisma/client";

import { ActionState } from "@/lib/use-safe-action";
import { createBoardSchema } from "./schema";

export type InputType = z.infer<typeof createBoardSchema>;
export type ReturnType = ActionState<InputType, Board>;
