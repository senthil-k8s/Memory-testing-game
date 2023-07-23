
var buttonColours = ["red", "blue", "green", "yellow"];

var userClickedPattern = [];

var gamePattern = [];
var started = false;
var level = 0;



$(document).keypress(function(){
  if (!started)
  {
    $("h1").text("Level " + level );
    nextSequence();
    started = true;
  }
});
$(".btn").click(function() {

  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);

  playSound(userChosenColour);
  animatePress(userChosenColour);

  checkAnswer(userClickedPattern.length-1);
});
function animatePress(currentColour)

{

  $("#" + currentColour).addClass("pressed");

  setTimeout( function(){$("#" + currentColour).removeClass("pressed")} , 100 );

}

//  Initial Block of the game
function nextSequence() {

  userClickedPattern = [];

  level++;

  $("h1").text("Level " + level );

//  random number generated in b/w 0 and 3

  var randomNumber = Math.floor(Math.random() * 4);

  var randomChosenColour = buttonColours[randomNumber];

  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);//fadeToggle(100)

  playSound(randomChosenColour);
}

function checkAnswer(currentLevel)

{

  if ( (userClickedPattern[currentLevel]) === gamePattern[currentLevel] )

  {

    if ( userClickedPattern.length === gamePattern.length)

    {
      setTimeout( function() { nextSequence(); } , 1000 );
    }

  }
  else {
    {
        playSound("wrong");
        $("body").addClass("game-over");
        $("h1").text(" Game-Over Press Any key to Restart ");
        setTimeout(function() { $("body").removeClass("game-over"); } , 200 );
        startOver();
    }
  }

}

function playSound(name){
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();

}

function startOver()
{
  level = 0;
  gamePattern = [] ;
  started = false ;
}

/*
 firstly empty and color filled array is created and random number is generated in between 0 and 3
 then, gamepattern and userClickedPattern ( empty ) was created to match the results when the user plays
 nextSequencesequence() is created to continue the game untill the player fails
 click() and keypress() is the main function to play the game when the user clicks on the keyboard or on screen ,
 then it immediately calls the checkAnswer() to check whether the user input and game input matches are/not...
 after calling checkAnswer() , if the condition satisfies then it calls the nextSequence() to continue the game...


*/
