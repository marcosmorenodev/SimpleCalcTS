//DOM Related Variables

let calcOutput: HTMLInputElement = document.getElementById("calculator-output") as HTMLInputElement;
const numberBtns: HTMLButtonElement[] = Array.from(document.querySelectorAll(".number-btn")) as HTMLButtonElement[]; //Converts the NodeList to an iterable array
const operandBtns: HTMLButtonElement[] = Array.from(document.querySelectorAll(".operand-btn")) as HTMLButtonElement[];
const clearBtn: HTMLButtonElement = document.getElementById("clear-btn") as HTMLButtonElement;
const equalBtn: HTMLButtonElement = document.getElementById("equal-btn") as HTMLButtonElement;

//==========================//

let operand: string;
let isOperandSelected: boolean = false; //Flag used to dictate which number from "numbers" should be ppopulated

type TNumbers = {firstNumber: string[], lastNumber: string[]};

const numbers: TNumbers = {firstNumber: [], lastNumber: []};

numberBtns.forEach((btn) => {
    btn.addEventListener("click", (e: Event): void => {        
        let eventValue: string = (e.target as HTMLInputElement).value; //* Here I use "type assertion" since I'm 100% sure the event will be completely valid and from the expected type which is a string

        //ToDo: Justificar el cambio de tipo de localFirst & localLast
        //ToDo: Probar el mismo metodo usado aca en la app original!
        // ToDo: Crear nueva documentacion para este archivo explicando los cambios mas importantes!

        let localFirst: string = "";
        let localLast: string = "";

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

operandBtns.forEach((btn) => {
    btn.addEventListener("click", (e: Event): void => { 
        let eventValue: string = (e.target as HTMLInputElement).value;

        if (operand) { return; } //Prevents adding more than one operand

        else if (!numbers.firstNumber.length) { 
            calcOutput.classList.add("error-msg"); 
            calcOutput.value = "ENTER A NUMBER!";

            setTimeout(() => {
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

equalBtn.addEventListener("click", (): string | void  => {
    if (!(numbers.firstNumber).length || !(numbers.lastNumber).length) {
        calcOutput.classList.add("error-msg"); 
        calcOutput.value = "NUMBER(S) MISSING";

        setTimeout(() => {
            calcOutput.classList.remove("error-msg");

            calcOutput.value = "";
        }, 1500); 
    }

    else {
        //* Here, I reduce each array (which is actually a string) to a single string; and then, I cast them as floats at the moment of assigning each of them to a new array.
        let singleFirstNum: string = (numbers.firstNumber).reduce((acc, curr) => acc + curr);
        let singleLastNum: string = (numbers.lastNumber).reduce((acc, curr) => acc + curr);

        const calculationArr: number[] = [parseFloat(singleFirstNum), parseFloat(singleLastNum)];
    
        calcOutput.value = ""; //Clears the DOM before displaying the result
    
        displayResult(calculationArr);
    }
});

function displayResult(calculationArr: number[]): string | void {
    let result: number = 0;

    switch (operand) {
        case "+": {
            result = calculationArr.reduce((acc, curr) => acc + curr);

            break;
        }

        case "-": { 
            result = calculationArr.reduce((acc, curr) => acc - curr);

            break;
        }

        case "*": { 
            result = calculationArr.reduce((acc, curr) => acc * curr, 1);

            break;
        }

        case "/": { 
            result = calculationArr.reduce((acc, curr) => acc / curr); 

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

const disableButtons = (): void => { numberBtns.forEach(btn => btn.disabled = true); }

clearBtn.addEventListener("click", () => { window.location.reload(); });