"use client"

import { useState, useEffect, useMemo } from "react"
import Link from "next/link"
import {
  Card,
  CardContent,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import {
  ArrowLeft,
  Package,
  Clock,
  CheckCircle,
  Truck,
  XCircle,
  User,
  Mail,
  Phone,
  MapPin,
  CreditCard,
  Calendar,
  BarChart3,
} from "lucide-react"

import { getOrders } from "@/api"

// Конфиг статусов с иконками и цветами
const statusConfig = {
  new: { label: "Новый", color: "bg-blue-100 text-blue-800", icon: Clock },
  confirmed: { label: "Подтвержден", color: "bg-yellow-100 text-yellow-800", icon: CheckCircle },
  production: { label: "В производстве", color: "bg-purple-100 text-purple-800", icon: Package },
  ready: { label: "Готов", color: "bg-green-100 text-green-800", icon: CheckCircle },
  shipped: { label: "Отправлен", color: "bg-indigo-100 text-indigo-800", icon: Truck },
  delivered: { label: "Доставлен", color: "bg-green-100 text-green-800", icon: CheckCircle },
  cancelled: { label: "Отменен", color: "bg-red-100 text-red-800", icon: XCircle },
}

const deliveryMethods = {
  pickup: "Самовывоз",
  delivery: "Доставка курьером",
  transport: "Транспортная компания",
}

const paymentMethods = {
  cash: "Наличными",
  card: "Картой",
  transfer: "Банковский перевод",
  online: "Онлайн оплата",
}

// --- Компоненты ---

function Loading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center justify-center">
      <div className="text-center">
        <Package className="w-12 h-12 mx-auto mb-4 animate-pulse text-blue-600" />
        <p className="text-gray-600">Загрузка заказов...</p>
      </div>
    </div>
  )
}

