import { z } from "zod";

export const DeleteCardSchema = z.object({
  id: z.string(),
  boardId: z.string(),
});
