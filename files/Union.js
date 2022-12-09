class Union {

     constructor(){

       this.coeficienteMuyElastico = 0.001
       this.coeficienteElastico = 0.001
       this.coeficienteDuro = 0 ;
       this.variationMax = 250 ;
       this.variationMin = -100 ;
       this.tipos = ["ME" ,"E" ,"D" ] ;

       this.tipo ; // 1 muy elastico 2 elastico 3 duro (ME ,E ,D)
       this.constrain ;
       this.longuitud ;
       this.coe ;

     }

     distancia(p1,p2){
       var a = p1[0] - p2[0];
       var b = p1[1] - p2[1];
       return Math.sqrt(a*a + b*b);
     }

     generar(p1,p2,body1,body2,tipo){

       this.tipo = tipo ;
       var p1_ = [ p1[0] + body1.position.x , p1[1] + body1.position.y ] ;
       var p2_ = [ p2[0] + body2.position.x , p2[1] + body2.position.y ] ;

       if ( tipo == "ME" ){
           this.coe = this.coeficienteMuyElastico ;
           this.longuitud  = this.distancia(p1_,p2_) * 0.75 ; //+ this.variationMin ;
       }else if(tipo == "E"){
           this.coe =  this.coeficienteElastico ;
           this.longuitud  = this.distancia(p1_,p2_) * 0.75 ;//- Math.floor(Math.random() * this.variationMax) ;//+ this.variationMin ; // de -50 a 50
       }else{
           this.coe = this.coeficienteDuro ;
           this.longuitud  = this.distancia(p1_,p2_) + this.distancia(p1_,p2_) *0.1  ;
       }

       this.constraint = Matter.Constraint.create({
              bodyA: body1,
              pointA : { x : p1[0] , y: p1[1] },
              bodyB: body2 ,
              pointB : { x : p2[0], y: p2[1] },
              stiffness: this.coe,
              length:this.longuitud,
        });
     }

     generarRandom(p1,p2,body1,body2){
       var t = this.tipos[Math.floor(Math.random()*3)] ;
       this.generar(p1,p2,body1,body2,t);
     }

     devolverConstrain(){
       return this.constraint ;
     }

}
