import { ChevronLeftIcon, ChevronRightIcon } from "@radix-ui/react-icons";
import { Button, Modal } from "@/view/components";
import { cn } from "@/app/utils/cn";
import { useFiltersModalController } from "../hooks/useFiltersModalController";

interface FiltersModalProps {
  open: boolean;
  onClose(): void;
  onApplyFilters(filters: {
    bankAccountId: string | undefined;
    year: number;
  }): void;
}

export function FiltersModal({
  open,
  onClose,
  onApplyFilters,
}: FiltersModalProps) {
  const {
    selectedBankAccountId,
    handleSelectBankAccount,
    selectedYear,
    handleChangeYear,
    accounts,
  } = useFiltersModalController();

  return (
    <Modal open={open} onClose={onClose} title="Filtros">
      <section>
        <span className="text-lg font-bold tracking-[-1px] text-gray-800">
          Conta
        </span>

        <div className="mt-2 space-y-2">
          {accounts.map(({ id, name }) => {
            return (
              <button
                key={id}
                onClick={() => handleSelectBankAccount(id)}
                className={cn(
                  "w-full cursor-pointer rounded-2xl px-4 py-2 text-left text-gray-800 transition-colors hover:bg-gray-50",
                  selectedBankAccountId === id && "!bg-gray-100",
                )}
              >
                {name}
              </button>
            );
          })}
        </div>
      </section>

      <section className="mt-10 text-gray-800">
        <span className="text-lg font-bold tracking-[-1px]">Ano</span>

        <div className="mt-2 flex w-52 items-center justify-between">
          <button
            onClick={() => handleChangeYear(-1)}
            className="flex h-12 w-12 cursor-pointer items-center justify-center rounded-full hover:bg-gray-50"
          >
            <ChevronLeftIcon className="h-6 w-6" />
          </button>

          <div className="flex-1 text-center">
            <span className="text-sm font-medium tracking-[-0.5px]">
              {selectedYear}
            </span>
          </div>

          <button
            onClick={() => handleChangeYear(1)}
            className="flex h-12 w-12 cursor-pointer items-center justify-center rounded-full hover:bg-gray-50"
          >
            <ChevronRightIcon className="h-6 w-6" />
          </button>
        </div>
      </section>

      <Button
        className="mt-10 w-full"
        onClick={() =>
          onApplyFilters({
            bankAccountId: selectedBankAccountId,
            year: selectedYear,
          })
        }
      >
        Aplicar Filtros
      </Button>
    </Modal>
  );
}
