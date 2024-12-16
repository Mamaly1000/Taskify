import { z } from "zod";
import { Card } from "@prisma/client";

import { ActionState } from "@/lib/use-safe-action";
import { DeleteCardSchema } from "./schema";

export type InputType = z.infer<typeof DeleteCardSchema>;
export type ReturnType = ActionState<InputType, Card>;
