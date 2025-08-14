import { ptBR } from "date-fns/locale";
import { DayPicker } from "react-day-picker";

interface DatePickerProps {
  value: Date;
  onChange?(date: Date): void;
}

export function DatePicker({ value, onChange }: DatePickerProps) {
  return (
    <DayPicker
      locale={ptBR}
      selected={value}
      mode="single"
      onSelect={(date) => onChange?.(date ?? new Date())}
      className="pointer-events-auto"
      classNames={{
        month_caption: "flex items-center justify-center -mt-6",
        caption_label: "text-gray-900 tracking-[-0.408px] font-medium",
        nav: "flex gap-1 w-full items-center justify-between",
        weekday: "uppercase text-xs text-gray-500 font-medium pt-1 pb-2",
        day_button: "cursor-pointer w-10 h-10 m-1 hover:font-bold",
        today: "bg-gray-100 font-bold text-gray-900 rounded-full",
        selected: "bg-teal-800 text-white font-medium rounded-full hover:!bg-teal-800",
      }}
    />
  );
}
