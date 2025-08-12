import * as RdxSelect from "@radix-ui/react-select";
import {
  ChevronDownIcon,
  ChevronUpIcon,
  CrossCircledIcon,
} from "@radix-ui/react-icons";
import { cn } from "@/app/utils/cn";

interface SelectProps {
  className?: string;
  error?: string;
}

export function Select({ className, error }: SelectProps) {
  return (
    <div>
      <RdxSelect.Root>
        <RdxSelect.Trigger
          className={cn(
            `relative h-[52px] w-full cursor-pointer rounded-lg border border-gray-500 bg-white px-3 text-left text-gray-800 transition-all outline-none focus:border-gray-800`,
            className,
            error && "border-red-900",
          )}
        >
          <RdxSelect.Value />

          <RdxSelect.Icon className="absolute right-3">
            <ChevronDownIcon className="h-6 w-6 text-gray-800" />
          </RdxSelect.Icon>
        </RdxSelect.Trigger>

        <RdxSelect.Portal>
          <RdxSelect.Content className="z-[52] overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-[0px_11px_20px_0px_rgba(0,0,0,0.10)]">
            <RdxSelect.ScrollUpButton className="flex h-[25px] cursor-default items-center justify-center bg-white text-gray-800">
              <ChevronUpIcon />
            </RdxSelect.ScrollUpButton>

            <RdxSelect.Viewport className="p-2">
              <RdxSelect.Item
                value="Banana"
                className="p-2 text-sm text-gray-800 outline-none"
              >
                <RdxSelect.ItemText>Banana</RdxSelect.ItemText>
              </RdxSelect.Item>

              <RdxSelect.Item
                value="Uva"
                className="p-2 text-sm text-gray-800 outline-none"
              >
                <RdxSelect.ItemText>Uva</RdxSelect.ItemText>
              </RdxSelect.Item>

              <RdxSelect.Item
                value="laranja"
                className="cursor-pointer rounded-lg p-2 text-sm text-gray-800 transition-colors outline-none data-[highlighted]:bg-gray-100 data-[state=checked]:font-bold"
              >
                <RdxSelect.ItemText>laranja</RdxSelect.ItemText>
              </RdxSelect.Item>
            </RdxSelect.Viewport>

            <RdxSelect.ScrollDownButton className="flex h-[25px] cursor-default items-center justify-center bg-white text-gray-800">
              <ChevronDownIcon />
            </RdxSelect.ScrollDownButton>
          </RdxSelect.Content>
        </RdxSelect.Portal>
      </RdxSelect.Root>

      {error && (
        <div className="mt-2 flex items-center gap-2 text-red-900">
          <CrossCircledIcon />
          <span className="text-xs">{error}</span>
        </div>
      )}
    </div>
  );
}
