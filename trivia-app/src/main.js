console.log('Hello world');

$( () => {

    $.ajax({
        url: 'https://opentdb.com/api.php?amount=10'
    }).then(data => {
        console.log(data.results[0]);

        $('#question').text(data.results[0].question)
        const choices = [];
        choices.push(data.results[0].correct_answer);
        data.results[0].incorrect_answers.forEach(choice => {
            choices.push(choice);
        })
        
        while (choices.length > 0 ) {
            const choice = choices.splice(Math.floor(Math.random() * choices.length), 1);
            $('.choices').append($('<p>').text(choice));
        }
        
    })
})