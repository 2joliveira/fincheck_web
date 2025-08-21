import z from "zod";
import { useDashboard } from "../../../context/DashboardContext";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { bankAccountService } from "@/app/services/bankAccountsService";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useState } from "react";

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

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const queryClient = useQueryClient();

  const { mutateAsync: updateAccount, isPending } = useMutation({
    mutationFn: bankAccountService.update,
  });

  const { mutateAsync: deleteAccount, isPending: isPendgingDelete } =
    useMutation({
      mutationFn: bankAccountService.remove,
    });

  const handleSubmit = hookFormSubmit(async (data) => {
    try {
      await updateAccount({
        ...data,
        id: selectedBankAccount!.id,
        initialBalance: Number(data.initialBalance),
      });

      queryClient.invalidateQueries({ queryKey: ["bankAccounts"] });

      toast.success("Conta editada com sucesso!");
      handleCloseEditAccountModal();
      reset();
    } catch {
      toast.error("Erro ao editar conta!");
    }
  });

  function handleOpenDeleteModal() {
    setIsDeleteModalOpen(true);
  }

  function handleCloseDeleteModal() {
    setIsDeleteModalOpen(false);
  }

  const handleDeleteAccount = async () => {
    try {
      await deleteAccount(selectedBankAccount!.id);

      queryClient.invalidateQueries({ queryKey: ["bankAccounts"] });

      toast.success("Conta deletada com sucesso!");
      handleCloseEditAccountModal();
    } catch {
      toast.error("Erro ao deletar conta!")
    }
  }

  return {
    isEditAccountModalOpen,
    handleCloseEditAccountModal,
    register,
    control,
    handleSubmit,
    errors,
    isLoading: isPending,
    isDeleteModalOpen,
    handleOpenDeleteModal,
    handleCloseDeleteModal,
    handleDeleteAccount,
    isLoadingDelete: isPendgingDelete,
  };
}
