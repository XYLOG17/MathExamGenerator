let tasks = [];
let currentTaskIndex = 0;
let currentAttempts = 0;

/**
 * Starts the exam by generating tasks and displaying the first one.
 */
function startExam() {
    let taskCount = parseInt(document.getElementById("taskCount").value);
    let difficulty = document.getElementById("difficulty").value;

    tasks = generateTasks(taskCount, difficulty);
    currentTaskIndex = 0;
    currentAttempts = 0;

    document.getElementById("solvedTasksContainer").innerHTML = "";
    displayCurrentTask();
}

/**
 * Generates random math tasks based on difficulty.
 * @param {number} count - Number of tasks
 * @param {string} difficulty - Task difficulty level
 * @returns {Array} Array of task objects
 */
function generateTasks(count, difficulty) {
    let operations, numberRange;

    switch (difficulty) {
        case "easy":
            operations = ["+", "-"];
            numberRange = 20;
            break;
        case "medium":
            operations = ["+", "-", "*"];
            numberRange = 100;
            break;
        case "hard":
            operations = ["+", "-", "*", "/"];
            numberRange = 1000;
            break;
    }

    let taskList = [];

    for (let i = 0; i < count; i++) {
        let num1 = Math.floor(Math.random() * numberRange) + 1;
        let num2 = Math.floor(Math.random() * numberRange) + 1;
        let operation = operations[Math.floor(Math.random() * operations.length)];

        if (operation === "/" && num1 % num2 !== 0) {
            num1 = num2 * (Math.floor(Math.random() * (numberRange / num2)) + 1);
        }

        let question = `${num1} ${operation} ${num2} = `;
        let solution = eval(num1 + operation + num2);

        taskList.push({ question, solution, difficulty });
    }

    return taskList;
}

/**
 * Displays the current task or a message when all tasks are solved.
 */
function displayCurrentTask() {
    if (currentTaskIndex >= tasks.length) {
        document.getElementById("currentTaskContainer").innerHTML = "<h3>All tasks completed!</h3>";
        return;
    }

    let currentTask = tasks[currentTaskIndex];
    document.getElementById("currentTaskContainer").innerHTML = `
        <h3>Task ${currentTaskIndex + 1}:</h3>
        <p>${currentTask.question}</p>
        <input type="number" id="answer" placeholder="Enter answer">
        <button class="button" onclick="checkAnswer()">Confirm</button>

        <p id="feedback"></p>
    `;
}

/**
 * Checks if the user's answer is correct.
 */
function checkAnswer() {
    let currentTask = tasks[currentTaskIndex];
    let userAnswer = parseFloat(document.getElementById("answer").value);
    let feedback = document.getElementById("feedback");

    currentAttempts++;

    if (userAnswer === currentTask.solution) {
        feedback.innerHTML = "<span style='color: green;'>Correct!</span>";
        storeSolvedTask(currentTask, currentAttempts);
        currentTaskIndex++;
        currentAttempts = 0;
        setTimeout(displayCurrentTask, 1000);
    } else {
        feedback.innerHTML = "<span style='color: red;'>Wrong! Try again.</span>";
    }

}

/**
 * Stores solved tasks in the solved tasks container.
 * @param {Object} task - The solved task
 * @param {number} attempts - Number of attempts taken
 */
function storeSolvedTask(task, attempts) {
    let solvedTasksContainer = document.getElementById("solvedTasksContainer");
    let p = document.createElement("p");
    p.innerHTML = `✅ ${task.question} ${task.solution} (Difficulty: ${task.difficulty}, Attempts: ${attempts})`;
    solvedTasksContainer.appendChild(p);
}

document.addEventListener("DOMContentLoaded", function () {
    document.addEventListener("keydown", function (event) {
        if (event.key === "Enter") {
            let answerInput = document.getElementById("answer");
            if (answerInput && document.activeElement === answerInput) {
                checkAnswer();
            }
        }
    });
});

function displayCurrentTask() {
    if (currentTaskIndex >= tasks.length) {
        document.getElementById("currentTaskContainer").innerHTML = "<h3>All tasks completed!</h3>";
        return;
    }

    let currentTask = tasks[currentTaskIndex];
    document.getElementById("currentTaskContainer").innerHTML = `
        <h3>Task ${currentTaskIndex + 1}:</h3>
        <p>${currentTask.question}</p>
        <input type="number" id="answer" placeholder="Enter answer">
        <button class="button" onclick="checkAnswer()">Confirm</button>
        <p id="feedback"></p>
    `;

    // Direktes Fokussieren des Eingabefeldes
    let answerInput = document.getElementById("answer");
    if (answerInput) {
        answerInput.focus();
    }
}


