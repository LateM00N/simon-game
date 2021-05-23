var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var gameStart = false;
var level = 0;


function nextSequence() {
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];

  userClickedPattern = [];
  gamePattern.push(randomChosenColour);
  const timer = ms => new Promise(res => setTimeout(res, ms));

  async function load () {
    for (i in gamePattern) {
      $("#" + gamePattern[i]).fadeOut(250).fadeIn(250);
      playSound(gamePattern[i]);
      await timer(1000);
    }
  }

  load();

  // $("#" + randomChosenColour).fadeOut(250).fadeIn(250);
  // playSound(randomChosenColour);
  level++;
  $("#level-title").text("Level " + level);
}

function printGamePattern(i, gamePattern) {
  setTimeout(() => {

  }, 1000);
}


function checkAnswer(currentLevel) {
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function() {
        nextSequence();
      }, 1000);
    }
  } else {
    var wrongAudio = new Audio("sounds/wrong.mp3");

    wrongAudio.play();
    $("body").addClass("game-over");

    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);

    $("#level-title").text("Game Over, Press Any Key to Restart");
    startOver();
  }
}


function startOver() {
  level = 0;
  gamePattern = [];
  gameStart = false;
}


function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");

  setTimeout(function() {
    $("#" + currentColour).removeClass("pressed");
  }, 100);
}


function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");

  audio.play();
}


$(".btn").click(function() {
  var userChosenColour = $(this).attr("id");

  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length-1);
});


$(document).keypress(function (){
  if (gameStart === false) {
    gameStart = true;
    $("#level-title").text("Level 0");
    nextSequence();
  }
});
