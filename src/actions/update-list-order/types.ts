import { ActionState } from "@/lib/use-safe-action";
import { List } from "@prisma/client";
import { z } from "zod";
import { UpdateListOrder } from "./schema";

export type InputType = z.infer<typeof UpdateListOrder>;
export type ReturnType = ActionState<InputType, List[]>;
