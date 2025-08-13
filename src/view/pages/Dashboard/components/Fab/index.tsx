import {
  DropdownMenuRoot,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/view/components/DropdownMenu";
import { BankAccountIcon } from "@/view/components/icons/BankAccountIcon";
import { CategoryIcon } from "@/view/components/icons/categories/CategoryIcon";
import { PlusIcon } from "@radix-ui/react-icons";
import { useDashboard } from "../../context/DashboardContext";

export function Fab() {
  const { handleOpenNewAccountModal, handleOpenNewTransactionModal } =
    useDashboard();

  return (
    <div className="fixed right-4 bottom-4">
      <DropdownMenuRoot>
        <DropdownMenuTrigger>
          <button className="flex h-12 w-12 cursor-pointer items-center justify-center rounded-full bg-teal-900 text-white outline-none hover:bg-teal-800">
            <PlusIcon className="h-6 w-6" />
          </button>
        </DropdownMenuTrigger>

        <DropdownMenuContent>
          <DropdownMenuItem
            className="gap-2"
            handleOnSelect={() => handleOpenNewTransactionModal("EXPENSE")}
          >
            <CategoryIcon type="expense" />
            Nova Despesa
          </DropdownMenuItem>

          <DropdownMenuItem
            className="gap-2"
            handleOnSelect={() => handleOpenNewTransactionModal("INCOME")}
          >
            <CategoryIcon type="income" />
            Nova Receita
          </DropdownMenuItem>

          <DropdownMenuItem
            className="gap-2"
            handleOnSelect={handleOpenNewAccountModal}
          >
            <BankAccountIcon />
            Nova Conta
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenuRoot>
    </div>
  );
}
