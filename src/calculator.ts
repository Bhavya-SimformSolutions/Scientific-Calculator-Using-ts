import { calculateBasicOperations, factorialFunction } from './utilities.js';
import { setupEventHandlers } from './eventHandlers.js';

class Calculator {
    equal_pressed: number;
    lastResult: number | null;
    lastExpression: string | null;
    isDegreeMode: boolean;
    isSecondMode: boolean;
    input: HTMLInputElement;
    historyList: HTMLUListElement;
    historySection: HTMLElement;

    constructor() {
        this.equal_pressed = 0;
        this.lastResult = null;
        this.lastExpression = null;
        this.isDegreeMode = true;
        this.isSecondMode = false;
        this.input = document.getElementById("input") as HTMLInputElement;
        this.historyList = document.getElementById("history-list") as HTMLUListElement;
        this.historySection = document.getElementById("history-section") as HTMLElement;
        this.loadHistory();
        setupEventHandlers(this);
    }

    handleInputButtonClick(value: string): void {
        const operators: string[] = ['+', '-', '*', '/', '%'];

        if (this.equal_pressed === 1) {
            this.equal_pressed = 0;
        }

        if (operators.includes(this.input.value.slice(-1)) && operators.includes(value)) {
            // Replace the last operator with the new one
            this.input.value = this.input.value.slice(0, -1) + value;
        } else {
            this.input.value += value;
        }
    }

    handleEqualButtonClick(): void {
        let inp_val = this.input.value;
        if (this.equal_pressed === 1 && this.lastExpression) {
            inp_val = this.lastExpression;
        } else {
            this.lastExpression = inp_val;
        }

        // Handle case where input starts with a negative number after a previous calculation
        if (this.lastResult !== null && /^[+\-*/%]/.test(inp_val) && !/^-/.test(inp_val)) {
            inp_val = `${this.lastResult}${inp_val}`;
        }

        try {
            let solution = calculateBasicOperations(inp_val, this.isDegreeMode);
            if (typeof solution === 'number') {
                this.lastResult = solution;
                this.input.value = Number.isInteger(solution) ? solution.toString() : solution.toFixed(4);
                if (this.equal_pressed === 0 || inp_val !== this.lastExpression) {
                    this.addToHistory(inp_val, solution);
                }
            } else {
                alert(solution);
            }
        } catch (err) {
            if (err instanceof Error) {
                alert(err.message);
            } else {
                alert('An unknown error occurred');
            }
        }

        this.equal_pressed = 1;
    }

    handleClearButtonClick(): void {
        this.input.value = "";
        this.lastResult = null;
        this.lastExpression = null;
        this.equal_pressed = 0;
    }

    handleEraseButtonClick(): void {
        this.input.value = this.input.value.substr(0, this.input.value.length - 1);
    }

    handleDegButtonClick(): void {
        const deg: HTMLInputElement | null = document.querySelector<HTMLInputElement>('input[value="deg"], input[value="rad"]');
        if (!deg) return;

        if (deg.value === "deg") {
            deg.value = "rad";
            this.isDegreeMode = false;
        } else {
            deg.value = "deg";
            this.isDegreeMode = true;
        }
    }

    handleSecondButtonClick(): void {
        this.isSecondMode = !this.isSecondMode;
        const second : HTMLElement = document.getElementById("2nd") as HTMLElement;
        if (this.isSecondMode) {
            second.style.backgroundColor = "#0083e9";
            this.updateButtonValues("second");
        } else {
            second.style.backgroundColor = "";
            this.updateButtonValues("primary");
        }
    }

    updateButtonValues(mode: "primary" | "second"): void {
        const buttonValues = {
            primary: {
                sin: "sin",
                cos: "cos",
                tan: "tan",
                sqrt: "√",
                log: "log",
                ln: "ln",
                pow: "xʸ"
            },
            second: {
                sin: "sin⁻¹",
                cos: "cos⁻¹",
                tan: "tan⁻¹",
                sqrt: "x²",
                log: "10ˣ",
                ln: "eˣ"
            }
        };
    
        for (const [key, value] of Object.entries(buttonValues[mode])) {
            const button = document.getElementById(key) as HTMLInputElement;
            button.value = value;
        }
    }

    handleTrigButtonClick(func: string): void {
        this.input.value += this.isSecondMode ? `${func}⁻¹(` : `${func}(`;
    }

