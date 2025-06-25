import React from "react";
import { calcTotal } from "@/utils/priceCalc";

export default function SummaryPanel({
  state,
  sectionOptions,
  anodirOptions,
  fillingOptions,
  hardwareOptions,
}) {
  const [delivery, labor] = [0, 0]
  const sectionPrice = sectionOptions.find((s) => s.id === state.section)?.price || 0;
  const anodirPrice = anodirOptions.find((c) => c.id === state.color)?.price || 0;
  const fillingPrice = fillingOptions.find((f) => f.id === state.filling)?.price || 0;
  const hardwareMap = Object.fromEntries(
    Object.entries(state.hardware).map(([id, qty]) => [
      id,
      { qty, price: hardwareOptions.find((h) => h.id === id)?.price || 0 },
    ])
  );

  const total = calcTotal({
    sectionPrice,
    anodirPrice,
    fillingPrice,
    width: state.width,
    height: state.height,
    facadeQty: state.facadeQty,
    hardwareMap,
    delivery,
    labor,
  });

  return (
    <aside className="mt-8 p-4 bg-gray-50 rounded-xl shadow-sm">
      <h3 className="text-lg font-semibold mb-4">Стоимость</h3>
      <ul className="text-sm space-y-1">
        <li>
          <span className="text-gray-600">Фасады:</span> {(sectionPrice + anodirPrice + fillingPrice).toLocaleString()} ₽/м² × {state.facadeQty}
        </li>
        <li>
          <span className="text-gray-600">Фурнитура:</span> {Object.values(hardwareMap).reduce((s, h) => s + h.price * h.qty, 0).toLocaleString()} ₽
        </li>
        <li>
          <span className="text-gray-600">Доставка:</span> {delivery.toLocaleString()} ₽
        </li>
        <li>
          <span className="text-gray-600">Работа:</span> {labor.toLocaleString()} ₽
        </li>
      </ul>
      <div className="h-px my-3 bg-gray-200" />
      <div className="text-xl font-bold">
        Итого: {total.toLocaleString()} ₽
      </div>
    </aside>
  );
}