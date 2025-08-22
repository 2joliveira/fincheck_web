import { useQuery } from "@tanstack/react-query";
import { transactionsService } from "../services/transactionsService";

export function useTransactions() {
  const { data, isFetching, isLoading } = useQuery({
    queryKey: ["transactions"],
    queryFn: () =>
      transactionsService.getAll({
        month: 7,
        year: 2025,
      }),
  });

  return {
    transactions: data || [],
    isLoadingTransactions: isFetching,
    isInitialLoading: isLoading,
  };
}
