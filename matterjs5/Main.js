var defaultCategory = 0x0001, // for ground
  CategoryOne = 0x0002,
  CategoryTwo = 0x0004

var groundCategory = 0b00000;
var c1 = 0b00001;
var c2 = 0b00010;
var c3 = 0b00011;
var c4 = 0b00100;
var c5 = 0b00101;
var c6 = 0b00110;
var c7 = 0b00111;
var c8 = 0b01000;
var c9 = 0b01001;
var c10 = 0b01010;
var c11 = 0b01011;
var c12 = 0b01100;
var c13 = 0b01101;
var c14 = 0b01110;
var c15 = 0b01111;
var c16 = 0b10000;
var c17 = 0b10001;
var c18 = 0b10010;
var c19 = 0b10011;
var c20 = 0b10100;
var c21 = 0b10101;
var c22 = 0b10110;
var c23 = 0b10111;
var c24 = 0b11000;
var c25 = 0b11001;
var c26 = 0b11010;
var c27 = 0b11011;
var c28 = 0b11100;
var c29 = 0b11101;
var c30 = 0b11110;
var c31 = 0b11111;

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


var boxA = Bodies.rectangle(100, -300, 40, 40, {
  collisionFilter: {
    category: c1,
    mask: defaultCategory | c1 ,
  },
})

var boxB = Bodies.rectangle(100, -100, 80, 80, {
  collisionFilter: {
    category: c2,
    mask: defaultCategory | c2,
  },
})

var boxC = Bodies.rectangle(100, 0, 130, 50, {
  collisionFilter: {
    category: c3 ,
    mask: defaultCategory | c3,
  },
})


var ground = Bodies.rectangle(400, 610, 2000, 60, {
  collisionFilter: {
    category: defaultCategory,
  },
  friction:1,
  isStatic: true,
})

var ground2 = Bodies.rectangle(0, 0, 10, 2000, {
  collisionFilter: {
    category: defaultCategory,
  },
  friction:1,
  isStatic: true,
})

var ground3 = Bodies.rectangle(800, 0, 10, 2000, {
  collisionFilter: {
    category: defaultCategory,
  },
  friction:1,
  isStatic: true,
})








// add all of the bodies to the world

Composite.add(engine.world, [ground, ground3, ground2, boxA, boxB, boxC]);
Render.run(render);

// create runner
var runner = Runner.create();
// run the engine
Runner.run(runner, engine);



function setup() {
  createCanvas(2000, 800);
}
a = 0;
function draw() {}
