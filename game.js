buttonColours = ["red", "blue", "green", "yellow"];
gamePattern = [];
userClickedPattern = [];
started = false;
level = 0;

function nextSequence(){
    userClickedPattern = [];
    level++;
    $("#level-title").text("Level " + level);
    randomNumber = Math.floor(Math.random() * 4);
    randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    $("#" + randomChosenColour).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
}

$(".btn").click(function(){
    userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length - 1);
});

function playSound(name){
    audio = new Audio("./sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColour){
    $("#" + currentColour).addClass("pressed");
    setTimeout(function() {
        $("#" + currentColour).removeClass("pressed");
    }, 100);
}



$(document).keydown(function(){

    if (!started){
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
    }    
    
});

function checkAnswer(currentLevel){
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]){
        console.log("success");
        if(userClickedPattern.length === gamePattern.length){
            setTimeout(function(){
                nextSequence();
                
            }, 1000);
        }
    }
    else{
        console.log("Wrong");
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function() {
            $("body").removeClass("game-over");
        }, 200);
        $("#level-title").text("Game Over, Press Any Key to Restart");
        startOver();
    }
}

function startOver(){
    gamePattern = [];
    started = false;
    level = 0;
}