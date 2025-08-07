import { createContext, useContext } from "react";

interface DashboardContextValue {
  areValuesVisible: boolean;
  toggleValuesVisibility(): void;
}

export const DashboardContext = createContext({} as DashboardContextValue);

export function useDashboard() {
  return useContext(DashboardContext);
}
