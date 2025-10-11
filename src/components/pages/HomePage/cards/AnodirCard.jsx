import {
  Palette,
} from "lucide-react";
import { OptionCardSection } from "../options/OptionCardSection";



export function AnodirCard({
  selectedOptions,
  setSelectedOptions,
  getAvailableAnodirOptions,
}) {
  return (
    <OptionCardSection
      title="Анодирование (цвет)"
      description="Выберите цвет покрытия профиля"
      icon={<Palette className="w-5 h-5 text-purple-600" />}
      options={selectedOptions.section ? getAvailableAnodirOptions() : []}
      selectedOption={selectedOptions.anodir}
      onSelect={(anodir) => setSelectedOptions((prev) => ({ ...prev, anodir }))}
      selectedRingColor="ring-purple-500"
      selectedBgColor="bg-purple-50"
      selectedTextColor="text-purple-600"
      emptyState={
        !selectedOptions.section && (
          <div className="text-center py-8 text-gray-500">
            <Palette className="w-12 h-12 mx-auto mb-3 opacity-30" />
            <p>Сначала выберите профиль</p>
          </div>
        )
      }
      renderExtraContent={(option) => (
        <div
          className="w-6 h-6 rounded-full mx-auto mb-2 border-2 border-gray-300"
          style={{ backgroundColor: option.borderColor }}
        />
      )}
    />
  );
}