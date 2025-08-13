import { useDashboard } from "../../../context/DashboardContext";

export function useNewAccountController() {
  const { isNewAccountModalOpen, handleCloseNewAccountModal } = useDashboard();

  return {
    isNewAccountModalOpen,
    handleCloseNewAccountModal,
  };
}
