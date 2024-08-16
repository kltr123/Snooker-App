var cueBall;

function cueBallPlacement()
{
    fill(255);
    ellipse(mouseX, mouseY, 22, 22);
}

function generateCueBall()
{
    cueBall = Bodies.circle(mouse.position.x, mouse.position.y, 11, {restitution:1, friction:0.2});
    World.add(engine.world, cueBall);
    cueBallCreated = true;
}

function drawCueBall()
{
    fill(255);
    drawVertices(cueBall.vertices);
}

function checkForCollisionWithRedBalls()
{
    for (var i=0; i< redBalls.length; i++)
    {
        //Checking for collision with red balls
        if (Collision.collides(cueBall, redBalls[i]))
        {
            console.log("Collision with red ball number:"+i);
        } 
    }
}

function checkForCollisionWithColoredBalls()
{
    for (var i=0; i< coloredBalls.length; i++)
    {
        //Checking for collision with colored balls
        if (Collision.collides(cueBall, coloredBalls[i]))
        {
            console.log("Collision with "+coloredBalls[i].render.fillStyle+" colored ball!");
        } 
    }
}

function checkForCollisionWithCushions()
{
    for (var i=0; i< cushions.length; i++)
    {
        //Checking for collision with the cushions
        if (Collision.collides(cueBall, cushions[i]))
        {
            console.log("Collision with cushion!");
        } 
    }
}

function checkIfCueBallInHole()
{   
    for(var j=0; j<holes.length; j++)
    {
        //Finding the distance between the cue ball and the hole
        var d = dist(cueBall.position.x,cueBall.position.y,holes[j].x,holes[j].y);

        if(d < 18)
        {
            //Remove the cue ball that went in the hole
            World.remove(engine.world,cueBall);
            cueBallCreated = false;
            if(gameMode == 4)
            {
                removeHole();
            }
            console.log("Cue Ball went into the pocket!")      
        }
    }
}

function removeExistingCueBall()
{
    if(cueBallCreated == true)
    {
        World.remove(engine.world,cueBall);
    }
}

function checkIfCueBallCreated()
{
    if(cueBallCreated == true)
    {
        drawForceLine();
        drawCueBall();
        checkIfCueBallInHole();
        checkForCollisionWithRedBalls();
        checkForCollisionWithColoredBalls();
        checkForCollisionWithCushions();
    }
    else
    {
        if(holes.length != 0)
        {
            push();
            fill(255);
            stroke("darkblue");
            strokeWeight(4);
            textSize(50);
            text("Please place the cue ball!", 180,200);
            pop();
            cueBallPlacement();
        }
    }
}