function Header() {
  return (
    <header className="bg-white/80 backdrop-blur-sm shadow-sm border-b sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href="/">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                На главную
              </Button>
            </Link>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Управление заказами
              </h1>
              <p className="text-gray-600 text-sm">Просмотр и управление всеми заказами</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Link href="/admin">
              <Button variant="outline" className="bg-transparent">
                Админка
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
}

function StatusFilter({ statusFilter, setStatusFilter }) {
  return (
    <Card className="shadow-lg border-0 bg-white/70 backdrop-blur-sm">
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <span className="text-sm font-medium">Фильтр по статусу:</span>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Все заказы</SelectItem>
                {Object.entries(statusConfig).map(([key, { label }]) => (
                  <SelectItem key={key} value={key}>
                    {label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="text-sm text-gray-600">
            {/* Кол-во заказов будет в родительском компоненте */}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

function EmptyOrders({ statusFilter }) {
  return (
    <Card className="shadow-lg border-0 bg-white/70 backdrop-blur-sm">
      <CardContent className="p-8 text-center">
        <Package className="w-16 h-16 mx-auto mb-4 text-gray-400" />
        <h3 className="text-xl font-semibold text-gray-800 mb-2">Заказов не найдено</h3>
        <p className="text-gray-600">
          {statusFilter === "all" ? "Пока нет ни одного заказа" : "Нет заказов с выбранным статусом"}
        </p>
      </CardContent>
    </Card>
  )
}

function OrderItem({ order, onUpdateStatus }) {
  const StatusIcon = statusConfig[order.order.status]?.icon || Clock
  return (
    <Card className="shadow-lg border-0 bg-white/70 backdrop-blur-sm">
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Package className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold">Заказ #{order.order.id}</h3>
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Calendar className="w-4 h-4" />
                <span>{new Date(order.order.created_at).toLocaleString("ru-RU")}</span>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Badge className={statusConfig[order.order.status]?.color}>
              <StatusIcon className="w-3 h-3 mr-1" />
              {statusConfig[order.order.status]?.label}
            </Badge>
            <div className="text-right">
              <div className="text-xl font-bold text-blue-600">
                {order.info.price.toLocaleString()} ₽
              </div>
              <div className="text-sm text-gray-500">
                {order.items.reduce((sum, item) => sum + item.quantity, 0)} товаров
              </div>
            </div>
          </div>
        </div>

        <OrderInfo order={order} />

        <OrderItemsList items={order.items} />

        {order.comment && (
          <div className="mb-4">
            <h4 className="font-medium text-gray-800 mb-2">Комментарий:</h4>
            <div className="text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">{order.comment}</div>
          </div>
        )}

        <StatusControl
          currentStatus={order.order.status}
          onChange={(newStatus) => onUpdateStatus(order.id, newStatus)}
        />
      </CardContent>
    </Card>
  )
}

function OrderInfo({ order }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
      {/* Клиент */}
      <div className="space-y-2">
        <h4 className="font-medium text-gray-800 flex items-center">
          <User className="w-4 h-4 mr-2" />
          Клиент
        </h4>
        <div className="text-sm text-gray-600">
          <div>
            {order.info.first_name} {order.info.last_name}
          </div>
          <div className="flex items-center">
            <Mail className="w-3 h-3 mr-1" />
            {order.info.email}
          </div>
          <div className="flex items-center">
            <Phone className="w-3 h-3 mr-1" />
            {order.info.phone}
          </div>
        </div>
      </div>

      {/* Адрес */}
      <div className="space-y-2">
        <h4 className="font-medium text-gray-800 flex items-center">
          <MapPin className="w-4 h-4 mr-2" />
          Адрес
        </h4>
        <div className="text-sm text-gray-600">
          <div>{order.info.address}</div>
          <div>
            {order.info.city}
            {order.info.postalCode && `, ${order.info.postalCode}`}
          </div>
        </div>
      </div>
    </div>
  )
}

function OrderItemsList({ items }) {
  const totalPrice = items.reduce((sum, i) => sum + i.price * i.quantity, 0)

  return (
    <div className="mb-4">
      <h4 className="font-semibold text-gray-800 mb-3 text-lg">Товары</h4>
      <div className="space-y-3">
        {items.map((item) => (
          <div
            key={item.id}
            className="flex gap-4 items-center p-4 bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-shadow"
          >
            {/* Изображение секции */}
            <div className="flex-shrink-0">
              <img
                src={item.section.images?.[0] || "/placeholder.svg"}
                alt={item.section.name}
                width={80}
                height={80}
                className="object-cover rounded-md border w-20 h-20"
              />
            </div>

            {/* Основная информация */}
            <div className="flex-1 min-w-0">
              <div className="font-medium text-gray-800">
                Фасад {item.section.name}
              </div>
              <div className="text-sm text-gray-600">
                {item.width} × {item.height} мм × {item.quantity} шт.
              </div>

              {/* Цвета */}
              <div className="flex items-center gap-2 mt-1">
                <div
                  className="w-4 h-4 rounded-full border"
                  style={{ backgroundColor: item.anodir.borderColor }}
                  title={item.anodir.name}
                />
                <div
                  className="w-4 h-4 rounded border"
                  style={{ backgroundColor: item.filling.backgroundColor }}
                  title={item.filling.name}
                />
                <span className="text-sm text-gray-600">
                  {item.anodir.name}, {item.filling.name}
                </span>
              </div>

              {/* Фурнитура */}
              {item.hardwares?.length > 0 && (
                <div className="text-xs text-gray-500 mt-2 space-y-0.5">
                  {item.hardwares.map((hw) => (
                    <div key={hw.id} className="flex items-center gap-1">
                      <img
                        src={hw.img}
                        width={14}
                        height={14}
                        className="object-contain rounded-sm border"
                      />
                      <span>
                        {hw.name} × {item.hardwares_quantity[hw.id] || 1}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Общая цена */}
            <div className="font-semibold text-gray-800 text-right whitespace-nowrap">
              {(item.price * item.quantity).toLocaleString()} ₽
            </div>
          </div>
        ))}
      </div>

      {/* Итого */}
      <div className="flex justify-end mt-4 border-t border-gray-200 pt-3">
        <div className="text-right">
          <div className="text-sm text-gray-600">Итого по заказу</div>
          <div className="text-lg font-semibold text-gray-900">
            {totalPrice.toLocaleString()} ₽
          </div>
        </div>
      </div>
    </div>
  )
}


function StatusControl({ currentStatus, onChange }) {
  return (
    <div className="flex items-center justify-between pt-4 border-t">
      <div className="flex items-center space-x-2">
        <span className="text-sm font-medium">Изменить статус:</span>
        <Select value={currentStatus} onValueChange={onChange}>
          <SelectTrigger className="w-48">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {Object.entries(statusConfig).map(([key, { label }]) => (
              <SelectItem key={key} value={key}>
                {label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}

function Analytics({ stats }) {
  const analyticsItems = [
    {
      label: "Всего заказов",
      value: stats.total,
      icon: <Package className="w-6 h-6 text-blue-600" />,
      bgColor: "bg-blue-100",
      textColor: "text-gray-900",
    },
    {
      label: "Новые заказы",
      value: stats.new,
      icon: <Clock className="w-6 h-6 text-blue-600" />,
      bgColor: "bg-blue-100",
      textColor: "text-blue-600",
    },
    {
      label: "В работе",
      value: stats.inProgress,
      icon: <Package className="w-6 h-6 text-yellow-600" />,
      bgColor: "bg-yellow-100",
      textColor: "text-yellow-600",
    },
    {
      label: "Выполнено",
      value: stats.completed,
      icon: <CheckCircle className="w-6 h-6 text-green-600" />,
      bgColor: "bg-green-100",
      textColor: "text-green-600",
    },
    {
      label: "Общая выручка",
      value: stats.totalRevenue.toLocaleString() + " ₽",
      icon: <BarChart3 className="w-6 h-6 text-green-600" />,
      bgColor: "bg-green-100",
      textColor: "text-green-600",
      colSpan: "lg:col-span-2",
    },
  ]

  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6`}>
      {analyticsItems.map(({ label, value, icon, bgColor, textColor, colSpan }, idx) => (
        <Card
          key={idx}
          className={`shadow-lg border-0 bg-white/70 backdrop-blur-sm ${colSpan || ""}`}
        >
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{label}</p>
                <p className={`text-3xl font-bold ${textColor}`}>{value}</p>
              </div>
              <div className={`${bgColor} w-12 h-12 rounded-lg flex items-center justify-center`}>
                {icon}
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

// --- Главный компонент страницы ---

export default function OrdersPage() {
  const [orders, setOrders] = useState([])
  const [statusFilter, setStatusFilter] = useState("all")
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    getOrders()
      .then((data) => {
        setOrders(data)
      })
      .finally(() => setIsLoading(false))
  }, [])

  const filteredOrders = useMemo(() => {
    if (statusFilter === "all") return orders
    return orders.filter((order) => order.order.status === statusFilter)
  }, [orders, statusFilter])

  const updateOrderStatus = (orderId, newStatus) => {
    setOrders((prev) =>
      prev.map((order) =>
        order.order.id === orderId
          ? {
              ...order,
              order: { ...order.order, status: newStatus },
              status: newStatus,
            }
          : order
      )
    )
  }

  const stats = useMemo(() => {
    return {
      total: orders.length,
      new: orders.filter((o) => o.order.status === "new").length,
      inProgress: orders.filter((o) =>
        ["confirmed", "production"].includes(o.order.status)
      ).length,
      completed: orders.filter((o) => o.order.status === "delivered").length,
      totalRevenue: orders.reduce((sum, order) => sum + (order.info?.price || 0), 0),
    }
  }, [orders])

  if (isLoading) return <Loading />

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <Header />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <Tabs defaultValue="orders" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 bg-white/70 backdrop-blur-sm">
            <TabsTrigger value="orders" className="flex items-center space-x-2">
              <Package className="w-4 h-4" />
              <span>Заказы</span>
            </TabsTrigger>
            <TabsTrigger value="analytics" className="flex items-center space-x-2">
              <BarChart3 className="w-4 h-4" />
              <span>Аналитика</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="orders">
            <div className="space-y-6">
              <StatusFilter statusFilter={statusFilter} setStatusFilter={setStatusFilter} />
              <div className="text-sm text-gray-600 px-4 pt-2">
                Показано: {filteredOrders.length} из {orders.length} заказов
              </div>

              {filteredOrders.length === 0 ? (
                <EmptyOrders statusFilter={statusFilter} />
              ) : (
                <div className="space-y-4">
                  {filteredOrders
                    .slice()
                    .sort(
                      (a, b) =>
                        new Date(b.order.created_at).getTime() -
                        new Date(a.order.created_at).getTime()
                    )
                    .map((order) => (
                      <OrderItem
                        key={order.order.id}
                        order={order}
                        onUpdateStatus={updateOrderStatus}
                      />
                    ))}
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="analytics">
            <Analytics stats={stats} />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
