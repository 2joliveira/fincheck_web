import { MONTHS } from "@/app/config/constants";
import { FilterIcon } from "@/view/components/icons/FilterIcon";
import { TransactionsIcon } from "@/view/components/icons/TransactionsIcon";
import { ChevronDownIcon } from "@radix-ui/react-icons";
import { Swiper, SwiperSlide } from "swiper/react";
import { SliderOption } from "./SliderOption";
import { SliderNavigation } from "./SliderNavigation";
import { formatCurrency } from "@/app/utils/formatCurrency";
import { CategoryIcon } from "@/view/components/icons/categories/CategoryIcon";
import { cn } from "@/app/utils/cn";
import { useTransactionsController } from "./useTransactionsController";
import { Spinner } from "@/view/components";

export function Transactions() {
  const { areValuesVisible, sliderState, setSliderState, isLoading } =
    useTransactionsController();

  return (
    <div className="flex h-full w-full flex-col rounded-2xl bg-gray-100 p-10">
      {isLoading && (
        <div className="flex h-full w-full items-center justify-center">
          <Spinner className="h-12 w-12" />
        </div>
      )}

      {!isLoading && (
        <>
          <header>
            <div className="flex items-center justify-between">
              <button className="flex items-center gap-2">
                <TransactionsIcon />
                <span className="text-sm font-medium tracking-[-0.5px] text-gray-800">
                  Transações
                </span>
                <ChevronDownIcon className="text-gray-900" />
              </button>

              <button>
                <FilterIcon />
              </button>
            </div>

            <div className="relative mt-6">
              <Swiper
                slidesPerView={3}
                centeredSlides
                onSlideChange={({ isBeginning, isEnd }) => {
                  setSliderState({ isBeginning, isEnd });
                }}
              >
                {MONTHS.map((month, index) => (
                  <SwiperSlide key={month}>
                    {({ isActive }) => (
                      <SliderOption
                        isActive={isActive}
                        month={month}
                        index={index}
                      />
                    )}
                  </SwiperSlide>
                ))}

                <SliderNavigation
                  isBeginnig={sliderState.isBeginning}
                  isEnd={sliderState.isEnd}
                />
              </Swiper>
            </div>
          </header>

          <main className="mt-4 flex-1 space-y-2 overflow-y-auto">
            <div className="flex items-center justify-between gap-4 rounded-2xl bg-white p-4">
              <div className="flex flex-1 items-center gap-3">
                <CategoryIcon type="income" />

                <div>
                  <strong className="block font-bold tracking-[-0.5px]">
                    Almoço
                  </strong>
                  <span className="text-sm text-gray-600">04/04/2025</span>
                </div>
              </div>

              <span
                className={cn(
                  "font-medium tracking-[-0.5px] text-red-800",
                  !areValuesVisible && "blur-sm",
                )}
              >
                - {formatCurrency(123)}
              </span>
            </div>

            <div className="flex items-center justify-between gap-4 rounded-2xl bg-white p-4">
              <div className="flex flex-1 items-center gap-3">
                <CategoryIcon type="income" />

                <div>
                  <strong className="block font-bold tracking-[-0.5px]">
                    Almoço
                  </strong>
                  <span className="text-sm text-gray-600">04/04/2025</span>
                </div>
              </div>

              <span
                className={cn(
                  "font-medium tracking-[-0.5px] text-red-800",
                  !areValuesVisible && "blur-sm",
                )}
              >
                - {formatCurrency(123)}
              </span>
            </div>
          </main>
        </>
      )}
    </div>
  );
}
