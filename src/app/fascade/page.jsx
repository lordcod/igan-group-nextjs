import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

/**
 * FacadeConfigurator – modern redesign of https://alkupe.ru/catalog/alyuminievye-fasady-dlya-mebeli/
 * Features:
 *  • All option cards (section, anodir, filling, etc.) are rendered in responsive grids – no carousels.
 *  • Minimal, clean aesthetic with TailwindCSS + shadcn/ui components.
 *  • Adaptive: 2 cols on mobile → 6 cols on desktop.
 *  • Accessible: keyboard‑focus rings & aria‑labels.
 *  • Selections handled with local state; swap data arrays with backend payload later.
 */

// ‑‑‑ Mock data (replace with API response) ‑‑‑
const sectionOptions = [
  { id: 2835, name: "F1‑09", img: "/images/section/F1‑09.jpg" },
  { id: 2836, name: "F1‑10", img: "/images/section/F1‑10.jpg" },
  { id: 2837, name: "F1‑19", img: "/images/section/F1‑19.jpg" },
  { id: 2838, name: "F1‑33", img: "/images/section/F1‑33.jpg" },
];

const anodirOptions = [
  { id: 2890, name: "Коньяк", img: "/images/anodir/konyak.jpg" },
  { id: 2891, name: "Шампань", img: "/images/anodir/shampan.jpg" },
  { id: 2892, name: "Натуральный", img: "/images/anodir/natural.jpg" },
  { id: 2893, name: "Черный", img: "/images/anodir/black.jpg" },
];

const fillingOptions = [
  { id: 2865, name: "Зеркало 4 мм", img: "/images/filling/4mm‑mirror.jpg" },
  { id: 2846, name: "Мателюкс", img: "/images/filling/matelu×.jpg" },
  { id: 2847, name: "Прозрачное", img: "/images/filling/clear.jpg" },
  { id: 2862, name: "Закаленное", img: "/images/filling/tempered.jpg" },
];

function OptionGrid({ title, multiple = false, options, value, onChange }) {
  const handleClick = (opt) => {
    if (multiple) {
      const exists = value.includes(opt.id);
      onChange(
        exists ? value.filter((id) => id !== opt.id) : [...value, opt.id]
      );
    } else {
      onChange(opt.id);
    }
  };

  const isSelected = (opt) =>
    multiple ? value.includes(opt.id) : value === opt.id;

  return (
    <section className="mb-8">
      <h3 className="text-xl font-semibold mb-4 first:mt-0">{title}</h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {options.map((opt) => (
          <Card
            key={opt.id}
            as="button"
            type="button"
            aria-label={opt.name}
            onClick={() => handleClick(opt)}
            className={cn(
              "relative overflow-hidden p-0 transition-colors duration-200 focus:outline-none",
              isSelected(opt)
                ? "ring-2 ring-offset-2 ring-indigo-500"
                : "ring-1 ring-transparent hover:ring-2 hover:ring-offset-2 hover:ring-gray-300"
            )}
          >
            <img
              src={opt.img}
              alt={opt.name}
              className="w-full h-28 object-cover"
            />
            <CardContent className="p-2 text-center text-sm font-medium truncate">
              {opt.name}
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}

export default function FacadeConfigurator() {
  // state: single‑select for section & anodir, single‑select for filling
  const [section, setSection] = useState(sectionOptions[0].id);
  const [anodir, setAnodir] = useState(anodirOptions[0].id);
  const [filling, setFilling] = useState(fillingOptions[0].id);

  return (
    <div className="max-w-screen‑xl mx-auto px-4 py-10">
      <header className="mb-10 text-center">
        <h1 className="text-3xl font-bold tracking-tight mb-2">
          Алюминиевые фасады&nbsp;на&nbsp;заказ
        </h1>
        <p className="text-gray-600">
          Подберите профиль, анодирование и&nbsp;заполнение в&nbsp;два клика.
        </p>
      </header>

      <OptionGrid
        title="Профиль"
        options={sectionOptions}
        value={section}
        onChange={setSection}
      />
      <OptionGrid
        title="Анодирование"
        options={anodirOptions}
        value={anodir}
        onChange={setAnodir}
      />
      <OptionGrid
        title="Заполнение"
        options={fillingOptions}
        value={filling}
        onChange={setFilling}
      />

      <div className="mt-10 flex justify-center">
        <button className="px-6 py-3 rounded-2xl shadow bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition-colors">
          Добавить в корзину
        </button>
      </div>
    </div>
  );
}
