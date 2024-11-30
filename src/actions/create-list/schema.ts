import { z } from "zod";

export const CreateListSchema = z.object({
  title: z
    .string({
      required_error: "title is required!",
      invalid_type_error: "title is required!",
    })
    .min(3, {
      message: "title must be at least 3 characters long",
    }),
  id: z.string(),
});
