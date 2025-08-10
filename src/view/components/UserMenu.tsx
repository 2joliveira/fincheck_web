import { ExitIcon } from "@radix-ui/react-icons";
import {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuRoot,
  DropdownMenuTrigger,
} from "./DropdownMenu";
import { useAuth } from "@/app/hooks/useAuth";

export function UserMenu() {
  const { signout } = useAuth();

  return (
    <DropdownMenuRoot>
      <DropdownMenuTrigger>
        <div className="flex h-12 w-12 items-center justify-center rounded-full border border-teal-100 bg-teal-50">
          <span className="tracking[-0.5px] text-sm font-medium text-teal-900">
            JO
          </span>
        </div>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-32">
        <DropdownMenuItem
          handleOnSelect={signout}
          className="flex items-center justify-between"
        >
          Sair <ExitIcon className="h-4 w-4" />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenuRoot>
  );
}
