"use client";
import React, { useState, useMemo } from "react";
import OptionGrid from "./OptionGrid";
import HardwareSelector from "./HardwareSelector";
import SizeEditor from "./SizeEditor";
import SummaryPanel from "./SummaryPanel";
import { Button } from "@/components/ui/button";

export const sectionOptions = [
  {
    id: 2835,
    name: "F1-09",
    img: "https://alkupe.ru/upload/resize_cache/iblock/cf4/300_300_2/cf488f5100c6b43e6afd9a6c2124cdfe.jpg",
    anodir: [2841, 2843],
    price: 2400,
    hardware: {
      handle: ["r1", "r2"],
    },
  },
  {
    id: 2836,
    name: "F1-10",
    img: "https://alkupe.ru/upload/resize_cache/iblock/1b7/300_300_2/1b7023b297866c4062daf5a360194d79.jpg",
    anodir: [2841, 2842, 2843, 2844, 2890],
    price: 2600,
    hardware: {
      hinge: ["h1", "h2"],
    },
  },
  {
    id: 2837,
    name: "F1-19",
    img: "https://alkupe.ru/upload/resize_cache/iblock/60b/300_300_2/60b0e1000161aa6facbbb5ac90b46a55.jpg",
    anodir: [2841, 2842, 2890],
    price: 2500,
    hardware: {
      handle: ["r3"],
      hinge: ["h3", "h4"],
    },
  },
  {
    id: 2885,
    name: "F1-17",
    img: "https://alkupe.ru/upload/resize_cache/iblock/d1f/300_300_2/d1f6ee7729a8779e30171dea3bcaf955.jpg",
    anodir: [2841, 2843],
    price: 2550,
  },
  {
    id: 2886,
    name: "F1-30",
    img: "https://alkupe.ru/upload/resize_cache/iblock/b7a/300_300_2/b7a2c9eee361417195fd39e70ec7b318.jpg",
    anodir: [2841, 2844],
    price: 2650,
  },
  {
    id: 2888,
    name: "F1-33",
    img: "https://alkupe.ru/upload/resize_cache/iblock/1e8/300_300_2/1e86b1082fc8325937cb31c536884116.jpg",
    anodir: [2841, 2842, 2890],
    price: 2700,
  },
  {
    id: 2889,
    name: "F1-33",
    img: "https://alkupe.ru/upload/resize_cache/iblock/1e8/300_300_2/1e86b1082fc8325937cb31c536884116.jpg",
    anodir: [2841, 2842, 2890],
    price: 2700,
  },
  {
    id: 2810,
    name: "F1-33",
    img: "https://alkupe.ru/upload/resize_cache/iblock/1e8/300_300_2/1e86b1082fc8325937cb31c536884116.jpg",
    anodir: [2841, 2842, 2890],
    price: 2700,
  },
];

// ------------------------------------------------------------
// Анодирование (цвет)
export const anodirOptions = [
  {
    id: 2841,
    name: "Серебро",
    img: "https://alkupe.ru/upload/resize_cache/iblock/fd5/300_300_2/fd5cfc46473a56acfdee994f66e3e5cb.jpg",
    price: 200,
    borderColor: "#C0C0C0",
  },
  {
    id: 2842,
    name: "Золото",
    img: "https://alkupe.ru/upload/resize_cache/iblock/fdd/300_300_2/fdd2b28d3ef1a6efbf998cefaf55a0ea.jpg",
    price: 220,
    borderColor: "#D4AF37",
  },
  {
    id: 2843,
    name: "Чёрный",
    img: "https://alkupe.ru/upload/resize_cache/iblock/e94/300_300_2/e94392ea0f25430ff97c0174484723cf.jpg",
    price: 250,
    borderColor: "#111111",
  },
  {
    id: 2844,
    name: "Шампань",
    img: "https://alkupe.ru/upload/resize_cache/iblock/b7c/300_300_2/b7c737e3dc5722b006264958a4e1529d.jpg",
    price: 230,
    borderColor: "#F7E7CE",
  },
  {
    id: 2890,
    name: "Коньяк",
    img: "https://alkupe.ru/upload/resize_cache/iblock/2ec/300_300_2/2ec99e0996da4ac9d80920ed8f3a00b0.jpg",
    price: 240,
    borderColor: "#441309",
  },
];

