import { Logo } from "@/view/components";
import { UserMenu } from "@/view/components/UserMenu";
import { Accounts, Transactions } from "./components";

export function Dashboard() {
  return (
    <div className="flex h-full w-full flex-col gap-4 px-8 pt-8 pb-8">
      <header className="flex h-12 items-center justify-between">
        <Logo className="h-6 text-teal-900" />
        <UserMenu />
      </header>

      <main className="flex flex-1 gap-4">
        <div className="w-1/2">
          <Accounts />
        </div>
        <div className="w-1/2">
          <Transactions />
        </div>
      </main>
    </div>
  );
}
