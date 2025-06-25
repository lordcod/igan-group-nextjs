import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function HardwareSelector({ title, items, state, setState }) {
  const inc = (id) => setState({ ...state, [id]: (state[id] || 0) + 1 });
  const dec = (id) =>
    setState({ ...state, [id]: Math.max(0, (state[id] || 0) - 1) });

  return (
    <section className="mb-8">
      <h3 className="text-xl font-semibold mb-4">{title}</h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {items.map((it) => (
          <Card key={it.id} className="flex flex-col overflow-hidden">
            <img src={it.img} alt={it.name} className="w-full h-24 object-cover" />
            <CardContent className="flex-1 p-2 flex flex-col justify-between text-center">
              <div className="text-sm font-medium leading-tight truncate">
                {it.name}
              </div>
              <div className="text-xs text-gray-500 mb-1">{it.price} ₽/шт</div>
              <div className="flex justify-center items-center gap-1">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => dec(it.id)}
                  className="h-6 w-6"
                >
                  −
                </Button>
                <span className="w-6 text-center">{state[it.id] || 0}</span>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => inc(it.id)}
                  className="h-6 w-6"
                >
                  +
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}