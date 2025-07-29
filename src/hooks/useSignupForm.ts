import toast from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";
import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { authService } from "../services/authService";
import type { SignupParams } from "../services/authService/signup";

const schema = z.object({
  name: z.string().nonempty("Nome é pbrigatório."),
  email: z.email("E-mail inválido"),
  password: z
    .string()
    .nonempty("Informe sua senha.")
    .min(8, "A senha deve conter pelo menos 8 dígitos"),
});

type FormData = z.infer<typeof schema>;

export function useSignupForm() {
  const {
    register,
    handleSubmit: hookFormSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const { mutateAsync, isPending } = useMutation({
    mutationFn: async (data: SignupParams) => {
      return authService.signup(data);
    },
  });

  const handleSubmit = hookFormSubmit(async (data) => {
    try {
      await mutateAsync(data);
      reset();
    } catch {
      toast.error("Ocorreu um erro ao criar sua conta!");
    }
  });

  return {
    register,
    handleSubmit,
    errors,
    isLoading: isPending,
  };
}
