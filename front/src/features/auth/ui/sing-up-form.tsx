import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signUpSchema, SingUpFields } from "../model/schemas";
import Form from "@/shared/ui/form";
import Input from "@/shared/ui/input";
import Button from "@/shared/ui/button";
import { NavLink } from "react-router-dom";
import styled from "styled-components";

export default function SignUpForm() {
  const {
    formState: { errors },
    register,
    handleSubmit,
  } = useForm<SingUpFields>({
    resolver: zodResolver(signUpSchema),
    defaultValues: { login: "", password: "", passwordConfirm: "" },
  });

  const onSubmit: SubmitHandler<SingUpFields> = async (data) => {
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
      <Input
        errors={errors}
        label="Повторите пароль"
        register={register}
        name="passwordConfirm"
        type="password"
        placeholder="Повторите пароль"
      />
      <Button>Зарегистрироваться</Button>
      <StyledLink to="/sign-in">Уже есть аккаунт? Войдите</StyledLink>
    </Form>
  );
}

const StyledLink = styled(NavLink)`
  color: black;
  text-align: center;
`;
