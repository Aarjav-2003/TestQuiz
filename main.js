// import './stylesheet.css';

const questions = [
  {
    question: "What is the primary purpose of HTML in web development?",
    options: [
      "To style web pages",
      "To structure web content",
      "To handle server-side logic",
      "To create animations"
    ],
    correctAnswer: 1
  },
  {
    question: "Which programming language is known as the 'language of the web'?",
    options: [
      "Python",
      "Java",
      "JavaScript",
      "C++"
    ],
    correctAnswer: 2
  },
  {
    question: "What does CSS stand for?",
    options: [
      "Computer Style Sheets",
      "Creative Style System",
      "Cascading Style Sheets",
      "Colorful Style Sheets"
    ],
    correctAnswer: 2
  },
  {
    question: "Which of these is NOT a JavaScript framework/library?",
    options: [
      "React",
      "Angular",
      "Django",
      "Vue"
    ],
    correctAnswer: 2
  },
  {
    question: "What is the purpose of responsive web design?",
    options: [
      "To make websites load faster",
      "To adapt websites to different screen sizes",
      "To improve SEO rankings",
      "To add animations to websites"
    ],
    correctAnswer: 1
  }
];

class QuizApp {
  constructor() {
    this.currentQuestion = 0;
    this.score = 0;
    this.userAnswers = new Array(questions.length).fill(null);
    this.init();
    this.initializeNavigation();
  }

  init() {
    this.renderQuestion();
  }

  initializeNavigation() {
    document.getElementById('home-link').addEventListener('click', (e) => {
      e.preventDefault();
      this.currentQuestion = 0;
      this.score = 0;
      this.userAnswers = new Array(questions.length).fill(null);
      this.renderQuestion();
    });

    document.getElementById('about-link').addEventListener('click', (e) => {
      e.preventDefault();
      this.renderAbout();
    });

    document.getElementById('leaderboard-link').addEventListener('click', (e) => {
      e.preventDefault();
      this.renderLeaderboard();
    });
  }

  renderQuestion() {
    const app = document.querySelector('#app');
    const question = questions[this.currentQuestion];
    const progress = ((this.currentQuestion + 1) / questions.length) * 100;

    app.innerHTML = `
      <div class="quiz-container">
        <div class="quiz-header">
          <h1>Tech Quiz</h1>
          <div class="progress">
            Question ${this.currentQuestion + 1} of ${questions.length}
            <div class="progress-bar">
              <div class="progress-fill" style="width: ${progress}%"></div>
            </div>
          </div>
        </div>
        <div class="question">
          <h2>${question.question}</h2>
          <div class="options">
            ${question.options.map((option, index) => `
              <div class="option ${this.userAnswers[this.currentQuestion] === index ? 'selected' : ''}" 
                   data-index="${index}">
                ${option}
              </div>
            `).join('')}
          </div>
        </div>
        <div class="actions">
          ${this.currentQuestion > 0 ? 
            `<button class="button" id="prev-btn">
              <i class="fas fa-arrow-left"></i> Previous
            </button>` : 
            ''}
          <button class="button" id="next-btn" ${this.userAnswers[this.currentQuestion] === null ? 'disabled' : ''}>
            ${this.currentQuestion === questions.length - 1 ? 
              '<i class="fas fa-flag-checkered"></i> Finish' : 
              'Next <i class="fas fa-arrow-right"></i>'}
          </button>
        </div>
      </div>
    `;

    this.attachEventListeners();
  }

  renderAbout() {
    const app = document.querySelector('#app');
    app.innerHTML = `
      <div class="quiz-container">
        <h1>About Tech Quiz</h1>
        <p>Welcome to Tech Quiz! This interactive quiz application tests your knowledge of web development and programming concepts.</p>
        <p>Features:</p>
        <ul>
          <li>Multiple choice questions</li>
          <li>Instant feedback</li>
          <li>Progress tracking</li>
          <li>Detailed results review</li>
        </ul>
        <div class="actions">
          <button class="button" id="start-quiz">
            <i class="fas fa-play"></i> Start Quiz
          </button>
        </div>
      </div>
    `;

    document.getElementById('start-quiz').addEventListener('click', () => {
      this.currentQuestion = 0;
      this.score = 0;
      this.userAnswers = new Array(questions.length).fill(null);
      this.renderQuestion();
    });
  }

  renderLeaderboard() {
    const app = document.querySelector('#app');
    app.innerHTML = `
      <div class="quiz-container">
        <h1>Leaderboard</h1>
        <p>Coming soon! Track your progress and compete with others.</p>
        <div class="actions">
          <button class="button" id="start-quiz">
            <i class="fas fa-play"></i> Start New Quiz
          </button>
        </div>
      </div>
    `;

    document.getElementById('start-quiz').addEventListener('click', () => {
      this.currentQuestion = 0;
      this.score = 0;
      this.userAnswers = new Array(questions.length).fill(null);
      this.renderQuestion();
    });
  }

  attachEventListeners() {
    const options = document.querySelectorAll('.option');
    const nextBtn = document.getElementById('next-btn');
    const prevBtn = document.getElementById('prev-btn');

    options.forEach(option => {
      option.addEventListener('click', () => {
        const index = parseInt(option.dataset.index);
        this.userAnswers[this.currentQuestion] = index;
        this.renderQuestion();
      });
    });

    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        if (this.currentQuestion === questions.length - 1) {
          this.showResults();
        } else {
          this.currentQuestion++;
          this.renderQuestion();
        }
      });
    }

    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        this.currentQuestion--;
        this.renderQuestion();
      });
    }
  }

  calculateScore() {
    return this.userAnswers.reduce((score, answer, index) => {
      return score + (answer === questions[index].correctAnswer ? 1 : 0);
    }, 0);
  }

  showResults() {
    const app = document.querySelector('#app');
    const score = this.calculateScore();
    const percentage = (score / questions.length) * 100;

    app.innerHTML = `
      <div class="quiz-container results">
        <h1>Quiz Results</h1>
        <div class="score">
          <span class="score-label">Your Score</span>
          ${score}/${questions.length} (${percentage.toFixed(1)}%)
        </div>
        <div class="review">
          <h2>Review Answers</h2>
          ${questions.map((question, index) => `
            <div class="review-item">
              <h3>Question ${index + 1}</h3>
              <p>${question.question}</p>
              <p class="correct-answer">
                <i class="fas fa-check"></i> Correct answer: ${question.options[question.correctAnswer]}
              </p>
              <p class="user-answer ${this.userAnswers[index] === question.correctAnswer ? 'correct' : 'incorrect'}">
                <i class="fas ${this.userAnswers[index] === question.correctAnswer ? 'fa-circle-check' : 'fa-circle-xmark'}"></i>
                Your answer: ${question.options[this.userAnswers[index]]}
              </p>
            </div>
          `).join('')}
        </div>
        <div class="actions">
          <button class="button" id="restart-btn">
            <i class="fas fa-rotate"></i> Restart Quiz
          </button>
        </div>
      </div>
    `;

    document.getElementById('restart-btn').addEventListener('click', () => {
      this.currentQuestion = 0;
      this.score = 0;
      this.userAnswers = new Array(questions.length).fill(null);
      this.renderQuestion();
    });
  }
}

// Initialize the quiz app
window.onload = () => {
    new QuizApp();
  };
  