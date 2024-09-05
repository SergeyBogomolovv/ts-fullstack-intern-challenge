import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signInSchema, SingInFields } from "../model/schemas";
import { ACCESS_TOKEN_KEY } from "@/shared/constants";
import { useRevalidator } from "react-router-dom";
import { useState } from "react";
import $api from "@/shared/config/axios";

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

  const [serverError, setServerError] = useState<string | null>(null);

  const onSubmit: SubmitHandler<SingInFields> = async (data) => {
    try {
      const { headers } = await $api.post("/user", data);
      if (headers["x-auth-token"]) {
        localStorage.setItem(ACCESS_TOKEN_KEY, headers["x-auth-token"]);
        revalidate();
      }
    } catch (error) {
      setServerError("Неверный логин или пароль");
    }
  };

  return {
    handleSubmit: handleSubmit(onSubmit),
    register,
    errors,
    serverError,
  };
};
