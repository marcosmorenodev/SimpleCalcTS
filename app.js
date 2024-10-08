//DOM Related Variables
var calcOutput = document.getElementById("calculator-output");
var numberBtns = Array.from(document.querySelectorAll(".number-btn")); //Converts the NodeList to an iterable array
var operandBtns = Array.from(document.querySelectorAll(".operand-btn"));
var clearBtn = document.getElementById("clear-btn");
var equalBtn = document.getElementById("equal-btn");
//==========================//
var operand;
var isOperandSelected = false; //Flag used to dictate which number from "numbers" should be ppopulated
var numbers = { firstNumber: [], lastNumber: [] };
numberBtns.forEach(function (btn) {
    btn.addEventListener("click", function (e) {
        var eventValue = e.target.value; //* Here I use "type assertion" since I'm 100% sure the event will be completely valid and from the expected type which is a string
        //ToDo: Justificar el cambio de tipo de localFirst & localLast
        //ToDo: Probar el mismo metodo usado aca en la app original!
        // ToDo: Crear nueva documentacion para este archivo explicando los cambios mas importantes!
        var localFirst = "";
        var localLast = "";
        if (!isOperandSelected) { //"isOperandSelected" is false by default
            localFirst += eventValue;
            calcOutput.value += localFirst;
            numbers.firstNumber.push(localFirst);
        }
        else {
            localLast += eventValue;
            calcOutput.value += localLast;
            numbers.lastNumber.push(localLast);
        }
    });
});
operandBtns.forEach(function (btn) {
    btn.addEventListener("click", function (e) {
        var eventValue = e.target.value;
        if (operand) {
            return;
        } //Prevents adding more than one operand
        else if (!numbers.firstNumber.length) {
            calcOutput.classList.add("error-msg");
            calcOutput.value = "ENTER A NUMBER!";
            setTimeout(function () {
                calcOutput.classList.remove("error-msg");
                calcOutput.value = "";
            }, 1500);
        }
        else {
            operand = eventValue;
            isOperandSelected = true;
            calcOutput.value += operand;
        }
    });
});
equalBtn.addEventListener("click", function () {
    if (!(numbers.firstNumber).length || !(numbers.lastNumber).length) {
        calcOutput.classList.add("error-msg");
        calcOutput.value = "NUMBER(S) MISSING";
        setTimeout(function () {
            calcOutput.classList.remove("error-msg");
            calcOutput.value = "";
        }, 1500);
    }
    else {
        //* Here, I reduce each array (which is actually a string) to a single string; and then, I cast them as floats at the moment of assigning each of them to a new array.
        var singleFirstNum = (numbers.firstNumber).reduce(function (acc, curr) { return acc + curr; });
        var singleLastNum = (numbers.lastNumber).reduce(function (acc, curr) { return acc + curr; });
        var calculationArr = [parseFloat(singleFirstNum), parseFloat(singleLastNum)];
        calcOutput.value = ""; //Clears the DOM before displaying the result
        displayResult(calculationArr);
    }
});
function displayResult(calculationArr) {
    var result = 0;
    switch (operand) {
        case "+": {
            result = calculationArr.reduce(function (acc, curr) { return acc + curr; });
            break;
        }
        case "-": {
            result = calculationArr.reduce(function (acc, curr) { return acc - curr; });
            break;
        }
        case "*": {
            result = calculationArr.reduce(function (acc, curr) { return acc * curr; }, 1);
            break;
        }
        case "/": {
            result = calculationArr.reduce(function (acc, curr) { return acc / curr; });
            break;
        }
    }
    if (isNaN(result)) {
        calcOutput.classList.add("error-msg");
        return calcOutput.value = "CALC ERROR!";
    }
    calcOutput.classList.add("result");
    calcOutput.value = result.toFixed(2);
    disableButtons();
}
var disableButtons = function () { numberBtns.forEach(function (btn) { return btn.disabled = true; }); };
clearBtn.addEventListener("click", function () { window.location.reload(); });
