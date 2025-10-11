import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export const HardwareOptionGrid = ({
  title,
  options,
  isHardwareSelected,
  toggleHardware,
}) => {
  const [quantities, setQuantities] = useState(0)
  if (options.length === 0) return null;


  const handleChangeQuantity = (hardware, delta) => {
    const current = quantities[hardware.id] || 0;
    const newQuantity = Math.max(current + delta, 0);
    setQuantities((prev) => ({ ...prev, [hardware.id]: newQuantity }));
    toggleHardware(hardware, newQuantity);
  };

  return (
    <div>
      <h3 className="text-lg font-semibold mb-4 text-gray-800">{title}</h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
        {options.map((hardware) => (
          <Card
            key={hardware.id}
            className={`cursor-pointer transition-all duration-200 hover:scale-105 ${
              isHardwareSelected(hardware.id)
                ? "ring-2 ring-orange-500 bg-orange-50 shadow-lg"
                : "hover:shadow-md bg-white"
            }`}
          >
            <CardContent className="p-3 flex flex-col items-center">
              <div className="aspect-square mb-2 bg-gray-100 rounded-lg overflow-hidden w-full">
                <img
                  src={hardware.img || "/placeholder.svg"}
                  alt={hardware.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <h4 className="font-medium text-xs mb-1 text-center line-clamp-2">
                {hardware.name}
              </h4>
              <div className="text-sm font-bold text-orange-600 mb-2">
                +{hardware.price} ₽/шт
              </div>
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleChangeQuantity(hardware, -1)}
                >
                  -
                </Button>
                <span className="w-6 text-center font-medium">
                  {quantities[hardware.id] || 0}
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleChangeQuantity(hardware, 1)}
                >
                  +
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
