import React, { useState } from 'react';
import './calculator_style.css';

function Calculator() {
  const [currentVal, setCurrentVal] = useState("0");
  const [prevVal, setPrevVal] = useState("0");
  const [formula, setFormula] = useState("");
  const [evaluated, setEvaluated] = useState(false);

  const isOperator = /[x/+-]/;
  const endsWithOperator = /[x/+-]$/;
  const endsWithNegativeSign = /\d[x/+-]{1}-$/;

  const maxDigitWarning = () => {
    setCurrentVal("Digit Limit Met");
    setTimeout(() => setCurrentVal(prevVal), 1000);
  };

  const handleEvaluate = () => {
    if (!currentVal.includes("Limit")) {
      let expression = formula;
      while (endsWithOperator.test(expression)) {
        expression = expression.slice(0, -1);
      }
      expression = expression.replace(/x/g, "*").replace(/-/g, "-").replace("--", "-");
      try {
        let answer = Math.round(1e12 * eval(expression)) / 1e12;
        setCurrentVal(answer.toString());
        setFormula(expression.replace(/\*/g, "⋅").replace(/-/g, "-").replace(/(x|\/|\+)-/, "$1-").replace(/^-/, "-") + " = " + answer);
        setPrevVal(answer);
        setEvaluated(true);
      } catch (error) {
        setCurrentVal("Error"); // Handle potential errors during evaluation
        setFormula("");
        setEvaluated(true);
      }
    }
  };

  const handleOperators = (e) => {
    if (!currentVal.includes("Limit")) {
      const operator = e.target.value;
      setCurrentVal(operator);
      setEvaluated(false);

      if (evaluated) {
        setFormula(prevVal + operator);
      } else if (endsWithOperator.test(formula)) {
        if (endsWithNegativeSign.test(formula)) {
          if (operator !== "-") {
            setFormula(prevVal + operator);
          }
        } else {
          setFormula(prevVal + operator);
        }
      } else {
        setPrevVal(formula);
        setFormula(formula + operator);
      }
    }
  };

  const handleNumbers = (e) => {
    if (!currentVal.includes("Limit")) {
      const number = e.target.value;

      if (evaluated) {
        setCurrentVal(number);
        setFormula(number !== "0" ? number : ""); // Reset formula for new calculation after "="
        setEvaluated(false); // Reset evaluated
      } else {
        if (currentVal.length > 21) {
          maxDigitWarning();
        } else {
          setCurrentVal(currentVal === "0" || isOperator.test(currentVal) ? number : currentVal + number);
          setFormula(formula === "0" && number === "0" ? number : /([^.0-9]0|^0)$/.test(formula) ? formula.slice(0, -1) + number : formula + number);
        }
      }
    }
  };

  const handleDecimal = () => {
    if (evaluated) {
      setCurrentVal("0.");
      setFormula("0.");
      setEvaluated(false);
    } else if (!currentVal.includes(".") && !currentVal.includes("Limit")) {
      if (currentVal.length > 21) {
        maxDigitWarning();
      } else {
        setEvaluated(false);
        if (endsWithOperator.test(formula) || (currentVal === "0" && formula === "")) {
          setCurrentVal("0.");
          setFormula(formula + "0.");
        } else {
          setCurrentVal(formula.match(/(-?\d+\.?\d*)$/)[0] + ".");
          setFormula(formula + ".");
        }
      }
    }
  };

  const initialize = () => {
    setCurrentVal("0");
    setPrevVal("0");
    setFormula("");
    setEvaluated(false);
  };

  return (
    <div className="center">
      <div className="calculator card">
        <div className="formula-screen">{formula}</div>
        <input
          id="display"
          type="text"
          className="calculator-screen z-depth-1"
          value={currentVal}
          disabled
        />

          <div className="calculator-keys">
          <button id="clear" type="button" className="operator ac" value="all-clear" onClick={initialize}>AC</button>
          <button id="vide" type="button" className="operator empty1"></button>
          <button id="vide" type="button" className="operator empty2"></button>
          <button id="divide" type="button" className="operator divide" value="/" onClick={handleOperators}>÷</button>
          <button id="seven" type="button" value="7" className="btn btn-light" onClick={handleNumbers}>7</button>
          <button id="eight" type="button" value="8" className="btn btn-light" onClick={handleNumbers}>8</button>
          <button id="nine" type="button" value="9" className="btn btn-light" onClick={handleNumbers}>9</button>
          <button id="multiply" type="button" className="operator times" value="x" onClick={handleOperators}>×</button>
          <button id="four" type="button" value="4" className="btn btn-light" onClick={handleNumbers}>4</button>
          <button id="five" type="button" value="5" className="btn btn-light" onClick={handleNumbers}>5</button>
          <button id="six" type="button" value="6" className="btn btn-light" onClick={handleNumbers}>6</button>
          <button id="subtract" type="button" className="operator minus" value="-" onClick={handleOperators}>-</button>
          <button id="one" type="button" value="1" className="btn btn-light" onClick={handleNumbers}>1</button>
          <button id="two" type="button" value="2" className="btn btn-light" onClick={handleNumbers}>2</button>
          <button id="three" type="button" value="3" className="btn btn-light" onClick={handleNumbers}>3</button>
          <button id="add" type="button" className="operator plus" value="+" onClick={handleOperators}>+</button>
          <button id="vide" type="button" className="operator empty3"></button>
          <button id="zero" type="button" value="0" className="btn btn-light" onClick={handleNumbers}>0</button>

          <button id="decimal" type="button" className="operator decimal" value="." onClick={handleDecimal}>.</button>
          <button id="equals" type="button" className="equals operator" value="=" onClick={handleEvaluate}>=</button>
        </div>
      </div>
    </div>
  );
}

export default Calculator;