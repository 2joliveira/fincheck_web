import { Swiper, SwiperSlide } from "swiper/react";
import { EyeIcon } from "@/view/components/icons/EyeIcon";
import { AccountCard } from "./AccountCard";

import "swiper/css";
import { SliderNavigation } from "./SliderNavigation";
import { useAccountsController } from "./useAccountsController";
import { formatCurrency } from "@/app/utils/formatCurrency";
import { cn } from "@/app/utils/cn";

export function Accounts() {
  const {
    sliderState,
    setSliderState,
    windowWidth,
    areValuesVisible,
    toggleValuesVisibility,
  } = useAccountsController();

  return (
    <div className="flex h-full w-full flex-col rounded-2xl bg-teal-900 px-4 py-8 md:p-10">
      <div>
        <span className="block tracking-[-0.5px] text-white">Saldo total</span>

        <div className="flex items-center gap-2">
          <strong
            className={cn(
              "text-2xl tracking-[-1px] text-white",
              !areValuesVisible && "blur-sm",
            )}
          >
            {formatCurrency(100)}
          </strong>

          <button
            className="flex h-8 w-8 cursor-pointer items-center justify-center"
            onClick={toggleValuesVisibility}
          >
            <EyeIcon open={!areValuesVisible} />
          </button>
        </div>
      </div>

      <div
        ref={windowWidth.ref}
        className="mt-10 flex flex-1 flex-col justify-end md:mt-0"
      >
        <div>
          <Swiper
            spaceBetween={16}
            slidesPerView={windowWidth.windowWidth >= 500 ? 2.1 : 1.2}
            onSlideChange={({ isBeginning, isEnd }) => {
              setSliderState({ isBeginning, isEnd });
            }}
          >
            <div
              className="mb-4 flex items-center justify-between"
              slot="container-start"
            >
              <strong className="text-lg font-bold tracking-[-1px] text-white">
                Minhas contas
              </strong>

              <SliderNavigation
                isBeginnig={sliderState.isBeginning}
                isEnd={sliderState.isEnd}
              />
            </div>

            <SwiperSlide>
              <AccountCard
                name="Nubank"
                balance={1000.23}
                color="#7950F2"
                type="CASH"
              />
            </SwiperSlide>

            <SwiperSlide>
              <AccountCard
                name="XP"
                balance={10000}
                color="#333"
                type="INVESTMENT"
              />
            </SwiperSlide>

            <SwiperSlide>
              <AccountCard
                name="Inter"
                balance={1000.23}
                color="#0f0"
                type="CHECKING"
              />
            </SwiperSlide>
          </Swiper>
        </div>
      </div>
    </div>
  );
}
