import React, { useState, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import StorageForm from "./StorageForm";
import CostBreakdown from "./CostBreakdown";
import ResultsDisplay from "./ResultsDisplay";

export interface ProductParams {
  quantity: number;
  length: number;
  width: number;
  height: number;
  weight: number;
  storagePeriod: number;
  category: "small" | "medium" | "large" | "oversized";
}

export interface CostCalculation {
  storageCost: number;
  packagingCost: number;
  handlingCost: number;
  totalVolume: number;
  totalWeight: number;
  totalCost: number;
}

const FulfillmentCalculator: React.FC = () => {
  const [params, setParams] = useState<ProductParams>({
    quantity: 1,
    length: 20,
    width: 15,
    height: 10,
    weight: 0.5,
    storagePeriod: 30,
    category: "small",
  });

  const calculateCosts = useCallback(
    (productParams: ProductParams): CostCalculation => {
      const { quantity, length, width, height, weight, storagePeriod } =
        productParams;

      // Объем одного товара в куб.см, переводим в куб.дм
      const volumePerItem = (length * width * height) / 1000;
      const totalVolume = volumePerItem * quantity;
      const totalWeight = weight * quantity;

      // Тарифы (руб.)
      const storageRatePerDay = 2.5; // за куб.дм в день
      const packagingRate = 15; // за товар
      const handlingRatePerKg = 25; // за кг

      // Расчёты
      const storageCost = totalVolume * storageRatePerDay * storagePeriod;
      const packagingCost = quantity * packagingRate;
      const handlingCost = totalWeight * handlingRatePerKg;
      const totalCost = storageCost + packagingCost + handlingCost;

      return {
        storageCost,
        packagingCost,
        handlingCost,
        totalVolume,
        totalWeight,
        totalCost,
      };
    },
    [],
  );

  const [calculation, setCalculation] = useState<CostCalculation>(() =>
    calculateCosts(params),
  );

  const handleParamsChange = useCallback(
    (newParams: ProductParams) => {
      setParams(newParams);
      setCalculation(calculateCosts(newParams));
    },
    [calculateCosts],
  );

  return (
    <Card className="w-full max-w-4xl mx-auto shadow-xl">
      <CardHeader className="pb-4">
        <CardTitle className="text-center text-2xl font-bold text-gray-800">
          Калькулятор фулфилмента 📦
        </CardTitle>
        <p className="text-center text-gray-600 text-sm">
          Рассчитайте стоимость хранения и обработки товаров
        </p>
      </CardHeader>
      <CardContent className="p-6">
        <div className="grid lg:grid-cols-2 gap-6">
          <div className="space-y-6">
            <StorageForm params={params} onParamsChange={handleParamsChange} />
            <ResultsDisplay calculation={calculation} />
          </div>
          <div>
            <CostBreakdown calculation={calculation} params={params} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default FulfillmentCalculator;
