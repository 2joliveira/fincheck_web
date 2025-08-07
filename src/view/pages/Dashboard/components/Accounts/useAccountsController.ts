import { useWindowWidth } from "@/app/hooks/useWindowWidth";
import { useState } from "react";
import { useDashboard } from "../../context/DashboardContext";

export function useAccountsController() {
  const [sliderState, setSliderState] = useState({
    isBeginning: true,
    isEnd: false,
  });

  const windowWidth = useWindowWidth();

  const { areValuesVisible, toggleValuesVisibility } = useDashboard();

  return {
    sliderState,
    setSliderState,
    windowWidth,
    areValuesVisible,
    toggleValuesVisibility,
  };
}
