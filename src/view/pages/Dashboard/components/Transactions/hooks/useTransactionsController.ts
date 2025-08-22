import { useEffect, useState } from "react";
import { useDashboard } from "../../../context/DashboardContext";
import { useTransactions } from "@/app/hooks/useTransactions";
import type { TransactionsFilters } from "@/app/services/transactionsService/getAll";

export function useTransactionsController() {
  const { areValuesVisible } = useDashboard();

  const [sliderState, setSliderState] = useState({
    isBeginning: true,
    isEnd: false,
  });

  const [filters, setfilters] = useState<TransactionsFilters>({
    month: new Date().getMonth(),
    year: new Date().getFullYear(),
  });

  const [isFiltersModalOpen, setIsFiltersModalOpen] = useState(false);

  const {
    transactions,
    isLoadingTransactions,
    isInitialLoading,
    refetchTransactions,
  } = useTransactions(filters);

  function handleOpenFiltersModal() {
    setIsFiltersModalOpen(true);
  }

  function handleCloseFiltersModal() {
    setIsFiltersModalOpen(false);
  }

  function handleChangeFilters<TFilter extends keyof TransactionsFilters>(
    filter: TFilter,
  ) {
    return (value: TransactionsFilters[TFilter]) => {
      if (value === filters[filter]) return;

      setfilters((prevState) => ({
        ...prevState,
        [filter]: value,
      }));
    };
  }

  function handleAppyModalFilters({
    bankAccountId,
    year,
  }: {
    bankAccountId: string | undefined;
    year: number;
  }) {
    handleChangeFilters("bankAccountId")(bankAccountId);
    handleChangeFilters("year")(year);
    setIsFiltersModalOpen(false);
  }

  useEffect(() => {
    refetchTransactions();
  }, [filters, refetchTransactions]);

  return {
    areValuesVisible,
    sliderState,
    setSliderState,
    isInitialLoading: isInitialLoading,
    isLoading: isLoadingTransactions,
    transactions,
    isFiltersModalOpen,
    handleOpenFiltersModal,
    handleCloseFiltersModal,
    filters,
    handleChangeFilters,
    handleAppyModalFilters,
  };
}
