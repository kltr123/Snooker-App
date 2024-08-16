var walls;
var cushions;

function generateTable()
{
    var wallTop = Bodies.rectangle(450, 100, 800, 20, {isStatic:true});
    var wallBottom = Bodies.rectangle(450, 480, 800, 20, {isStatic:true});
    var wallLeft = Bodies.rectangle(60, 290, 20, 360, {isStatic:true});
    var wallRight = Bodies.rectangle(840, 290, 20, 360, {isStatic:true});

    walls.push(wallTop);
    walls.push(wallBottom);
    walls.push(wallLeft);
    walls.push(wallRight);
    World.add(engine.world, walls);

    var cushionTL = Bodies.trapezoid(265,120,300,20,-0.1,{isStatic:true, restitution:0.5, friction:0.2});
    var cushionTR = Bodies.trapezoid(635,120,300,20,-0.1,{isStatic:true, restitution:0.5, friction:0.2});
    var cushionBL = Bodies.trapezoid(265,460,330,20,0.1,{isStatic:true, restitution:0.5, friction:0.2});
    var cushionBR = Bodies.trapezoid(635,460,330,20,0.1,{isStatic:true, restitution:0.5, friction:0.2});
    var cushionL = Bodies.trapezoid(80,290,300,20,0.1, {isStatic:true, restitution:0.5, friction:0.2});
    var cushionR = Bodies.trapezoid(820,290,270,20,-0.1, {isStatic:true, restitution:0.5, friction:0.2});

    Body.rotate(cushionL, Math.PI/2);
    Body.rotate(cushionR, Math.PI/2);

    cushions.push(cushionTL);
    cushions.push(cushionTR);
    cushions.push(cushionBL);
    cushions.push(cushionBR);
    cushions.push(cushionL);
    cushions.push(cushionR);
    World.add(engine.world, cushions);   
}

function drawTable()
{
    fill(51,25,0);
    for(var i=0; i<walls.length;i++)
    {
        drawVertices(walls[i].vertices);
    }

    //Yellow part of the table
    fill(255,255,0);
    rect(50,90,40,40); //top left yellow hole
    rect(810,90,40,40); //top right yellow hole
    rect(430,90,40,20); //top middle yellow hole
    rect(50,450,40,40); //bottom left yellow hole
    rect(810,450,40,40); //bottom right yellow hole
    rect(430,470,40,20); // bottom middle yellow hole
}

function drawMat()
{
    fill("green");
    rect(70,110,760,360,20); //table mat
    // drawing the white lines on the table mat
    push();
    stroke(255);
    line(width/5-10, 130,width/5-10, 450);
    arc(width/5-10, height/2, 88, 88, HALF_PI, PI+HALF_PI);
    pop();

    //drawing the cushions on the mat
    fill(51,102,0,200);
    for(var i=0; i<cushions.length;i++)
    {
        drawVertices(cushions[i].vertices);
    }
}