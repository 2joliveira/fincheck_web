import { createContext, useContext } from "react";
import type { BankAccount } from "@/app/entities/BankAccount";

interface DashboardContextValue {
  areValuesVisible: boolean;
  toggleValuesVisibility(): void;
  isNewAccountModalOpen: boolean;
  handleOpenNewAccountModal(): void;
  handleCloseNewAccountModal(): void;
  isEditAccountModalOpen: boolean;
  handleOpenEditAccountModal(bankAccount: BankAccount): void;
  handleCloseEditAccountModal(): void;
  selectedBankAccount: BankAccount | null;
  isNewTransactionModalOpen: boolean;
  handleOpenNewTransactionModal(type: "INCOME" | "EXPENSE"): void;
  handleCloseNewTransactionModal(): void;
  newTransactionType: "INCOME" | "EXPENSE" | null;
}

export const DashboardContext = createContext({} as DashboardContextValue);

export function useDashboard() {
  return useContext(DashboardContext);
}
