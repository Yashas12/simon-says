//Declaring an array of colours to chose based on randomnumber generated
let buttonColors = ["red","blue","green","yellow"];

//Declaring and empty array to store the pattern of the game
let gamePattern = [];

let userClickedPattern = [];

let level = 0;
let started = false;

$(document).keydown(function(){
    if(!started){
        $("h1").text("Level " + level);
        nextSequence();
        started = true;
    }
})

$(".btn").click(function(){
    let userChosenColor = $(this).attr('id');
    userClickedPattern.push(userChosenColor);
    playSound(userChosenColor);
    console.log(userClickedPattern);
    animatePress(userChosenColor);
    checkAnswer(userClickedPattern.length);
})

function nextSequence() {
    level++;
    userClickedPattern = [];
    $("h1").text("Level " + level);
    let randomNumber = Math.floor(Math.random() * 4);
    let randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);

    //Animation to indicate which box was triggered.
    $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
    
    playSound(randomChosenColor);
    console.log(gamePattern);
}

function playSound(name){
    let sound = new Audio("sounds/" + name + ".mp3");
    sound.play();
}

function animatePress(currentColour){
    $("." + currentColour).addClass("pressed");
    setTimeout(() => {
        $("." + currentColour).removeClass("pressed");
    }, 50);
}


function checkAnswer(currentLevel){
    if(userClickedPattern[currentLevel - 1] === gamePattern[currentLevel - 1]){
      console.log(currentLevel);
      console.log(gamePattern.length);
      console.log("Success");
      if(userClickedPattern.length === gamePattern.length){
        setTimeout(() => {
            nextSequence();
        }, 1000);
      }
    }
    else{
        let wrong = new Audio("sounds/wrong.mp3");
        wrong.play();

        $("body").addClass("game-over");

        setTimeout(() => {
            $("body").removeClass("game-over");
        }, 200);

        $("h1").text("Game Over, Press Any Key to Restart");

        startOver();

      console.log("Wrong");
    }
  }

function startOver(){
    level = 0;
    started = false;
    gamePattern = [];
}