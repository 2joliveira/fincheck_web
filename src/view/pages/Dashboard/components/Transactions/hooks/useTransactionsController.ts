import { useState } from "react";
import { useDashboard } from "../../../context/DashboardContext";

export function useTransactionsController() {
  const { areValuesVisible } = useDashboard();

  const [sliderState, setSliderState] = useState({
    isBeginning: true,
    isEnd: false,
  });

  const [isFiltersModalOpen, setIsFiltersModalOpen] = useState(false);

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
