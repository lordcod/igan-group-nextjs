
import {
  Package,
} from "lucide-react";
import { OptionCardSection } from "../options/OptionCardSection";


export function SectionCard({ sectionOptions, selectedOptions, setSelectedOptions }) {
  return (
    <OptionCardSection
      title="Выбор профиля"
      description="Выберите подходящий тип алюминиевого профиля"
      icon={<Package className="w-5 h-5 text-blue-600" />}
      options={sectionOptions}
      selectedOption={selectedOptions.section}
      onSelect={(section) =>
        setSelectedOptions((prev) => ({ ...prev, section, anodir: null }))
      }
      gridCols="grid-cols-2 lg:grid-cols-3"
      selectedRingColor="ring-blue-500"
      selectedBgColor="bg-blue-50"
      selectedTextColor="text-blue-600"
    />
  );
}
