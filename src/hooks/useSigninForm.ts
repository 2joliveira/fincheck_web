import { useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const schema = z.object({
  email: z.email("E-mail inválido"),
  password: z
    .string()
    .nonempty("Informe sua senha.")
    .min(6, "A senha deve conter pelo menos 6 dígitos"),
});

type FormData = z.infer<typeof schema>;

export function useSigninForm() {
  const {
    register,
    formState: { errors },
    handleSubmit: hookFormHandleSubmit,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const handleSubmit = hookFormHandleSubmit((data) => {
    console.log({ data });
  });

  return { register, handleSubmit, errors };
}
