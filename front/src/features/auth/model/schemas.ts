import { z } from "zod";

export const signInSchema = z.object({
  login: z
    .string()
    .min(3, { message: "Логин должен быть не короче 3 символов" }),
  password: z.string().min(6, { message: "Слишком короткий пароль" }),
});

export type SingInFields = z.infer<typeof signInSchema>;
