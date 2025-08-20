import z from "zod";
import { useDashboard } from "../../../context/DashboardContext";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { bankAccountService } from "@/app/services/bankAccountsService";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

const schema = z.object({
  initialBalance: z.union([
    z.string().nonempty("Saldo inicial é obrigatório"),
    z.number(),
  ]),
  name: z.string().nonempty("Nome da conta é obrigatório"),
  type: z.enum(["CHECKING", "INVESTMENT", "CASH"], {
    error: "Tipo é obrigatório",
  }),
  color: z.string().nonempty("Cor é obrigatória"),
});

type FormData = z.infer<typeof schema>;

export function useEditAccountController() {
  const {
    isEditAccountModalOpen,
    handleCloseEditAccountModal,
    selectedBankAccount,
  } = useDashboard();

  const {
    register,
    control,
    handleSubmit: hookFormSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: selectedBankAccount?.name,
      initialBalance: selectedBankAccount?.initialBalance,
      type: selectedBankAccount?.type,
      color: selectedBankAccount?.color,
    },
  });

  const queryClient = useQueryClient();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: bankAccountService.update,
  });

  const handleSubmit = hookFormSubmit(async (data) => {
    try {
      await mutateAsync({
        ...data,
        id: selectedBankAccount!.id,
        initialBalance: Number(data.initialBalance),
      });

      queryClient.invalidateQueries({ queryKey: ["bankAccounts"] });

      toast.success("A conta editada com sucesso!");
      handleCloseEditAccountModal();
      reset();
    } catch {
      toast.error("Erro ao editar conta!");
    }
  });

  return {
    isEditAccountModalOpen,
    handleCloseEditAccountModal,
    register,
    control,
    handleSubmit,
    errors,
    isLoading: isPending,
  };
}
