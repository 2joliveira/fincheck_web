import z from "zod";
import { useDashboard } from "../../../context/DashboardContext";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { bankAccountService } from "@/app/services/bankAccountsService";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

const schema = z.object({
  initialBalance: z.string().nonempty("Saldo inicial é obrigatório"),
  name: z.string().nonempty("Nome da conta é obrigatório"),
  type: z.enum(["CHECKING", "INVESTMENT", "CASH"], {
    error: "Tipo é obrigatório",
  }),
  color: z.string().nonempty("Cor é obrigatória"),
});

type FormData = z.infer<typeof schema>;

export function useNewAccountController() {
  const { isNewAccountModalOpen, handleCloseNewAccountModal } = useDashboard();

  const {
    register,
    control,
    handleSubmit: hookFormSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const queryClient = useQueryClient();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: bankAccountService.create,
  });

  const handleSubmit = hookFormSubmit(async (data) => {
    try {
      await mutateAsync({
        ...data,
        initialBalance: Number(data.initialBalance),
      });

      queryClient.invalidateQueries({ queryKey: ['bankAccounts'] })

      toast.success("Conta cadastrada com sucesso!");
      handleCloseNewAccountModal();
      reset();
    } catch {
      toast.error("Erro ao cadastrar conta!");
    }
  });

  return {
    isNewAccountModalOpen,
    handleCloseNewAccountModal,
    register,
    control,
    handleSubmit,
    errors,
    isLoading: isPending,
  };
}
