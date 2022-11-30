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
  engine: engine,
  options: {
       showVelocity:true,
       showDebug:true,
       width:20000,
     }
});

var elements = [] ;

// create two boxes and a ground
var x = 200;
var y = 100;

var cuerpo = Bodies.rectangle(x+0, y+0, 200, 50 ,{ friction:10} );
elements.push(cuerpo);
var rueda1 = Bodies.circle(x-70,y+150,60,{ friction:10});
elements.push(rueda1);
var rueda2 = Bodies.rectangle(x-70,y+150,50,50,{ friction:10});
elements.push(rueda2);
var boxA = Bodies.rectangle(x-100,y-50, 50, 50 ,{ friction:10});
elements.push(boxA);
// uniones
var constraint = Matter.Constraint.create({
    bodyA: cuerpo,
    pointA : { x : 100 , y: 0 },
    bodyB: rueda1,
    pointB : { x : 0, y: 0},
    stiffness: 0,
    length:100 ,
});
elements.push(constraint);
var constraint2 = Matter.Constraint.create({
    bodyA: rueda1,
    pointA : { x : 0, y: 0 },
    bodyB: rueda2,
    pointB : { x : 0, y: 0},
    stiffness: 0.01,
    length:180 ,
});
elements.push(constraint2);
var constraint3 = Matter.Constraint.create({
    bodyA: boxA,
    pointA : { x : 0 , y: 0 },
    bodyB: cuerpo,
    pointB : { x : -50 , y: 0 },
    stiffness: 0.01,
    length:100 ,
});
elements.push(constraint3);
var constraint4 = Matter.Constraint.create({
    bodyA: rueda2,
    pointA : { x : 0 , y: 0 },
    bodyB: cuerpo,
    pointB : { x : 0, y: 0},
    stiffness: 0,
    length:100 ,
});
elements.push(constraint4);
var constraint5 = Matter.Constraint.create({
    bodyA: boxA,
    pointA : { x : 0 , y: 0 },
    bodyB: cuerpo,
    pointB : { x : 0, y: 0},
    stiffness: 0,
    length:100 ,
});
elements.push(constraint5);

var ground = Bodies.rectangle(400, 610, 200000, 60, { friction:5,isStatic: true } );
var ground2 = Bodies.rectangle(0, 0, 10, 2000 ,{ friction:5,isStatic: true } );
elements.push(ground);
elements.push(ground2);

// add all of the bodies to the world
Composite.add(engine.world, elements);
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
  point  = Matter.Vector.create(boxA.position.x,boxA.position.y+40)
  f = Matter.Vector.create(0,-0.4)
  Matter.Body.applyForce(boxA, point, f)
}

if (frameCount % 100 == 0 ){
 point  = Matter.Vector.create(rueda2.position.x+40,rueda2.position.y)
 f = Matter.Vector.create(0,0.4)
 Matter.Body.applyForce(rueda2, point, f)
}



}
