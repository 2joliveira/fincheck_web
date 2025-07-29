import { useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import type { SigninParams } from "../services/authService/signin";
import { authService } from "../services/authService";
import toast from "react-hot-toast";

const schema = z.object({
  email: z.email("E-mail inválido"),
  password: z
    .string()
    .nonempty("Informe sua senha.")
    .min(8, "A senha deve conter pelo menos 8 dígitos"),
});

type FormData = z.infer<typeof schema>;

export function useSigninForm() {
  const {
    register,
    formState: { errors },
    handleSubmit: hookFormSubmit,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const { mutateAsync, isPending } = useMutation({
    mutationFn: async (data: SigninParams) => {
      return authService.signin(data);
    },
  });

  const handleSubmit = hookFormSubmit(async (data) => {
    try {
      await mutateAsync(data);
    } catch {
      toast.error("Credenciais inválidas!");
    }
  });

  return { register, handleSubmit, errors, isLoading: isPending };
}
