import { useState } from "react";
import { CrossCircledIcon } from "@radix-ui/react-icons";
import { cn } from "@/app/utils/cn";
import { formatDate } from "@/app/utils/formatDate";
import { PopoverContent, PopoverRoot, PopoverTrigger } from "./Popover";

interface DatePickerInputProps {
  className?: string;
  error?: string;
}

export function DatePickerInput({ className, error }: DatePickerInputProps) {
  const [selectedDate] = useState(new Date());

  return (
    <div>
      <PopoverRoot>
        <PopoverTrigger>
          <button
            type="button"
            className={cn(
              "relative h-[52px] w-full cursor-pointer rounded-lg border border-gray-500 bg-white px-3 pt-4 text-left text-gray-700 transition-all outline-none focus:border-gray-800",
              className,
              error && "border-red-900",
            )}
          >
            <span className="pointer-events-none absolute top-2 left-[13px] text-xs text-gray-700">
              Data
            </span>
            <span>{formatDate(selectedDate)}</span>
          </button>
        </PopoverTrigger>

        <PopoverContent>
          OPRAAAAI
        </PopoverContent>
      </PopoverRoot>

      {error && (
        <div className="mt-2 flex items-center gap-2 text-red-900">
          <CrossCircledIcon />
          <span className="text-xs">{error}</span>
        </div>
      )}
    </div>
  );
}
