import { Transition } from "@headlessui/react";
import { Logo } from "./Logo";
import { Spinner } from "./Spinner";

interface LaunchScreenProps {
  isLoading: boolean;
}

export function LaunchScreen({ isLoading }: LaunchScreenProps) {
  return (
    <Transition show={isLoading}>
      <div
        className="fixed flex h-full w-full flex-col items-center justify-center gap-6 bg-teal-900
        transition duration-300 ease-in data-closed:opacity-0"
      >
        <Logo className="h-10 text-white" />
        <Spinner className="fill-white text-teal-900" />
      </div>
    </Transition>
  );
}
