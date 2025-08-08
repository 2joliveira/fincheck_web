import { Swiper, SwiperSlide } from "swiper/react";
import { EyeIcon } from "@/view/components/icons/EyeIcon";
import { AccountCard } from "./AccountCard";

import "swiper/css";
import { SliderNavigation } from "./SliderNavigation";
import { useAccountsController } from "./useAccountsController";
import { formatCurrency } from "@/app/utils/formatCurrency";
import { cn } from "@/app/utils/cn";
import { Spinner } from "@/view/components";
import { PlusIcon } from "@radix-ui/react-icons";

export function Accounts() {
  const {
    sliderState,
    setSliderState,
    windowWidth,
    areValuesVisible,
    toggleValuesVisibility,
    isLoading,
    accounts,
  } = useAccountsController();

  return (
    <div className="flex h-full w-full flex-col rounded-2xl bg-teal-900 px-4 py-8 md:p-10">
      {isLoading && (
        <div className="flex h-full w-full items-center justify-center">
          <Spinner className="h-12 w-12 fill-white text-teal-950" />
        </div>
      )}

      {!isLoading && (
        <>
          <div>
            <span className="block tracking-[-0.5px] text-white">
              Saldo total
            </span>

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
            {accounts.length === 0 && (
              <>
                <div className="mb-4">
                  <strong className="text-lg font-bold tracking-[-1px] text-white">
                    Minhas contas
                  </strong>
                </div>

                <button className="mt-4 flex h-52 cursor-pointer flex-col items-center justify-center gap-4 rounded-2xl border-2 border-dashed border-teal-600 text-white">
                  <div className="flex h-11 w-11 items-center justify-center rounded-full border-2 border-dashed border-white">
                    <PlusIcon className="h-6 w-6" />
                  </div>

                  <span className="block w-32 text-center font-medium tracking-[-0.5px]">
                    Cadastre uma nova conta
                  </span>
                </button>
              </>
            )}

            {accounts.length > 0 && (
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
            )}
          </div>
        </>
      )}
    </div>
  );
}
