// module aliases
var Engine = Matter.Engine,
    Render = Matter.Render,
    Runner = Matter.Runner,
    Bodies = Matter.Bodies,
    Composite = Matter.Composite;

// create an engine
var engine = Engine.create();

var render = Render.create({
    element: document.body,
    engine: engine
});


// create two boxes and a ground
var boxA = Bodies.rectangle(100, 0, 40, 40  );
var boxB = Bodies.rectangle(100+40, 0, 80, 80 );
var boxC = Bodies.rectangle(100+80, 0, 130, 50 );


var constraint = Matter.Constraint.create({
    bodyA: boxA,
    pointA : { x : 0, y: 0 },
    bodyB: boxB,
    pointB : { x : 0, y: 0},
    stiffness: 0.01,
    length:100 ,
});

var constraint2 = Matter.Constraint.create({
    bodyA: boxB,
    pointA : { x : 0, y: 0 },
    bodyB: boxC,
    pointB : { x : 0, y: 0},
    stiffness: 0.01,
    length:150 ,
});

var constraint3 = Matter.Constraint.create({
    bodyA: boxA,
    pointA : { x : 0, y: 0 },
    bodyB: boxC,
    pointB : { x : 0, y: 0},
    stiffness: 0.01,
    length:220 ,
});


var ground = Bodies.rectangle(400, 610, 2000, 60, { friction:1,isStatic: true } );
var ground2 = Bodies.rectangle(0, 0, 10, 2000 ,{ friction:1,isStatic: true } );
var ground3 = Bodies.rectangle(800, 0, 10, 2000 ,{ friction:1,isStatic: true } );

// add all of the bodies to the world

Composite.add(engine.world, [ground ,ground3 ,ground2,constraint,constraint2,constraint3 ,boxA,boxB,boxC]);
Render.run(render);

// create runner
var runner = Runner.create();
// run the engine
Runner.run(runner, engine);



function setup() {
  createCanvas(2000, 800);
}
a = 0;
function draw() {
  background(220);

 if (frameCount % 50 == 0 ){
  point  = Matter.Vector.create(boxB.position.x,boxB.position.y+40)
  f = Matter.Vector.create(0,-0.2)
  Matter.Body.applyForce(boxB, point, f)
}

if (frameCount % 100 == 0 ){
 point  = Matter.Vector.create(boxC.position.x-40,boxC.position.y)
 f = Matter.Vector.create(0,-0.2)
 Matter.Body.applyForce(boxC, point, f)
}


 /*
  if (frameCount % 50 == 0 ){
    point  = Matter.Vector.create(aleta.position.x+50*cos(aleta.angle),aleta.position.y*sin(aleta.angle))
    f = Matter.Vector.create(0,0.2)
    f = Matter.Vector.rotate(f, aleta.angle + 3.14/2)
    Matter.Body.applyForce(aleta, point, f)

    point  = Matter.Vector.create(aleta2.position.x+50*cos(aleta2.angle),aleta2.position.y*sin(aleta.angle))
    f = Matter.Vector.create(0,0.2)
    f = Matter.Vector.rotate(f, aleta2.angle+ 3.14/2)
    Matter.Body.applyForce(aleta2, point, f)
  }
*/


}
