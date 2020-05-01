let questions = [];
let currentQuestion;
let score = 0, questionCounter = 0;

const loadQuestions = array => {
    questions = [...array];
}

const getQuestion = array => {
    if (questions.length === 0) return $(location).attr('href', './result.html')
    questionCounter++;
    console.log(questionCounter);
    $('.options-section').empty();

    const randomIndex = Math.floor(Math.random() * array.length) - 1;
    currentQuestion =  array.splice(randomIndex, 1)[0];

    displayQuestionText(currentQuestion);
    displayQuestionOptions(currentQuestion);
    
}

const displayQuestionText = (question) => {
    $('#question').text(question.question);
}

const checkAnswer = (question, response) => {
    const correctAnswer = question.correct_answer === response;
    if (correctAnswer) question++;
    return correctAnswer;
}

const displayQuestionOptions = (question) => {
    let options = [...question.incorrect_answers];
    const randomIndex  = Math.floor(Math.random() * question.length) -1;
    options.splice(randomIndex, 0, question.correct_answer);
    
    for (let i = 0; i < options.length; i++) {
        const $optionsSection = $('.options-section');
        const $optionContainer = $('<div>').addClass('option-container').html(`<p class='option-number'>${i+1}</p><p class='option-text'>${options[i]}</p>`);
        $optionsSection.append($optionContainer);

        $optionContainer.on('click', event => {

            const $response = $(event.currentTarget).children().eq(1).text();
            console.log(checkAnswer(question, $response));
            getQuestion(questions);
        })

    }
}

const startGame = (data) => {
    questionCounter = 0;
    loadQuestions(data);
    getQuestion(questions);
}

$( () => {
    $.ajax({
        url: 'https://opentdb.com/api.php?amount=10'
    }).then(data => {
        startGame(data.results);
    })
})