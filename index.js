console.log("start");

function generate(mode) {
    const settingsElement = document.getElementById("settings");
    if (!settingsElement) throw "No settings element";


    const problemsTable = document.getElementById("problems");
    if (!problemsTable) throw "No problems element"

    settingsElement.style.display = "none";
    problemsTable.style.display = "block"
    problemsTable.innerHTML = "";

    const settings = getSettings();

    for (let i = 0; i < settings.count; i++) {
        const problem = generateProblem(settings);
        const problemElement = generateProblemRow(problem, settings, mode);
        problemsTable.appendChild(problemElement);
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

function generateProblemRow(problem, settings, mode) {
    const textTd = document.createElement(`td`);
    textTd.innerText = problem.text;

    const row = document.createElement("tr");
    row.className = "problem";
    row.appendChild(textTd);
    
    if (mode === "solve") {
        const answerInput = document.createElement(`input`);
        answerInput.setAttribute("answer", problem.result);
        const answerTd = document.createElement("td");
        answerTd.className = "answer";
        answerTd.appendChild(answerInput);
        row.appendChild(answerTd);
    }
    
    return row;
}

function calcResult(left, right, operator) {
    if (operator === '+') return left + right;
    if (operator === '-') return left - right;

    throw "Unknown operator";
}

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}