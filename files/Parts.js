class Part {

  // tipo (rect , cir ,tria)
  // probabilidad de tipo
  // uniones array de puntos de union
  // dimenciones dimesiones acordes al tipo
  // posicion

  constructor(){

   // tipo
   this.nTipos = 3 ;
   this.Tipos = ["rect","cir","tri"];

   // dimensiones
   this.MaxL = 100 ; // Cambiar haciendo pruebas
   this.MinL = 60 ;
   this.MaxR = 50 ;
   this.MinR = 35 ;

   // posicion
   this.RangoMax = 250 ; // Cambiar haciendo pruebas

   // uniones
   this.dCentro = 0.75 ; // cuanto se van a lejar los puntos de union del centro (cir y tri)
   this.incre = 50 ;   // Cambiar con pruebas

   this.tipo ;
   this.dimesiones ;
   this.posicion = [ 100 , 0];
   this.uniones = [] ;
   this.body = null ;
   this.indicesUnion = [] ;

  }

// ---- Generar Tipo -----

  generarTipo(){
    var index = Math.floor(Math.random()*this.nTipos);
    this.tipo = this.Tipos[index];
  }

// ---- Generar dimesiones -----

  generarDimRect(){
    var weight = Math.floor(Math.random() * this.MaxL) + this.MinL
    var height = Math.floor(Math.random() * this.MaxL) + this.MinL
    this.dimesiones = [ weight ,height ] ;
  }

  generarDimTri(){
    var radio = Math.floor(Math.random() * this.MaxR) + this.MinR
    this.dimesiones = [radio] ;
  }

  generarDimCir(){
    var radio = Math.floor(Math.random() * this.MaxR) + this.MinR
    this.dimesiones = [radio] ;
  }

  generarDimensiones(){
    if(this.tipo == "rect"){
       this.generarDimRect();
    }else if(this.tipo == "cir"){
       this.generarDimCir();
    }else{
       this.generarDimTri();
    }
  }

// --- Generar Posicion ----

  generarPosicion(){
    // genero la posicion en cordenadas polares
    var radio = Math.floor(Math.random() * this.RangoMax) ;
    var angulo = Math.random() * 2 * Math.PI ;
    this.posicion = [ radio * Math.sin(angulo) , radio * Math.cos(angulo) ] ;
  }

// ---- Generar Uniones -----

  generarUnionesRect(){
   var w = this.dimesiones[0];
   var h = this.dimesiones[1];
   var centro = [0 , 0] ;
   var ratio = 0.65 ;
   var arribaDerecha = [  w/2 * ratio , - h/2 * ratio  ] ;
   var abajoDerecha = [  w/2 * ratio ,  + h/2 * ratio   ] ;

   var arribaIzq = [ -w/2 * ratio , - h/2 * ratio  ] ;
   var abajoIzq = [ -w/2 * ratio ,  + h/2 * ratio  ] ;
   this.uniones = [centro,arribaDerecha,abajoDerecha,arribaIzq,abajoIzq] ;
}

  generarUnionesTri(){
  var centro = [0 , 0 ] ;
  var radioUnion = (this.dimesiones[0]) * 0.65 ;
  var l1 = [ Math.cos(Math.PI)*radioUnion  , Math.sin(Math.PI)*radioUnion ] ;
  var l2 = [ Math.cos(Math.PI + 2*Math.PI/3)*radioUnion  , Math.sin(Math.PI+ 2*Math.PI/3)*radioUnion ] ;
  var l3 = [ Math.cos(Math.PI + 4*Math.PI/3)*radioUnion  , Math.sin(Math.PI+ 4*Math.PI/3)*radioUnion ] ;

  this.uniones = [centro,l1,l2,l3];
}

  generarUnionesCir(){
   var radioUnion = (this.dimesiones[0]) * 0.65 ;
   var centro = [0, 0] ;
   var l1 = [ radioUnion  ,  0] ;
   var l2 = [- radioUnion, 0   ] ;
   this.uniones = [ centro ,l1 ,l2 ] ;
}

  generarUniones(){
    if(this.tipo == "rect"){
       this.generarUnionesRect();
    }else if(this.tipo == "cir"){
       this.generarUnionesCir();
    }else{
       this.generarUnionesTri();
    }

  }

// ---- Generar Uniones -----
  generarBody(filtro){

   if(this.tipo == "rect"){

       this.body = Bodies.rectangle(this.posicion[0],this.posicion[1],this.dimesiones[0],this.dimesiones[1],{
       collisionFilter: {
       category: filtro,
       mask: defaultCategory | filtro,
       },
       });

   } else if(this.tipo == "cir"){

    this.body = Bodies.circle(this.posicion[0],this.posicion[1], this.dimesiones[0], {
         collisionFilter: {
           category: filtro,
           mask: defaultCategory | filtro,
         },
       })

   }else{
       this.body = Matter.Bodies.polygon(this.posicion[0],this.posicion[1],3,this.dimesiones[0],{
       collisionFilter: {
       category: filtro,
       mask: defaultCategory | filtro,
       },
       });
   }

}

// Manipular parte

// Api

generar(tipo_, dim, p,filtro) {
  this.tipo = tipo_;
  this.dimesiones = dim;
  this.posicion = p;
  this.indicesUnion = [] ;
  this.generarBody(filtro);
  this.generarUniones();
}

generarRandom(p,filtro){
  this.posicion = p;
  this.generarTipo();
  this.generarDimensiones();
  this.generarBody(filtro);
  this.generarUniones();
}

mover(p){
  Matter.Body.setPosition( this.body,Matter.Vector.create(p[0], p[1]) ) ;
  this.posicion = p ;
}

devolverBody(){
  return this.body ;
}

devolverUnion(n){
  return this.uniones[n] ;
}

marcarUnion(indice,tipo){
 this.indicesUnion.push( [ indice,tipo] );
}

copiarse(filtro){
  var copia = new Part() ;
  copia.generar(this.tipo,this.dimesiones,this.posicion,filtro);
  copia.indicesUnion = this.indicesUnion;
  return copia ;
}

}
