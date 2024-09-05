import type {
  FieldErrors,
  FieldValues,
  Path,
  UseFormRegister,
} from "react-hook-form";
import styled from "styled-components";
import { useMemo } from "react";

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const StyledInput = styled.input<{ error?: boolean }>`
  padding: 0.75rem;
  font-size: 1rem;
  border: 2px solid ${(props) => (props.error ? "red" : "#2196f3")};
  border-radius: 0.75rem;
  &:focus {
    outline: none;
    border-color: ${(props) => (props.error ? "red" : "#1e88e5")};
  }
`;

const ErrorText = styled.span`
  color: red;
  font-size: 0.75rem;
  margin-top: 0.25rem;
  margin-left: 0.25rem;
`;

const StyledLabel = styled.label<{ error?: boolean }>`
  color: ${(props) => (props.error ? "red" : "black")};
  font-size: 1rem;
  margin-bottom: 0.25rem;
`;

interface InputProps<T extends FieldValues>
  extends React.ComponentProps<"input"> {
  label?: string;
  register: UseFormRegister<T>;
  name: Path<T>;
  errors: FieldErrors<T>;
}

const Input = <T extends FieldValues>({
  label,
  register,
  name,
  errors,
  ...props
}: InputProps<T>) => {
  const error = useMemo(
    () => errors[name]?.message as string | undefined,
    [errors, name],
  );

  return (
    <InputWrapper>
      {label && <StyledLabel error={!!error}>{label}</StyledLabel>}
      <StyledInput {...register(name)} {...props} error={!!error} />
      {error && <ErrorText>{error}</ErrorText>}
    </InputWrapper>
  );
};

export default Input;
