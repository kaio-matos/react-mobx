import { z } from "zod";

export type TReturnCreateError<Schema extends z.AnyZodObject> = ReturnType<
  typeof createError<Schema>
>;

export function createError<Schema extends z.AnyZodObject>(error: unknown) {
  let validation: z.inferFormattedError<Schema> | null = null;
  const response: string[] = [];

  if (error instanceof z.ZodError) {
    validation = error.format() as z.inferFormattedError<Schema>;
  }

  return {
    validation,
    response,
  };
}
