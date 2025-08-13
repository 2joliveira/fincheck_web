import { useDashboard } from "../../../context/DashboardContext";

export function useNewTransactionController() {
  const {
    isNewTransactionModalOpen,
    newTransactionType,
    handleCloseNewTransactionModal,
  } = useDashboard();

  return {
    isNewTransactionModalOpen,
    newTransactionType,
    handleCloseNewTransactionModal,
  };
}
