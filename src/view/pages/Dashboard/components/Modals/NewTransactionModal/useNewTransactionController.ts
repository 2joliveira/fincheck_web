import z from "zod";
import { useDashboard } from "../../../context/DashboardContext";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useBankAccounts } from "@/app/hooks/useBankAccounts";
import { useCategories } from "@/app/hooks/useCategories";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { transactionsService } from "@/app/services/transactionsService";
import toast from "react-hot-toast";

const schema = z.object({
  value: z.string().nonempty("Valor é obrigatório"),
  name: z.string().nonempty("Nome da transação é obrigatório"),
  categoryId: z.string().nonempty("Categoria é obrigatória"),
  bankAccountId: z.string().nonempty("Conta bancária é obrigatória"),
  date: z.date({ error: "Data é obrigatória" }),
});

type FormData = z.infer<typeof schema>;

export function useNewTransactionController() {
  const {
    isNewTransactionModalOpen,
    newTransactionType,
    handleCloseNewTransactionModal,
  } = useDashboard();

  const queryCliente = useQueryClient();

  const { accounts } = useBankAccounts();

  const { categories: allCategories } = useCategories();

  const categories = allCategories.filter(
    (category) => category.type === newTransactionType,
  );

  const {
    register,
    handleSubmit: hookeFormSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const { isPending, mutateAsync } = useMutation({
    mutationFn: transactionsService.create,
  });

  const handleSubmit = hookeFormSubmit(async (data) => {
    try {
      await mutateAsync({
        ...data,
        value: Number(data.value),
        date: data.date.toISOString(),
        type: newTransactionType!,
      });

      queryCliente.invalidateQueries({ queryKey: ["transactions"] });
      queryCliente.invalidateQueries({ queryKey: ["bankAccounts"] });

      toast.success("Transação cadastrada com sucesso");
      handleCloseNewTransactionModal();
      reset();
    } catch {
      toast.error("Erro ao cadastrar uma transação");
    }
  });

  return {
    isNewTransactionModalOpen,
    newTransactionType,
    handleCloseNewTransactionModal,
    register,
    control,
    handleSubmit,
    errors,
    accounts,
    categories,
    isLoading: isPending,
  };
}
