import { useCallback, useState } from "react";
import { DashboardContext } from "./DashboardContext";
import type { BankAccount } from "@/app/entities/BankAccount";

export function DashboardProvider({ children }: { children: React.ReactNode }) {
  const [areValuesVisible, setAreValuesVisible] = useState(true);
  const [isNewAccountModalOpen, setIsNewAccountModalOpen] = useState(false);
  const [isEditAccountModalOpen, setIsEditAccountModalOpen] = useState(false);
  const [selectedBankAccount, setSelectedBankAccount] = useState<BankAccount | null>(
    null,
  );
  const [isNewTransactionModalOpen, setIsNewTransactionModalOpen] =
    useState(false);
  const [newTransactionType, setNewTransactionType] = useState<
    "EXPENSE" | "INCOME" | null
  >(null);

  const toggleValuesVisibility = useCallback(() => {
    setAreValuesVisible((prevState) => !prevState);
  }, []);

  function handleOpenNewAccountModal() {
    setIsNewAccountModalOpen(true);
  }

  function handleCloseNewAccountModal() {
    setIsNewAccountModalOpen(false);
  }

  function handleOpenEditAccountModal(bankAccount: BankAccount) {
    setSelectedBankAccount(bankAccount);
    setIsEditAccountModalOpen(true);
  }

  function handleCloseEditAccountModal() {
    setSelectedBankAccount(null);
    setIsEditAccountModalOpen(false);
  }

  function handleOpenNewTransactionModal(type: "EXPENSE" | "INCOME") {
    setNewTransactionType(type);
    setIsNewTransactionModalOpen(true);
  }

  function handleCloseNewTransactionModal() {
    setNewTransactionType(null);
    setIsNewTransactionModalOpen(false);
  }

  return (
    <DashboardContext.Provider
      value={{
        areValuesVisible,
        toggleValuesVisibility,
        isNewAccountModalOpen,
        handleOpenNewAccountModal,
        handleCloseNewAccountModal,
        isNewTransactionModalOpen,
        handleOpenNewTransactionModal,
        handleCloseNewTransactionModal,
        newTransactionType,
        isEditAccountModalOpen,
        handleOpenEditAccountModal,
        handleCloseEditAccountModal,
        selectedBankAccount,
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
}