// ------------------------------------------------------------
// Заполнение (Filling)
export const fillingOptions = [
  {
    id: 2865,
    name: "Зеркало 4 мм",
    img: "https://alkupe.ru/upload/resize_cache/iblock/bba/300_300_2/bba195c951c3012f8dd7a1621e9eb9ad.jpg",
    price: 700,
    backgroundColor: "#e0e0e0",
  },
  {
    id: 2866,
    name: "Зеркало + плёнка",
    img: "https://alkupe.ru/upload/resize_cache/iblock/aca/300_300_2/aca7ab68f945906db6c7e9ea3bbbc35d.jpg",
    price: 750,
    backgroundColor: "#d0d0d0",
  },
  {
    id: 2864,
    name: "Стекло бронза",
    img: "https://alkupe.ru/upload/resize_cache/iblock/e88/300_300_2/e88d413250f1e6c4444b652ceb032d85.jpg",
    price: 650,
    backgroundColor: "#B08D57",
  },
  {
    id: 2846,
    name: "Стекло мателюкс",
    img: "https://alkupe.ru/upload/resize_cache/iblock/38c/300_300_2/38c4e6b36843efd45989cd2ba2794424.jpg",
    price: 600,
    backgroundColor: "#f5f5f5",
  },
  {
    id: 3693,
    name: "Стекло графит",
    img: "https://alkupe.ru/upload/resize_cache/iblock/4bf/300_300_2/4bf59c2b23a1a70e80d1eecdba1fea9e.jpg",
    price: 780,
    backgroundColor: "#4B4B4B",
  },
  {
    id: 2845,
    name: "Без заполнения",
    img: "https://alkupe.ru/upload/resize_cache/iblock/d7f/300_300_2/d7fdcff56c37b56d71ce0afa09f9d5ec.jpg",
    price: 0,
    backgroundColor: "#ffffff",
  },
];

// ------------------------------------------------------------
// Фурнитура (Hardware)
export const hardwareOptions = [
  {
    id: "r1",
    name: "Ручка дуга металл 128 мм.",
    img: "https://игангрупп.рф/upload/resize_cache/iblock/020/100_100_2/020c638cc8c4cef104d9fc50940b89d4.jpg",
    type: "handle",
    price: 45,
  },
  {
    id: "r2",
    name: "Ручка алюминий 128 мм.",
    img: "https://игангрупп.рф/upload/resize_cache/iblock/092/100_100_2/0924495666cc493f657ff232619e558f.jpg",
    type: "handle",
    price: 50,
  },
  {
    id: "r3",
    name: "Ручка рейлинговая 128 мм.",
    img: "https://игангрупп.рф/upload/resize_cache/iblock/acb/100_100_2/acb192e56a09b4547f9bcf04a469eb3d.jpg",
    type: "handle",
    price: 48,
  },
  {
    id: "r4",
    name: "Ручка рейлинговая 192 мм.",
    img: "https://игангрупп.рф/upload/resize_cache/iblock/864/100_100_2/86455850c0827ee3da48c3f3537d3cfd.jpg",
    type: "handle",
    price: 52,
  },
  {
    id: "r5",
    name: "Ручка кнопка металл",
    img: "https://игангрупп.рф/upload/resize_cache/iblock/b9f/100_100_2/b9f000ddbb55efe5efff9c8112d4cb44.jpg",
    type: "handle",
    price: 30,
  },
  {
    id: "h1",
    name: "Петля для широкого алюминиевого профиля накладная Lama",
    img: "https://игангрупп.рф/upload/resize_cache/iblock/6a0/100_100_2/6a0361b1a68c07fd95e96fa08cff6e6b.JPG",
    type: "hinge",
    price: 90,
  },
  {
    id: "h2",
    name: "Петля для широкого алюминиевого профиля накладная Боярд",
    img: "https://игангрупп.рф/upload/resize_cache/iblock/5dc/100_100_2/5dc5435d9b9095e61bd858e1d42adc48.jpg",
    type: "hinge",
    price: 87,
  },
  {
    id: "h3",
    name: "Петля для узкого алюминиевого профиля с амортизатором накладная Боярд",
    img: "https://игангрупп.рф/upload/resize_cache/iblock/fdf/100_100_2/fdf8011f308156f1ca4dab6e1c495d15.jpg",
    type: "hinge",
    price: 92,
  },
  {
    id: "h4",
    name: "Петля для узкого алюминиевого профиля с амортизатором вкладная Боярд",
    img: "https://игангрупп.рф/upload/resize_cache/iblock/733/100_100_2/73341676dd4d8ca3b87b76fd9a106f46.jpg",
    type: "hinge",
    price: 95,
  },
  {
    id: "h5",
    name: "Петля для узкого алюминиевого профиля накладная Lama",
    img: "https://игангрупп.рф/upload/resize_cache/iblock/39f/100_100_2/39fea62b2f7e814a65db2090d9010a08.JPG",
    type: "hinge",
    price: 91,
  },
];

