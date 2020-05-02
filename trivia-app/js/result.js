const displayUserScore = () => {
    const $finalScore = $('#final-score');
    $finalScore.text(localStorage.getItem('userFinalScore'));
}

const saveHighScore = () => {
    $('form').on('submit', event => {
        event.preventDefault();
        
    })
}


$( () => {
    displayUserScore();
    saveHighScore()
    
})