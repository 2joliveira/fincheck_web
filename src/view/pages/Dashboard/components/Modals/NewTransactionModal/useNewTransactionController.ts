import z from "zod";
import { useDashboard } from "../../../context/DashboardContext";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useBankAccounts } from "@/app/hooks/useBankAccounts";
import { useCategories } from "@/app/hooks/useCategories";

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

  const handleSubmit = hookeFormSubmit((data) => {
    console.log({ data });
  });

  return {
    isNewTransactionModalOpen,
    newTransactionType,
    handleCloseNewTransactionModal,
    register,
    control,
    reset,
    handleSubmit,
    errors,
    accounts,
    categories,
  };
}
