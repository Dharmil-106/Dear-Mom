// Find all the mood buttons on the page
const moodButtons = document.querySelectorAll('.mood-button');

// This code will only run if we find mood buttons on the current page
if (moodButtons.length > 0) {
  
  // Listen for a click on any of the buttons
  moodButtons.forEach(button => {
    button.addEventListener('click', () => {
      // 1. Remove the 'selected' class from ALL buttons first
      moodButtons.forEach(btn => btn.classList.remove('selected'));
      
      // 2. Add the 'selected' class to the ONE button that was clicked
      button.classList.add('selected');
    });
  });
  
}

// --- Tasks Page Logic ---

// Find the section containing today's tasks
const todaysTasksSection = document.getElementById('todays-tasks');

// This code will only run if we are on the tasks page
if (todaysTasksSection) {
  const checkBoxes = todaysTasksSection.querySelectorAll('input[type="checkbox"]');
  const progressBarFill = document.getElementById('progressBarFill');
  const totalTasks = checkBoxes.length;

  function updateProgress() {
    // Count how many boxes are currently checked
    const checkedTasks = todaysTasksSection.querySelectorAll('input[type="checkbox"]:checked').length;
    
    // Calculate the percentage
    // Math.round is used to get a whole number
    const progressPercentage = Math.round((checkedTasks / totalTasks) * 100);
    
    // Update the width and the text of the progress bar
    progressBarFill.style.width = progressPercentage + '%';
    progressBarFill.textContent = progressPercentage + '%';
  }

  // Add a 'change' listener to every checkbox
  checkBoxes.forEach(box => {
    box.addEventListener('change', updateProgress);
  });
  
  // Call the function once on page load to set the initial state
  updateProgress();
}

// --- Relaxation Page Logic ---

const relaxPageContainer = document.getElementById('startStopBtn');

if (relaxPageContainer) {
  const startStopBtn = document.getElementById('startStopBtn');
  const breathingCircle = document.getElementById('breathingCircle');
  const instruction = document.getElementById('breathing-instruction');
  
  let isBreathing = false;
  let instructionInterval;

  const instructions = ["Breathe in...", "Hold...", "Breathe out..."];
  const animationDuration = 8000; // 8 seconds, matching the CSS animation

  function cycleInstructions() {
    // Breathe in (start of animation)
    instruction.textContent = instructions[0];

    // Hold (middle of animation)
    setTimeout(() => {
      instruction.textContent = instructions[1];
    }, animationDuration / 2);

    // Breathe out (just after middle, for the shrink)
    setTimeout(() => {
        instruction.textContent = instructions[2];
    }, (animationDuration / 2) + 1000); // Hold for 1 second
  }

  startStopBtn.addEventListener('click', () => {
    isBreathing = !isBreathing; // Toggle the state

    if (isBreathing) {
      startStopBtn.textContent = 'Stop';
      breathingCircle.classList.add('animating');
      cycleInstructions(); // Run the text cycle once immediately
      // Then set it to repeat every 8 seconds
      instructionInterval = setInterval(cycleInstructions, animationDuration);
    } else {
      startStopBtn.textContent = 'Start';
      breathingCircle.classList.remove('animating');
      instruction.textContent = 'Press Start to begin';
      clearInterval(instructionInterval); // Stop the text cycle
    }
  });
}

// --- Quiz Page Logic ---

const quizContainer = document.getElementById('quiz-container');

