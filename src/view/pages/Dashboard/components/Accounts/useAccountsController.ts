import { useWindowWidth } from "@/app/hooks/useWindowWidth";
import { useMemo, useState } from "react";
import { useDashboard } from "../../context/DashboardContext";
import { useQuery } from "@tanstack/react-query";
import { bankAccountService } from "@/app/services/bankAccountsService";

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

  const { data, isFetching } = useQuery({
    queryKey: ["bankAccounts"],
    queryFn: bankAccountService.getAll,
  });

  const currentBalance = useMemo(() => {
    if (!data) return 0;

    return data.reduce((total, account) => total + account.currentBalance, 0);
  }, [data]);

  return {
    sliderState,
    setSliderState,
    windowWidth,
    areValuesVisible,
    toggleValuesVisibility,
    isLoading: isFetching,
    accounts: data ?? [],
    handleOpenNewAccountModal,
    currentBalance,
  };
}
