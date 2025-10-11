
import {
  Square,
} from "lucide-react";
import { OptionCardSection } from "../options/OptionCardSection";



export function FillingCard({ fillingOptions, selectedOptions, setSelectedOptions }) {
  return (
    <OptionCardSection
      title="Заполнение"
      description="Выберите тип стекла или заполнения"
      icon={<Square className="w-5 h-5 text-green-600" />}
      options={fillingOptions}
      selectedOption={selectedOptions.filling}
      onSelect={(filling) =>
        setSelectedOptions((prev) => ({ ...prev, filling }))
      }
      selectedRingColor="ring-green-500"
      selectedBgColor="bg-green-50"
      selectedTextColor="text-green-600"
      renderExtraContent={(option) => (
        <div
          className="w-full h-3 rounded mx-auto mb-2 border"
          style={{ backgroundColor: option.backgroundColor }}
        />
      )}
    />
  );
}
