// module aliases
var Engine = Matter.Engine,
    //Render = Matter.Render,
    Runner = Matter.Runner,
    Bodies = Matter.Bodies,
    Composite = Matter.Composite;

// create an engine
var engine = Engine.create();

// create two boxes and a ground
var boxA = Bodies.rectangle(400, 200, 80, 80 , { angle:3.14/3 } );
var boxB = Bodies.rectangle(450, 50, 80, 80 , { frictionAir:1 });
var bola = Bodies.circle(600,250,20);
var ground = Bodies.rectangle(400, 610, 810, 60, { isStatic: true } );

// add all of the bodies to the world
Composite.add(engine.world, [boxA, boxB, ground,bola]);

// create runner
var runner = Runner.create();
// run the engine
Runner.run(runner, engine);

function setup() {
  createCanvas(800, 800);
}
a = 0;
function draw() {
  background(220);

  ellipse(bola.position.x,bola.position.y,40,40);

  push();
  translate(ground.position.x,ground.position.y);
  rotate(ground.angle);
  rectMode(CENTER);
  //noStroke();
  rect(0,0,1000,60);
  pop();

  push();
  translate(boxA.position.x,boxA.position.y);
  rotate(boxA.angle);
  rectMode(CENTER);
  rect(0,0,80,80);
  pop();

  push();
  translate(boxB.position.x,boxB.position.y);
  rotate(boxB.angle);
  rectMode(CENTER);
  rect(0,0,80,80);
  pop();

  if ( frameCount % 30 == 0 ){
  fuerza = Matter.Vector.create(0, -0.2);
  position = Matter.Vector.create(boxA.position.x,boxA.position.y+40);
  Matter.Body.applyForce(boxA, position,fuerza)

 }

//rect(boxB.position.x,boxB.position.y,80,80)

}
