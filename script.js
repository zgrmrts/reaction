const nogame = 1;
const started = 2;
var gameStatus = nogame;
var disabled = false;
var start;
var rounds;
var roundScores;
var bestScore = Number.MAX_SAFE_INTEGER;

const theButton = document.getElementById("theButton");
const scoreDiv = document.getElementById("scoreDiv");
const bestDiv = document.getElementById("bestDiv");
const gameOver = document.getElementById("gameOver");
startRound = function () {
    theButton.innerText = "Don't press me!";
    theButton.style.color = "black";
    theButton.style.backgroundColor = "#cccccc";
    disabled = true;
    setTimeout(enableButton, 100 + Math.random() * 2000);
    rounds++;
}
enableButton = function () {
    if (gameStatus === started) {
        start = Date.now();
        theButton.innerText = "Press me!";
        theButton.style.color = "white";
        theButton.style.backgroundColor = "#4CAF50";
        disabled = false;
    }
}
theButton.onclick = function () {
    switch (gameStatus) {
        case nogame:
            gameStatus = started;
            rounds = 0;
            roundScores = [];
            scoreDiv.innerText = "";
            gameOver.innerText = "";
            startRound();
            break;
        case started:
            if (disabled) {
                gameStatus = nogame;
                gameOver.innerText = "Game Over!";
                theButton.innerText = "Restart";
                theButton.style.color = "white";
                theButton.style.backgroundColor = "#4CAF50";
                scoreDiv.innerText = "";
            } else {
                var elapsed = Date.now() - start;
                roundScores.push(elapsed);
                if (rounds == 5) {
                    gameStatus = nogame;
                    theButton.innerText = "Restart";
                    theButton.style.color = "white";
                    theButton.style.backgroundColor = "#4CAF50";
                    var score = Number((roundScores.reduce(function (a, b) { return a + b; }) / roundScores.length).toFixed(2));
                    if (score < bestScore) {
                        bestScore = score;
                    }
                    scoreDiv.innerText = "Avarage: " + score + " ms\n";
                    if (bestScore != Number.MAX_SAFE_INTEGER) {
                        bestDiv.innerText = "Best score: " + bestScore + " ms\n";
                    }
                } else {
                    scoreDiv.innerText += elapsed + "ms\n";
                    startRound();
                }
            }
            break;
    };
}
