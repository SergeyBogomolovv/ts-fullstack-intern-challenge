import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signInSchema, SingInFields } from "../model/schemas";
import { ACCESS_TOKEN_KEY } from "@/shared/constants";
import { useRevalidator } from "react-router-dom";
import $api from "@/shared/config/axios";
import { useMutation } from "@tanstack/react-query";

export const useSignInForm = () => {
  const {
    formState: { errors },
    register,
    handleSubmit,
  } = useForm<SingInFields>({
    resolver: zodResolver(signInSchema),
    defaultValues: { login: "", password: "" },
  });

  const { revalidate } = useRevalidator();

  const { mutate, error } = useMutation({
    mutationFn: async (data: SingInFields) => {
      const { headers } = await $api.post("/user", data);
      return headers["x-auth-token"];
    },
    onSuccess(token: string | undefined) {
      if (token) {
        localStorage.setItem(ACCESS_TOKEN_KEY, token);
        revalidate();
      }
    },
  });

  return {
    handleSubmit: handleSubmit((data) => mutate(data)),
    register,
    errors,
    error: error ? "Неверный логин или пароль" : null,
  };
};
