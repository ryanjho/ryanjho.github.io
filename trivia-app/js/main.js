let questions = [];
let numberQuestions = 0;
let currentQuestion;
let score = 0, questionCounter = 0;

const loadQuestions = array => {
    questions = [...array];
    numberQuestions = questions.length;
}

const displayGameInformation = () => {
    $('#question-number').text(`${questionCounter} of ${numberQuestions}`);
    $('#difficulty').text(`${currentQuestion.difficulty[0].toUpperCase() + currentQuestion.difficulty.slice(1)}`);
    $('#score').text(`${score}`);
}

const displayQuestionText = (question) => {
    $('#question').text(question.question);
}

const checkAnswer = (question, userChoice) => {
    const correctAnswer = question.correct_answer === userChoice;
    if (correctAnswer) question++;
    return correctAnswer;
}

const displayQuestionOptions = (question) => {
    let options = [...question.incorrect_answers];
    const randomIndex  = Math.floor(Math.random() * questions.length);
    options.splice(randomIndex, 0, question.correct_answer);
    
    for (let i = 0; i < options.length; i++) {
        const $optionsSection = $('.options-section');
        const $optionContainer = $('<div>').addClass('option-container').html(`<p class='option-number'>${i+1}</p><p class='option-text'>${options[i]}</p>`);
        $optionsSection.append($optionContainer);

        $optionContainer.on('click', event => {
            const userChoice = $(event.currentTarget).children().eq(1).text();
            
            if (checkAnswer(question, userChoice)) {
                score++;
                $(event.currentTarget).addClass('correct-option');    
            } else {
                $(event.currentTarget).addClass('wrong-option');
                
                $('.option-text').each( index => {
                    if ($(`.option-text:eq(${index})`).text() === question.correct_answer) setTimeout( () => {
                        $(`.option-text:eq(${index})`).parent().addClass('correct-option');
                    }, 500);
                })
            }

            setTimeout( () => {
                getQuestion(questions);
            }, 2000)

            
        })

    }
}

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

const startGame = (data) => {
    questionCounter = 0;
    localStorage.setItem('userFinalScore', '0');
    loadQuestions(data);
    getQuestion(questions);
}

const openModal = () => {
    $('#openModal').on('click', () => {
        console.log('close');
        $('#modal').css('display', 'block');
        $('#modal').addClass('hello');
    })
}

const closeModal = () => {
    $('#closeModal').on('click', () => {
        console.log('close');
        $('#modal').css('display', 'none');
    })
    
}

$( () => {

    openModal();
    closeModal();

    $.ajax({
        url: 'https://opentdb.com/api.php?amount=3'
    }).then(data => {
        startGame(data.results);
        console.log(localStorage.getItem('userFinalScore'));
    }).catch(error => {
        console.log("ERROR MESSAGE BELOW:")
        console.log(error);
    })
})