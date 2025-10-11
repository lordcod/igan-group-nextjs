"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import Link from "next/link";
import {
  Settings,
  Plus,
  Edit,
  Trash2,
  Save,
  ArrowLeft,
  Package,
  Palette,
  Square,
  Wrench,
  Download,
} from "lucide-react";
import { createHandle, deleteHandle, fetchDataOptions, updateHandle } from "@/api";
import ManagementSection from "./ManagementSection";

const DATA_TYPES = {
  SECTION: "section",
  ANODIR: "anodir",
  FILLING: "filling",
  HARDWARE: "hardware",
};
const SectionForm = ({ section, onSave, onCancel, anodirs, hardwares }) => {
  const initialData = {
    name: section?.name || "",
    images: section?.images || ["", ""],
    price: section?.price || 0,
    anodirs: section?.anodirs?.map(a => a.id) || [],
    hardwares: section?.hardwares?.map(h => h.id) || [],
  };

  const [formData, setFormData] = useState(initialData);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
    onCancel();
  };

  const handleAnodirChange = (id, checked) => {
    setFormData((prev) => ({
      ...prev,
      anodirs: checked
        ? [...prev.anodirs, id]
        : prev.anodirs.filter((i) => i !== id),
    }));
  };

  const handleHardwareChange = (id, checked) => {
    setFormData((prev) => ({
      ...prev,
      hardwares: checked
        ? [...prev.hardwares, id]
        : prev.hardwares.filter((i) => i !== id),
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="name">Название</Label>
        <Input
          id="name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
        />
      </div>
      <div>
        <Label htmlFor="img">URL изображения 1</Label>
        <Input
          id="img"
          value={formData.images[0]}
          onChange={(e) => setFormData({ ...formData, images: [e.target.value, formData.images[1]] })}
          required
        />
      </div>
      <div>
        <Label htmlFor="img">URL изображения 2</Label>
        <Input
          id="img"
          value={formData.images[1]}
          onChange={(e) => setFormData({ ...formData, images: [formData.images[0], e.target.value] })}
          required
        />
      </div>
      <div>
        <Label htmlFor="price">Цена (₽/м²)</Label>
        <Input
          id="price"
          type="number"
          value={formData.price}
          onChange={(e) =>
            setFormData({ ...formData, price: Number(e.target.value) })
          }
          required
        />
      </div>
      <div>
        <Label>Доступные цвета анодирования</Label>
        <div className="grid grid-cols-2 gap-2 mt-2">
          {anodirs.map((anodir) => (
            <div key={anodir.id} className="flex items-center space-x-2">
              <Checkbox
                id={`anodir-${anodir.id}`}
                checked={formData.anodirs.includes(anodir.id)}
                onCheckedChange={(checked) =>
                  handleAnodirChange(anodir.id, checked)
                }
              />
              <Label htmlFor={`anodir-${anodir.id}`} className="text-sm">
                {anodir.name}
              </Label>
            </div>
          ))}
        </div>
      </div>
      <div>
        <Label>Доступная фурнитура</Label>
        <HardwareSelection
          type="handle"
          title="Ручки"
          hardwares={hardwares}
          selected={formData.hardwares}
          onChange={(id, checked) =>
            handleHardwareChange(id, checked)
          }
        />
        <HardwareSelection
          type="hinge"
          title="Петли"
          hardwares={hardwares}
          selected={formData.hardwares}
          onChange={(id, checked) => handleHardwareChange(id, checked)}
        />
      </div>
      <div className="flex justify-end space-x-2">
        <Button type="button" variant="outline" onClick={onCancel}>
          Отмена
        </Button>
        <Button type="submit">
          <Save className="w-4 h-4 mr-2" />
          Сохранить
        </Button>
      </div>
    </form>
  );
};
const HardwareSelection = ({ type, title, hardwares, selected, onChange }) => (
  <div className="mt-3">
    <h4 className="text-sm font-medium text-gray-700 mb-2">{title}</h4>
    <div className="grid grid-cols-1 gap-2 max-h-32 overflow-y-auto border rounded-md p-2">
      {hardwares
        .filter((item) => item.type == type)
        .map((item) => (
          <div key={item.id} className="flex items-center space-x-2">
            <Checkbox
              id={`${type}-${item.id}`}
              checked={selected.includes(item.id)}
              onCheckedChange={(checked) => onChange(item.id, checked)}
            />
            <Label htmlFor={`${type}-${item.id}`} className="text-xs flex-1">
              {item.name}
            </Label>
            <span className="text-xs text-gray-500">{item.price}₽</span>
          </div>
        ))}
    </div>
  </div>
);
const AnodirForm = ({ anodir, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    name: anodir?.name || "",
    img: anodir?.img || "",
    price: anodir?.price || 0,
    borderColor: anodir?.borderColor || "#000000",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
    onCancel();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="name">Название</Label>
        <Input
          id="name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
        />
      </div>
      <div>
        <Label htmlFor="img">URL изображения</Label>
        <Input
          id="img"
          value={formData.img}
          onChange={(e) => setFormData({ ...formData, img: e.target.value })}
          required
        />
      </div>
      <div>
        <Label htmlFor="price">Доплата (₽/м²)</Label>
        <Input
          id="price"
          type="number"
          value={formData.price}
          onChange={(e) =>
            setFormData({ ...formData, price: Number(e.target.value) })
          }
          required
        />
      </div>
      <div>
        <Label htmlFor="borderColor">Цвет</Label>
        <div className="flex items-center space-x-2">
          <Input
            id="borderColor"
            type="color"
            value={formData.borderColor}
            onChange={(e) =>
              setFormData({ ...formData, borderColor: e.target.value })
            }
            className="w-16 h-10"
          />
          <Input
            value={formData.borderColor}
            onChange={(e) =>
              setFormData({ ...formData, borderColor: e.target.value })
            }
            placeholder="#000000"
          />
        </div>
      </div>
      <div className="flex justify-end space-x-2">
        <Button type="button" variant="outline" onClick={onCancel}>
          Отмена
        </Button>
        <Button type="submit">
          <Save className="w-4 h-4 mr-2" />
          Сохранить
        </Button>
      </div>
    </form>
  );
};
const FillingForm = ({ filling, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    name: filling?.name || "",
    img: filling?.img || "",
    price: filling?.price || 0,
    backgroundColor: filling?.backgroundColor || "#ffffff",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
    onCancel();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="name">Название</Label>
        <Input
          id="name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
        />
      </div>
      <div>
        <Label htmlFor="img">URL изображения</Label>
        <Input
          id="img"
          value={formData.img}
          onChange={(e) => setFormData({ ...formData, img: e.target.value })}
          required
        />
      </div>
      <div>
        <Label htmlFor="price">Доплата (₽/м²)</Label>
        <Input
          id="price"
          type="number"
          value={formData.price}
          onChange={(e) =>
            setFormData({ ...formData, price: Number(e.target.value) })
          }
          required
        />
      </div>
      <div>
        <Label htmlFor="backgroundColor">Цвет фона</Label>
        <div className="flex items-center space-x-2">
          <Input
            id="backgroundColor"
            type="color"
            value={formData.backgroundColor}
            onChange={(e) =>
              setFormData({ ...formData, backgroundColor: e.target.value })
            }
            className="w-16 h-10"
          />
          <Input
            value={formData.backgroundColor}
            onChange={(e) =>
              setFormData({ ...formData, backgroundColor: e.target.value })
            }
            placeholder="#ffffff"
          />
        </div>
      </div>
      <div className="flex justify-end space-x-2">
        <Button type="button" variant="outline" onClick={onCancel}>
          Отмена
        </Button>
        <Button type="submit">
          <Save className="w-4 h-4 mr-2" />
          Сохранить
        </Button>
      </div>
    </form>
  );
};
const HardwareForm = ({ hardwareItem, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    name: hardwareItem?.name || "",
    img: hardwareItem?.img || "",
    price: hardwareItem?.price || 0,
    type: hardwareItem?.type || "handle",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
    onCancel();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="name">Название</Label>
        <Input
          id="name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
        />
      </div>
      <div>
        <Label htmlFor="img">URL изображения</Label>
        <Input
          id="img"
          value={formData.img}
          onChange={(e) => setFormData({ ...formData, img: e.target.value })}
          required
        />
      </div>
      <div>
        <Label htmlFor="price">Цена (₽/шт)</Label>
        <Input
          id="price"
          type="number"
          value={formData.price}
          onChange={(e) =>
            setFormData({ ...formData, price: Number(e.target.value) })
          }
          required
        />
      </div>
      <div>
        <Label htmlFor="type">Тип</Label>
        <Select
          value={formData.type}
          onValueChange={(value) => setFormData({ ...formData, type: value })}
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="handle">Ручка</SelectItem>
            <SelectItem value="hinge">Петля</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="flex justify-end space-x-2">
        <Button type="button" variant="outline" onClick={onCancel}>
          Отмена
        </Button>
        <Button type="submit">
          <Save className="w-4 h-4 mr-2" />
          Сохранить
        </Button>
      </div>
    </form>
  );
};
const DeleteDialog = ({
  isOpen,
  onOpenChange,
  title,
  description,
  onConfirm,
}) => (
  <AlertDialog open={isOpen} onOpenChange={onOpenChange}>
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>{title}</AlertDialogTitle>
        <AlertDialogDescription>{description}</AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel>Отмена</AlertDialogCancel>
        <AlertDialogAction
          onClick={onConfirm}
          className="bg-red-600 hover:bg-red-700"
        >
          Удалить
        </AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
);
const ItemCard = ({
  children,
  onEdit,
  onDelete,
  deleteTitle,
  deleteDescription,
}) => {
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  return (
    <Card className="relative group hover:shadow-md transition-shadow">
      {children}
      <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity flex space-x-1">
        <Button size="sm" variant="outline" onClick={onEdit}>
          <Edit className="w-3 h-3" />
        </Button>
        <Button
          size="sm"
          variant="outline"
          className="text-red-600 hover:text-red-700 bg-transparent"
          onClick={() => setIsDeleteOpen(true)}
        >
          <Trash2 className="w-3 h-3" />
        </Button>
      </div>

      <DeleteDialog
        isOpen={isDeleteOpen}
        onOpenChange={setIsDeleteOpen}
        title={deleteTitle}
        description={deleteDescription}
        onConfirm={onDelete}
      />
    </Card>
  );
};
function HardwareItem({ hardwareItem }) {
  return (
    <CardContent className="p-4">
      <div className="aspect-square mb-3 bg-gray-100 rounded-lg overflow-hidden">
        <img
          src={hardwareItem.img || "/placeholder.svg"}
          alt={hardwareItem.name}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="space-y-2">
        <Badge
          variant={hardwareItem.type === "handle" ? "default" : "secondary"}
          className="text-xs"
        >
          {hardwareItem.type === "handle" ? "Ручка" : "Петля"}
        </Badge>
        <h3 className="font-semibold text-sm line-clamp-2">
          {hardwareItem.name}
        </h3>
        <p className="text-lg font-bold text-orange-600">
          {hardwareItem.price} ₽/шт
        </p>
      </div>
    </CardContent>
  );
}
function FillingItem({ filling }) {
  return (
    <CardContent className="p-4">
      <div className="aspect-square mb-3 bg-gray-100 rounded-lg overflow-hidden">
        <img
          src={filling.img || "/placeholder.svg"}
          alt={filling.name}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="space-y-2">
        <h3 className="font-semibold">{filling.name}</h3>
        <div className="flex items-center space-x-2">
          <div
            className="w-6 h-6 rounded border"
            style={{ backgroundColor: filling.backgroundColor }}
          />
          <span className="text-sm text-gray-600">
            {filling.backgroundColor}
          </span>
        </div>
        <p className="text-lg font-bold text-green-600">
          {filling.price === 0 ? "Бесплатно" : `+${filling.price} ₽/м²`}
        </p>
      </div>
    </CardContent>
  );
}
function AnodirItem({ anodir }) {
  return (
    <CardContent className="p-4">
      <div className="aspect-square mb-3 bg-gray-100 rounded-lg overflow-hidden">
        <img
          src={anodir.img || "/placeholder.svg"}
          alt={anodir.name}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="space-y-2">
        <h3 className="font-semibold">{anodir.name}</h3>
        <div className="flex items-center space-x-2">
          <div
            className="w-6 h-6 rounded-full border-2 border-gray-300"
            style={{ backgroundColor: anodir.borderColor }}
          />
          <span className="text-sm text-gray-600">{anodir.borderColor}</span>
        </div>
        <p className="text-lg font-bold text-purple-600">
          +{anodir.price} ₽/м²
        </p>
      </div>
    </CardContent>
  );
}
function SectionItem({ section }) {
  return (
    <CardContent className="p-4">
      <div className="aspect-square mb-3 bg-gray-100 rounded-lg overflow-hidden">
        <img
          src={section.images[0] || "/placeholder.svg"}
          alt={section.name}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="aspect-square mb-3 bg-gray-100 rounded-lg overflow-hidden">
        <img
          src={section.images[1] || "/placeholder.svg"}
          alt={section.name}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="space-y-2">
        <h3 className="font-semibold">{section.name}</h3>
        <p className="text-lg font-bold text-blue-600">
          {section.price.toLocaleString()} ₽/м²
        </p>
        <div className="flex flex-wrap gap-1">
          {section.anodirs.map(
            (anodir) =>
              anodir && (
                <Badge key={anodir.id} variant="secondary" className="text-xs">
                  {anodir.name}
                </Badge>
              )
          )}
        </div>
        <div className="mt-2">
          <div className="mb-1">
            <span className="text-xs text-gray-500">Ручки: </span>
            {section.hardwares.map(
              (item) =>
                item?.type !== "handle" && (
                  <Badge
                    key={item.id}
                    variant="outline"
                    className="text-xs mr-1 mb-1"
                  >
                    {item.name.split(" ").slice(0, 5).join(" ")}
                  </Badge>
                )
            )}
          </div>
          <div>
            <span className="text-xs text-gray-500">Петли: </span>
            {section.hardwares.map(
              (item) =>
                item?.type !== "hinge" && (
                  <Badge
                    key={item.id}
                    variant="outline"
                    className="text-xs mr-1 mb-1"
                  >
                    {item.name.split(" ").slice(0, 5).join(" ")}
                  </Badge>
                )
            )}
          </div>
        </div>
      </div>
    </CardContent>
  );
}

function Header({ exportData }) {
  return (
    <header className="bg-white/80 backdrop-blur-sm shadow-sm border-b sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href="/">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Назад к сайту
              </Button>
            </Link>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent flex items-center">
                <Settings className="w-6 h-6 mr-2 text-blue-600" />
                Панель администратора
              </h1>
              <p className="text-gray-600 text-sm">
                Управление товарами и настройками
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Button onClick={exportData} variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Экспорт
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}

export default function AdminPage() {
  const [data, setData] = useState({
    [DATA_TYPES.SECTION]: [],
    [DATA_TYPES.ANODIR]: [],
    [DATA_TYPES.FILLING]: [],
    [DATA_TYPES.HARDWARE]: [],
  });

  const [editingItem, setEditingItem] = useState({
    type: null,
    data: null,
  });

  const [isDialogOpen, setIsDialogOpen] = useState({
    [DATA_TYPES.SECTION]: false,
    [DATA_TYPES.ANODIR]: false,
    [DATA_TYPES.FILLING]: false,
    [DATA_TYPES.HARDWARE]: false,
  });

  useEffect(() => {
    fetchDataOptions().then((optionsData) => {
      setData({
        [DATA_TYPES.SECTION]: optionsData?.sectionOptions || [],
        [DATA_TYPES.ANODIR]: optionsData?.anodirOptions || [],
        [DATA_TYPES.FILLING]: optionsData?.fillingOptions || [],
        [DATA_TYPES.HARDWARE]: optionsData?.hardwareOptions || [],
      });
    });
  }, []);

  const exportData = () => {
    const blob = new Blob([JSON.stringify(data, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "admin_data.json";
    a.click();
  };

  const addItem = (type, item) => {
    createHandle(type, item).then((newItem) => {
      setData((prev) => ({
        ...prev,
        [type]: [...prev[type], newItem],
      }));
    });
  };

  const updateItem = (type, id, updatedItem) => {
    updateHandle(type, id, updatedItem).then(data => {
      setData((prev) => ({
        ...prev,
        [type]: prev[type].map((item) =>
          item.id === id ? { ...item, ...data } : item
        ),
      }));
    })
  };

  const deleteItem = (type, id) => {
    deleteHandle(type, id).then(() => {
      setData((prev) => ({
        ...prev,
        [type]: prev[type].filter((item) => item.id !== id),
      }));
    });
  };

  const sections = data[DATA_TYPES.SECTION];
  const anodirs = data[DATA_TYPES.ANODIR];
  const fillings = data[DATA_TYPES.FILLING];
  const hardwares = data[DATA_TYPES.HARDWARE];

  const managementConfigs = [
    {
      type: DATA_TYPES.SECTION,
      title: "Профили",
      icon: <Package className="w-4 h-4" />,
      cardIcon: <Package className="w-5 h-5 mr-2" />,
      description: "Управление алюминиевыми профилями",
      data: sections,
      formComponent: (props) => (
        <SectionForm anodirs={anodirs} hardwares={hardwares} {...props} />
      ),
      renderItem: (item) => <SectionItem section={item} />,
      getName: (item) => item.name,
    },
    {
      type: DATA_TYPES.ANODIR,
      title: "Анодирование",
      icon: <Palette className="w-4 h-4" />,
      cardIcon: <Palette className="w-5 h-5 mr-2" />,
      description: "Управление цветами анодирования",
      data: anodirs,
      formComponent: (props) => <AnodirForm {...props} />,
      renderItem: (item) => <AnodirItem anodir={item} />,
      getName: (item) => item.name,
    },
    {
      type: DATA_TYPES.FILLING,
      title: "Заполнение",
      icon: <Square className="w-4 h-4" />,
      cardIcon: <Square className="w-5 h-5 mr-2" />,
      description: "Управление типами заполнения",
      data: fillings,
      formComponent: (props) => <FillingForm {...props} />,
      renderItem: (item) => <FillingItem filling={item} />,
      getName: (item) => item.name,
    },
    {
      type: DATA_TYPES.HARDWARE,
      title: "Фурнитура",
      icon: <Wrench className="w-4 h-4" />,
      cardIcon: <Wrench className="w-5 h-5 mr-2" />,
      description: "Управление ручками и петлями",
      data: hardwares,
      formComponent: (props) => <HardwareForm {...props} />,
      renderItem: (item) => <HardwareItem hardwareItem={item} />,
      getName: (item) => item.name,
    },
  ];
  const editForms = {
    [DATA_TYPES.SECTION]: {
      Component: SectionForm,
      propName: "section",
      extraProps: { anodirs, hardwares },
    },
    [DATA_TYPES.ANODIR]: {
      Component: AnodirForm,
      propName: "anodir",
    },
    [DATA_TYPES.FILLING]: {
      Component: FillingForm,
      propName: "filling",
    },
    [DATA_TYPES.HARDWARE]: {
      Component: HardwareForm,
      propName: "hardwareItem",
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Header */}
      <Header exportData={exportData} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <Tabs defaultValue={DATA_TYPES.SECTION} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 bg-white/70 backdrop-blur-sm">
            {managementConfigs.map(({ type, title, icon }) => (
              <TabsTrigger
                key={type}
                value={type}
                className="flex items-center space-x-2"
              >
                {icon}
                <span>{title}</span>
              </TabsTrigger>
            ))}
          </TabsList>

          {managementConfigs.map(
            ({
              type,
              title,
              cardIcon,
              description,
              data,
              formComponent,
              renderItem,
              getName,
            }) => (
              <ManagementSection
                key={type}
                type={type}
                title={title}
                icon={cardIcon}
                description={description}
                isOpen={isDialogOpen[type]}
                setIsOpen={(val) =>
                  setIsDialogOpen((prev) => ({ ...prev, [type]: val }))
                }
                data={data}
                formComponent={formComponent}
                renderItems={() =>
                  data.map((item) => (
                    <ItemCard
                      key={item.id}
                      onEdit={() => setEditingItem({ type, data: item })}
                      onDelete={() => deleteItem(type, item.id)}
                      deleteTitle={`Удалить ${title.toLowerCase()}?`}
                      deleteDescription={`Это действие нельзя отменить. ${title} "${getName(
                        item
                      )}" будет удален навсегда.`}
                    >
                      {renderItem(item)}
                    </ItemCard>
                  ))
                }
                onAdd={addItem}
              />
            )
          )}
        </Tabs>
      </div>

      <Dialog
        open={!!editingItem.type}
        onOpenChange={(open) =>
          !open && setEditingItem({ type: null, data: null })
        }
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Редактировать</DialogTitle>
          </DialogHeader>

          {editingItem.type &&
            (() => {
              const {
                Component,
                propName,
                extraProps = {},
              } = editForms[editingItem.type];
              const props = {
                [propName]: editingItem.data,
                ...extraProps,
                onSave: (data) => {
                  updateItem(editingItem.type, editingItem.data.id, data);
                  setEditingItem({ type: null, data: null });
                },
                onCancel: () => setEditingItem({ type: null, data: null }),
              };
              return <Component {...props} />;
            })()}
        </DialogContent>
      </Dialog>
    </div>
  );
}
