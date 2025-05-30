document.addEventListener('DOMContentLoaded', () => {
    const quizData = [
        {
            question: "Which organ in the human body is responsible for filtering blood and producing urine?",
            options: ["Heart", "Liver", "Kidneys", "Spleen"],
            answer: "Kidneys"
        },
        {
            question: "In what year was the first official Olympics held in modern times?",
            options: ["1892", "1900", "1924", "1936"],
            answer: "1900"
        },
        {
            question: "Which planet in the solar system has the largest diameter?",
            options: ["Mercury", "Venus", "Earth", "Jupiter"],
            answer: "Jupiter"
        },
        {
            question: "What chemical element is used to fill balloons and airships?",
            options: ["Hydrogen", "Oxygen", "Helium", "Neon"],
            answer: "Helium"
        },
        {
            question: "What chemical element is used in the manufacture of batteries?",
            options: ["Lead", "Copper", "Aluminum", "Lithium"],
            answer: "Lithium"
        }
    ];

    let currentQuestion = 0;
    let score = 0;

    const questionEl = document.getElementById('question');
    const optionsEl = document.getElementById('options');
    const feedbackEl = document.getElementById('feedback');
    const nextBtn = document.getElementById('next-btn');
    const quizContainer = document.getElementById('quiz-container');
    const resultContainer = document.getElementById('result-container');
    const scoreEl = document.getElementById('score');
    const restartBtn = document.getElementById('restart-btn');

    function loadQuestion() {
        const currentQuiz = quizData[currentQuestion];
        questionEl.textContent = currentQuiz.question;
        optionsEl.innerHTML = '';
        feedbackEl.textContent = '';
        nextBtn.classList.add('hidden');

        currentQuiz.options.forEach(option => {
            const button = document.createElement('button');
            button.textContent = option;
            button.classList.add('option', 'w-full', 'p-3', 'border', 'border-blue-300', 'rounded-lg', 'text-left', 'bg-blue-50');
            button.addEventListener('click', () => selectOption(option));
            optionsEl.appendChild(button);
        });
    }

    function selectOption(selected) {
        const currentQuiz = quizData[currentQuestion];
        const buttons = optionsEl.getElementsByClassName('option');
        
        for (let button of buttons) {
            button.disabled = true;
            if (button.textContent === currentQuiz.answer) {
                button.classList.add('correct');
            }
            if (button.textContent === selected && selected !== currentQuiz.answer) {
                button.classList.add('incorrect');
            }
        }

        if (selected === currentQuiz.answer) {
            score++;
            feedbackEl.textContent = "Correct!";
            feedbackEl.classList.add('text-green-600');
        } else {
            feedbackEl.textContent = `Incorrect! The correct answer is ${currentQuiz.answer}.`;
            feedbackEl.classList.add('text-red-600');
        }

        if (currentQuestion < quizData.length - 1) {
            nextBtn.classList.remove('hidden');
        } else {
            setTimeout(showResults, 1000);
        }
    }

    function showResults() {
        quizContainer.classList.add('hidden');
        resultContainer.classList.remove('hidden');
        scoreEl.textContent = `You scored ${score} out of ${quizData.length}!`;
    }

    nextBtn.addEventListener('click', () => {
        currentQuestion++;
        loadQuestion();
    });

    restartBtn.addEventListener('click', () => {
        currentQuestion = 0;
        score = 0;
        quizContainer.classList.remove('hidden');
        resultContainer.classList.add('hidden');
        loadQuestion();
    });

    loadQuestion();
});
