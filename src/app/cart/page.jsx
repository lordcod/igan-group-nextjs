"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { clearCartItems, deleteCartItem, editCartItem, fetchCartItems } from "@/api";
import {
  ShoppingCart,
  Plus,
  Minus,
  Trash2,
  ArrowLeft,
  Package,
  CreditCard,
  CheckCircle,
} from "lucide-react";

export default function CartPage() {
  const [cart, setCart] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchCartItems().then((data) => {
      setCart(data);
      setIsLoading(false);
    });
  }, []);

  const removeFromCart = (id) => {
    deleteCartItem(id).then(() => {
      const newCart= cart.filter(
        (item) => item.id !== id
      );
      setCart(newCart);
    });
  };

  const updateCartItemQuantity = (id, item, event) => {
    editCartItem(id, item.quantity+event).then((data) => {
      const newCart = cart.map(item => {
        if (item.id == data.id) return data
        return item
      })
      setCart(newCart);
    });
  };

  const getCartTotal = () => {
    return cart.reduce((total, item) => total + item.price, 0);
  };

  const getCartItemsCount = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  const clearCart = () => {
    clearCartItems().then(() => setCart([]));
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center justify-center">
        <div className="text-center">
          <ShoppingCart className="w-12 h-12 mx-auto mb-4 animate-pulse text-blue-600" />
          <p className="text-gray-600">Загрузка корзины...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Назад к конфигуратору
                </Button>
              </Link>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  Корзина
                </h1>
                <p className="text-gray-600 text-sm">
                  {cart.length > 0
                    ? `${getCartItemsCount()} товаров на сумму ${getCartTotal().toLocaleString()} ₽`
                    : "Корзина пуста"}
                </p>
              </div>
            </div>
            {cart.length > 0 && (
              <Button
                variant="outline"
                onClick={clearCart}
                className="text-red-600 hover:text-red-700 bg-transparent"
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Очистить корзину
              </Button>
            )}
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {cart.length === 0 ? (
          // Пустая корзина
          <div className="text-center py-16">
            <Card className="max-w-md mx-auto shadow-lg border-0 bg-white/70 backdrop-blur-sm">
              <CardContent className="p-8">
                <ShoppingCart className="w-16 h-16 mx-auto mb-6 text-gray-400" />
                <h2 className="text-2xl font-bold text-gray-800 mb-4">
                  Корзина пуста
                </h2>
                <p className="text-gray-600 mb-6">
                  Добавьте товары в корзину, чтобы оформить заказ
                </p>
                <Link href="/">
                  <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white">
                    <Package className="w-4 h-4 mr-2" />
                    Перейти к выбору товаров
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        ) : (
          // Корзина с товарами
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Список товаров */}
            <div className="lg:col-span-2 space-y-4">
              <Card className="shadow-lg border-0 bg-white/70 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <ShoppingCart className="w-5 h-5 mr-2" />
                    Товары в корзине ({cart.length})
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {cart.map((item) => (
                    <Card
                      key={item.id}
                      className="relative border border-gray-200"
                    >
                      <CardContent className="p-6">
                        <div className="flex justify-between items-start mb-4">
                          <div className="flex-1">
                            <h3 className="text-xl font-bold text-gray-800 mb-2">
                              Фасад {item.section.name}
                            </h3>
                            <div className="grid grid-cols-2 gap-4 text-sm text-gray-600 mb-4">
                              <div>
                                <span className="font-medium">Размеры:</span>{" "}
                                {item.width} × {item.height} мм
                              </div>
                              <div>
                                <span className="font-medium">Площадь:</span>{" "}
                                {((item.width * item.height) / 1000000).toFixed(
                                  2
                                )}{" "}
                                м²
                              </div>
                            </div>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeFromCart(item.id)}
                            className="text-red-500 hover:text-red-700 hover:bg-red-50"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>

                        {/* Характеристики */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                          <div className="flex items-center space-x-3 p-3 bg-purple-50 rounded-lg">
                            <div
                              className="w-6 h-6 rounded-full border-2 border-gray-300"
                              style={{
                                backgroundColor: item.anodir.borderColor,
                              }}
                            />
                            <div>
                              <div className="text-xs text-purple-600 font-medium">
                                Анодирование
                              </div>
                              <div className="text-sm font-semibold">
                                {item.anodir.name}
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
                            <div
                              className="w-6 h-6 rounded border"
                              style={{
                                backgroundColor: item.filling.backgroundColor,
                              }}
                            />
                            <div>
                              <div className="text-xs text-green-600 font-medium">
                                Заполнение
                              </div>
                              <div className="text-sm font-semibold">
                                {item.filling.name}
                              </div>
                            </div>
                          </div>

                          {item.hardwares.length > 0 && (
                            <div className="p-3 bg-orange-50 rounded-lg">
                              <div className="text-xs text-orange-600 font-medium mb-1">
                                Фурнитура
                              </div>
                              <div className="text-sm font-semibold">
                                {item.hardwares.length} элемент
                                {item.hardwares.length > 1 ? "а" : ""}
                              </div>
                            </div>
                          )}
                        </div>

                        {/* Количество и цена */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4">
                            <span className="text-sm font-medium text-gray-700">
                              Количество:
                            </span>
                            <div className="flex items-center space-x-3">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() =>
                                  updateCartItemQuantity(item.id, item, -1)
                                }
                                disabled={item.quantity <= 1}
                              >
                                <Minus className="w-3 h-3" />
                              </Button>
                              <span className="font-bold text-lg min-w-[2rem] text-center">
                                {item.quantity}
                              </span>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() =>
                                  updateCartItemQuantity(item.id, item, 1)
                                }
                              >
                                <Plus className="w-3 h-3" />
                              </Button>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-2xl font-bold text-blue-600">
                              {item.price.toLocaleString()} ₽
                            </div>
                            <div className="text-sm text-gray-500">
                              {(item.price / item.quantity).toLocaleString()} ₽
                              за шт.
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </CardContent>
              </Card>
            </div>

            {/* Итоговая информация */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 space-y-6">
                {/* Сводка заказа */}
                <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <CheckCircle className="w-5 h-5 mr-2 text-green-600" />
                      Сводка заказа
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      <div className="flex justify-between text-sm">
                        <span>Товаров:</span>
                        <span>{getCartItemsCount()} шт.</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Общая площадь:</span>
                        <span>
                          {cart
                            .reduce((total, item) => {
                              const area = (item.width * item.height) / 1000000;
                              return total + area * item.quantity;
                            }, 0)
                            .toFixed(2)}{" "}
                          м²
                        </span>
                      </div>
                      <Separator />
                      <div className="flex justify-between items-center">
                        <span className="text-lg font-bold">Итого:</span>
                        <span className="text-2xl font-bold text-blue-600">
                          {getCartTotal().toLocaleString()} ₽
                        </span>
                      </div>
                    </div>

                    <Link href="/checkout">
                      <Button
                        className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white shadow-lg"
                        size="lg"
                      >
                        <CreditCard className="w-4 h-4 mr-2" />
                        Оформить заказ
                      </Button>
                    </Link>

                    <Link href="/">
                      <Button
                        variant="outline"
                        className="w-full bg-transparent"
                      >
                        <Package className="w-4 h-4 mr-2" />
                        Продолжить покупки
                      </Button>
                    </Link>
                  </CardContent>
                </Card>

                {/* Информация о доставке */}
                <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
                  <CardContent className="p-4">
                    <h3 className="font-semibold mb-3 text-gray-800">
                      Информация
                    </h3>
                    <div className="space-y-2 text-sm text-gray-600">
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span>Бесплатная доставка от 50 000 ₽</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span>Гарантия качества</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span>Изготовление 5-7 дней</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
