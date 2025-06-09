import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { CostCalculation } from "./FulfillmentCalculator";

interface ResultsDisplayProps {
  calculation: CostCalculation;
}

const ResultsDisplay: React.FC<ResultsDisplayProps> = ({ calculation }) => {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("ru-RU", {
      style: "currency",
      currency: "RUB",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const dailyCost = calculation.totalCost / 30; // примерно в день
  const monthlyCost = calculation.totalCost;

  return (
    <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
      <CardContent className="p-6">
        <div className="text-center">
          <h3 className="text-2xl font-bold text-gray-800 mb-4">
            Результат расчёта 💰
          </h3>

          <div className="space-y-4">
            <div className="bg-white rounded-lg p-4 shadow-sm border">
              <div className="text-3xl font-bold text-blue-600 mb-1">
                {formatCurrency(calculation.totalCost)}
              </div>
              <div className="text-gray-600 text-sm">Общая стоимость</div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="bg-white rounded-lg p-3 shadow-sm border">
                <div className="text-lg font-bold text-green-600">
                  {formatCurrency(dailyCost)}
                </div>
                <div className="text-gray-600 text-xs">В день</div>
              </div>
              <div className="bg-white rounded-lg p-3 shadow-sm border">
                <div className="text-lg font-bold text-purple-600">
                  {formatCurrency(monthlyCost)}
                </div>
                <div className="text-gray-600 text-xs">В месяц</div>
              </div>
            </div>
          </div>

          <div className="mt-4 p-3 bg-yellow-50 rounded-lg border border-yellow-200">
            <p className="text-sm text-yellow-800">
              💡 Цены указаны без НДС. Итоговая стоимость может изменяться в
              зависимости от дополнительных услуг.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ResultsDisplay;
