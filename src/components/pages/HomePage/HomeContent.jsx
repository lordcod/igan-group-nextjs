import { AnodirCard } from "./cards/AnodirCard";
import { DimensionsCard } from "./cards/DimensionsCard";
import { FillingCard } from "./cards/FillingCard";
import { HardwareCard } from "./cards/HardwareCard";
import { SectionCard } from "./cards/SectionCard";
import { SummaryCard } from "./cards/SummaryCard";
import { DesktopPreview } from "./section/DesktopPreview";
import { Header } from "./section/Header";
import { MobilePreview } from "./section/MobilePreview";

export default function HomeContent({
  selectedOptions,
  calculateTotal,
  cartItemsCount,
  updateDimensions,
  updateQuantity,
  sectionOptions,
  setSelectedOptions,
  fillingOptions,
  getAvailableHardwareOptions,
  getAvailableAnodirOptions,
  isHardwareSelected,
  toggleHardware,
  isOrderComplete,
  addToCart,
}) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <Header
        selectedOptions={selectedOptions}
        calculateTotal={calculateTotal}
        cartItemsCount={cartItemsCount}
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
          <div className="xl:col-span-3 space-y-6">
            <MobilePreview selectedOptions={selectedOptions} />
            <DimensionsCard
              selectedOptions={selectedOptions}
              updateQuantity={updateQuantity}
              updateDimensions={updateDimensions}
            />
            <SectionCard
              sectionOptions={sectionOptions}
              selectedOptions={selectedOptions}
              setSelectedOptions={setSelectedOptions}
            />
            <AnodirCard
              getAvailableAnodirOptions={getAvailableAnodirOptions}
              selectedOptions={selectedOptions}
              setSelectedOptions={setSelectedOptions}
            />
            <FillingCard
              fillingOptions={fillingOptions}
              selectedOptions={selectedOptions}
              setSelectedOptions={setSelectedOptions}
            />
            <HardwareCard
              getAvailableHardwareOptions={getAvailableHardwareOptions}
              isHardwareSelected={isHardwareSelected}
              toggleHardware={toggleHardware}
              selectedOptions={selectedOptions}
            />
            <SummaryCard
              selectedOptions={selectedOptions}
              calculateTotal={calculateTotal}
              isOrderComplete={isOrderComplete}
              addToCart={addToCart}
            />
          </div>

          <div className="hidden xl:block xl:col-span-1">
            <DesktopPreview selectedOptions={selectedOptions} />
          </div>
        </div>
      </div>
    </div>
  );
}