if (quizContainer) {
  // Quiz questions and answers data
  const questions = [
    {
      question: "What is a common food craving during the first trimester?",
      answers: [
        { text: "Spicy Curries", correct: false },
        { text: "Citrus Fruits & Salty Snacks", correct: true },
        { text: "Sweet Desserts", correct: false },
        { text: "Coffee", correct: false }
      ]
    },
    {
      question: "Which of these is a common symptom of morning sickness?",
      answers: [
        { text: "Feeling energetic", correct: false },
        { text: "A heightened sense of smell", correct: true },
        { text: "Craving bland food", correct: false },
        { text: "Feeling cold", correct: false }
      ]
    },
    {
      question: "What is a supportive phrase to say to your pregnant partner?",
      answers: [
        { text: "'You're being too emotional.'", correct: false },
        { text: "'Is there anything I can do for you right now?'", correct: true },
        { text: "'Are you sure you should eat that?'", correct: false },
        { text: "'You look tired.'", correct: false }
      ]
    }
  ];

  const questionTextElement = document.getElementById('question-text');
  const answerButtonsElement = document.getElementById('answer-buttons');
  const nextButton = document.getElementById('next-btn');
  const scoreContainer = document.getElementById('score-container');
  const scoreTextElement = document.getElementById('score-text');
  const playAgainButton = document.getElementById('play-again-btn');

  let currentQuestionIndex = 0;
  let score = 0;

  function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    scoreContainer.classList.add('hidden');
    quizContainer.classList.remove('hidden');
    nextButton.classList.add('hidden');
    showQuestion();
  }

  function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    questionTextElement.innerText = currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
      const button = document.createElement('button');
      button.innerText = answer.text;
      button.classList.add('answer-option');
      if (answer.correct) {
        button.dataset.correct = answer.correct;
      }
      button.addEventListener('click', selectAnswer);
      answerButtonsElement.appendChild(button);
    });
  }

  function resetState() {
    nextButton.classList.add('hidden');
    while (answerButtonsElement.firstChild) {
      answerButtonsElement.removeChild(answerButtonsElement.firstChild);
    }
  }

  function selectAnswer(e) {
    const selectedButton = e.target;
    const isCorrect = selectedButton.dataset.correct === "true";

    if (isCorrect) {
      score++;
      selectedButton.classList.add('correct');
    } else {
      selectedButton.classList.add('incorrect');
    }
    
    // Show the correct answer
    Array.from(answerButtonsElement.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.classList.add('correct');
        }
        button.disabled = true;
    });

    nextButton.classList.remove('hidden');
  }

  function showScore() {
    quizContainer.classList.add('hidden');
    scoreContainer.classList.remove('hidden');
    scoreTextElement.innerText = `You scored ${score} out of ${questions.length}!`;
  }

  nextButton.addEventListener('click', () => {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
      showQuestion();
    } else {
      showScore();
    }
  });

  playAgainButton.addEventListener('click', startQuiz);

  // Start the quiz when the page loads
  startQuiz();
}

// --- Chat Page Logic ---

const chatMessages = document.getElementById('chatMessages');

// If we are on the chat page, scroll to the bottom of the messages
if (chatMessages) {
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

// --- Report Page Logic ---

const moodChartCanvas = document.getElementById('moodChart');

if (moodChartCanvas) {
  const ctx = moodChartCanvas.getContext('2d');
  
  // Placeholder data for the chart
  const labels = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const moodData = [3, 4, 3, 5, 4, 2, 5]; // 5=Happy, 4=Calm, 3=Tired, 2=Stressed, 1=Sad
  
  const moodChart = new Chart(ctx, {
    type: 'line', // We want a line chart to show trends
    data: {
      labels: labels,
      datasets: [{
        label: 'Mood Level',
        data: moodData,
        backgroundColor: 'rgba(250, 218, 221, 0.5)', // Light pink fill
        borderColor: '#e15d97', // Darker pink line
        borderWidth: 3,
        pointBackgroundColor: '#FFFFFF',
        pointBorderColor: '#e15d97',
        pointBorderWidth: 2,
        pointRadius: 5,
        tension: 0.4 // This makes the line curvy and smooth
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            // We can add custom labels for the y-axis
            callback: function(value, index, values) {
              const moodMap = {1: 'Sad', 2: 'Stressed', 3: 'Tired', 4: 'Calm', 5: 'Happy'};
              return moodMap[value];
            }
          }
        }
      },
      plugins: {
        legend: {
          display: false // We don't need the legend for a single dataset
        }
      }
    }
  });
}

// --- Responsive Navbar Logic ---
const hamburgerButton = document.getElementById('hamburgerBtn');
const navLinks = document.getElementById('navLinks');

if (hamburgerButton) {
  hamburgerButton.addEventListener('click', () => {
    navLinks.classList.toggle('active');
  });
}