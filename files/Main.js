// module aliases
var Engine = Matter.Engine,
    Render = Matter.Render,
    Runner = Matter.Runner,
    Bodies = Matter.Bodies,
    Composite = Matter.Composite;

// create an engine
var elements = [];
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

var ground = Bodies.rectangle(400, 610, 200000, 60, { friction: 1,isStatic: true } );
var ground2 = Bodies.rectangle(0, 0, 10, 2000 ,{ friction: 1,isStatic: true } );
elements.push(ground);
elements.push(ground2);
Composite.add(engine.world, elements);


// create runner
var runner = Runner.create();
Runner.run(runner, engine);
Render.run(render);

var individuos = [] ;
for (var i = 0 ; i < 100 ; i++){
  var a  = new Individuo(0x0001) ;
  a.crearIndividuoRandom([300 + i *350 ,100],engine.world);
  individuos.push(a);
}

act = true ;

function setup() {
  createCanvas(2000, 800);
}

function draw() {
 background(220);

 for (var i = 0 ; i < 100 ; i++){
   individuos[i].activarPropulsores(frameCount);
 }

 // esperamos un poco para evitar colisiones en entre las partes de  los individuos
 if (frameCount > 3 && act ){
   for (var i = 0 ; i < 100 ; i++){
     individuos[i].generarUnionesCuerpo(engine.world);
   }
   act = false ;
 }

 /*
 for (var i = 0 ; i < propulsores.length ; i++){
  propulsores[i].activar(frameCount);
 }


 if (frameCount > 3 && act ){

     act = false ;
     for (var i = 0 ; i < parts.length ; i++){

           if (parts[i] != cuerpo ){
             var uniones = parts[i].uniones ;
             var p1 = uniones[Math.floor(Math.random() * uniones.length )] ;

             var unionesCuerpo = cuerpo.uniones ;
             var p2 = unionesCuerpo[Math.floor(Math.random() * unionesCuerpo.length )];

             var uni = new Union() ;
             var body1 = parts[i].devolverBody() ;
             var body2 = cuerpo.devolverBody() ;
             uni.generar(p1,p2,body1,body2,"D");

             Composite.add(engine.world, [uni.devolverConstrain()]);
           }
     }

     for (var i = 0 ; i < propulsores.length; i++){

           var uniones = propulsores[i].uniones ;
           var p1 = uniones[Math.floor(Math.random() * uniones.length )] ;

           var unionesCuerpo = cuerpo.uniones ;
           var p2 = unionesCuerpo[Math.floor(Math.random() * unionesCuerpo.length )];

           var uni = new Union() ;
           var body1 = propulsores[i].devolverBody() ;
           var body2 = cuerpo.devolverBody() ;
           if (Math.random() < 0.75){
             uni.generar(p1,p2,body1,body2,"D");
           }else{
             uni.generar(p1,p2,body1,body2,"E");
           }
             Composite.add(engine.world, [uni.devolverConstrain()]);

     }

     // union de Partes

     var cosas = parts.concat(propulsores) ;
     for( var i = 0 ; i < cosas.length ; i++ ){

             var uniones = cosas[i].uniones ;
             var p1 = uniones[ Math.floor(Math.random() * uniones.length )] ;

             var b1x = cosas[i].devolverBody().position.x ;
             var b1y = cosas[i].devolverBody().position.y ;

             var masCercana = null ;
             var distMin = 10000000 ;

             for (var j = 0 ; j < cosas.length; j++){

                  if(cosas[i] != cosas[j] && cosas[j] != cuerpo ){
                    var b2x = cosas[j].devolverBody().position.x ;
                    var b2y = cosas[j].devolverBody().position.y ;
                    var dist = Math.sqrt(b1x*b2x + b1y*b2y) ;

                    if ( dist < distMin ) {
                       distMin = dist ;
                       masCercana = cosas[j] ;
                    }
                  }
             }

             var unionesCercanas = masCercana.uniones ;
             var p2 = unionesCercanas[ Math.floor(Math.random() * unionesCercanas.length )] ;
             if (Math.random() > 0.3333) {
               var uni = new Union() ;
               uni.generarRandom(p1,p2,cosas[i].devolverBody(),masCercana.devolverBody());
               Composite.add(engine.world, [uni.devolverConstrain()]);
             }
         }


 }
 */


}
