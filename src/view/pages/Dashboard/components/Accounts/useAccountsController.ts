import { useWindowWidth } from "@/app/hooks/useWindowWidth";
import { useMemo, useState } from "react";
import { useDashboard } from "../../context/DashboardContext";
import { useBankAccounts } from "@/app/hooks/useBankAccounts";

export function useAccountsController() {
  const [sliderState, setSliderState] = useState({
    isBeginning: true,
    isEnd: false,
  });

  const windowWidth = useWindowWidth();

  const {
    areValuesVisible,
    toggleValuesVisibility,
    handleOpenNewAccountModal,
  } = useDashboard();

  const { accounts, isFetching } = useBankAccounts();

  const currentBalance = useMemo(() => {
    return accounts.reduce(
      (total, account) => total + account.currentBalance,
      0,
    );
  }, [accounts]);

  return {
    sliderState,
    setSliderState,
    windowWidth,
    areValuesVisible,
    toggleValuesVisibility,
    isLoading: isFetching,
    accounts,
    handleOpenNewAccountModal,
    currentBalance,
  };
}
