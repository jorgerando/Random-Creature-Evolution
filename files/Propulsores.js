class Propulsor{

    constructor(){

       this.masaMax = 500 ;
       this.masaMin = 50 ;
       this.L = 50 ;
       this.direcciones =  [ [0,1] , [1,0] , [-1,0] , [0,-1] ] ;
       this.frMax = 200 ;
       this.posicion = [200,0] ;
       this.tipo = "pr" ;

       this.direccion ;
       this.masa ;
       this.fr ;
       this.f ;
       this.uniones ;
       this.body ;
       this.indicesUnion = [] ;

     }

    calcularFr(masa){
      this.fr = Math.floor(masa * ( this.frMax / this.masaMax ));
    }

    calcularF(masa){
      this.f = masa *0.08 ;
    }

    clacularUniones(){
      var w = this.L;
      var h = this.L;
      var centro = [0 , 0 ] ;
      var ratio = 0.75 ;
      var arribaDerecha = [ centro[0] - w/2 * ratio , centro[1] - h/2 * ratio  ] ;
      var abajoDerecha = [ centro[0] - w/2 * ratio , centro[1] + h/2 * ratio   ] ;
      var arribaIzq = [ centro[0] + w/2 * ratio , centro[1] - h/2 * ratio  ] ;
      var abajoIzq = [centro[0] + w/2 * ratio ,  centro[1] + h/2 * ratio  ] ;
      this.uniones = [centro,arribaIzq,abajoIzq,arribaDerecha,abajoDerecha] ;
    }

    //Api

    generarRandom(p,filtro){
       this.posicion = p ;
       this.masa = Math.floor(Math.random() * this.masaMax) + this.masaMin ;
       this.direccion = this.direcciones[Math.floor(Math.random()*this.direcciones.length)];
       this.calcularFr(this.masa) ;
       this.calcularF(this.masa) ;

       this.body = Bodies.rectangle(this.posicion[0],this.posicion[1],this.L,this.L,{
       collisionFilter: {
       category: filtro,
       mask: defaultCategory | filtro,
       },
       });

       this.body.mass = this.masa ;
       this.body.restitution = 0.8
       this.clacularUniones();
    }

    generar(p,dir_,masa_,filtro){
       this.posicion = p ;
       this.masa = masa_ ;
       this.direccion = dir_ ;
       this.calcularFr(this.masa) ;
       this.calcularF(this.masa) ;
       this.body = Bodies.rectangle(this.posicion[0],this.posicion[1],this.L,this.L,{
       collisionFilter: {
       category: filtro,
       mask: defaultCategory | filtro,
       },
       });
       this.body.mass = this.masa ;
       this.indicesUnion = [] ;
       this.body.restitution = 0.8
       this.clacularUniones();
    }

    activar(count){
       if (count % this.fr == 0) {
           var point = Matter.Vector.create(this.body.position.x-this.direccion[0]*this.L/2,this.body.position.y-this.direccion[1]*this.L/2);
           var fv = Matter.Vector.create(this.direccion[0]*this.f,this.direccion[1]*this.f);
           Matter.Body.applyForce(this.body,point, fv) ;
           //console.log("Fuerza " +this.f +" Masa "+this.masa +" Direccion "+this.direccion);
       }
    }

    devolverBody(){
      return this.body ;
    }

    mover(p){
      Matter.Body.setPosition( this.body,Matter.Vector.create(p[0], p[1]) ) ;
      this.posicion = p ;
    }

    devolverUnion(n){
      return this.uniones[n] ;
    }

    marcarUnion(indice,tipo){
     this.indicesUnion.push( [ indice,tipo] );
    }

    copiarse(filtro){
      var copia = new Propulsor();
      copia.generar(this.posicion,this.direccion,this.masa,filtro);
      copia.indicesUnion = this.indicesUnion;
      return copia ;
    }

}
