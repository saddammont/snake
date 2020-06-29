// NOTE: variables globales
var velocidad =60;
var tamano =10;
var puntaje =0;



class objeto
{
  constructor()
  {
      this.tamano=tamano;
  }
  choque(obj)
  {
    var difx=Math.abs(this.x - obj.x);
    var dify=Math.abs(this.y - obj.y);

    if (difx>=0 &&  difx<tamano && dify>=0 && dify<tamano)
    {
        return true;
    }
    else
    {
      return false;
    }
  }
}

class Cola extends objeto {
  constructor(x,y)
  {
      super();
      this.x=x;
      this.y=y;
      this.siguiente= null;
  }
  dibujar(ctx)
  {
    if (this.siguiente != null)
    {
        this.siguiente.dibujar(ctx);
    }
    ctx.fillStyle = "white";
    ctx.fillRect(this.x,this.y,this.tamano,this.tamano);
  }
  setxy(x,y)
  {
    if (this.siguiente !=null)
     {
       this.siguiente.setxy(this.x,this.y);
     }
    this.x = x;
    this.y = y;
  }
  meter ()
  {
    if (this.siguiente == null)
    {
        this.siguiente = new Cola(this.x,this.y)
    }
    else
    {
      this.siguiente.meter();
    }
  }
  verSiguiente()
  {
    return this.siguiente;
  }
}

class Comida extends objeto
{
    constructor()
    {
      super();
      this.x=this.generar();
      this.y=this.generar();
    }
    generar()
    {
      var num =(Math.floor(Math.random()*49))*10;
      return num;
    }
    colocar()
    {
      this.x=this.generar();
      this.y=this.generar();
    }
    dibujar(ctx)
     {
       ctx.fillStyle="red";
       ctx.fillRect(this.x,this.y,this.tamano,this.tamano);

     }

}

// NOTE: objetos del juego
var cabeza = new Cola (20,20);
var ejeX = true;
var ejeY = true;
var xdir = 0;
var ydir = 0;
var comida = new Comida();



setInterval("main()", velocidad);

// NOTE: funciones
 
function movimiento()
  {
    var nx = cabeza.x + xdir;
    var ny = cabeza.y + ydir;
    cabeza.setxy(nx,ny);

}
function control (event)
  {
  var cod = event.keyCode;

  if (ejeX)
  {
      if (cod == 38)
      {
          ydir = -tamano;
          xdir = 0;
          ejeX = false;
          ejeY = true;

      }
      if (cod == 40)
      {
          ydir = tamano;
          xdir = 0;
          ejeX = false;
          ejeY = true;
      }
  }
  if (ejeY)
  {
    if (cod == 37)
     {
       ydir =0;
       xdir = -tamano;
       ejeX = true;
       ejeY = false;
    }
    if (cod == 39)
     {
       ydir =0;
       xdir = tamano;
       ejeX = true;
       ejeY = false;
    }
  }
}
function finDeJuego()
  {
    xdir=0;
    ydir=0;
    ejeX=true;
    ejeY=true;
    cabeza= new Cola (20,20);
    comida = new Comida();
    puntaje=0;
    document.getElementById("contador").innerHTML=0;
    alert("perdiste");
  }
function choquepared()
  {
  if (cabeza.x<-1 || cabeza.x>501 || cabeza.y<-1 || cabeza.y>499 )
 {
   finDeJuego();
 }
}
function choquecuerpo()
  {
    var temp =null;
    try
    {
      temp = cabeza.verSiguiente().verSiguiente();
    }
    catch (err) {
      temp =null;
  }
  while (temp != null)
  {
      if (cabeza.choque(temp))
      {
        finDeJuego();
      }
      else
      {
          temp=temp.verSiguiente();
      }
  }
}
function dibujar()
  {
    var canvas = document.getElementById("fondo");
    var ctx = canvas.getContext("2d");
    ctx.clearRect(0,0, canvas.width, canvas.height);// NOTE: aqui se limpia el cuadro
    // NOTE: aqui va el dibujo
    cabeza.dibujar(ctx);
    comida.dibujar(ctx);



}
function main()
  {
  choquepared();
  choquecuerpo();
  dibujar();
  movimiento();

  if (cabeza.choque(comida))
  {
    puntaje= puntaje +1;
    document.getElementById("contador").innerHTML=puntaje;
    comida.colocar();
    cabeza.meter();
    return;

  }
}
