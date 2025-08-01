import { ChevronLeftIcon, ChevronRightIcon } from "@radix-ui/react-icons";
import { useSwiper } from "swiper/react";

export function SliderNavigation() {
  const swiper = useSwiper();

  return (
    <>
      <button
        className="absolute top-1/2 left-0 z-40 flex h-12 w-12 -translate-y-1/2
          items-center justify-start rounded-2xl bg-gradient-to-r
          from-gray-100 to-transparent enabled:hover:cursor-pointer"
        onClick={() => swiper.slidePrev()}
      >
        <ChevronLeftIcon className="h-6 w-6 text-gray-800" />
      </button>

      <button
        className="absolute top-1/2 right-0 z-40 flex h-12 w-12 -translate-y-1/2
          items-center justify-end rounded-2xl bg-gradient-to-l
          from-gray-100 to-transparent enabled:hover:cursor-pointer"
        onClick={() => swiper.slideNext()}
      >
        <ChevronRightIcon className="h-6 w-6 text-gray-800" />
      </button>
    </>
  );
}
