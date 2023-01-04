class PiscinaReproducion {

    constructor(word_){

      this.nInd = 30 ;
      this.posicion = [350,100] ;
      this.generacionActual = [] ; // individuos de la generacion actual
      this.nGeneracion = 0 ;
      this.word = word_ ;
      this.tiempo = 60 ;
      this.aptitudTotal = 0;
      this.aptitud = [] ;
    }

    crearGeneracionRandom(){
      for (var i = 0 ; i < this.nInd ; i++){
        var ind = new Individuo(mask[i]);
        ind.crearIndividuoRandom(this.posicion,this.word);
        this.generacionActual.push(ind);
      }
    }

    crearUnionesGenActual(){
      for (var i = 0 ; i < this.nInd ; i++){
        if (this.nGeneracion == 0 ){
          this.generacionActual[i].generarUnionesCuerpoRandom(engine.world);
        }else{
          this.generacionActual[i].generarUnionesCuerpo(engine.world);
        }
      }
      this.nGeneracion++ ;
    }

    activarGeneracion(frameCount){
      for (var i = 0 ; i < this.nInd ; i++){
        this.generacionActual[i].activarPropulsores(frameCount);
      }
    }

    // Reproduccion

    partsReproduccion(p,padres,prelativas,filtro){

      // asuminos que los padres son odos del mismo tipo
      var phijo = [0,0] ;
      var dim = [] ;
      var nDim = padres[0].dimesiones.length ;
      var tipo = padres[0].tipo ;
      var n = padres.length
      for(var i = 0 ; i < nDim ;i++){dim.push(0)} ;

      for( var i = 0 ; i < n ; i++ ){

          // posicion Media
          var progenitor = padres[i] ;
          var dp = progenitor.dimesiones ;

          var pp = prelativas[i] ;
          phijo = [ phijo[0] + pp[0] , phijo[1] + pp[1] ] ;

          // dimesiones Medias
          for ( var j = 0 ; j < nDim ; j++ ){
               dim[j] = dim[j] + dp[j] ;
          }
      }
      phijo = [ p[0] + phijo[0] / n, p[1] + phijo[1] / n ] ;
      for ( var j = 0 ; j < nDim ; j++ ){
           dim[j] = dim[j] / n ;
      }

      var hijo = new Part();


      hijo.generar(tipo,dim,phijo,filtro);
      var conex = padres[Math.floor(Math.random()*n)].indicesUnion.slice();
      hijo.indicesUnion = conex ;
      //console.log(conex)
      return hijo ;
    }

    propulsoresReproduccion(p,padres,prelativas,filtro){

      var n = padres.length
      var dirh = [0,0];
      var ph = [0,0];
      var mh = 0 ;

      for( var i = 0 ; i < n ; i++ ){
         var progenitor = padres[i] ;
         var pd = progenitor.direccion ;
         var pp = prelativas[i] ;
         var pm = progenitor.masa ;

         dirh = [ dirh[0]+pd[0] , dirh[1]+pd[1] ] ;
         ph = [ ph[0]+pp[0] , ph[1]+pp[1] ] ;
         mh = mh+pm ;
      }

      var hijo = new Propulsor() ;

      dirh = [ dirh[0]/n , dirh[1]/n ] ;
      ph = [ p[0] + ph[0]/n , p[1] + ph[1]/n ] ;
      mh = mh/n ;

      hijo.generar(ph,dirh,mh,filtro);
      var conex = padres[Math.floor(Math.random()*n)].indicesUnion.slice();
      hijo.indicesUnion = conex ;
      //console.log(conex);
      return hijo ;

    }

    apendicesIguales(apendices){
      var tipo_ = apendices[0].tipo ;
      for(var i = 0 ; i < apendices.length ; i++ ){
          if ( apendices[i].tipo != tipo_ ){return false}
      }
      return true ;
    }

    padresConMasApendices(padres){
      var n = padres.length ;
      var cuerposPadres = [] ;
      var max = 0 ;
      var padreMax = null ;
      for( var i = 0 ; i < n ; i++ ){
          if( padres[i].solidos.length > max ){
             max = padres[i].solidos.length ;
             padreMax =  padres[i] ;
          }
      }
      return padreMax
    }

    generacionCuerpo(p,padres,filtro){

      var n = padres.length ;
      var cuerposPadres = [] ;
      for( var i = 0 ; i < n ; i++ ){
          cuerposPadres.push( padres[i].cuerpo )
      }
      var cuerpoHijo = null ;
      if( this.apendicesIguales(cuerposPadres) ){
       // media cuerpos
       //console.log("Tipos iguales")
      cuerpoHijo = this.partsReproduccion(p,cuerposPadres,[[0,0],[0,0]],filtro);
      }else{
      // cuerpo random
      //console.log("Eleccion Random")
      cuerpoHijo = cuerposPadres[Math.floor(Math.random()*n)].copiarse(filtro);
      cuerpoHijo.mover(p);
      }
      return cuerpoHijo ;

    }

    generacionApendice(p,apendices,rlps,n,filtro){

        if(this.apendicesIguales(apendices) && apendices.length == n){
        // media

           if (apendices[0].tipo == "pr"){
              // reproducir pr
              return this.propulsoresReproduccion(p,apendices,rlps,filtro);
           }else{
              // reproducir partes
              return this.partsReproduccion(p,apendices,rlps,filtro);
           }
        }
        else{
        // seleccion teniendo encuenta basios
           if(apendices.length == n){
             // mismo numero de padres que de partes
             var indice = Math.floor(Math.random()*apendices.length) ;
             var ape = apendices[indice] ;
             var rlp = rlps[indice] ;
             var hijo = ape.copiarse(filtro);
             hijo.mover([p[0] + rlp[0] , p[1] + rlp[1] ]);
             return hijo ;
           }else{

             while(apendices.length != n){
               apendices.push("nada");
             }
             var indice = Math.floor(Math.random()*apendices.length) ;
             var ape = apendices[indice] ;
             console.log(ape) ;
             if ( ape == "nada"){
                 return "nada" ;
             }
             var hijo = ape.copiarse(filtro);
             var rlp = rlps[indice] ;
             hijo.mover([p[0] + rlp[0] , p[1] + rlp[1] ]);
             return hijo;

           }

        }
    }

    reproduccion(p,padres,filtro,mundo){

      var n = padres.length ;

      // 1
      var cuerpoh = this.generacionCuerpo(p,padres,filtro);
      var hijo = new Individuo();


      // 2 eleguir el padre con mas aprendices
      var mas = this.padresConMasApendices(padres) ;
      var apehijo = [] ;
      var apeRelativasHijo = [];
      for (var i = 0 ; i < mas.apendices.length  ; i++){

          var apes = [] ;
          var apePosicionRelativas = [] ;
          var conexis = [ ] ;

          for(var j = 0 ; j < n ; j++ ){

             var ape = padres[j].apendices ;
             var rlp = padres[j].posicionesRelativas ;
             var conec = padres[j].conexiones ;
             var tiposUnis =  padres[j].tipoUniones ;

             if ( i < ape.length ){
               apes.push(ape[i] ) ;
               apePosicionRelativas.push(rlp[i] ) ;
               conexis.push(conec[i]);
               tiposUnis.push(tiposUnis[i]);
             }

          }

          var ape = this.generacionApendice(p,apes,apePosicionRelativas,n,filtro) ;
          if( ape != "nada"){
            apehijo.push(ape) ;
            //apeRelativasHijo.push() ;
          }
      }
      //console.log(apehijo)
      var hijoPRelativas = [] ;
      for(var i = 0 ; i < apehijo.length ; i++ ){
          var pape = apehijo[i].posicion ;
          //console.log(pape);
          hijoPRelativas.push( [pape[0] - p[0], pape[1] -p[1] ] );
      }
      hijo.generar(cuerpoh,apehijo,mundo);
      //console.log(hijoPRelativas);
      hijo.posicionesRelativas = hijoPRelativas;

      return hijo ;

    }

    // Evaluacion

    fitness(ind){
       return ind.cuerpo.body.position.x * ind.cuerpo.body.position.x;
    }

    evaluarGeneracion(){
      for(var i = 0 ; i < this.nInd ; i++ ){
          var indActual = this.generacionActual[i] ;
          //console.log(indActual);
          var fit = this.fitness(indActual) ;
          this.aptitudTotal += fit ;
          this.aptitud.push(fit) ;
      }
    }

    // Seleccion

    seleccionar(){

       var r = Math.random()
       var p_b = 0
       var p_a = 0

       for(var i = 0 ; i < this.nInd  ; i++ ){
          var indActual = this.generacionActual[i] ;

          var fit_a = this.aptitud[i] ;
          p_a = p_a + (fit_a/this.aptitudTotal) ;

         if ( r > p_b && r <= p_a ){
          return indActual ;
          }

      p_b = p_a ;

  }

}

    crearSiguienteGeneracion(p,mundo){
      var nuevaGeneracion = [] ;
      for(var i = 0 ; i < this.nInd ; i++ ){
         var padres = [this.seleccionar(),this.seleccionar()];
         console.log(padres);
         var hijo = this.reproduccion(p,padres,mask[i],mundo);
         hijo.filtro  = mask[i] ;
         hijo.posicion = p ;
         nuevaGeneracion.push(hijo);
      }
      this.generacionActual = nuevaGeneracion ;
      this.aptitud = [] ;
      this.aptitudTotal = 0 ;
    }

    // Mutacion
    mutarGeneracion(mundo){
        var tasamutacion = 0.1;
        for(var i = 0 ; i < this.nInd ; i++ ){
           if( Math.random() < tasamutacion ){
                  console.log("MUTACION")
                  this.generacionActual[i].mutar(mundo) ;
           }
        }
    }







}
