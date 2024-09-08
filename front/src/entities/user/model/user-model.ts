import { z } from "zod";

export const UserSchema = z.object({
  login: z.string(),
  id: z.string(),
});

export type User = z.infer<typeof UserSchema>;
