import { ActionState } from "@/lib/use-safe-action";
import { List } from "@prisma/client";
import { z } from "zod";
import { UpdateListSchema } from "./schema";

 
export type InputType = z.infer<typeof UpdateListSchema>;
export type ReturnType = ActionState<InputType, List>;
