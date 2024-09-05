import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signInSchema, SingInFields } from "../model/schemas";
import { ACCESS_TOKEN_KEY, API_URL } from "@/shared/constants";
import { useRevalidator } from "react-router-dom";

export const useSignInForm = () => {
  const {
    formState: { errors },
    register,
    handleSubmit,
  } = useForm<SingInFields>({
    resolver: zodResolver(signInSchema),
    defaultValues: { login: "", password: "" },
  });

  const revalidator = useRevalidator();

  const onSubmit: SubmitHandler<SingInFields> = async (data) => {
    const response = await fetch(`${API_URL}/user`, {
      body: JSON.stringify(data),
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.ok && response.headers.has("X-Auth-Token")) {
      localStorage.setItem(
        ACCESS_TOKEN_KEY,
        response.headers.get("X-Auth-Token")!,
      );
      revalidator.revalidate();
    }
  };

  return { handleSubmit: handleSubmit(onSubmit), register, errors };
};
