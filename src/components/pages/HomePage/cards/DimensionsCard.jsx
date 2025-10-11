import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Ruler,
  Plus,
  Minus,
} from "lucide-react";


export const DimensionsCard = ({
  selectedOptions,
  updateDimensions,
  updateQuantity,
}) => (
  <Card className="shadow-lg border-0 bg-white/70 backdrop-blur-sm">
    <CardHeader className="pb-4">
      <div className="flex items-center space-x-3">
        <div className="p-2 bg-indigo-100 rounded-lg">
          <Ruler className="w-5 h-5 text-indigo-600" />
        </div>
        <div>
          <CardTitle className="text-xl">Размеры фасада</CardTitle>
          <p className="text-sm text-gray-600">
            Укажите ширину и высоту в миллиметрах
          </p>
        </div>
      </div>
    </CardHeader>
    <CardContent className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        {["width", "height"].map((dim) => (
          <div key={dim}>
            <Label htmlFor={dim} className="text-sm font-medium">
              {dim === "width" ? "Ширина (мм)" : "Высота (мм)"}
            </Label>
            <Input
              id={dim}
              type="number"
              min="100"
              max="2500"
              value={selectedOptions[dim]}
              onChange={(e) =>
                updateDimensions(dim, Number.parseInt(e.target.value) || 100)
              }
              className="mt-1"
            />
          </div>
        ))}
      </div>
      <Separator />
      <div>
        <Label className="text-sm font-medium mb-3 block">
          Количество фасадов
        </Label>
        <div className="flex items-center space-x-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => updateQuantity(-1)}
            disabled={selectedOptions.quantity <= 1}
          >
            <Minus className="w-4 h-4" />
          </Button>
          <span className="text-lg font-semibold min-w-[3rem] text-center">
            {selectedOptions.quantity}
          </span>
          <Button variant="outline" size="sm" onClick={() => updateQuantity(1)}>
            <Plus className="w-4 h-4" />
          </Button>
        </div>
      </div>
      <p className="text-xs text-gray-500">
        Минимальный размер: 100мм. Максимальный: 2500мм.
      </p>
    </CardContent>
  </Card>
);