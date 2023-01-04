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

var pis = new PiscinaReproducion(engine.world);

var ind = new Individuo(mask[0]);
ind.crearIndividuoRandom([200,100],engine.world) ;

var act = true ;
var act2 = true ;
var act3 = true ;
var hijo =  null ;
var hijo2 = null
function setup() {
  createCanvas(200, 200);
}

function draw() {
 background(255);

 if (frameCount > 3 && act ){
   ind.generarUnionesCuerpoRandom(engine.world);
   hijo = pis.reproduccion([500,100],[ind,ind],mask[1],engine.world) ;
   act = false ;
 }

 if (frameCount > 6 && act2 ){
      hijo.generarUnionesCuerpo(engine.world) ;
      hijo2 = pis.reproduccion([1000,100],[hijo,hijo],mask[1],engine.world) ;
   act2 = false ;
 }

 if (frameCount > 9 && act3 ){
      hijo2.generarUnionesCuerpo(engine.world) ;
   act3 = false ;
 }

}

Runner.run(runner, engine);
Render.run(render);
