// module aliases
var Engine = Matter.Engine,
    Render = Matter.Render,
    Runner = Matter.Runner,
    Bodies = Matter.Bodies,
    Composite = Matter.Composite;

var engine = Engine.create();
var render = Render.create({
  element: document.body,
  engine: engine,
  options: {
       showVelocity:true,
       showDebug:true,
       height:600,
       width:20000,
     }
});

var runner = Runner.create();

// crear muros
var ground = Bodies.rectangle(400, 610, 200000, 60, { friction: 10,isStatic: true } );
var ground2 = Bodies.rectangle(0, 0, 10, 2000 ,{ friction: 10,isStatic: true } );
Composite.add(engine.world, [ ground , ground2 ]);

var parte = new Part();
parte.generarRandom([200,200],mask[0]) ;
Composite.add(engine.world, [ parte.body ]);

var pr1 = new Propulsor();
pr1.generar([400,550],[0,1],50,mask[0]);
var pr2 = new Propulsor();
pr2.generar([500,550],[0,-1],500,mask[0]);
Composite.add(engine.world, [ pr1.body , pr2.body ]);

// create two boxes and a ground
var boxA = Bodies.rectangle(100 +600, 200, 40, 40  );
var boxB = Bodies.rectangle(100+40+600, 200, 80, 80 );
var boxC = Bodies.rectangle(100+80+600, 200, 130, 50 );

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
    stiffness: 0,
    length:220 ,
});

Composite.add(engine.world, [constraint,constraint2,constraint3 ,boxA,boxB,boxC]);

function setup() {
  createCanvas(200, 200);
}

function draw() {
 background(255);
 pr1.activar(frameCount);
 pr2.activar(frameCount)


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


}
Runner.run(runner, engine);
Render.run(render);
