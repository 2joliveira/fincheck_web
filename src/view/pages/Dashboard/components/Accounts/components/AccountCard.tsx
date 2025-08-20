import { cn } from "@/app/utils/cn";
import { formatCurrency } from "@/app/utils/formatCurrency";
import { BankAccountTypeIcon } from "@/view/components/icons/BankAccountTypeIcon";
import { useDashboard } from "../../../context/DashboardContext";
import type { BankAccount } from "@/app/entities/BankAccount";

interface AccountCardProps {
  data: BankAccount;
}

export function AccountCard({ data }: AccountCardProps) {
  const { name, currentBalance, color, type } = data;
  const { areValuesVisible, handleOpenEditAccountModal } = useDashboard();
  return (
    <div
      className="flex h-[200px] cursor-pointer flex-col justify-between rounded-2xl border-b-4 border-gray-700 bg-white p-4 hover:bg-teal-50"
      style={{ borderColor: color }}
      role="button"
      onClick={() => handleOpenEditAccountModal(data)}
    >
      <div className="">
        <BankAccountTypeIcon type={type} />

        <span className="mt-4 block font-medium tracking-[-0.5px] text-gray-800">
          {name}
        </span>
      </div>

      <div>
        <span
          className={cn(
            "block font-medium tracking-[-0.5px] text-gray-800",
            !areValuesVisible && "blur-sm",
          )}
        >
          {formatCurrency(currentBalance)}
        </span>
        <small className="text-sm text-gray-500">Saldo atual</small>
      </div>
    </div>
  );
}
