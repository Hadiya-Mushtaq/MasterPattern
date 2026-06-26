
var buttonValues = ["a", "b", "c", "d","e","f"];

var gamePattern = [];
var userClickedPattern = [];

var started = false;
var level = 0;
var sequenceTimer; 

$(document).keydown(function(event) {

  var key = event.key.toLowerCase();

  // Start game
  if (!started) {
      $("#level-title").text("Level " + level);
      setTimeout(nextSequence,240);
      started = true;
      return;
  }

  // Game already started
  if(buttonValues.includes(key)){

      // Simulate clicking the corresponding box
      $("#" + key).trigger("click");

  }

});

$(".btn").click(function() {

  var userChosenValue = $(this).attr("id");
  userClickedPattern.push(userChosenValue);

  animatePress(userChosenValue);

  checkAnswer(userClickedPattern.length-1);
});

function checkAnswer(currentLevel) {

    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
      console.log("Success");
      if (userClickedPattern.length === gamePattern.length){
        setTimeout(function () {
          $("h1").text("Level "+level);
          userClickedPattern=[];
          nextSequence();
        }, 1000);
      }
    } else {
      clearTimeout(sequenceTimer);
      console.log("wrong");
      playSound("wrong");
      $("body").removeClass("top");
      $("body").addClass("game-over");
      $("#level-title").text("Wrong Move! Press Any Key to Restart");
      gamePattern=[];
      userClickedPattern=[];
      level=0;
      started=false;

      setTimeout(function () {
        $("body").removeClass("game-over");
        $("body").addClass("top");
      }, 300);

    }
  }


function nextSequence() {
  level++;
  var allowedTime = Math.min(4000 + level * 1000, 10000); // Maximum allowed time is 10 seconds but time go on increasing with level

  var randomNumber = Math.floor(Math.random() * 6);
  var randomChosenValue = buttonValues[randomNumber];
  gamePattern.push(randomChosenValue);

  $("#" + randomChosenValue).fadeIn(200).fadeOut(200).fadeIn(200);
  playSound(randomChosenValue);
  clearTimeout(sequenceTimer); // Clear any previous timer first
    sequenceTimer = setTimeout(function() {
        triggerGameOver(); 
    }, allowedTime); 
}

function animatePress(currentValue) {
  $("#" + currentValue).addClass("pressed");
  setTimeout(function () {
    $("#" + currentValue).removeClass("pressed");
  }, 600);
}

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function triggerGameOver(){
  console.log("Time out");
      $("body").removeClass("top");
      $("body").addClass("wrong");
      $("h1").text(" Time's Up !, Press Any Key to Restart");
      playSound("timeout");
       gamePattern=[];
      userClickedPattern=[];
      level=0;
      started=false;

      setTimeout(function(){
          $("body").removeClass("wrong");
          $("body").addClass("top");
      },300);
}
