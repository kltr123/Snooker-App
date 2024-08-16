var coloredBalls;
var coloredBallCount = 0;
var greenBallScored = false;
var brownBallScored = false;
var yelllowBallScored = false;
var blueBallScored = false;
var pinkBallScored = false;
var blackBallScored = false;

function generateColoredBalls()
{
    //Game mode 1 or 2 or 4
    if(gameMode == 1 || gameMode == 2 || gameMode == 4) 
    {
        for(var i=coloredBalls.length-1; i>=0; i--)
        {
            World.remove(engine.world,coloredBalls[i]);
            coloredBalls.splice(i,1);
        }
        //generate the black ball
        var ball = Bodies.circle(width/3*2-50, height/2, 11, {restitution:1, friction:0.2, render:{fillStyle:"black"}, orgPos:{x:width/3*2-50,y:height/2}});
        coloredBalls.push(ball);

        //generate the pink ball
        var ball = Bodies.circle(width/2-50, height/2, 11, {restitution:1, friction:0.2, render:{fillStyle:"pink"}, orgPos:{x:width/2-50,y:height/2}});
        coloredBalls.push(ball);

        //generate the blue ball
        var ball = Bodies.circle(450, height/2, 11, {restitution:1, friction:0.2, render:{fillStyle:"blue"}, orgPos:{x:450,y:height/2}});
        coloredBalls.push(ball);

        //generate the green ball
        var ball = Bodies.circle(width/5-10, height/2-44, 11, {restitution:1, friction:0.2, render:{fillStyle:"green"}, orgPos:{x:width/5-10,y:height/2-44}});
        coloredBalls.push(ball);

        //generate the brown ball
        var ball = Bodies.circle(width/5-10, height/2, 11, {restitution:1, friction:0.2, render:{fillStyle:"brown"}, orgPos:{x:width/5-10,y:height/2}});
        coloredBalls.push(ball);

        //generate the yellow ball
        var ball = Bodies.circle(width/5-10, height/2+44, 11, {restitution:1, friction:0.2, render:{fillStyle:"yellow"},orgPos:{x:width/5-10,y:height/2+44}});
        coloredBalls.push(ball);

        if(gameMode == 4)
        {
            var ball = Bodies.circle(width/4+30, height/2, 11, {restitution:1, friction:0.2, render:{fillStyle:"purple"},orgPos:{x:width/4+30,y:height/2}});
            coloredBalls.push(ball);
        }
        World.add(engine.world, coloredBalls);
    }

    if(gameMode == 3) //Game mode 3
    {
        for(var i=coloredBalls.length-1; i>=0; i--)
        {
            World.remove(engine.world,coloredBalls[i]);
            coloredBalls.splice(i,1);
        }
        //generate the black ball
        var ball = Bodies.circle(random(115,785), random(155,425), 11, {restitution:1, friction:0.2, render:{fillStyle:"black"}, orgPos:{x:width/3*2-50,y:height/2}});
        coloredBalls.push(ball);

        //generate the pink ball
        var ball = Bodies.circle(random(115,785), random(155,425), 11, {restitution:1, friction:0.2, render:{fillStyle:"pink"}, orgPos:{x:width/2-50,y:height/2}});
        coloredBalls.push(ball);

        //generate the blue ball
        var ball = Bodies.circle(random(115,785), random(155,425), 11, {restitution:1, friction:0.2, render:{fillStyle:"blue"}, orgPos:{x:450,y:height/2}});
        coloredBalls.push(ball);

        //generate the green ball
        var ball = Bodies.circle(random(115,785), random(155,425), 11, {restitution:1, friction:0.2, render:{fillStyle:"green"}, orgPos:{x:width/5-10,y:height/2-44}});
        coloredBalls.push(ball);

        //generate the brown ball
        var ball = Bodies.circle(random(115,785), random(155,425), 11, {restitution:1, friction:0.2, render:{fillStyle:"brown"}, orgPos:{x:width/5-10,y:height/2}});
        coloredBalls.push(ball);

        //generate the yellow ball
        var ball = Bodies.circle(random(115,785), random(155,425), 11, {restitution:1, friction:0.2, render:{fillStyle:"yellow"},orgPos:{x:width/5-10,y:height/2+44}});
        coloredBalls.push(ball);

        World.add(engine.world, coloredBalls);
    }
}

function drawColoredBalls()
{
    for(var i=0; i<coloredBalls.length; i++)
    {
        fill(coloredBalls[i].render.fillStyle);
        drawVertices(coloredBalls[i].vertices);
    }
}

function checkIfColoredBallsInHole()
{   
    for(var j=0; j<holes.length; j++)
    {
        for(var i=coloredBalls.length-1; i>=0; i--)
        {
            //Finding the distance between the colored ball and the hole
            var d = dist(coloredBalls[i].position.x,coloredBalls[i].position.y,holes[j].x,holes[j].y);

            if(d<18)
            {  
                //Game over if purple ball goes into pocket hole
                if(coloredBalls[i].render.fillStyle == "purple")
                {
                    World.remove(engine.world,coloredBalls[i]);
                    gameOver();
                    console.log("GAME OVER! Purple Ball went in pocket hole, please try again!")
                    break;
                }
                coloredBallCount+=1;
                console.log(coloredBalls[i].render.fillStyle, "colored ball went into the pocket!");
                //Checking which colored ball was scored
                if(coloredBalls[i].render.fillStyle == "green")
                {
                    greenBallScored = true;
                }
                if(coloredBalls[i].render.fillStyle == "brown")
                {
                    brownBallScored = true;
                }
                if(coloredBalls[i].render.fillStyle == "yellow")
                {
                    yelllowBallScored = true;
                }
                if(coloredBalls[i].render.fillStyle == "blue")
                {
                    blueBallScored = true;
                }
                if(coloredBalls[i].render.fillStyle == "pink")
                {
                    pinkBallScored = true;
                }
                if(coloredBalls[i].render.fillStyle == "black")
                {
                    blackBallScored = true;
                }
                ///////////////////////////////
                //Create new colored ball if it goes into the hole
                var ball = Bodies.circle(coloredBalls[i].orgPos.x, coloredBalls[i].orgPos.y, 11, {restitution:1, friction:0.2, render:{fillStyle:coloredBalls[i].render.fillStyle},orgPos:{x:coloredBalls[i].orgPos.x , y:coloredBalls[i].orgPos.y}});
                coloredBalls.push(ball);                            

                //Add the new colored ball into the world
                World.add(engine.world, ball);
                fill(ball.render.fillStyle);
                drawVertices(ball.vertices);

                //Remove the existing colored ball that went in the hole
                World.remove(engine.world,coloredBalls[i]);
                coloredBalls.splice(i,1);
            }
        }
    }
}

function checkForTwoConsecutiveColoredBall()
{
    //Checking if two consecutive colored ball goes into the hole
    if(coloredBallCount >=2)
    {
        console.log("Warning! Two coloured balls cannot fall in the pocket consecutively!")
        //Gives the warning and reset the coloredBall count to 0
        coloredBallCount = 0;
    }
    //Checking if any red ball goes into the hole
    else if(redBallCount > 0)
    {
        //Reset the coloredBall and redBall count to 0
        coloredBallCount = 0;
        redBallCount = 0;
    }
}

function resetScore()
{
    greenBallScored = false;
    brownBallScored = false;
    yelllowBallScored = false;
    blueBallScored = false;
    pinkBallScored = false;
    blackBallScored = false;
    coloredBallCount = 0;
}