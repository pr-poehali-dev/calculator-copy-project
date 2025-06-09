import React from "react";
import { Button } from "@/components/ui/button";

interface OperationButtonsProps {
  onOperationClick: (operation: string) => void;
  onEquals: () => void;
  activeOperation?: string;
}

const OperationButtons: React.FC<OperationButtonsProps> = ({
  onOperationClick,
  onEquals,
  activeOperation,
}) => {
  const operations = [
    { symbol: "÷", value: "/" },
    { symbol: "×", value: "*" },
    { symbol: "−", value: "-" },
    { symbol: "+", value: "+" },
  ];

  return (
    <div className="grid grid-cols-1 gap-3 ml-3">
      {operations.map((op) => (
        <Button
          key={op.value}
          variant={activeOperation === op.value ? "default" : "secondary"}
          size="lg"
          className="h-14 text-xl font-bold transition-all hover:scale-105"
          onClick={() => onOperationClick(op.value)}
        >
          {op.symbol}
        </Button>
      ))}
      <Button
        variant="default"
        size="lg"
        className="h-14 text-xl font-bold bg-primary hover:bg-primary/90 transition-all hover:scale-105"
        onClick={onEquals}
      >
        =
      </Button>
    </div>
  );
};

export default OperationButtons;
