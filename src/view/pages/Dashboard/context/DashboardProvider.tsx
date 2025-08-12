import { useCallback, useState } from "react";
import { DashboardContext } from "./DashboardContext";

export function DashboardProvider({ children }: { children: React.ReactNode }) {
  const [areValuesVisible, setAreValuesVisible] = useState(true);
  const [isNewAccountModalOpen, setIsNewAccountModalOpen] = useState(false);

  const toggleValuesVisibility = useCallback(() => {
    setAreValuesVisible((prevState) => !prevState);
  }, []);

  function handleOpenNewAccountModal() {
    setIsNewAccountModalOpen(true);
  }

  function handleCloseNewAccountModal() {
    setIsNewAccountModalOpen(false);
  }

  return (
    <DashboardContext.Provider
      value={{
        areValuesVisible,
        toggleValuesVisibility,
        isNewAccountModalOpen,
        handleOpenNewAccountModal,
        handleCloseNewAccountModal,
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
}
