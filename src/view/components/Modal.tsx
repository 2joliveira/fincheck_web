import { cn } from "@/app/utils/cn";
import * as Dialog from "@radix-ui/react-dialog";
import { Cross2Icon } from "@radix-ui/react-icons";

interface ModalProps {
  children: React.ReactNode;
  open: boolean;
  title: string;
  rightAction?: React.ReactNode;
  onClose?(): void;
}

export function Modal({
  open,
  title,
  rightAction,
  onClose,
  children,
}: ModalProps) {
  return (
    <Dialog.Root open={open} onOpenChange={onClose}>
      <Dialog.Overlay
        className={cn(
          "fixed inset-0 z-50 bg-black/80 backdrop-blur-sm",
          "data-[state=open]:animate-overlay-show",
        )}
      />
      <Dialog.Portal>
        <Dialog.Content
          aria-describedby={undefined}
          className={cn(
            "fixed top-1/2 left-1/2 z-[51] w-full max-w-[400px] -translate-x-1/2 -translate-y-1/2 space-y-10 rounded-2xl bg-white p-6 shadow-[0px_11px_20px_0px_rgba(0,0,0,0.10)] outline-none",
            "data-[state=open]:animate-content-show",
          )}
        >
          <header className="flex h-12 items-center justify-between text-gray-800">
            <button
              onClick={onClose}
              className="flex h-12 w-12 cursor-pointer items-center justify-center rounded-full outline-none hover:bg-gray-100"
            >
              <Cross2Icon className="h-6 w-6" />
            </button>

            <Dialog.Title>
              <span className="text-lg font-bold tracking-[-1px]">{title}</span>
            </Dialog.Title>

            <div className="flex h-12 w-12 items-center justify-center">
              {rightAction}
            </div>
          </header>

          <div>{children}</div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
