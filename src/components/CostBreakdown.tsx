import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CostCalculation, ProductParams } from "./FulfillmentCalculator";

interface CostBreakdownProps {
  calculation: CostCalculation;
  params: ProductParams;
}

const CostBreakdown: React.FC<CostBreakdownProps> = ({
  calculation,
  params,
}) => {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("ru-RU", {
      style: "currency",
      currency: "RUB",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const costItems = [
    {
      label: "Хранение",
      amount: calculation.storageCost,
      description: `${calculation.totalVolume.toFixed(1)} дм³ × ${params.storagePeriod} дн. × 2,5 ₽`,
      color: "bg-blue-50 border-blue-200",
    },
    {
      label: "Упаковка",
      amount: calculation.packagingCost,
      description: `${params.quantity} шт. × 15 ₽`,
      color: "bg-green-50 border-green-200",
    },
    {
      label: "Обработка",
      amount: calculation.handlingCost,
      description: `${calculation.totalWeight.toFixed(1)} кг × 25 ₽`,
      color: "bg-yellow-50 border-yellow-200",
    },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Детализация расходов</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {costItems.map((item, index) => (
          <div key={index} className={`p-4 rounded-lg border-2 ${item.color}`}>
            <div className="flex justify-between items-start mb-2">
              <h4 className="font-semibold text-gray-800">{item.label}</h4>
              <span className="font-bold text-lg">
                {formatCurrency(item.amount)}
              </span>
            </div>
            <p className="text-sm text-gray-600">{item.description}</p>
          </div>
        ))}

        <div className="pt-4 border-t-2 border-gray-200">
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-bold text-gray-800">Итого:</h3>
            <span className="text-2xl font-bold text-blue-600">
              {formatCurrency(calculation.totalCost)}
            </span>
          </div>
          <p className="text-sm text-gray-600 mt-2">
            Стоимость за {params.storagePeriod} дней хранения
          </p>
        </div>

        <div className="bg-gray-50 p-4 rounded-lg">
          <h4 className="font-semibold mb-2">Характеристики груза:</h4>
          <div className="grid grid-cols-2 gap-2 text-sm">
            <span>
              Общий объём:{" "}
              <strong>{calculation.totalVolume.toFixed(1)} дм³</strong>
            </span>
            <span>
              Общий вес:{" "}
              <strong>{calculation.totalWeight.toFixed(1)} кг</strong>
            </span>
            <span>
              Единиц товара: <strong>{params.quantity} шт.</strong>
            </span>
            <span>
              Период: <strong>{params.storagePeriod} дн.</strong>
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CostBreakdown;
