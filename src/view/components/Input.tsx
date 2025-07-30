import { CrossCircledIcon } from "@radix-ui/react-icons";
import { forwardRef, type ComponentProps } from "react";
import { cn } from "@/app/utils/cn";

interface InputProps extends ComponentProps<"input"> {
  name: string;
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ id, placeholder, name, error, className, ...props }, ref) => {
    const inputId = id ?? name;
    return (
      <div className="relative">
        <input
          {...props}
          ref={ref}
          name={name}
          id={inputId}
          placeholder={placeholder}
          className={cn(
            `peer h-[52px] w-full rounded-lg border border-gray-500 bg-white
            px-3 pt-4 text-gray-800 transition-all outline-none
            placeholder-shown:pt-0 focus:border-gray-800`,
            className,
            error && "!border-red-900",
          )}
        />

        <label
          htmlFor={inputId}
          className="pointer-events-none absolute top-2 left-[13px] text-xs
          text-gray-700 transition-all peer-placeholder-shown:top-3.5
          peer-placeholder-shown:text-base"
        >
          {placeholder}
        </label>

        {error && (
          <div className="mt-2 flex items-center gap-2 text-red-900">
            <CrossCircledIcon />
            <span className="text-xs">{error}</span>
          </div>
        )}
      </div>
    );
  },
);
