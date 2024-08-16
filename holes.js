var holes = [];
function generateHoles()
{  
    fill(0);
    var holeTL = new Hole(85,125,33,33); //top left hole
    var holeTM = new Hole(450,115,33,33); //top middle hole
    var holeTR = new Hole(815,125,33,33); //top right hole
    var holeBL = new Hole(85,455,33,33); //bottom left hole
    var holeBM = new Hole(450,465,33,33); //bottom middle hole
    var holeBR = new Hole(815,455,33,33); //bottom right hole

    holes.push(holeTL);
    holes.push(holeTM);
    holes.push(holeTR);
    holes.push(holeBL);
    holes.push(holeBM);
    holes.push(holeBR);
}

function Hole(x, y, radius, radius)
{
    this.x = x;
    this.y = y;
    this.radius = radius;
}

function drawHoles()
{
    fill(0);
    for (var i = 0; i < holes.length; i++) 
    {
        var h = holes[i];
        ellipse(h.x, h.y, h.radius, h.radius); 
    }
}

function removeHole()
{
    //Getting a random integer from 0 to 5
    var h = Math.floor(random(0,holes.length)); 
    holes.splice(h,1); // Remove the randomly selected hole 
}

function checkIfAllHolesAreGone()
{
    //checking if there are still holes in the game for gamemode 4
    if(holes.length == 0)
    {
        gameOver();
        console.log("GAME OVER! There is no more pocket holes left! Please try again!")
    }
}


