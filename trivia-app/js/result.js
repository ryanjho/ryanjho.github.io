// Display High Scores Modal
const displayUserScore = () => {
    const userScore = JSON.parse(localStorage.getItem('userFinalScore'));
    $('#final-score').text(userScore);
}

const displayHighScore = () => {
    $('#high-scores-button').on('click', event => {
        const highScores = JSON.parse(localStorage.getItem('highScores')) || [];
        
        for(let i = 0; i < highScores.length; i++) {
            $('#high-scores-table-results').append($(`
            <tr>
                <td>${i+1}</td>
                <td>${highScores[i].username}</td>
                <td>${highScores[i].score}</td>
            </tr>`));
        }

        $('#high-scores-modal-results').toggleClass('hidden');
    })

    $('#close-high-scores-modal-results').on('click', () => {
        $('#high-scores-results').empty();
        $('#high-scores-modal-results').toggleClass('hidden');
    })
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

        localStorage.setItem('highScores', JSON.stringify(highScores));
        
    })
}


$( () => {
    displayUserScore();
    displayHighScore();
    saveHighScore(localStorage.getItem('userFinalScore'));
    
})