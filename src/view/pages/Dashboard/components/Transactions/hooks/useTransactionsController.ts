import { useState } from "react";
import { useDashboard } from "../../../context/DashboardContext";
import { useTransactions } from "@/app/hooks/useTransactions";

export function useTransactionsController() {
  const { areValuesVisible } = useDashboard();

  const [sliderState, setSliderState] = useState({
    isBeginning: true,
    isEnd: false,
  });

  const [isFiltersModalOpen, setIsFiltersModalOpen] = useState(false);

  const { transactions } = useTransactions();

  console.log({ transactions });
  
  function handleOpenFiltersModal() {
    setIsFiltersModalOpen(true);
  }

  function handleCloseFiltersModal() {
    setIsFiltersModalOpen(false);
  }

  return {
    areValuesVisible,
    sliderState,
    setSliderState,
    isInitialLoading: false,
    isLoading: false,
    transactions: [1],
    isFiltersModalOpen,
    handleOpenFiltersModal,
    handleCloseFiltersModal,
  };
}
