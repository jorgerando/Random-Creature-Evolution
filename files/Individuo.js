class Individuo {

   constructor(filtro_){

     this.nPartes = 2 ;
     this.nPropulsores = 2 ;
     this.radioMax = 75 ; // radio maximo de aparicion aleatoria

     this.filtro = filtro_ ;
     this.posicion ;

     this.propulsores = [] ;
     this.uniones = [] ;
     //this.elementos = [] ; // partes + propulsores + uniones

     this.cuerpo = null ;
     this.solidos = [] ; // partes + propulsores
     this.apendices = [] ;
     this.tipoUniones = [] ;
     this.conexiones = [] ; //[ union cuerpo index ,union apendice index]
     this.posicionesRelativas = [] ;
     this.angulos = [] ;
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
           this.solidos.push(part);
           if ( part.body.area > maxArea){
               this.cuerpo = part ;
               maxArea = part.body.area;
           }
     }

     //this.elementos = this.partes.concat(this.propulsores) ;
     this.solidos = this.solidos.concat(this.propulsores) ;
   }

   // 2º posicionar elementos (el cuerpo en x,y y los demas alrededor en un readio aleatorio)

   ordenarElementos(angulos){

  // Algoritmo de burbuja
   var n, i, k, aux;
   n = angulos.length;
   for (k = 1; k < n; k++) {
       for (i = 0; i < (n - k); i++) {
           if (angulos[i] > angulos[i + 1]) {
               aux = angulos[i];
               angulos[i] = angulos[i + 1];
               angulos[i + 1] = aux;

               aux = this.solidos[i];
               this.solidos[i] = this.solidos[i + 1];
               this.solidos[i + 1] = aux;

               aux = this.posicionesRelativas[i];
               this.posicionesRelativas[i] = this.posicionesRelativas[i + 1];
               this.posicionesRelativas[i + 1] = aux;
           }
       }

   }
 }

   posicionarElementos(p){

     this.posicion = p ;
     var angulos = [] ;

     for (var i = 0 ; i < this.solidos.length ; i++){
          var elementoActual = this.solidos[i] ;
          var r = Math.floor(Math.random()*this.radioMax);
          var angulo = Math.floor(Math.random()*Math.PI*2);
          angulos.push(angulo);
          this.posicionesRelativas.push([r*Math.cos(angulo),r*Math.sin(angulo)]);
          elementoActual.mover([r*Math.cos(angulo)+this.posicion[0],r*Math.sin(angulo)+this.posicion[1]]);
     }

     this.angulos = angulos ;
     this.ordenarElementos(angulos);

   }

   // 3º Generar Uniones con el cuerpo IMPORTANTE!!!!! hay que dejar correr la simular un par de frames
   // para evitar las colisiones entre solidos
   generarUnionesCuerpoRandom(mundo){

     for (var i = 0 ; i < this.solidos.length ; i++){

           if (this.solidos[i] != this.cuerpo ){

             var uniones = this.solidos[i].uniones ;
             var indiceUnionApendice =  Math.floor(Math.random()*uniones.length) ;
             var p1 = uniones[ indiceUnionApendice ] ;

             var unionesCuerpo = this.cuerpo.uniones ;
             var indiceUnionCuerpo =  Math.floor(Math.random()*unionesCuerpo.length) ;
             var p2 = unionesCuerpo[ indiceUnionCuerpo ];

             var uni = new Union() ;
             var body1 = this.solidos[i].devolverBody() ;
             var body2 = this.cuerpo.devolverBody() ;

             if (Math.random() > 0.5 ){
               uni.generar(p1,p2,body1,body2,"D");
               this.solidos[i].marcarUnion([indiceUnionCuerpo,indiceUnionApendice],"D");
               this.tipoUniones.push("D") ;
             }else {
               uni.generar(p1,p2,body1,body2,"E");
               this.solidos[i].marcarUnion([indiceUnionCuerpo,indiceUnionApendice],"E")
               this.tipoUniones.push("E") ;
             }

             this.conexiones.push([indiceUnionCuerpo,indiceUnionApendice]);
             this.apendices.push(this.solidos[i]);
             this.uniones.push(uni) ;

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

   // Api

   crearIndividuoRandom(p,mundo){

     this.generarElementos();
     this.posicionarElementos(p);
     for (var i = 0 ; i < this.solidos.length ; i++){
         Composite.add( mundo , [ this.solidos[i].devolverBody() ] );
     }

   }

   activarPropulsores(frameCount){
     for (var i = 0 ; i < this.propulsores.length ; i++){
      this.propulsores[i].activar(frameCount);
     }
   }

   generar(cuerpo_,solidos_,mundo){
     this.cuerpo = cuerpo_ ;
     this.solidos = solidos_ ;
     this.apendices = solidos_.slice() ;
     Composite.add( mundo,[this.cuerpo.devolverBody()]) ;
     for (var i = 0 ; i < this.solidos.length ; i++){
         Composite.add( mundo , [this.solidos[i].devolverBody()] );
     }
   }

   generarUnionesCuerpoComandadas(conexiones,tipos,mundo){
     for(var i = 0 ; i < conexiones.length ; i++){

         var indiceConexCuerpo = conexiones[i][0] ;
         var indiceConexApendice = conexiones[i][1] ;

         var p1 = this.solidos[i].devolverUnion(indiceConexApendice)
         var p2 = this.cuerpo.devolverUnion(indiceConexCuerpo) ;

         var uni = new Union() ;
         var body1 = this.solidos[i].devolverBody() ;
         var body2 = this.cuerpo.devolverBody() ;

         uni.generar(p1,p2,body1,body2,tipos[i]);

         this.uniones.push(uni) ;


         Composite.add( mundo , [ uni.devolverConstrain() ] );

     }

   }

   generarUnionesCuerpo(mundo){
        for (var i = 0 ; i < this.solidos.length ; i++){

         var conexion = this.solidos[i].indicesUnion[0] ;
         var indC = conexion[0][0] ;
         var indA = conexion[0][1] ;
         var tipo = conexion[1];

         while (indA > this.cuerpo.uniones.length - 1){
            indA -=1  ;
         }

         while (indC > this.cuerpo.uniones.length - 1){
            indC -=1  ;
         }

         var p1 = this.solidos[i].devolverUnion(indA)
         var p2 = this.cuerpo.devolverUnion(indC) ;
         //console.log(p1);
         //console.log(indC)
         //console.log(p2);
         var uni = new Union() ;
         var body1 = this.solidos[i].devolverBody() ;
         var body2 = this.cuerpo.devolverBody() ;

         uni.generar(p1,p2,body1,body2,tipo);
         //console.log(uni);
         this.uniones.push(uni) ;
         if(this.solidos[i].tipo == "pr" ){
            this.propulsores.push(this.solidos[i]) ;
         }

         Composite.add( mundo , [ uni.constraint ] );


     }

   }

   posicionActual(){
     return this.cuerpo.body.position ;
   }

   // mutacion
   calculateAngle(y, x) {
	   var angle = Math.atan2(y, x);
  	 if (angle < 0.0) {
    	angle += 2.0 * Math.PI;
     }
     return  angle; // rad to deg conversion
   }

   mutar(mundo){

     var nuevaParte = null ;
     // me genero una parte aletoria
     if(Math.random() > 0.65 ){
       nuevaParte =  new Part() ;
     }else{
       nuevaParte =  new Propulsor() ;
     }

     nuevaParte.generarRandom([0,0],this.filtro);

     // la posiciono de manera random
     var r = Math.floor(Math.random()*this.radioMax);
     var angulo = Math.floor(Math.random()*Math.PI*2);
     var pRelativa = [r*Math.cos(angulo),r*Math.sin(angulo)] ;
     var tipo = "" ;

     nuevaParte.mover([r*Math.cos(angulo)+this.posicion[0],r*Math.sin(angulo)+this.posicion[1]]);

     // genero la union con el cuerpo
     var uniones = nuevaParte.uniones ;
     var indiceUnionApendice =  Math.floor(Math.random()*uniones.length) ;
     var p1 = uniones[ indiceUnionApendice ] ;

     var unionesCuerpo = this.cuerpo.uniones ;
     var indiceUnionCuerpo =  Math.floor(Math.random()*unionesCuerpo.length) ;
     var p2 = unionesCuerpo[ indiceUnionCuerpo ];

     var uni = new Union() ;
     var body1 = nuevaParte.devolverBody() ;
     var body2 = this.cuerpo.devolverBody() ;

     if (Math.random() > 0.5 ){
       uni.generar(p1,p2,body1,body2,"D");
       nuevaParte.marcarUnion([indiceUnionCuerpo,indiceUnionApendice],"D");
       tipo = "D" ;
     }else {
       uni.generar(p1,p2,body1,body2,"E");
       nuevaParte.marcarUnion([indiceUnionCuerpo,indiceUnionApendice],"E")
       tipo = "E" ;
     }
     var conexion = [indiceUnionCuerpo,indiceUnionApendice] ;


     //this.conexiones.push([indiceUnionCuerpo,indiceUnionApendice]);
     //this.apendices.push(this.solidos[i]);
     //this.uniones.push(uni) ;
     var indice = 0 ;
     for (var i = 0 ; i < this.posicionesRelativas ; i++ ) {
          var pr = posicionesRelativas[i] ;
          var anguloActual = calculateAngle(pr[1], pr[0]) ;
          if ( anguloActual > angulo ){
            indice = i ;
            break ;
          }
     }

     if(indice == 0 ){
        this.solidos.unshift(nuevaParte);
        this.posicionesRelativas.unshift(pRelativa);
        this.conexiones.unshift(conexion );
        this.tipoUniones.unshift(tipo);
        this.uniones.unshift(uni)
        this.apendices = this.solidos ;
     }else{
       this.solidos.splice(indice,indice-1,nuevaParte);
       this.posicionesRelativas.splice(indice,indice-1,pRelativa);
       this.conexiones.splice(indice,indice-1,conexion );
       this.tipoUniones.splice(indice,indice-1,tipo);
       this.uniones.splice(indice,indice-1,uni);
       this.apendices = this.solidos ;
     }
       Composite.add( mundo , [body1] );
   }



}
