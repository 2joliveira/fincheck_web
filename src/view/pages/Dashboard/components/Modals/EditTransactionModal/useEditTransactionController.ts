import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { Transaction } from "@/app/entities/Transaction";
import { useBankAccounts } from "@/app/hooks/useBankAccounts";
import { useCategories } from "@/app/hooks/useCategories";
import { transactionsService } from "@/app/services/transactionsService";

const schema = z.object({
  value: z.union([z.string().nonempty("Valor é obrigatório"), z.number()]),
  name: z.string().nonempty("Nome da transação é obrigatório"),
  categoryId: z.string().nonempty("Categoria é obrigatória"),
  bankAccountId: z.string().nonempty("Conta bancária é obrigatória"),
  date: z.date({ error: "Data é obrigatória" }),
});

type FormData = z.infer<typeof schema>;

export function useEditTransactionController(
  transaction: Transaction | null,
  onClose: () => void,
) {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  
  const { accounts } = useBankAccounts();

  const { categories: allCategories } = useCategories();

  const categories = useMemo(() => {
    return allCategories.filter(
      (category) => category.type === transaction?.type,
    );
  }, [allCategories, transaction]);

  const {
    register,
    handleSubmit: hookeFormSubmit,
    control,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: transaction?.name,
      value: transaction?.value,
      date: transaction ? new Date(transaction.date) : new Date(),
      bankAccountId: transaction?.bankAccountId,
      categoryId: transaction?.categoryId,
    },
  });

  const queryClient = useQueryClient();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: transactionsService.update,
  });

  const handleSubmit = hookeFormSubmit(async (data) => {
    try {
      await mutateAsync({
        ...data,
        id: transaction!.id,
        type: transaction!.type,
        value: Number(data!.value),
        date: data!.date.toISOString(),
      });

      queryClient.invalidateQueries({ queryKey: ["transactions"] });
      queryClient.invalidateQueries({ queryKey: ["bankAccounts"] });

      toast.success("Transação editada com sucesso!");
      onClose();
    } catch {
      toast.error("Erro ao editar transação!");
    }
  });

  function handleDeleteTransaction() {
    console.log("delete")
  }

  function handleCloseDeleteModal() {
    setIsDeleteModalOpen(false)
  }

  function handleOpenDeleteModal() {
    setIsDeleteModalOpen(true);
  }

  return {
    register,
    control,
    handleSubmit,
    errors,
    accounts,
    categories,
    isLoading: isPending,
    isDeleteModalOpen,
    isLoadingDelete: false,
    handleDeleteTransaction,
    handleCloseDeleteModal,
    handleOpenDeleteModal,
  };
}
