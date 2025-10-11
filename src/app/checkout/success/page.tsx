"use client"

import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { CheckCircle, ArrowLeft, Eye } from "lucide-react"
import { getOrder } from "@/api"

export default function SuccessPage() {
  const searchParams = useSearchParams()
  const orderId = searchParams.get("orderId")
  const [order, setOrder] = useState<any>(null)

  useEffect(() => {
    getOrder(orderId).then(setOrder)
  }, [orderId])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
          <CardContent className="p-8 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>

            <h1 className="text-3xl font-bold text-gray-800 mb-4">Заказ успешно оформлен!</h1>

            <p className="text-gray-600 mb-6">
              Спасибо за ваш заказ! Мы получили вашу заявку и свяжемся с вами в ближайшее время для подтверждения
              деталей.
            </p>

            {order && (
              <div className="bg-blue-50 rounded-lg p-4 mb-6">
                <div className="text-sm text-blue-800">
                  <div className="font-medium">Номер заказа: #{order.id}</div>
                  <div>Сумма: {order.price} ₽</div>
                  <div>Email: {order.email}</div>
                </div>
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/">
                <Button variant="outline" className="bg-transparent">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  На главную
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
