import { z } from "zod";

export const createBoardSchema = z.object({
  title: z
    .string({
      required_error: "title is required!",
      invalid_type_error: "title is required!",
    })
    .min(3, {
      message: "title is too short!",
    }),
  image: z.string({
    message: "image is required!",
    invalid_type_error: "image is required!",
  }),
});
