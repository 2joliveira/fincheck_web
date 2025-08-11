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

export function TransactionFiltersDropdown() {
  return (
    <DropdownMenuRoot>
      <DropdownMenuTrigger className="flex cursor-pointer items-center gap-2 hover:opacity-80 transition-colors">
        <TransactionsIcon />
        <span className="text-sm font-medium tracking-[-0.5px] text-gray-800">
          Transações
        </span>
        <ChevronDownIcon className="text-gray-900" />
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-[279px]">
        <DropdownMenuItem className="gap-2">
          <IncomeIcon />
          Receita
        </DropdownMenuItem>

        <DropdownMenuItem className="gap-2">
          <ExpensesIcon />
          Despesas
        </DropdownMenuItem>

        <DropdownMenuItem className="gap-2">
          <TransactionsIcon />
          Transações
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenuRoot>
  );
}
