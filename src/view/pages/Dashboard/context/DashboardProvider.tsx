import { useCallback, useState } from "react";
import { DashboardContext } from "./DashboardContext";

export function DashboardProvider({ children }: { children: React.ReactNode }) {
  const [areValuesVisible, setAreValuesVisible] = useState(true);
  const [isNewAccountModalOpen, setIsNewAccountModalOpen] = useState(false);
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
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
}
