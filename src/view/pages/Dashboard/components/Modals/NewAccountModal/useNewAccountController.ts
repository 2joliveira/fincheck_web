import { useDashboard } from "../../../context/DashboardContext";

export function useNewAcccountController() {
  const { isNewAccountModalOpen, handleCloseNewAccountModal } = useDashboard();

  return {
    isNewAccountModalOpen,
    handleCloseNewAccountModal,
  };
}
