import { Conteiner, Content, Row } from "./styles";

import { Input } from "./components/Input";
import { Button } from "./components/Button";
import { useEffect, useState } from "react";

const App = () => {
  const [currentNumber, setCurrentNumber] = useState("0");
  const [firstNumber, setFirstNumer] = useState(null);
  const [lastNumber, setLastNumber] = useState(null);
  const [operation, setOperation] = useState("");
  const [overwrite, setOverwrite] = useState(false);

  const formatResult = (number) => {
    return String(Number(number.toFixed(10)));
  };

  const setResult = (result) => {
    const formattedResult = formatResult(result);

    setCurrentNumber(formattedResult);
    setFirstNumer(formattedResult);
  };

  const calculate = (first, second, selectedOperation) => {
    const firstValue = Number(first);
    const secondValue = Number(second);

    switch (selectedOperation) {
      case "+":
        return firstValue + secondValue;
      case "-":
        return firstValue - secondValue;
      case "*":
        return firstValue * secondValue;
      case "/":
        return firstValue / secondValue;
      default:
        return secondValue;
    }
  };

  const handleONClear = () => {
    setCurrentNumber("0");
    setFirstNumer(null);
    setLastNumber(null);
    setOperation("");
    setOverwrite(false);
  };

  const handleAddNumber = (number) => {
    if (overwrite) {
      setCurrentNumber(number === "." ? "0." : number);
      setOverwrite(false);
      return;
    }

    if (number === ".") {
      setCurrentNumber((prev) => {
        if (prev.includes(".")) return prev;

        return `${prev}.`;
      });

      return;
    }

    setCurrentNumber((prev) => `${prev === "0" ? "" : prev}${number}`);
  };

  const handleBackspace = () => {
    setCurrentNumber((prev) => {
      if (prev.length === 1) return "0";

      const value =  prev.slice(0, -1);

      if (value === "-") return 0

      return value
    });
  };

  const handleOperation = (selectedOperation) => {
    if (firstNumber !== null && operation !== "" && !overwrite) {
      if (operation === "/" && Number(currentNumber) === 0) return;

      const result = calculate(firstNumber, currentNumber, operation);

      setResult(result);
      setLastNumber(null);
      setOperation(selectedOperation);
      setOverwrite(true);
      return;
    }

    setFirstNumer(String(currentNumber));
    setLastNumber(null);
    setOperation(selectedOperation);
    setOverwrite(true);
  };

  const handleSumNumber = () => {
    handleOperation("+");
  };

  const handleMinusNumber = () => {
    handleOperation("-");
  };

  const handleMutNumber = () => {
    handleOperation("*");
  };

  const handleDivNumber = () => {
    handleOperation("/");
  };

  const handleEquals = () => {
    if (firstNumber !== null && operation !== "") {
      const divisor = lastNumber === null ? currentNumber : lastNumber;

      if (operation === "/" && Number(divisor) === 0) return;

      switch (operation) {
        case "+":
          if (lastNumber === null) {
            setLastNumber(String(currentNumber));
            const sum = Number(firstNumber) + Number(currentNumber);
            setResult(sum);
          } else {
            const sum = Number(currentNumber) + Number(lastNumber);
            setResult(sum);
          }
          setOverwrite(true);
          break;
        case "-":
          if (lastNumber === null) {
            setLastNumber(String(currentNumber));
            const minus = Number(firstNumber) - Number(currentNumber);
            setResult(minus);
          } else {
            const minus = Number(currentNumber) - Number(lastNumber);
            setResult(minus);
          }
          setOverwrite(true);
          break;
        case "*":
          if (lastNumber === null) {
            setLastNumber(String(currentNumber));
            const mut = Number(firstNumber) * Number(currentNumber);
            setResult(mut);
          } else {
            const mut = Number(currentNumber) * Number(lastNumber);
            setResult(mut);
          }
          setOverwrite(true);
          break;
        case "/":
          if (lastNumber === null) {
            setLastNumber(String(currentNumber));
            const div = Number(firstNumber) / Number(currentNumber);
            setResult(div);
          } else {
            const div = Number(currentNumber) / Number(lastNumber);
            setResult(div);
          }
          setOverwrite(true);
          break;
        default:
          break;
      }
    }
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      const key = event.key;      

      if (key >= "0" && key <= "9") {
        handleAddNumber(key);
        return;
      }

      if (key === "+") {
        handleSumNumber();
        return;
      }

      if (key === "-") {
        handleMinusNumber();
        return;
      }

      if (key === "*") {
        handleMutNumber();
        return;
      }

      if (key === "/") {
        handleDivNumber();
        return;
      }

      if (key === "Enter" || key === "=") {
        handleEquals();
        return;
      }

      if (key === "Backspace") {
        handleBackspace();
        return;
      }

      if (key === " ") {
        handleONClear();
        return;
      }

      if (key === "." || key === ",") {
        handleAddNumber(".");
        return;
      }
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  });

  return (
    <Conteiner>
      <Content>
        <Input value={currentNumber} />
        <Row>
          <Button label={"AC"} size={2} onClick={handleONClear} />
          <Button label={"←"} size={1} onClick={handleBackspace} />
          <Button label={"/"} size={1} onClick={handleDivNumber} />
        </Row>
        <Row>
          <Button label={"7"} size={1} onClick={() => handleAddNumber("7")} />
          <Button label={"8"} size={1} onClick={() => handleAddNumber("8")} />
          <Button label={"9"} size={1} onClick={() => handleAddNumber("9")} />
          <Button label={"*"} size={1} onClick={handleMutNumber} />
        </Row>
        <Row>
          <Button label={"4"} size={1} onClick={() => handleAddNumber("4")} />
          <Button label={"5"} size={1} onClick={() => handleAddNumber("5")} />
          <Button label={"6"} size={1} onClick={() => handleAddNumber("6")} />
          <Button label={"-"} size={1} onClick={handleMinusNumber} />
        </Row>
        <Row>
          <Button label={"1"} size={1} onClick={() => handleAddNumber("1")} />
          <Button label={"2"} size={1} onClick={() => handleAddNumber("2")} />
          <Button label={"3"} size={1} onClick={() => handleAddNumber("3")} />
          <Button label={"+"} size={1} onClick={handleSumNumber} />
        </Row>
        <Row>
          <Button label={"0"} size={2} onClick={() => handleAddNumber("0")} />
          <Button label={"."} size={1} onClick={() => handleAddNumber(".")} />
          <Button label={"="} size={1} onClick={handleEquals} />
        </Row>
      </Content>
    </Conteiner>
  );
};

export default App;
