 var buttonColors = ["red","blue","green","yellow"];

 var gamePattern =[];
 var userClickedPattern =[];

 var started = false;
var level = 0;

$(document).keypress(function(){
    if(!started){
        $("#level-title").text("Level "+ level);
        nextSequence();
        started = true;
    }
});

$(".btn").click(function(){

 var userChosenColour =$(this).attr("id");
 userClickedPattern.push(userChosenColour);

 playSound(userChosenColour);
 animatePress(userChosenColour);

 checkAnswer(userClickedPattern.length -1);

});

function checkAnswer(currentLevel){
    if(gamePattern[currentLevel] === userClickedPattern[currentLevel]){
       console.log("success");
       if (userClickedPattern.length === gamePattern.length){
           setTimeout(function(){nextSequence();},1000);
        }
   
    }
    else{
        console.log("Wrong")
        playSound("wrong");
        $("#level-title").text("Game-Over, Press any key to restart");
        $("body").addClass("game-over");
        setTimeout(function(){ $("body").removeClass("game-over");},200 );
        startOver();
    }
   }

 /** random generation  function nextSequence
  Adding  randomChosenColour in gamePattern array 
  Adding fadein fade out animation and adding sound to button
 **/ 
 function nextSequence(){
    userClickedPattern = [];
    level++; 
    $("#level-title").text("Level "+ level);
    
    var randomNumber= Math.floor(Math.random()*4);
    var randomChosenColour =buttonColors[randomNumber];
    gamePattern.push(randomChosenColour);

    $("#"+randomChosenColour).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
 }

// Sound Function when button is clicked
function playSound(name){
    var sound = new Audio("sounds/"+ name +".mp3");
    sound.play();  
}

// animation function on button by adding class "pressed" and removing by using setTimeout func 

function animatePress(currentColour){
            $("#"+currentColour).addClass("pressed");
            setTimeout( function(){
                $("#"+currentColour).removeClass("pressed");
            },100);
            } 

function startOver() {
    
    level=0;
    gamePattern =[];
    started=false;
}

