import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Eye,
} from "lucide-react";
import { FacadePreview } from "../options/FacadePreview";

export const DesktopPreview = ({ selectedOptions }) => {
  return (
    <div className="sticky top-24">
      <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
        <CardHeader className="pb-4">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-green-100 rounded-lg">
              <Eye className="w-5 h-5 text-green-600" />
            </div>
            <CardTitle className="text-lg">Предпросмотр</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <FacadePreview selectedOptions={selectedOptions} />
        </CardContent>
      </Card>
    </div>
  );
};