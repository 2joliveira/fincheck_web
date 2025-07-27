import type { ComponentProps } from "react";

interface InputProps extends ComponentProps<"input"> {
  name: string;
}

export function Input({ id, placeholder, name, ...props }: InputProps) {
  const inputId = id ?? name;
  return (
    <div className="relative">
      <input
        {...props}
        name={name}
        id={inputId}
        placeholder={placeholder}
        className="peer h-[52px] w-full rounded-lg border border-gray-500
        bg-white px-3 pt-4 text-gray-800 transition-all outline-none
        placeholder-shown:pt-0 focus:border-gray-800"
      />

      <label
        htmlFor={inputId}
        className="pointer-events-none absolute top-2 left-[13px] text-xs
        text-gray-700 transition-all peer-placeholder-shown:top-3.5
        peer-placeholder-shown:text-base"
      >
        {placeholder}
      </label>
    </div>
  );
}
