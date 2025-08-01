import { ChevronLeftIcon, ChevronRightIcon } from "@radix-ui/react-icons";
import { useSwiper } from "swiper/react";

interface SliderNavigationProps {
  isBeginnig: boolean;
  isEnd: boolean;
}

export function SliderNavigation({
  isBeginnig,
  isEnd,
}: SliderNavigationProps) {
  const swiper = useSwiper();

  return (
    <div className="flex items-center justify-center">
      <button
        className="rounded-full p-3 transition-colors enabled:cursor-pointer enabled:hover:bg-gray-900/10 disabled:opacity-40"
        onClick={() => swiper.slidePrev()}
        disabled={isBeginnig}
      >
        <ChevronLeftIcon className="h-6 w-6 text-white" />
      </button>

      <button
        className="rounded-full p-3 transition-colors enabled:cursor-pointer enabled:hover:bg-gray-900/10 disabled:opacity-40"
        onClick={() => swiper.slideNext()}
        disabled={isEnd}
      >
        <ChevronRightIcon className="h-6 w-6 text-white" />
      </button>
    </div>
  );
}
