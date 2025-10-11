import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Eye,
} from "lucide-react";
import { FacadePreview } from "../options/FacadePreview";

export const MobilePreview = ({ selectedOptions }) => (
  <div className="xl:hidden">
    <Card className="shadow-lg border-0 bg-white/70 backdrop-blur-sm">
      <CardHeader className="pb-4">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-green-100 rounded-lg">
            <Eye className="w-5 h-5 text-green-600" />
          </div>
          <div>
            <CardTitle className="text-xl">Предпросмотр</CardTitle>
            <p className="text-sm text-gray-600">
              Визуализация выбранной конфигурации
            </p>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <FacadePreview selectedOptions={selectedOptions} />
      </CardContent>
    </Card>
  </div>
);