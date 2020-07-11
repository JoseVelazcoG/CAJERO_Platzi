var imagenesBilletes = [];
imagenesBilletes["billete5"] = "billete5.png";
imagenesBilletes["billete10"] = "billete10.png";
imagenesBilletes["billete20"] = "billete20.png";
imagenesBilletes["billete50"] = "billete50.png";
imagenesBilletes["billete100"] = "billete100.png";

class Billete
{
    constructor(v, c, n)
    {
        this.imagen = new Image();
        this.valor = v;
        this.cantidad = c;
        this.nombre = n;
        this.imagen.src = imagenesBilletes[this.nombre];
        
    }
}

var botoncito = document.getElementById("retirar");     //Boton para retirar dinero
var recargar = document.getElementById("recarga");     //Boton para recargar de plata el cajero
var resultadito = document.getElementById("resultado"); //parrafo vacio creado en html
var ranura = document.getElementById("ranura");         //parrafo vacio creado en html

var entregado = [];                                     //billetes que yo le entrego al usuario.

var caja = [];                                          //variable donde le asigno los billetes y sus cantidades.
caja.push(new Billete(100, 2,"billete100") );
caja.push(new Billete(50, 2,"billete50") );
caja.push(new Billete(20, 2, "billete20") );
caja.push(new Billete(10, 2, "billete10") );
caja.push(new Billete(5, 2, "billete5") );

var dinero;
var div = 0;
var papeles = 0;

botoncito.addEventListener("click", entregarDinero);
recargar.addEventListener("click", recargarCajero);


function recargarCajero()
{
    for(var i of caja)
    {
        i.cantidad = aleatorioNumber(1, 10);
    }
    console.log(caja);
}

function entregarDinero()
{   
    ranura.innerHTML = " ";                     //Limpio el parrajo donde muestro
    resultadito.innerHTML = " ";                //Limpio el parrajo donde muestro

    var text = document.getElementById("dinero");
    dinero = parseInt(text.value);
    for(var i of caja)                          //recorro cada elemento del array donde tengo los billetes del mayor al menor
    {
        if (dinero > 0)                         //pregunto si la cantidad que me están solicitando o que me queda es mayor a 0
        {
            div = Math.floor(dinero / i.valor); //lo divido por el valor del billete, y en div guardo el entero del cociente
            if( div > i.cantidad)               //pregunto si div es mayor a la cantidad de billetes de esa denominación disponibles
            {
                papeles = i.cantidad;           //si es mayor, los entrego todos
                i.cantidad = 0;
            }
            else
            {
                papeles = div;                  //de lo contrario, le entrego los que necesita.
                i.cantidad = i.cantidad - div;
            }
            entregado.push( new Billete(i.valor, papeles, i.nombre) );  //le paso los parametros al array de entregar
            dinero = dinero - (i.valor * papeles);                      
        }
    }

    if(dinero > 0)
    {
        resultadito.innerHTML = "soy un cajero pobre";
    }
    else
    {

        for(var j of entregado)
        {
            if (j.cantidad > 0)
            {
                resultadito.innerHTML +=  j.cantidad + " Billetes de $" + j.valor + "<br />";
                for(var k = 1; k <= (j.cantidad); k++)
                {
                   ranura.appendChild(j.imagen);
                   ranura.innerHTML += " "; 
                }
                
                
            }
        }
    }

    var h = entregado.length;                   //Ciclo para vaciar el array entregado
    for(var g = 0; g <= h; g++)
    {
        entregado.splice((h - g), 1);
    }

}

function aleatorioNumber(numero_minimo, numero_maximo)
{
    var resultado;
    resultado = Math.floor(Math.random() * (numero_maximo - numero_minimo + 1)) + numero_minimo;
    return resultado;
}

