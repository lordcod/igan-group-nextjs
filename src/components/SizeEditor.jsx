"use client";
import React, { useRef, useEffect } from "react";

export default function SizeEditor({
  width,
  height,
  setWidth,
  setHeight,
  borderColor = "#4F46E5",
  backgroundColor = "#ffffff",
  min = 100,
  max = 2500,
}) {
  const MM_PER_PX = 5; // 1 px = 5 мм
  const pxW = width / MM_PER_PX;
  const pxH = height / MM_PER_PX;

  const clamp = (v) => Math.min(max, Math.max(min, v));

  return (
    <section className="mb-8">
      <h3 className="text-xl font-semibold mb-4">Размер фасада</h3>

      <div
        className="relative w-full bg-gray-100 flex items-center justify-center overflow-hidden"
        style={{ minHeight: pxH + 40 }}
      >
        <div
          className="absolute flex items-center justify-center select-none"
          style={{
            width: pxW,
            height: pxH,
            border: `10px solid ${borderColor}`,
            backgroundColor,
          }}
        >
          <span className="text-xs font-semibold text-indigo-800 pointer-events-none">
            {width}×{height} мм
          </span>
        </div>
      </div>

      <div className="flex gap-4 mt-4 flex-wrap">
        <label className="flex flex-col text-sm font-medium">
          Ширина (мм)
          <input
            type="number"
            min={min}
            max={max}
            value={width}
            onChange={(e) => {
              const v = clamp(parseInt(e.target.value, 10));
              if (!isNaN(v)) setWidth(v);
            }}
            className="border px-2 py-1 rounded-md mt-1 w-32"
          />
        </label>
        <label className="flex flex-col text-sm font-medium">
          Высота (мм)
          <input
            type="number"
            min={min}
            max={max}
            value={height}
            onChange={(e) => {
              const v = clamp(parseInt(e.target.value, 10));
              if (!isNaN(v)) setHeight(v);
            }}
            className="border px-2 py-1 rounded-md mt-1 w-32"
          />
        </label>
      </div>

      <p className="mt-2 text-xs text-gray-500">
        Минимальный размер: {min} мм. Максимальный — {max} мм. Если фасад
        больше, холст расширится.
      </p>
    </section>
  );
}
