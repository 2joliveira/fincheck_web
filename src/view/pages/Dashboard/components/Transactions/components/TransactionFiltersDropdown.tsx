import {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuRoot,
  DropdownMenuTrigger,
} from "@/view/components/DropdownMenu";
import { ExpensesIcon } from "@/view/components/icons/ExpensesIcon";
import { IncomeIcon } from "@/view/components/icons/IncomeIcon";
import { TransactionsIcon } from "@/view/components/icons/TransactionsIcon";
import { ChevronDownIcon } from "@radix-ui/react-icons";

interface TransactionFiltersDropdownProps {
  onSelect(type: "INCOME" | "EXPENSE" | undefined): void;
  selectedType: "INCOME" | "EXPENSE" | undefined;
}

export function TransactionFiltersDropdown({
  onSelect,
  selectedType,
}: TransactionFiltersDropdownProps) {
  return (
    <DropdownMenuRoot>
      <DropdownMenuTrigger>
        <button className="flex cursor-pointer items-center gap-2 transition-colors hover:opacity-80">
          {selectedType === undefined && <TransactionsIcon />}
          {selectedType === "EXPENSE" && <IncomeIcon />}
          {selectedType === "INCOME" && <ExpensesIcon />}

          <span className="text-sm font-medium tracking-[-0.5px] text-gray-800">
            {selectedType === undefined && "Transações"}
            {selectedType === "EXPENSE" && "Despesas"}
            {selectedType === "INCOME" && "Receitas"}
          </span>
          <ChevronDownIcon className="text-gray-900" />
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-[279px]">
        <DropdownMenuItem
          className="gap-2"
          handleOnSelect={() => onSelect("INCOME")}
        >
          <IncomeIcon />
          Receita
        </DropdownMenuItem>

        <DropdownMenuItem
          className="gap-2"
          handleOnSelect={() => onSelect("EXPENSE")}
        >
          <ExpensesIcon />
          Despesas
        </DropdownMenuItem>

        <DropdownMenuItem
          className="gap-2"
          handleOnSelect={() => onSelect(undefined)}
        >
          <TransactionsIcon />
          Transações
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenuRoot>
  );
}
