import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import {
  ShoppingCart,
} from "lucide-react";

export const Header = ({ selectedOptions, calculateTotal, cartItemsCount }) => {
  return (
    <header className="bg-white/80 backdrop-blur-sm shadow-sm border-b sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Алюминиевые фасады
            </h1>
            <p className="text-gray-600 text-sm">
              Конфигуратор заказа профилей
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="text-right">
              <div className="text-xl font-bold text-blue-600">
                {calculateTotal().toLocaleString()} ₽
              </div>
              <div className="text-xs text-gray-500">
                {selectedOptions.quantity} шт. ×{" "}
                {(
                  (selectedOptions.width * selectedOptions.height) /
                  1000000
                ).toFixed(2)}{" "}
                м²
              </div>
            </div>

            {/* Cart Button */}
            <Link href="/cart">
              <Button
                variant="outline"
                size="lg"
                className="relative bg-transparent"
              >
                <ShoppingCart className="w-5 h-5 mr-2" />
                Корзина
                {cartItemsCount > 0 && (
                  <Badge className="absolute -top-2 -right-2 bg-red-500 text-white min-w-[1.5rem] h-6 rounded-full flex items-center justify-center text-xs">
                    {cartItemsCount}
                  </Badge>
                )}
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};