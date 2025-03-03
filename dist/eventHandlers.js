export function setupEventHandlers(calculator) {
    document.querySelectorAll(".input-button").forEach(button => {
        button.addEventListener("click", () => calculator.handleInputButtonClick(button.value));
    });
    document.getElementById("equal").addEventListener("click", () => calculator.handleEqualButtonClick());
    document.getElementById("clear").addEventListener("click", () => calculator.handleClearButtonClick());
    document.getElementById("erase").addEventListener("click", () => calculator.handleEraseButtonClick());
    document.querySelector('input[value="deg"]').addEventListener("click", () => calculator.handleDegButtonClick());
    document.getElementById("2nd").addEventListener("click", () => calculator.handleSecondButtonClick());
    document.getElementById("sin").addEventListener("click", () => calculator.handleTrigButtonClick("sin"));
    document.getElementById("cos").addEventListener("click", () => calculator.handleTrigButtonClick("cos"));
    document.getElementById("tan").addEventListener("click", () => calculator.handleTrigButtonClick("tan"));
    document.getElementById("log").addEventListener("click", () => calculator.handleLogButtonClick());
    document.getElementById("pi").addEventListener("click", () => calculator.handlePiButtonClick());
    document.getElementById("e").addEventListener("click", () => calculator.handleEButtonClick());
    document.getElementById("sqrt").addEventListener("click", () => calculator.handleSqrtButtonClick());
    document.getElementById("ln").addEventListener("click", () => calculator.handleLnButtonClick());
    document.getElementById("pow").addEventListener("click", () => calculator.handlePowButtonClick());
    document.getElementById("factorial").addEventListener("click", () => calculator.handleFactorialButtonClick());
    document.getElementById("reciprocal").addEventListener("click", () => calculator.handleReciprocalButtonClick());
    document.getElementById("abs").addEventListener("click", () => calculator.handleAbsButtonClick());
    document.addEventListener("keydown", (event) => calculator.handleKeyboardInput(event));
    document.getElementById("theme-toggle-checkbox").addEventListener("change", () => calculator.handleThemeToggle());
    document.getElementById("clear-history").addEventListener("click", () => calculator.clearHistory());
    document.getElementById("history-toggle").addEventListener("click", () => calculator.toggleHistory());
    document.getElementById("close-history").addEventListener("click", () => calculator.toggleHistory());
}
