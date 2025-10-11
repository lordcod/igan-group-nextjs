import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check } from "lucide-react";

export function OptionCardSection({
  title,
  description,
  icon,
  options,
  selectedOption,
  onSelect,
  gridCols = "grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5",
  emptyState,
  selectedRingColor = "ring-blue-500",
  selectedBgColor = "bg-blue-50",
  selectedTextColor = "text-blue-600",
  renderExtraContent,
}) {
  const renderPrice = (option) =>
    option.price === 0 ? "Бесплатно" : `+${option.price} ₽/м²`;

  return (
    <Card className="shadow-lg border-0 bg-white/70 backdrop-blur-sm">
      <CardHeader className="pb-4">
        <div className="flex items-center space-x-3">
          <div
            className={`p-2 rounded-lg ${
              selectedBgColor.replace("bg-", "bg-opacity-20") || "bg-blue-100"
            }`}
          >
            {icon}
          </div>
          <div>
            <CardTitle className="text-xl">{title}</CardTitle>
            <p className="text-sm text-gray-600">{description}</p>
          </div>
          {selectedOption && (
            <Badge className="ml-auto bg-green-100 text-green-700 border-green-200">
              <Check className="w-3 h-3 mr-1" />
              Выбрано
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent>
        {emptyState && !options.length ? (
          emptyState
        ) : (
          <div className={`grid ${gridCols} gap-4`}>
            {options.map((option) => {
              const isSelected = selectedOption?.id === option.id;
              return (
                <Card
                  key={option.id}
                  className={`cursor-pointer transition-all duration-200 hover:scale-105 ${
                    isSelected
                      ? `ring-2 ${selectedRingColor} ${selectedBgColor} shadow-lg`
                      : "hover:shadow-md bg-white"
                  }`}
                  onClick={() => onSelect(option)}
                >
                  <CardContent className="p-3">
                    {option.images ? (
                      <div className="flex flex-col gap-1 mb-3 h-80">
                        <div className="flex-1 overflow-hidden rounded-lg flex items-center justify-center">
                          <img
                            src={option.images[0] || "/placeholder.svg"}
                            className="h-full object-cover"
                          />
                        </div>
                        <div className="flex-1 overflow-hidden rounded-lg flex items-center justify-center">
                          <img
                            src={option.images[1] || "/placeholder.svg"}
                            className="h-full object-cover"
                          />
                        </div>
                      </div>
                    ) : (
                      <div className="aspect-square mb-3 bg-gray-100 rounded-lg overflow-hidden">
                        <img
                          src={option.img || "/placeholder.svg"}
                          alt={option.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}

                    <div className="text-center">
                      <h3 className="font-medium text-sm mb-2">
                        {option.name}
                      </h3>
                      {renderExtraContent && renderExtraContent(option)}
                      <div className={`text-sm font-bold ${selectedTextColor}`}>
                        {renderPrice(option)}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
