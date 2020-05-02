const highScores = JSON.parse(localStorage.getItem('highScores')) || [];
console.log(highScores);

const displayUserScore = () => {
    const $finalScore = $('#final-score');
    $finalScore.text(localStorage.getItem('userFinalScore'));
}

const saveHighScore = (userFinalScore) => {

    $('form').on('submit', event => {
        event.preventDefault();
        if (!$('#username').val()) return;
        const userScore = {
            username: $('#username').val(),
            score: userFinalScore
        }
        highScores.push(userScore);
        highScores.sort( (a, b) => b.score - a.score);
        console.log(highScores);

        localStorage.setItem('highScores', JSON.stringify(highScores));
        
    })
}


$( () => {
    displayUserScore();
    saveHighScore(localStorage.getItem('userFinalScore'));
    
})