export default function FacadeConfigurator() {
  // ---- state ----
  const [section, setSection] = useState(sectionOptions[0].id);
  const [color, setColor] = useState(anodirOptions[0].id);
  const [filling, setFilling] = useState(fillingOptions[0].id);
  const [width, setWidth] = useState(600); // мм
  const [height, setHeight] = useState(700); // мм
  const [facadeQty, setFacadeQty] = useState(1);
  const [hardware, setHardware] = useState({});

  // ---- derived / memo ----
  const allowedColors = useMemo(() => {
    const prof = sectionOptions.find((s) => s.id === section);
    return prof?.anodir?.length
      ? anodirOptions.filter((c) => prof.anodir.includes(c.id))
      : anodirOptions;
  }, [section]);

  // ---- handlers ----
  const addToCart = () => {
    // Здесь можно отправить на backend
    console.log("CONFIG", {
      section,
      color,
      filling,
      width,
      height,
      facadeQty,
      hardware,
    });
    alert("Добавлено в корзину!");
  };

  const selectedSection = sectionOptions.find((s) => s.id === section);

  const handleOptions = useMemo(() => {
    if (!selectedSection?.hardware?.handle)
      return hardwareOptions.filter((h) => h.type === "handle");
    return hardwareOptions.filter(
      (h) =>
        h.type === "handle" && selectedSection.hardware.handle.includes(h.id)
    );
  }, [section]);

  const hingeOptions = useMemo(() => {
    if (!selectedSection?.hardware?.hinge)
      return hardwareOptions.filter((h) => h.type === "hinge");
    return hardwareOptions.filter(
      (h) => h.type === "hinge" && selectedSection.hardware.hinge.includes(h.id)
    );
  }, [section]);

  return (
    <div className="grid lg:grid-cols-[1fr_320px] gap-8">
      <div>
        <OptionGrid
          title="Профиль"
          options={sectionOptions}
          value={section}
          onChange={setSection}
        />

        <OptionGrid
          title="Анодирование (цвет)"
          options={allowedColors}
          value={color}
          onChange={setColor}
        />

        <OptionGrid
          title="Заполнение"
          options={fillingOptions}
          value={filling}
          onChange={setFilling}
        />

        <SizeEditor
          width={width}
          height={height}
          setWidth={setWidth}
          setHeight={setHeight}
          borderColor={anodirOptions.find((a) => a.id === color)?.borderColor}
          backgroundColor={
            fillingOptions.find((f) => f.id === filling)?.backgroundColor
          }
        />

        {/* Кол‑во фасадов */}
        <section className="mb-8">
          <h3 className="text-xl font-semibold mb-4">Количество фасадов</h3>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => setFacadeQty(Math.max(1, facadeQty - 1))}
            >
              −
            </Button>
            <input
              type="number"
              min="1"
              value={facadeQty}
              onChange={(e) => setFacadeQty(Math.max(1, +e.target.value))}
              className="w-16 text-center border rounded-md py-1"
            />
            <Button
              variant="outline"
              size="icon"
              onClick={() => setFacadeQty(facadeQty + 1)}
            >
              +
            </Button>
          </div>
        </section>

        <HardwareSelector
          title="Ручки, шт"
          items={handleOptions}
          state={hardware}
          setState={setHardware}
        />
        <HardwareSelector
          title="Петли, шт"
          items={hingeOptions}
          state={hardware}
          setState={setHardware}
        />

        <Button onClick={addToCart} className="mt-6 w-full py-3 text-lg">
          Добавить в корзину
        </Button>
      </div>

      <SummaryPanel
        state={{ section, color, filling, width, height, facadeQty, hardware }}
        sectionOptions={sectionOptions}
        anodirOptions={anodirOptions}
        fillingOptions={fillingOptions}
        hardwareOptions={hardwareOptions}
      />
    </div>
  );
}
