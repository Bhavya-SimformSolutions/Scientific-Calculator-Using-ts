interface Calculator {
    handleInputButtonClick(value: string): void;
    handleEqualButtonClick(): void;
    handleClearButtonClick(): void;
    handleEraseButtonClick(): void;
    handleDegButtonClick(): void;
    handleSecondButtonClick(): void;
    handleTrigButtonClick(func: string): void;
    handleLogButtonClick(): void;
    handlePiButtonClick(): void;
    handleEButtonClick(): void;
    handleSqrtButtonClick(): void;
    handleLnButtonClick(): void;
    handlePowButtonClick(): void;
    handleFactorialButtonClick(): void;
    handleReciprocalButtonClick(): void;
    handleAbsButtonClick(): void;
    handleKeyboardInput(event: KeyboardEvent): void;
    handleThemeToggle(): void;
    clearHistory(): void;
    toggleHistory(): void;
}

export function setupEventHandlers(calculator: Calculator) {
    document.querySelectorAll(".input-button").forEach(button => {
        button.addEventListener("click", () => calculator.handleInputButtonClick((button as HTMLInputElement).value));
    });

    (document.getElementById("equal") as HTMLElement).addEventListener("click", () => calculator.handleEqualButtonClick());
    (document.getElementById("clear") as HTMLElement).addEventListener("click", () => calculator.handleClearButtonClick());
    (document.getElementById("erase") as HTMLElement).addEventListener("click", () => calculator.handleEraseButtonClick());
    (document.querySelector('input[value="deg"]') as HTMLElement).addEventListener("click", () => calculator.handleDegButtonClick());
    (document.getElementById("2nd") as HTMLElement).addEventListener("click", () => calculator.handleSecondButtonClick());

    (document.getElementById("sin") as HTMLElement).addEventListener("click", () => calculator.handleTrigButtonClick("sin"));
    (document.getElementById("cos") as HTMLElement).addEventListener("click", () => calculator.handleTrigButtonClick("cos"));
    (document.getElementById("tan") as HTMLElement).addEventListener("click", () => calculator.handleTrigButtonClick("tan"));
    (document.getElementById("log") as HTMLElement).addEventListener("click", () => calculator.handleLogButtonClick());
    (document.getElementById("pi") as HTMLElement).addEventListener("click", () => calculator.handlePiButtonClick());
    (document.getElementById("e") as HTMLElement).addEventListener("click", () => calculator.handleEButtonClick());
    (document.getElementById("sqrt") as HTMLElement).addEventListener("click", () => calculator.handleSqrtButtonClick());
    (document.getElementById("ln") as HTMLElement).addEventListener("click", () => calculator.handleLnButtonClick());
    (document.getElementById("pow") as HTMLElement).addEventListener("click", () => calculator.handlePowButtonClick());
    (document.getElementById("factorial") as HTMLElement).addEventListener("click", () => calculator.handleFactorialButtonClick());
    (document.getElementById("reciprocal") as HTMLElement).addEventListener("click", () => calculator.handleReciprocalButtonClick());
    (document.getElementById("abs") as HTMLElement).addEventListener("click", () => calculator.handleAbsButtonClick());

    document.addEventListener("keydown", (event) => calculator.handleKeyboardInput(event));
    (document.getElementById("theme-toggle-checkbox") as HTMLInputElement).addEventListener("change", () => calculator.handleThemeToggle());
    (document.getElementById("clear-history") as HTMLElement).addEventListener("click", () => calculator.clearHistory());
    (document.getElementById("history-toggle") as HTMLElement).addEventListener("click", () => calculator.toggleHistory());
    (document.getElementById("close-history") as HTMLElement).addEventListener("click", () => calculator.toggleHistory());
}