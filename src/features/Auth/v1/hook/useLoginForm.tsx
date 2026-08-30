import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import loginSchema, { type LoginFormData, type LoginFormInput } from "../validation/loginSchema";

function useLoginForm() {
  return useForm<LoginFormInput, any, LoginFormData>({
    resolver: zodResolver(loginSchema),
    mode: "onTouched",
    defaultValues: {
      email: "",
      password: "",
    },
  });
}

export default useLoginForm;
