import type { ComponentProps } from "react";
import { Spinner } from "./Spinner";
import { cn } from "@/app/utils/cn";

interface ButtonProps extends ComponentProps<"button"> {
  isLoading?: boolean;
}

export function Button({
  className,
  isLoading,
  disabled,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      {...props}
      disabled={disabled || isLoading}
      className={cn(
        `flex h-12 cursor-pointer items-center justify-center rounded-2xl bg-teal-900 px-6 font-medium text-white transition-all hover:bg-teal-800 disabled:cursor-not-allowed disabled:bg-gray-100 disabled:text-gray-400`,
        className,
      )}
    >
      {isLoading ? <Spinner className="h-6 w-6" /> : children}
    </button>
  );
}
