class Propulsor{

    constructor(){

       this.masaMax = 500 ;
       this.masaMin = 50 ;
       this.L = 50 ;
       this.direcciones =  [ [0,1] , [1,0] , [-1,0] , [0,-1] ] ;
       this.frMax = 200 ;
       this.posicion = [200,0] ;

       this.direccion ;
       this.masa ;
       this.fr ;
       this.f ;
       this.uniones ;
       this.body ;

     }

    calcularFr(masa){
      this.fr = Math.floor(masa * ( this.frMax / this.masaMax ));
    }

    calcularF(masa){
      this.f = masa *0.1 ;
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
      this.uniones = [arribaDerecha,abajoDerecha,arribaIzq,abajoIzq] ;
    }

    //Api

    generarRandom(p,filtro){
       this.posicion = p ;
       this.masa = Math.floor(Math.random() * this.masaMax) + this.masaMin ;
       this.direccion = this.direcciones[Math.floor(Math.random()*this.direcciones.length)];
       this.calcularFr(this.masa) ;
       this.calcularF(this.masa) ;
       this.body = Bodies.rectangle(this.posicion[0],this.posicion[1],this.L,this.L,{ friction:10},{ collisionFilter: { group:filtro  } });
       this.body.mass = this.masa ;
       this.body.restitution = 0.8
       this.clacularUniones();
       //this.body.collisionFilter.group = filtro ;
       //this.body.collisionFilter.mask = 0b0001 | filtro ;
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
    }



}
