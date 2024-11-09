import { z } from "zod";

export type FieldErrors<T> = {
  [K in keyof T]?: string[];
};
export type ActionState<Tinput, Toutput> = {
  fieldErrors?: FieldErrors<Tinput>;
  error?: string | null;
  data?: Toutput;
};
export function createSafeAction<IN, OT>(
  schema: z.Schema<IN>,
  handler: (validatedData: IN) => Promise<ActionState<IN, OT>>
) {
  return async (data: IN): Promise<ActionState<IN, OT>> => {
    const validatationResult = schema.safeParse(data);
    if (!validatationResult.success) {
      return {
        fieldErrors: validatationResult.error.flatten()
          .fieldErrors as FieldErrors<IN>,
      };
    }
    return handler(validatationResult.data);
  };
}
