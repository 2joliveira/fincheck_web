import { useState } from "react";
import { useDashboard } from "../../context/DashboardContext";

export function useTransactionsController() {
  const { areValuesVisible } = useDashboard();

  const [sliderState, setSliderState] = useState({
    isBeginning: true,
    isEnd: false,
  });

  return {
    areValuesVisible,
    sliderState,
    setSliderState,
    isLoading: true,
  };
}
