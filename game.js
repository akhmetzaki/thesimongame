var colours = ['red', 'blue', 'green', 'yellow'];
var correctPattern = [];
var userPattern = [];
var gameStarted = false;
var level = 0;

function nextSequence() {
    level++;
    $("#level-title").text(`Level ${level}`);
    var rngColour = colours[Math.floor(Math.random() * 4)];
    correctPattern.push(rngColour);
    playSound(rngColour);
    $('#'+rngColour).fadeIn(100).fadeOut(100).fadeIn(100);
}

$(".btn").on("click", function() {
    var currColour = $(this).attr("id");
    playSound(currColour);
    animatePress(this);
    if (gameStarted) {
        userPattern.push(currColour);
        checkAnswer(userPattern.length - 1);
    }
});

function playSound(colour) {
    var audio = new Audio(`sounds/${colour}.mp3`);
    audio.play();
}

function animatePress(elem) {
    $(elem).addClass('pressed');
    setTimeout(function() {
        $(elem).removeClass('pressed');
    }, 100);
}

$(document).on("keypress", function() {
    if (gameStarted)
        return;
    $("#level-title").text(`Level ${level}`);
    gameStarted = true;
    nextSequence();
});

function checkAnswer(currentLevel) {
    if (correctPattern[currentLevel] === userPattern[currentLevel]) {
        if (currentLevel === level - 1) {
            setTimeout(function() {
                nextSequence();
            }, 1000);
            userPattern = [];
        }
    }
    else {
        playSound('wrong');
        $("body").addClass('game-over');
        setTimeout(function() {
            $("body").removeClass('game-over');
        }, 200);
        $('#level-title').text('Game Over, Press Any Key to Restart');
        startOver();
    }
}

function startOver() {
    level = 0;
    userPattern = [];
    correctPattern = [];
    gameStarted = false;
}