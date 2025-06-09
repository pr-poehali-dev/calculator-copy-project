import React from "react";
import { Button } from "@/components/ui/button";

interface NumberPadProps {
  onNumberClick: (number: string) => void;
  onClear: () => void;
  onDelete: () => void;
  onDecimal: () => void;
}

const NumberPad: React.FC<NumberPadProps> = ({
  onNumberClick,
  onClear,
  onDelete,
  onDecimal,
}) => {
  const numbers = [
    ["C", "⌫", "%"],
    ["7", "8", "9"],
    ["4", "5", "6"],
    ["1", "2", "3"],
    ["0", ".", "="],
  ];

  const handleClick = (value: string) => {
    if (value === "C") {
      onClear();
    } else if (value === "⌫") {
      onDelete();
    } else if (value === ".") {
      onDecimal();
    } else if (value === "%") {
      onNumberClick("%");
    } else if (!["="].includes(value)) {
      onNumberClick(value);
    }
  };

  const getButtonVariant = (value: string) => {
    if (["C", "⌫"].includes(value)) return "destructive";
    if (["%"].includes(value)) return "secondary";
    return "outline";
  };

  return (
    <div className="grid grid-cols-3 gap-3">
      {numbers.flat().map((num) => (
        <Button
          key={num}
          variant={getButtonVariant(num)}
          size="lg"
          className={`h-14 text-lg font-semibold transition-all hover:scale-105 ${
            num === "0" ? "col-span-2" : ""
          } ${num === "=" ? "bg-primary text-white hover:bg-primary/90" : ""}`}
          onClick={() => handleClick(num)}
        >
          {num}
        </Button>
      ))}
    </div>
  );
};

export default NumberPad;
