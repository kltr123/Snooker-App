var Engine = Matter.Engine;
var World = Matter.World;
var Bodies = Matter.Bodies;
var Body = Matter.Body;
var Collision = Matter.Collision;
var Mouse = Matter.Mouse;
var gameMode = 1;
var cueBallCreated = false;
var isGameOver = false;

var engine;
var mouse;

function setup() 
{
    createCanvas(1200, 600);
    engine = Engine.create();
    engine.world.gravity.y = 0;
    mouse = Mouse.create();

    walls = [];
    cushions = [];
    generateTable();
    generateHoles();
    redBalls = [];
    generateRedBalls();
    coloredBalls = [];
    generateColoredBalls();
}

function backgroundText()
{
    push();
    fill(255);
    stroke("darkblue");
    strokeWeight(4);
    textSize(50);
    text('Game Mode: ' + gameMode, 60, 70);
    textSize(20);
    text("Rules of Game:", 60,515);
    textSize(15);
    text("1.There are 4 game modes, press the key '1' for game mode 1, '2' for game mode 2, '3' for game mode 3, '4' for game mode 4.", 60,535);
    text("2.To shoot the cue ball, position the mouse in the opposite direction of the target.",60, 555);
    text("3.To adjust the force of the cueball, moving it nearer to the cueball will result in a softer shot, or move it further for a stronger shot",60,575);
    text("4.To win the game, simply score each colored ball once!", 60, 595);
    textSize(30)
    if(gameMode == 1)
    {
        text('(Normal Positions)', 400, 70);
    }
    else if(gameMode == 2)
    {
        text('(Random Reds)', 400, 70); 
    }
    else if(gameMode == 3)
    {
        text('(Random Reds & Colored)', 400, 70);
    }
    else if(gameMode == 4)
    {
        text('(Unique Extension)', 400, 70);
        textSize(20);
        stroke("red");
        text("Extra Rules:",870,70);
        text("1.Scoring the Cueball will result in a",870, 95);
        text("missing pocket hole!",885,120)
        text("2.Scoring the Purple Ball will lead to",870,145);
        text("IMMEDIATE DISQUALIFICATION!",885,170);
    }
    pop();
}

function scoreBoard()
{
    push();
    fill(0,0,255);
    textSize(20);
    text("Colored Balls to Score:",870,200);
    pop();
    if(greenBallScored == false)
    {
        fill("green");
        ellipse(890,220,22,22); 
    }
    if(brownBallScored == false)
    {
        fill("brown");
        ellipse(920,220,22,22);
    }
    if(yelllowBallScored == false)
    {
        fill("yellow");
        ellipse(950,220,22,22);
    }
    if(blueBallScored == false)
    {
        fill("blue");
        ellipse(980,220,22,22);
    }
    if(pinkBallScored == false)
    {
        fill("pink");
        ellipse(1010,220,22,22);
    }
    if(blackBallScored == false)
    {
        fill("black");
        ellipse(1040,220,22,22);
    }
}

function gameOver()
{
    gameMode = "GAME OVER!";
    isGameOver = true;
    push();
    fill("purple")
    textSize(75);
    stroke("black");
    strokeWeight(10);
    text("GAME OVER", width/4-70, height/2);
    pop();
}

function checkIfWin()
{
    if(greenBallScored == true && brownBallScored ==true && yelllowBallScored == true && blueBallScored == true && pinkBallScored == true && blackBallScored == true)
    {
        gameMode = "Victory!";
        isGameOver = true;
        push();
        fill("purple")
        textSize(70);
        stroke("black");
        strokeWeight(10);
        text("CONGRATULATIONS", 100, height/2-60);
        text("You Win!", width/4, height/2+50);
        pop();
    }
}

function resetGame()
{
    resetScore();
    scoreBoard();
    generateRedBalls();
    generateColoredBalls();
    removeExistingCueBall()
    cueBallCreated = false;
    isGameOver = false;
}