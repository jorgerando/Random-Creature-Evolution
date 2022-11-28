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
var boxA = Bodies.rectangle(0, 0, 80, 80  );
var boxB = Bodies.rectangle(40, 0, 80, 80 );

var cosa =  Matter.Body.create({parts:[boxA,boxB],friction:0.1})
var p = Matter.Vector.create(500,0)
Matter.Body.setPosition(cosa,p)

var aleta = Bodies.rectangle(600, 0, 100, 10, {frictionAir:1}  );
//Matter.Body.setCentre(aleta, { x : -50, y: 0}, false)

var aleta2 = Bodies.rectangle(600, 0, 100, 10, {frictionAir:1}  );
var aleta3 = Bodies.rectangle(200, 0, 150, 10, {frictionAir:1}  );

var constraint = Matter.Constraint.create({
    bodyA: cosa,
    pointA : { x : -70, y: -40 },
    bodyB: aleta,
    pointB : { x : -50, y: 0},
    stiffness: 0.0,
    length:1
});

var constraint2 = Matter.Constraint.create({
    bodyA: cosa,
    pointA : { x : -70, y: 40 },
    bodyB: aleta2,
    pointB : { x : 50, y: 0},
    stiffness: 0.0,
    length:1
});

var group = Matter.Body.nextGroup(true);
aleta.collisionFilter.group = group;
cosa.collisionFilter.group = group;

var ground = Bodies.rectangle(400, 610, 2000, 60, { friction:1,isStatic: true } );

// add all of the bodies to the world

Composite.add(engine.world, [cosa ,aleta,aleta2,constraint ,constraint2,ground]);


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

  push();
  translate(cosa.position.x,cosa.position.y);
  rotate(cosa.angle);
  rectMode(CENTER);
  rect(0,0,80,80);
  rect(40,0,80,80);
  ellipse(80,-60,20*2);
  pop();



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
  //a+=0.01
//rect(boxB.position.x,boxB.position.y,80,80)

}
