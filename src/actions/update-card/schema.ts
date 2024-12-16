import { z } from "zod";

export const UpdateCardSchema = z.object({
  title: z
    .string({
      required_error: "title is required!",
      invalid_type_error: "title is required!",
    })
    .min(3, {
      message: "title must be at least 3 characters long",
    }),
  description: z.optional(
    z
      .string({
        required_error: "description is required!",
        invalid_type_error: "description is required!",
      })
      .min(3, {
        message: "description is too short!",
      })
  ),
  id: z.string(),
  boardId: z.string(),
});
