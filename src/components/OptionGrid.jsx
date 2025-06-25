import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export default function OptionGrid({
  title,
  options,
  multiple = false,
  value,
  onChange,
}) {
  const handleClick = (opt) => {
    if (multiple) {
      const has = value.includes(opt.id);
      onChange(has ? value.filter((id) => id !== opt.id) : [...value, opt.id]);
    } else {
      onChange(opt.id);
    }
  };

  const isSelected = (opt) => (multiple ? value.includes(opt.id) : value === opt.id);

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
            <img src={opt.img} alt={opt.name} className="w-full h-28 object-cover" />
            <CardContent className="p-2 text-center text-sm font-medium truncate">
              {opt.name}
              {!!opt.price && (
                <span className="block text-xs text-gray-500">{opt.price} ₽</span>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
