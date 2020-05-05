// Variables
let questions = [];
let numberQuestions = 0;
let currentQuestion;
let score = 0, questionCounter = 0;
const TRIVIA_QUESTIONS_API = 'https://opentdb.com/api.php?';
const AMOUNT_TRIVIA_QUESTIONS = 'amount=10';

// Create Dummy Back-up Questions
const createDummyQuestions = () => {    
    const dummyQuestions = [];
    const difficulty = ['easy', 'medium', 'hard'];
    difficulty.forEach( level => {
        for (let i = 1; i <= 4; i++) {
            const dummyQuestion = {difficulty: level, question: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'};
            const choices = ['Option A', 'Option B', 'Option C', 'Option D'];
            dummyQuestion.correct_answer = choices.splice(Math.floor(Math.random() * choices.length), 1)[0];
            dummyQuestion.incorrect_answers = choices;
            dummyQuestions.push(dummyQuestion);
        }
    })
    return dummyQuestions;
}


// Load Questions
const loadQuestions = array => {
    questions = [...array];
    numberQuestions = questions.length;
}

// Displays Game Information (Question No, Difficulty, Current Score)
const displayGameInformation = () => {
    $('#question-number').text(`${questionCounter} of ${numberQuestions}`);
    $('#difficulty').text(`${currentQuestion.difficulty[0].toUpperCase() + currentQuestion.difficulty.slice(1)}`);
    $('#score').text(`${score}`);
}

// Displays Question Text
const displayQuestionText = (question) => {
    $('#question').text(question.question);
}

// Checks User Selected Option With Answer
const checkAnswer = (question, userChoice) => {
    const correctAnswer = question.correct_answer === userChoice;
    if (correctAnswer) question++;
    return correctAnswer;
}

// Displays Question Options
const displayQuestionOptions = (question) => {
    let options = [...question.incorrect_answers];
    const randomIndex  = Math.floor(Math.random() * (options.length + 1));
    options.splice(randomIndex, 0, question.correct_answer);
    
    for (let i = 0; i < options.length; i++) {
        const $optionsSection = $('.options-section');
        const $optionContainer = $('<div>').addClass('option-container').html(`<p class='option-number'>${i+1}</p><p class='option-text'>${options[i]}</p>`);
        $optionsSection.append($optionContainer);

        $optionContainer.on('click', event => {
            const userChoice = $(event.currentTarget).children().eq(1).text();
            
            if (checkAnswer(question, userChoice)) {
                score++;
                console.log(score);
                $(event.currentTarget).addClass('correct-option');    
            } else {
                console.log(score);
                $(event.currentTarget).addClass('wrong-option');
                
                $('.option-text').each( index => {
                    if ($(`.option-text:eq(${index})`).text() === question.correct_answer) setTimeout( () => {
                        $(`.option-text:eq(${index})`).parent().addClass('correct-option');
                    }, 300);
                })
            }

            setTimeout( () => {
                getQuestion(questions);
            }, 2000)
        })
    }
}

// Get Question 
const getQuestion = array => {
    if (questions.length === 0) {
        localStorage.setItem('userFinalScore', score);
        return $(location).attr('href', './result.html')
    }
    questionCounter++;
    $('.options-section').empty();

    const randomIndex = Math.floor(Math.random() * array.length) - 1;
    currentQuestion =  array.splice(randomIndex, 1)[0];

    displayQuestionText(currentQuestion);
    displayQuestionOptions(currentQuestion);
    displayGameInformation();
}

// Starts the Game
const startGame = (data) => {
    questionCounter = 0;
    localStorage.setItem('userFinalScore', '0');
    $('#home').toggleClass('hidden');
    $('#game').toggleClass('hidden');
    loadQuestions(data);
    getQuestion(questions);
}

// Display About Modal
const displayAboutModal = () => {
    $('#open-about-modal').on('click', () => {
        $('#about-modal').toggleClass('hidden');
    })

    $('#close-about-modal').on('click', () => {
        $('#about-modal').toggleClass('hidden');
    })
}

// Display Difficulty Level Modal
const displayDifficultyLevelModal = () => {
    $('#play-game').on('click', () => {
        $('#difficulty-level-modal').toggleClass('hidden');
    })

    $('#close-difficulty-level-modal').on('click', () => {
        $('#difficulty-level-modal').css('display', 'none');
    })
}

// Select Difficulty Level
const selectDifficultyLevel = () => {
    let DIFFICULTY_LEVEL = '';

    $('.difficulty-level-option').each(index => {
        $(`.difficulty-level-option:eq(${index})`).on('click', (event) => {
            $('#difficulty-level-modal').toggleClass('hidden');
            const selectedDifficulty = $(event.currentTarget).attr('id');
            
            if (selectedDifficulty !== 'random') { 
                DIFFICULTY_LEVEL = selectedDifficulty;
            }

            const $promise = $.ajax({
                url: TRIVIA_QUESTIONS_API + AMOUNT_TRIVIA_QUESTIONS + `&difficulty=${DIFFICULTY_LEVEL}`
            })
        
            $promise.then(data => {
                startGame(data.results);
            }).catch(error => {
                console.log("ERROR MESSAGE BELOW:")
                console.log(error);
                alert('ERROR WITH API CALL. LOADING WITH DUMMY DATA!');
                startGame(createDummyQuestions());
            })

        });
    })

 
}

// Display High Scores Modal
const displayHighScoresModal = () => {
    highScores = JSON.parse(localStorage.getItem('highScores')) || [];

    $('#high-scores-button').on('click', event => {
        for(let i = 0; i < highScores.length; i++) {
            $('#high-scores-table').append($(`
            <tr>
                <td>${i+1}</td>
                <td>${highScores[i].username}</td>
                <td>${highScores[i].score}</td>
            </tr>`));
        }

        $('#high-scores-modal').toggleClass('hidden');
    })

    $('#close-high-scores-modal').on('click', () => {
        $('#high-scores').empty();
        $('#high-scores-modal').toggleClass('hidden');
    })
}




$( () => {
    displayAboutModal();
    displayDifficultyLevelModal();
    displayHighScoresModal();
    selectDifficultyLevel();

})