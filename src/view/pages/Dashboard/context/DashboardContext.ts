import { createContext, useContext } from "react";

interface DashboardContextValue {
  areValuesVisible: boolean;
  toggleValuesVisibility(): void;
  isNewAccountModalOpen: boolean;
  handleOpenNewAccountModal(): void;
  handleCloseNewAccountModal(): void;
}

export const DashboardContext = createContext({} as DashboardContextValue);

export function useDashboard() {
  return useContext(DashboardContext);
}
