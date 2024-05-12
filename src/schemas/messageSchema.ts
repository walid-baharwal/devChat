import { z } from "zod";

export const messageSchema = z.object({
  content: z
    .string()
    .min(1, { message: "Message must be at least 1 characters long" })
    .max(280, {
      message: "Message must not be  more than 280 characters long",
    }),
});
