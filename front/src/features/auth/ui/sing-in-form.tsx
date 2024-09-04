import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signInSchema, SingInFields } from "../model/schemas";
import Form from "@/shared/ui/form";
import Input from "@/shared/ui/input";
import Button from "@/shared/ui/button";
import StyledLink from "./styled-link";

export default function SignInForm() {
  const {
    formState: { errors },
    register,
    handleSubmit,
  } = useForm<SingInFields>({
    resolver: zodResolver(signInSchema),
    defaultValues: { login: "", password: "" },
  });

  const onSubmit: SubmitHandler<SingInFields> = async (data) => {
    console.log(data);
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Input
        errors={errors}
        label="Логин"
        name="login"
        register={register}
        placeholder="Nickname"
      />
      <Input
        errors={errors}
        label="Пароль"
        register={register}
        name="password"
        type="password"
        placeholder="Пароль"
      />
      <Button>Войти</Button>
      <StyledLink to="/sign-up">
        Еще нету аккаунта? Зарегистрируйтесь
      </StyledLink>
    </Form>
  );
}
