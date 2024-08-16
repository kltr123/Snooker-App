/*
Commentary in main.js file
Mouse-based Cue Ball Function:
The decision to use a mouse-based cue function was to enhance user interaction and simulate the real-life experience of aiming and striking the cue ball. This functionality allows the player to control the direction and force of the cue ball by with a click of the mouse.
For aiming: The player adjust the mouse accordingly for the direction of the shot.
For the force control: The distance between the mouse click and the cue ball will determine the force applied to the cue ball.

Unique Extension Features:
All of the unique extensions are featured in "gameMode 4". The aim of this extension was to introduce a more unique and challenging gameplay of the snooker game:
Disappearing Pocket Holes: When the cue ball enters a pocket hole, a random pocket hole will disappear. 
Introducing a Purple-Colored Ball: When the purple colored ball enters a pocket hole, it will results in an immediate loss / game over for the player.
A few reasons why I decided to implement these extensions was to increase the difficulty of the game. 
By removing the pocket holes , it changes the game's dynamics, forcing the player to come up with different strategies. For example, when there are missing pocket holes, it requires a careful placement of colored balls to ensure scoring remains viable.  
By introducing the purple ball , it immediately adds a risk factor, which may influence players' shot choices. It could impact a player's decision-making during shots and it fosters a heightened sense of vigilance.
Also, these rule modifications offer a fresh twist to traditional snooker, engaging players differently.It offers a combination of familiarity and excitement through the integration of innovative alterations, challenging players to strategise and adapt.

Implementation of Win Conditions:
For my snooker project, a scoreboard has been integrated, but with a different win condition. Instead of accumulating scoring points, players will focus on pocketing each colored ball on the table at least once to secure a win.
By implementing this win condition, the game shifts its focus from point accumulation to a more strategic gameplay approach, challenging players to maneuver and pocket each colored ball strategically. This requires precise shot planning and execution for a successful win.
*/

function draw() 
{
    background(255);
    Engine.update(engine);

    drawTable();
    drawMat();
    drawHoles();
    drawRedBalls();
    drawColoredBalls();
    checkIfRedBallsInHole()
    checkIfColoredBallsInHole();
    checkForTwoConsecutiveColoredBall();
    checkIfWin();
    backgroundText();
    scoreBoard();
    checkIfCueBallCreated();
    checkIfAllHolesAreGone();
}

function drawForceLine()
{
    push();
    var distance = dist(mouseX,mouseY,cueBall.position.x,cueBall.position.y);
    colorMode(HSB);
    var lineColor = map(distance,0,1000,0,380);
    colorMode(RGB);
    stroke(lineColor,100,90);
    strokeWeight(5);
    line(mouseX, mouseY, cueBall.position.x, cueBall.position.y);
    pop();
}

function drawVertices(vertices)
{
    beginShape();
    for(var i=0; i < vertices.length; i++)
    {
        vertex(vertices[i].x, vertices[i].y);
    }
    endShape(CLOSE);
}

function mousePressed()
{
    if(isGameOver != true)
    {
        //Check if the cue ball is created and 
        //to create it within the table mat
        if(cueBallCreated == false && mouseX > 100 && mouseX < 800 && mouseY > 140 && mouseY < 440)
        {
            generateCueBall();
        }
        //check when cue ball is coming to a rest
        if(cueBall.speed < 0.05)
        {
            var force = 8000;
            var forceX = (cueBall.position.x - mouseX)/force;
            var forceY = (cueBall.position.y - mouseY)/force;
            var appliedForce = {x:forceX, y:forceY};
            Body.applyForce(cueBall, {x:cueBall.position.x, y:cueBall.position.y}, appliedForce); 
        }
    }
}

function keyPressed()
{
    //regenerate the holes if changing the game mode from game mode 4
    if(gameMode == 4)
    {
        holes = [];
        generateHoles();
    }
    if(keyCode == 49) // Key number "1"
    {
        gameMode = 1;
        console.log("gameMode 1");
        resetGame();
    }
    else if(keyCode == 50) // Key number "2"
    {
        gameMode = 2;
        console.log("gameMode 2");
        resetGame();
    }
    else if(keyCode == 51) // Key number "3"
    {
        gameMode = 3;
        console.log("gameMode 3");
        resetGame();
    }
    else if(keyCode == 52) // Key number "3"
    {
        gameMode = 4;
        console.log("gameMode 4");
        resetGame();
    }
}

