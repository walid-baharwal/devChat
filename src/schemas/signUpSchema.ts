import { z } from "zod";

export const usernameValidation = z
  .string()
  .trim()
  .toLowerCase()
  .min(3, { message: "Username must be at least 3 characters long" })
  .max(20, { message: "Username must be at least 20 characters long" })
  .regex(/^[a-zA-Z0-9_]+$/, {
    message: "Username must not conatain special characters except '_' ",
  });

export const signUpSchema = z.object({
  username: usernameValidation,
  fullName: z
    .string()
    .trim()
    .max(3, { message: "FullName cannot be more than 20 characters long"} ),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long" }),
});
