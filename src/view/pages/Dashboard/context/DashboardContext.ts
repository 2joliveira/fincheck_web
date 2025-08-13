import { createContext, useContext } from "react";

interface DashboardContextValue {
  areValuesVisible: boolean;
  toggleValuesVisibility(): void;
  isNewAccountModalOpen: boolean;
  handleOpenNewAccountModal(): void;
  handleCloseNewAccountModal(): void;
  isNewTransactionModalOpen: boolean;
  handleOpenNewTransactionModal(type: "INCOME" | "EXPENSE"): void;
  handleCloseNewTransactionModal(): void;
  newTransactionType: "INCOME" | "EXPENSE" | null;
}

export const DashboardContext = createContext({} as DashboardContextValue);

export function useDashboard() {
  return useContext(DashboardContext);
}
