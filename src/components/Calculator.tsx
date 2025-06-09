import React, { useState, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Display from "./Display";
import NumberPad from "./NumberPad";
import OperationButtons from "./OperationButtons";

const Calculator: React.FC = () => {
  const [display, setDisplay] = useState("0");
  const [previousValue, setPreviousValue] = useState<number | null>(null);
  const [operation, setOperation] = useState<string | null>(null);
  const [waitingForNewValue, setWaitingForNewValue] = useState(false);
  const [expression, setExpression] = useState("");

  const inputNumber = useCallback(
    (num: string) => {
      if (waitingForNewValue) {
        setDisplay(num);
        setWaitingForNewValue(false);
      } else {
        setDisplay(display === "0" ? num : display + num);
      }
    },
    [display, waitingForNewValue],
  );

  const inputDecimal = useCallback(() => {
    if (waitingForNewValue) {
      setDisplay("0.");
      setWaitingForNewValue(false);
    } else if (display.indexOf(".") === -1) {
      setDisplay(display + ".");
    }
  }, [display, waitingForNewValue]);

  const clear = useCallback(() => {
    setDisplay("0");
    setPreviousValue(null);
    setOperation(null);
    setWaitingForNewValue(false);
    setExpression("");
  }, []);

  const deleteLastDigit = useCallback(() => {
    if (display.length > 1) {
      setDisplay(display.slice(0, -1));
    } else {
      setDisplay("0");
    }
  }, [display]);

  const performOperation = useCallback(
    (nextOperation: string) => {
      const inputValue = parseFloat(display);

      if (previousValue === null) {
        setPreviousValue(inputValue);
        setExpression(`${inputValue} ${nextOperation}`);
      } else if (operation) {
        const currentValue = previousValue || 0;
        let result: number;

        switch (operation) {
          case "+":
            result = currentValue + inputValue;
            break;
          case "-":
            result = currentValue - inputValue;
            break;
          case "*":
            result = currentValue * inputValue;
            break;
          case "/":
            result = inputValue !== 0 ? currentValue / inputValue : 0;
            break;
          default:
            return;
        }

        const resultString = String(result);
        setDisplay(resultString);
        setPreviousValue(result);
        setExpression(`${result} ${nextOperation}`);
      }

      setWaitingForNewValue(true);
      setOperation(nextOperation);
    },
    [display, previousValue, operation],
  );

  const calculate = useCallback(() => {
    if (operation && previousValue !== null) {
      const inputValue = parseFloat(display);
      const currentValue = previousValue;
      let result: number;

      switch (operation) {
        case "+":
          result = currentValue + inputValue;
          break;
        case "-":
          result = currentValue - inputValue;
          break;
        case "*":
          result = currentValue * inputValue;
          break;
        case "/":
          result = inputValue !== 0 ? currentValue / inputValue : 0;
          break;
        default:
          return;
      }

      const resultString = String(result);
      setDisplay(resultString);
      setExpression(`${currentValue} ${operation} ${inputValue} =`);
      setPreviousValue(null);
      setOperation(null);
      setWaitingForNewValue(true);
    }
  }, [display, operation, previousValue]);

  return (
    <Card className="w-full max-w-md mx-auto shadow-xl">
      <CardHeader className="pb-4">
        <CardTitle className="text-center text-2xl font-bold text-gray-800">
          Калькулятор AI
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <Display value={display} expression={expression} />

        <div className="grid grid-cols-4 gap-0">
          <div className="col-span-3">
            <NumberPad
              onNumberClick={inputNumber}
              onClear={clear}
              onDelete={deleteLastDigit}
              onDecimal={inputDecimal}
            />
          </div>
          <div className="col-span-1">
            <OperationButtons
              onOperationClick={performOperation}
              onEquals={calculate}
              activeOperation={operation || undefined}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default Calculator;
