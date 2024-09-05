import Form from "@/shared/ui/form";
import Input from "@/shared/ui/input";
import Button from "@/shared/ui/button";
import { useSignInForm } from "../model/use-signin-form";
import ErrorCard from "@/shared/ui/error-card";

export default function SignInForm() {
  const { errors, register, handleSubmit, serverError } = useSignInForm();

  return (
    <Form onSubmit={handleSubmit}>
      <Input
        errors={errors}
        label="Логин"
        name="login"
        register={register}
        placeholder="Ваш логин"
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
      {serverError && <ErrorCard>{serverError}</ErrorCard>}
    </Form>
  );
}
