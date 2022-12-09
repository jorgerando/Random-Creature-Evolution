class Individuo {

   constructor(filtro_){

     // caracteristicas que definen a un individuo
     this.filtro = filtro_ ;
     this.posicion ;

     this.partes = [] ;
     this.propulsores = [] ;
     this.uniones = [] ;

     this.cuerpo = null ;

     this.solidos = [] ; // partes + propulsores
     this.elementos = [] ; // partes + propulsores + uniones

     this.grafoUniones = new Map() ;

     // caracteristica para generar inividuos aleatorios
     this.nPartes = 2 ;
     this.nPropulsores = 2 ;
     this.radioMax = 75 ; // radio maximo de aparicion aleatoria

   }

   // 1º generar elementos ( Partes y Propulsores )
   generarElementos(){

     // generar Propulsores
     for ( var i = 0 ; i < this.nPropulsores ; i++){
          var pr =  new Propulsor();
          pr.generarRandom([0,0],this.filtro) ;
          this.propulsores.push(pr);
     }
     // generar partes
     var maxArea = 0 ;
     for ( var i = 0 ; i < this.nPartes ; i++){
           var part = new Part();
           part.generarRandom([0,0],this.filtro);
           this.partes.push(part);
           if ( part.body.area > maxArea){
               this.cuerpo = part ;
               maxArea = part.body.area;
           }
     }

     this.elementos = this.partes.concat(this.propulsores) ;
     this.solidos = this.partes.concat(this.propulsores) ;
   }

   // 2º posicionar elementos (el cuerpo en x,y y los demas alrededor en un readio aleatorio)
   posicionarElementos(p){
     this.posicion = p ;
     for (var i = 0 ; i < this.elementos.length ; i++){
          var elementoActual = this.elementos[i] ;
          var r = Math.floor(Math.random()*this.radioMax);
          var angulo = Math.floor(Math.random()*Math.PI*2);
          elementoActual.mover([r*Math.cos(angulo)+this.posicion[0],r*Math.sin(angulo)+this.posicion[1]]);
     }
   }

   // 3º Generar Uniones con el cuerpo IMPORTANTE!!!!! hay que dejar correr la simular un par de frames
   // para evitar las colisiones entre solidos
   generarUnionesCuerpo(mundo){

     for (var i = 0 ; i < this.solidos.length ; i++){

           if (this.solidos[i] != this.cuerpo ){

             var uniones = this.solidos[i].uniones ;
             var p1 = uniones[ Math.floor(Math.random()*uniones.length) ] ;

             var unionesCuerpo = this.cuerpo.uniones ;
             var p2 = unionesCuerpo[ Math.floor(Math.random()*unionesCuerpo.length) ];

             var uni = new Union() ;
             var body1 = this.solidos[i].devolverBody() ;
             var body2 = this.cuerpo.devolverBody() ;

             if (Math.random() > 0.5 ){
               uni.generar(p1,p2,body1,body2,"D");
             }else {
               uni.generar(p1,p2,body1,body2,"E");
             }

             Composite.add( mundo , [ uni.devolverConstrain() ] );

           }
     }


   }

   //4º generasr la uniones entre apendices (se uniran con el mas cercano que no sea el cuerpo )
   generarUnionesApendices(mundo){

     for (var i = 0 ; i < this.solidos.length ; i++){

           if (this.solidos[i] != this.cuerpo ){

             var uniones = this.solidos[i].uniones ;
             var p1 = uniones[ Math.floor(Math.random()*uniones.length) ] ;

             var unionesCuerpo = this.cuerpo.uniones ;
             var p2 = unionesCuerpo[ Math.floor(Math.random()*unionesCuerpo.length) ];

             var uni = new Union() ;
             var body1 = this.solidos[i].devolverBody() ;
             var body2 = this.cuerpo.devolverBody() ;
             uni.generar(p1,p2,body1,body2,"D");
             Composite.add( mundo , [ uni.devolverConstrain() ] );
           }
     }


   }

   // parteMasCercana()


   // Api

   crearIndividuoRandom(p,mundo){

     this.generarElementos();
     this.posicionarElementos(p);
     for (var i = 0 ; i < this.elementos.length ; i++){
         Composite.add( mundo , [ this.elementos[i].devolverBody() ] );
     }

   }

   activarPropulsores(frameCount){
     for (var i = 0 ; i < this.propulsores.length ; i++){
      this.propulsores[i].activar(frameCount);
     }
   }


}
