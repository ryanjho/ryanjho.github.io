const triviaQuestions = [];

const loadTriviaQuestions = array => {
    array.forEach(element => {
        triviaQuestions.push(element);
    })
};

$( () => {

    $.ajax({
        url: 'https://opentdb.com/api.php?amount=10'
    }).then(data => {
        
        const randomNumber = Math.floor(Math.random() * data.results.length);
        const options = [];

        const selectedTriviaObject = data.results[randomNumber];
        $('#question').text(selectedTriviaObject.question);
        
        console.log(selectedTriviaObject);

        options.push(selectedTriviaObject.correct_answer);
        selectedTriviaObject.incorrect_answers.forEach(option => {
            options.push(option);
        })

        const iterations = options.length;        
        for (let i = 0; i < iterations; i++) {
            const option = options.splice(Math.floor(Math.random() * options.length), 1);
            $('.options-section').append($('<div>').addClass('option-container').html(`<p class='option-number'>${i+1}</p><p class='option-text'>${option}</p>`));
        }
        
    })
})