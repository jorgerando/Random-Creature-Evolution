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

var act = true ;
var tiempo = 0 ;
var tiempoActuacion = 20 ;
var aptitud = 0 ;
var xValues = [];
var yValues = [];
var historia = [] ;
var pis = new PiscinaReproducion(engine.world);
pis.crearGeneracionRandom() ;

function setup() {
  createCanvas(800, 200);
}

function draw() {
 background(255);

 textSize(20);
 text(' Generacion : ' + str(pis.nGeneracion), 10, 30);
 text(' Tiempo : '+ str(int(tiempo/24)), 10, 50);
 text(' Fit Generacion Anterior : ' + str(sqrt(aptitud)), 10, 70);

 if (tiempo > 3 && act ){
    pis.crearUnionesGenActual();
    console.log(pis.nGeneracion);
    console.log(pis.generacionActual)
    act = false ;
 }

 pis.activarGeneracion(frameCount);

 if (tiempo/24 > tiempoActuacion ) {
    var obj = Matter.Composite.allBodies(engine.world) ;
    var cons = Matter.Composite.allConstraints(engine.world) ;
    pis.evaluarGeneracion();
    aptitud = int(pis.aptitudTotal / pis.nInd) ;
    xValues.push(pis.nGeneracion);
    yValues.push(aptitud) ;
    historia.push(aptitud);
    pis.crearSiguienteGeneracion([350,100],engine.world);
    pis.mutarGeneracion(engine.world) ;
    Matter.Composite.remove(engine.world,obj,false);
    Matter.Composite.remove(engine.world,cons,false);
    Composite.add(engine.world, [ ground , ground2 ]);
    tiempo = 0 ;
    act = true ;
 }

 tiempo++ ;
}

Runner.run(runner, engine);
Render.run(render);
