import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ProductParams } from "./FulfillmentCalculator";

interface StorageFormProps {
  params: ProductParams;
  onParamsChange: (params: ProductParams) => void;
}

const StorageForm: React.FC<StorageFormProps> = ({
  params,
  onParamsChange,
}) => {
  const handleInputChange = (
    field: keyof ProductParams,
    value: string | number,
  ) => {
    onParamsChange({
      ...params,
      [field]: typeof value === "string" ? parseFloat(value) || 0 : value,
    });
  };

  const handleCategoryChange = (category: string) => {
    onParamsChange({
      ...params,
      category: category as ProductParams["category"],
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Параметры товара</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="quantity">Количество (шт.)</Label>
            <Input
              id="quantity"
              type="number"
              min="1"
              value={params.quantity}
              onChange={(e) => handleInputChange("quantity", e.target.value)}
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="weight">Вес единицы (кг)</Label>
            <Input
              id="weight"
              type="number"
              step="0.1"
              min="0.1"
              value={params.weight}
              onChange={(e) => handleInputChange("weight", e.target.value)}
              className="mt-1"
            />
          </div>
        </div>

        <div>
          <Label>Размеры единицы товара (см)</Label>
          <div className="grid grid-cols-3 gap-2 mt-2">
            <div>
              <Label htmlFor="length" className="text-sm text-gray-600">
                Длина
              </Label>
              <Input
                id="length"
                type="number"
                min="1"
                value={params.length}
                onChange={(e) => handleInputChange("length", e.target.value)}
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="width" className="text-sm text-gray-600">
                Ширина
              </Label>
              <Input
                id="width"
                type="number"
                min="1"
                value={params.width}
                onChange={(e) => handleInputChange("width", e.target.value)}
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="height" className="text-sm text-gray-600">
                Высота
              </Label>
              <Input
                id="height"
                type="number"
                min="1"
                value={params.height}
                onChange={(e) => handleInputChange("height", e.target.value)}
                className="mt-1"
              />
            </div>
          </div>
        </div>

        <div>
          <Label htmlFor="storagePeriod">Период хранения (дней)</Label>
          <Input
            id="storagePeriod"
            type="number"
            min="1"
            value={params.storagePeriod}
            onChange={(e) => handleInputChange("storagePeriod", e.target.value)}
            className="mt-1"
          />
        </div>

        <div>
          <Label>Категория товара</Label>
          <Select value={params.category} onValueChange={handleCategoryChange}>
            <SelectTrigger className="mt-1">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="small">Мелкий (до 1000 см³)</SelectItem>
              <SelectItem value="medium">Средний (1000-5000 см³)</SelectItem>
              <SelectItem value="large">Крупный (5000-15000 см³)</SelectItem>
              <SelectItem value="oversized">
                Негабарит (свыше 15000 см³)
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardContent>
    </Card>
  );
};

export default StorageForm;
