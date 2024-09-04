import { z } from "zod";

export const signInSchema = z.object({
  login: z
    .string()
    .min(3, { message: "Логин должен быть не короче 3 символов" }),
  password: z.string().min(6, { message: "Слишком короткий пароль" }),
});

export type SingInFields = z.infer<typeof signInSchema>;

export const signUpSchema = z
  .object({
    login: z
      .string()
      .min(3, { message: "Логин должен быть не короче 3 символов" }),
    password: z
      .string()
      .min(6, { message: "Пароль должен содержать не менее 6 символов" }),
    passwordConfirm: z
      .string()
      .min(6, { message: "Пароль должен содержать не менее 6 символов" }),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    path: ["passwordConfirm"],
    message: "Пароли не совпадают",
  });

export type SingUpFields = z.infer<typeof signUpSchema>;
