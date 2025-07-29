/* eslint-disable @typescript-eslint/no-empty-object-type */
import type { ComponentProps } from "react";
import { cn } from "../utils/cn";

interface ButtonProps extends ComponentProps<"button"> {
  isLoading?: boolean;
}

export function Button({
  className,
  isLoading,
  disabled,
  ...props
}: ButtonProps) {
  return (
    <button
      {...props}
      disabled={disabled || isLoading}
      className={cn(
        `h-12 cursor-pointer rounded-2xl bg-teal-900 px-6 font-medium
        text-white transition-all hover:bg-teal-800
        disabled:cursor-not-allowed disabled:bg-gray-100 disabled:text-gray-400`,
        className,
      )}
    />
  );
}