    handleLogButtonClick(): void {
        if (this.isSecondMode) {
            this.input.value += this.input.value === "" ? "10^" : "10^";
        } else {
            this.input.value += "log(";
        }
    }

    handlePiButtonClick(): void {
        this.input.value += "π";
    }

    handleEButtonClick(): void {
        this.input.value += "e";
    }

    handleSqrtButtonClick(): void {
        if (this.isSecondMode) {
            let value = this.input.value || "0";
            this.input.value = Math.pow(parseFloat(value), 2).toString();
        } else {
            if (this.input.value) {
                let value = this.input.value;
                this.input.value = Math.sqrt(parseFloat(value)).toString();
            } else {
                this.input.value += "√(";
            }
        }
    }

    handleLnButtonClick(): void {
        if (this.isSecondMode) {
            this.input.value += this.input.value === "" ? "e^" : "e^";
        } else {
            this.input.value += "ln(";
        }
    }

    handlePowButtonClick(): void {
        if (this.input.value === "") {
            this.input.value = "0^";
        } else {
            this.input.value += "^";
        }
    }

    handleFactorialButtonClick(): void {
        if (this.input.value === "") {
            this.input.value += "0!";
        } else {
            this.input.value += "!";
        }
    }

    handleReciprocalButtonClick(): void {
        if (this.input.value === "") {
            this.input.value += "1/(";
        } else {
            let value = parseFloat(this.input.value);
            this.input.value = (1 / value).toString();
        }
    }

    handleAbsButtonClick(): void {
        if (this.input.value === "") {
            this.input.value += "abs(";
        } else {
            this.input.value = `abs(${this.input.value})`;
        }
    }

    handleKeyboardInput(event: KeyboardEvent): void {
        const key: string = event.key;
        const validKeys: string = "0123456789+-*/%^().";
        const specialKeys: { [key: string]: string } = {
            "Enter": "=",
            "Backspace": "erase",
            "Delete": "clear",
            "Escape": "clear"
        };
    
        if (validKeys.includes(key)) {
            this.handleInputButtonClick(key);
        } else if (specialKeys[key]) {
            if (specialKeys[key] === "=") {
                this.handleEqualButtonClick();
            } else if (specialKeys[key] === "erase") {
                this.handleEraseButtonClick();
            } else if (specialKeys[key] === "clear") {
                this.handleClearButtonClick();
            }
        }
    }

    handleThemeToggle(): void {
        const isChecked: boolean = (document.getElementById('theme-toggle-checkbox') as HTMLInputElement).checked;
        document.body.classList.toggle('dark-mode', isChecked);
        document.querySelector('.calculator')?.classList.toggle('dark-mode', isChecked);
        document.querySelectorAll('input[type="text"]').forEach(input => {
            input.classList.toggle('dark-mode', isChecked);
        });
        document.querySelectorAll('input[type="button"]').forEach(button => {
            button.classList.toggle('dark-mode', isChecked);
        });
        document.querySelectorAll('button#erase').forEach(button => {
            button.classList.toggle('dark-mode', isChecked);
        });
        document.querySelectorAll('input[value="AC"]').forEach(button => {
            button.classList.toggle('dark-mode', isChecked);
        });
        document.querySelectorAll('input[value="="]').forEach(button => {
            button.classList.toggle('dark-mode', isChecked);
        });
    }

    addToHistory(expression: string, result: number | string): void {
        const historyItem: HTMLLIElement = document.createElement("li");
        historyItem.textContent = `${expression} = ${result}`;
        this.historyList.appendChild(historyItem);
        this.saveHistory();
    }

    saveHistory(): void {
        const historyItems: string[] = [];
        this.historyList.querySelectorAll("li").forEach(item => {
            historyItems.push(item.textContent || '');
        });
        localStorage.setItem("calculatorHistory", JSON.stringify(historyItems));
    }

    loadHistory(): void {
        const historyItems: string[] = JSON.parse(localStorage.getItem("calculatorHistory") || "[]");
        historyItems.forEach(item => {
            const historyItem = document.createElement("li");
            historyItem.textContent = item;
            this.historyList.appendChild(historyItem);
        });
    }

    clearHistory(): void {
        this.historyList.innerHTML = "";
        localStorage.removeItem("calculatorHistory");
    }

    toggleHistory(): void {
        this.historySection.classList.toggle("show");
    }
}

export default Calculator;