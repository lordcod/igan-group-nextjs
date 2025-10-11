import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ShoppingCart, Star } from "lucide-react";

export const SummaryCard = ({
  selectedOptions,
  calculateTotal,
  isOrderComplete,
  addToCart,
}) => {
  console.log(selectedOptions);
  return (
    <Card className="shadow-lg border-0 bg-white/70 backdrop-blur-sm">
      <CardHeader className="pb-4">
        <CardTitle className="text-xl flex items-center">
          <ShoppingCart className="w-5 h-5 mr-2" />
          Сводка заказа
        </CardTitle>
      </CardHeader>
      <CardContent>
        {!selectedOptions.section &&
        !selectedOptions.anodir &&
        !selectedOptions.filling &&
        selectedOptions.hardware.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <Star className="w-12 h-12 mx-auto mb-3 opacity-30" />
            <p className="text-sm">Выберите опции для создания заказа</p>
          </div>
        ) : (
          <div className="space-y-3">
            <div className="p-3 bg-indigo-50 rounded-lg">
              <div className="text-sm font-medium text-indigo-800 mb-1">
                Размеры
              </div>
              <div className="text-xs text-indigo-600">
                {selectedOptions.width} × {selectedOptions.height} мм
              </div>
              <div className="text-xs text-indigo-600">
                Площадь:{" "}
                {(
                  (selectedOptions.width * selectedOptions.height) /
                  1000000
                ).toFixed(2)}{" "}
                м²
              </div>
              <div className="text-xs text-indigo-600">
                Количество: {selectedOptions.quantity} шт.
              </div>
            </div>

            {selectedOptions.section && (
              <div className="flex justify-between items-center p-2 bg-blue-50 rounded-lg">
                <span className="text-sm font-medium">
                  Профиль {selectedOptions.section.name}
                </span>
                <span className="font-semibold text-blue-600">
                  {selectedOptions.section.price.toLocaleString()} ₽/м²
                </span>
              </div>
            )}

            {selectedOptions.anodir && (
              <div className="flex justify-between items-center p-2 bg-purple-50 rounded-lg">
                <span className="text-sm font-medium">
                  {selectedOptions.anodir.name}
                </span>
                <span className="font-semibold text-purple-600">
                  +{selectedOptions.anodir.price.toLocaleString()} ₽/м²
                </span>
              </div>
            )}

            {selectedOptions.filling && (
              <div className="flex justify-between items-center p-2 bg-green-50 rounded-lg">
                <span className="text-sm font-medium">
                  {selectedOptions.filling.name}
                </span>
                <span className="font-semibold text-green-600">
                  {selectedOptions.filling.price === 0
                    ? "Бесплатно"
                    : `+${selectedOptions.filling.price.toLocaleString()} ₽/м²`}
                </span>
              </div>
            )}

            {selectedOptions.hardware.map(([hardware, quantities]) => (
              <div
                key={hardware.id}
                className="flex justify-between items-center p-2 bg-orange-50 rounded-lg"
              >
                <span className="text-xs font-medium line-clamp-2">
                  {hardware.name}
                </span>
                <span className="font-semibold text-orange-600 text-sm">
                  +{hardware.price} ₽/шт × {quantities} шт
                </span>
              </div>
            ))}

            <Separator className="my-4" />

            <div className="flex justify-between items-center p-3 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg">
              <span className="font-bold text-lg">Итого:</span>
              <span className="font-bold text-xl text-blue-600">
                {calculateTotal().toLocaleString()} ₽
              </span>
            </div>

            <Button
              className="w-full mt-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg"
              disabled={!isOrderComplete}
              size="lg"
              onClick={addToCart}
            >
              <ShoppingCart className="w-4 h-4 mr-2" />
              {isOrderComplete ? "Добавить в корзину" : "Выберите все опции"}
            </Button>

            {!isOrderComplete && (
              <div className="text-xs text-gray-500 text-center mt-2">
                Необходимо выбрать: профиль, анодирование и заполнение
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
