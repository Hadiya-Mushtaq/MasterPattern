
var buttonColours=["red", "blue", "green", "yellow"];
var gamePattern=[];
var userClickedPattern=[];
var level=0;
var start=0;
var sequenceTimer; 

$("body").keydown(function(){;
if(start===0){
    start=1;
    $("h1").text("Level "+level);
    nextSequence();
    
}
});
    
    function nextSequence() {
    level++;
    var randomNumber= Math.random()*4;
    randomNumber=Math.floor(randomNumber);
    var randomChosenColour= buttonColours[randomNumber];

    gamePattern.push(randomChosenColour);
    $("#"+randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    
    playSound(randomChosenColour);
   
    clearTimeout(sequenceTimer); // Clear any previous timer first
    sequenceTimer = setTimeout(function() {
        // This code will run if 5 seconds pass without the user finishing the level
        triggerGameOver(); 
    }, 6000); 
}


$(".btn").click(function(){
    var userChosenColour=$(this).attr("id");
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length-1);

});

function checkAnswer(currentLevel){
    if(gamePattern[currentLevel]===userClickedPattern[currentLevel]){
        console.log("success");
        if(gamePattern.length===userClickedPattern.length){
           setTimeout(function(){
            $("h1").text("Level "+level);
            userClickedPattern=[];
            nextSequence();
           },1000);
        }
    }
    else{
        clearTimeout(sequenceTimer);
        console.log("wrong");
        $("body").addClass("game-over");
        $("h1").text(" Wrong Move! , Press Any Key to Restart");
        playSound("wrong");
         gamePattern=[];
        userClickedPattern=[];
        level=0;
        start=0;

        setTimeout(function(){
            $("body").removeClass("game-over");
        },200); 

    }
}
function playSound(name){
    var audio=new Audio("./sounds/"+name+".mp3") 
    audio.play();
}

function animatePress(currentColour){
    $("#"+currentColour).addClass("pressed");
    setTimeout(function () {
        $("#"+currentColour).removeClass("pressed"); 
    },100);
}

function triggerGameOver(){
    console.log("Time out");
        $("body").addClass("game-over");
        $("h1").text(" Time's Up !, Press Any Key to Restart");
        playSound("wrong");
         gamePattern=[];
        userClickedPattern=[];
        level=0;
        start=0;

        setTimeout(function(){
            $("body").removeClass("game-over");
        },200);
}
