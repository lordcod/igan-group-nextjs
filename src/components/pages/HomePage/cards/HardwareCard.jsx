const { HardwareOptionGrid } = require("../options/HardwareOptionGrid");
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Check,
  Wrench,
} from "lucide-react";


export const HardwareCard = ({
  selectedOptions,
  getAvailableHardwareOptions,
  isHardwareSelected,
  toggleHardware,
}) => {
  const handleOptions = getAvailableHardwareOptions("handle");
  const hingeOptions = getAvailableHardwareOptions("hinge");

  const hasOptions = handleOptions.length > 0 || hingeOptions.length > 0;

  return (
    <Card className="shadow-lg border-0 bg-white/70 backdrop-blur-sm">
      <CardHeader className="pb-4">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-orange-100 rounded-lg">
            <Wrench className="w-5 h-5 text-orange-600" />
          </div>
          <div>
            <CardTitle className="text-xl">Фурнитура</CardTitle>
            <p className="text-sm text-gray-600">
              Выберите ручки и петли (можно несколько)
            </p>
          </div>
          {selectedOptions.hardware.length > 0 && (
            <Badge className="ml-auto bg-green-100 text-green-700 border-green-200">
              <Check className="w-3 h-3 mr-1" />
              {selectedOptions.hardware.length} выбрано
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent>
        {!selectedOptions.section ? (
          <div className="text-center py-8 text-gray-500">
            <Wrench className="w-12 h-12 mx-auto mb-3 opacity-30" />
            <p>Сначала выберите профиль</p>
          </div>
        ) : hasOptions ? (
          <div className="space-y-6">
            <HardwareOptionGrid
              title="Ручки"
              options={handleOptions}
              isHardwareSelected={isHardwareSelected}
              toggleHardware={toggleHardware}
            />
            <HardwareOptionGrid
              title="Петли"
              options={hingeOptions}
              isHardwareSelected={isHardwareSelected}
              toggleHardware={toggleHardware}
            />
          </div>
        ) : (
          <div className="text-center py-8 text-gray-500">
            <Wrench className="w-12 h-12 mx-auto mb-3 opacity-30" />
            <p>Для данного профиля фурнитура не требуется</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
