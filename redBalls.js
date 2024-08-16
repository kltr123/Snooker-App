var redBalls;
var redBallCount = 0;

function generateRedBalls()
{   
    if(gameMode == 1 || gameMode == 4) //Game mode 1 or 4
    {
        //Removing existing red balls if any
        for(var i=redBalls.length-1; i>=0; i--)
        {
            World.remove(engine.world,redBalls[i]);
            redBalls.splice(i,1);
        }

        //generating the stacks of red balls
        for(var i=0; i<5; i++)
        {
            var ball = Bodies.circle(width/2+80, i*22 + 255, 11, {restitution:1, friction:0.2});
            redBalls.push(ball);
        }
        for(var i=0; i<4; i++)
        {
            var ball = Bodies.circle(width/2+60, i*22 + 268, 11, {restitution:1, friction:0.2});
            redBalls.push(ball);
        }
        for(var i=0; i<3; i++)
        {
            var ball = Bodies.circle(width/2+40, i*22 + 278, 11, {restitution:1, friction:0.2});
            redBalls.push(ball);
        }
        for(var i=0; i<2; i++)
        {
            var ball = Bodies.circle(width/2+20, i*22 + 290, 11, {restitution:1, friction:0.2});
            redBalls.push(ball);
        }
        var ball = Bodies.circle(width/2, height/2, 11, {restitution:1, friction:0.2});
        redBalls.push(ball);
        //////////////////////////////////////////////////
        World.add(engine.world,redBalls);
    }

    if(gameMode == 2 || gameMode == 3) //Game mode 2 or 3
    {
        //Removing existing red balls
        for(var i=redBalls.length-1; i>=0; i--)
        {
            World.remove(engine.world,redBalls[i]);
            redBalls.splice(i,1);
        }


        //generating the stacks of red balls
        for(var i=0; i<15; i++)
        {
            var ball = Bodies.circle(random(105,795), random(145,435), 11, {restitution:1, friction:0.2});
            redBalls.push(ball);
        }
        //////////////////////////////////////////////////
        World.add(engine.world,redBalls);
    }

}

function drawRedBalls()
{
    fill(255,0,0);

    for(var i=0; i<redBalls.length; i++)
    {
        drawVertices(redBalls[i].vertices);
    }
}

function checkIfRedBallsInHole()
{   
    for(var j=0; j<holes.length; j++)
    {
        for(var i=redBalls.length-1; i>=0; i--)
        {
            //Finding the distance between the red ball and the hole
            var d = dist(redBalls[i].position.x,redBalls[i].position.y,holes[j].x,holes[j].y);

            if(d < 18)
            {
                //Remove the red ball that went in the hole
                World.remove(engine.world,redBalls[i]);
                redBalls.splice(i,1);
                redBallCount++;
                console.log("Red ball count:" +redBallCount);
            }
        }
    }
}


