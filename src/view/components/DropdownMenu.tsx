import { cn } from "@/app/utils/cn";
import * as RdxDropdownMenu from "@radix-ui/react-dropdown-menu";

export function DropdownMenuRoot({ children }: { children: React.ReactNode }) {
  return <RdxDropdownMenu.Root>{children}</RdxDropdownMenu.Root>;
}

interface DropdownMenuTriggerProps {
  children: React.ReactNode;
  className?: string;
}

export function DropdownMenuTrigger({
  children,
  className,
}: DropdownMenuTriggerProps) {
  return (
    <RdxDropdownMenu.Trigger
      className={cn("cursor-pointer outline-none", className)}
    >
      {children}
    </RdxDropdownMenu.Trigger>
  );
}

interface DropdownMenuContentProps {
  children: React.ReactNode;
  className?: string;
}

export function DropdownMenuContent({
  children,
  className,
}: DropdownMenuContentProps) {
  return (
    <RdxDropdownMenu.Portal>
      <RdxDropdownMenu.Content
        side="bottom"
        className={cn(
          "space-y-2 z-50 rounded-2xl bg-white p-2 shadow-[0px_11px_20px_0px_rgba(0,0,0,0.10)]",
          "data-[side=bottom]:animate-slide-up-and-fade",
          "data-[side=top]:animate-slide-down-and-fade",
          className,
        )}
      >
        {children}
      </RdxDropdownMenu.Content>
    </RdxDropdownMenu.Portal>
  );
}

interface DropdownMenuItemProps {
  children: React.ReactNode;
  className?: string;
  handleOnSelect?(): void;
}

export function DropdownMenuItem({
  children,
  className,
  handleOnSelect,
}: DropdownMenuItemProps) {
  return (
    <RdxDropdownMenu.Item
      onSelect={handleOnSelect}
      className={cn(
        "text-smtext-gray-800 flex min-h-[40px] cursor-pointer items-center rounded-2xl px-4 py-2 transition-colors outline-none data-[highlighted]:bg-gray-50",
        className,
      )}
    >
      {children}
    </RdxDropdownMenu.Item>
  );
}
