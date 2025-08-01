import { MONTHS } from "@/app/config/constants";
import { FilterIcon } from "@/view/components/icons/FilterIcon";
import { TransactionsIcon } from "@/view/components/icons/TransactionsIcon";
import { ChevronDownIcon } from "@radix-ui/react-icons";
import { Swiper, SwiperSlide } from "swiper/react";
import { SliderOption } from "./SliderOption";
import { SliderNavigation } from "./SliderNavigation";
import { formatCurrency } from "@/app/utils/formatCurrency";
import { CategoryIcon } from "@/view/components/icons/categories/CategoryIcon";

export function Transactions() {
  return (
    <div className="flex h-full w-full flex-col rounded-2xl bg-gray-100 p-10">
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
          <Swiper slidesPerView={3} centeredSlides>
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

            <SliderNavigation />
          </Swiper>
        </div>
      </header>

      <main className="mt-4 space-y-2 flex-1 overflow-y-auto">
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

          <span className="font-medium tracking-[-0.5px] text-red-800">
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

          <span className="font-medium tracking-[-0.5px] text-red-800">
            - {formatCurrency(123)}
          </span>
        </div>
      </main>
    </div>
  );
}
