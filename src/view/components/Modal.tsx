import { cn } from "@/app/utils/cn";
import * as Dialog from "@radix-ui/react-dialog";

export function Modal() {
  return (
    <Dialog.Root open>
      <Dialog.Overlay
        className={cn(
          "fixed inset-0 z-50 bg-black/80 backdrop-blur-sm",
          "data-[state=open]:animate-overlay-show",
        )}
      />
      <Dialog.Portal>
        <Dialog.Content
          className={cn(
            `fixed top-1/2 left-1/2 z-[51] w-full max-w-[400px] -translate-x-1/2
            -translate-y-1/2 space-y-10 rounded-2xl bg-white p-6
            shadow-[0px_11px_20px_0px_rgba(0,0,0,0.10)]`,
            "data-[state=open]:animate-content-show",
          )}
        >
          <h1>PORRA</h1>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
