import { Swiper, SwiperSlide } from "swiper/react";
import { Spinner } from "@/view/components";
import { FilterIcon } from "@/view/components/icons/FilterIcon";
import { CategoryIcon } from "@/view/components/icons/categories/CategoryIcon";
import { formatCurrency } from "@/app/utils/formatCurrency";
import { cn } from "@/app/utils/cn";
import { useTransactionsController } from "./hooks/useTransactionsController";
import {
  FiltersModal,
  SliderNavigation,
  SliderOption,
  TransactionFiltersDropdown,
} from "./components";
import { MONTHS } from "@/app/config/constants";
import emptyStateImage from "@/assets/empty-state.svg";
import { formatDate } from "@/app/utils/formatDate";

export function Transactions() {
  const {
    areValuesVisible,
    sliderState,
    setSliderState,
    isInitialLoading,
    isLoading,
    transactions,
    isFiltersModalOpen,
    handleOpenFiltersModal,
    handleCloseFiltersModal,
    filters,
    handleChangeFilters,
  } = useTransactionsController();

  const hasTransactions = transactions.length > 0;

  return (
    <div className="flex h-full w-full flex-col rounded-2xl bg-gray-100 p-10">
      {isInitialLoading && (
        <div className="flex h-full w-full items-center justify-center">
          <Spinner className="h-12 w-12" />
        </div>
      )}

      {!isInitialLoading && (
        <>
          <header>
            <div className="flex items-center justify-between">
              <TransactionFiltersDropdown
                onSelect={(type) => handleChangeFilters("type")(type)}
                selectedType={filters.type}
              />

              <button
                className="cursor-pointer hover:opacity-70"
                onClick={handleOpenFiltersModal}
              >
                <FilterIcon />
              </button>
            </div>

            <div className="relative mt-6">
              <Swiper
                slidesPerView={3}
                centeredSlides
                initialSlide={filters.month}
                onSlideChange={({ isBeginning, isEnd, realIndex }) => {
                  setSliderState({ isBeginning, isEnd });
                  handleChangeFilters("month")(realIndex);
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
            {isLoading && (
              <div className="flex h-full flex-col items-center justify-center">
                <Spinner className="h-12 w-12" />
              </div>
            )}
            {!hasTransactions && !isLoading && (
              <div className="flex h-full flex-col items-center justify-center">
                <img src={emptyStateImage} alt="Empty state" />

                <p className="text-gray-700">
                  Não encontramos nennhuma transação!
                </p>
              </div>
            )}

            {hasTransactions &&
              !isLoading &&
              transactions.map((transaction) => (
                <div
                  key={transaction.id}
                  className="flex items-center justify-between gap-4 rounded-2xl bg-white p-4"
                >
                  <div className="flex flex-1 items-center gap-3">
                    <CategoryIcon
                      type={
                        transaction.type === "EXPENSE" ? "expense" : "income"
                      }
                      category={transaction.category?.icon}
                    />

                    <div>
                      <strong className="block font-bold tracking-[-0.5px]">
                        {transaction.name}
                      </strong>
                      <span className="text-sm text-gray-600">
                        {formatDate(new Date(transaction.date))}
                      </span>
                    </div>
                  </div>

                  <span
                    className={cn(
                      "font-medium tracking-[-0.5px]",
                      transaction.type === "EXPENSE"
                        ? "text-red-800"
                        : "text-green-800",
                      !areValuesVisible && "blur-sm",
                    )}
                  >
                    {transaction.type === "EXPENSE" ? "- " : "+ "}
                    {formatCurrency(transaction.value)}
                  </span>
                </div>
              ))}
          </main>
        </>
      )}

      <FiltersModal
        open={isFiltersModalOpen}
        onClose={handleCloseFiltersModal}
      />
    </div>
  );
}
