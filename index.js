console.log("start");

function generate(mode) {
    const settingsElement = document.getElementById("settings");
    if (!settingsElement) throw "No settings element";


    const problemsElement = document.getElementById("problems");
    if (!problemsElement) throw "No problems element"

    settingsElement.style.display = "none";
    problemsElement.style.display = "block"
    problemsElement.innerHTML = "";

    const settings = getSettings();

    for (let i = 0; i < settings.count; i++) {
        const problem = generateProblem(settings);

        const textElement = document.createElement(`span`);
        textElement.innerText = problem.text;

        const problemElement = document.createElement(`div`);
        problemElement.className = "problem";
        problemElement.appendChild(textElement);

        if (mode === "solve") {
            const answerElement = document.createElement(`input`);
            answerElement.className = "answer";
            answerElement.setAttribute("answer", problem.result);
            problemElement.appendChild(answerElement);
        }

        problemsElement.appendChild(problemElement);
    }
}

function getSettings() {
    const usePlusElement = document.getElementById("usePlus");
    const useMinusElement = document.getElementById("useMinus");
    const outputLineNumbersElement = document.getElementById("outputLineNumbers");
    const countElement = document.getElementById("count");
    const problemsCount = parseInt(countElement.value);

    return {
        usePlus: usePlusElement.value,
        useMinus: useMinusElement.value,
        outputLineNumbers: outputLineNumbersElement.value,
        count: problemsCount,
    };
}

function generateProblem(settings) {
    let left = getRandomInt(10);
    let right = getRandomInt(10);

    const operators = []
    if (settings.usePlus) operators.push('+');
    if (settings.useMinus) operators.push('-');
    const operator = operators[getRandomInt(operators.length)];

    if (operator === '-' && left < right) {
        [left, right] = [right, left];
    }
    
    const text = `${left} ${operator} ${right} =    `;
    console.log(text);
    const result = calcResult(left, right, operator);
    return {text, result};
}

function calcResult(left, right, operator) {
    if (operator === '+') return left + right;
    if (operator === '-') return left - right;

    throw "Unknown operator";
}

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}