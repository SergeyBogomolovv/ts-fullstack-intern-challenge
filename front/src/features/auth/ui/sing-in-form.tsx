import Form from "@/shared/ui/form";
import Input from "@/shared/ui/input";
import Button from "@/shared/ui/button";
import { useSignInForm } from "../model/use-signin-form";

export default function SignInForm() {
  const { errors, register, handleSubmit } = useSignInForm();

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
    </Form>
  );
}
