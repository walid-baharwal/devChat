import { z } from "zod";

export const messageSchema = z.object({
  content: z
    .string()
    .max(280, {
      message: "Message must not be  more than 280 characters long",
    }),
});
