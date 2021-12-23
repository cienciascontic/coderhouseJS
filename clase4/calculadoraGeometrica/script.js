
function elegirFigura() {
  var botonClickeado = event.srcElement.id;
  switch (botonClickeado) {
    case 'imgCuadrado':
        document.getElementById("divResultado").style.visibility = "hidden";
        document.getElementById("valorParametro1").value = "";
        document.getElementById("valorResultadoRectangulo").type = "hidden";
        document.getElementById("valorResultadoTriangulo").type = "hidden";
        document.getElementById("textoFigura").innerHTML = "Vamos entonces a calcular el área de un cuadrado...";
        document.getElementById("textoParametro1").innerHTML = "Valor del lado del cuadrado: ";
        document.getElementById("valorParametro1").type = "number";
        document.getElementById("textoParametro2").innerHTML = "";
        document.getElementById("valorParametro2").type = "hidden";
        document.getElementById("botonCalcularCuadrado").style.visibility = "visible";
        document.getElementById("botonCalcularRectangulo").style.visibility = "hidden";
        document.getElementById("botonCalcularTriangulo").style.visibility = "hidden";
    break;

    case 'imgRectangulo':
        document.getElementById("textoFigura").innerHTML = "Vamos entonces a calcular el área de un rectángulo...";
        document.getElementById("valorParametro1").value = "";
        document.getElementById("textoParametro1").innerHTML = "Valor del lado 1 del rectángulo: ";
        document.getElementById("valorParametro1").type = "number";
        document.getElementById("valorParametro2").value = "";
        document.getElementById("textoParametro2").innerHTML = "Valor del lado 2 del rectángulo: ";
        document.getElementById("valorParametro2").type = "number";
        document.getElementById("divResultado").style.visibility = "hidden";
        document.getElementById("botonCalcularCuadrado").style.visibility = "hidden";
        document.getElementById("botonCalcularTriangulo").style.visibility = "hidden";
        document.getElementById("botonCalcularRectangulo").style.visibility = "visible";
    break;

    case 'imgTriangulo':
        document.getElementById("textoFigura").innerHTML = "Vamos entonces a calcular el área de un triángulo...";
        document.getElementById("valorParametro1").value = "";
        document.getElementById("textoParametro1").innerHTML = "Valor de la base del triángulo: ";
        document.getElementById("valorParametro1").type = "number";
        document.getElementById("valorParametro2").value = "";
        document.getElementById("textoParametro2").innerHTML = "Valor de la altura del triángulo: ";
        document.getElementById("valorParametro2").type = "number";
        document.getElementById("divResultado").style.visibility = "hidden";
        document.getElementById("botonCalcularCuadrado").style.visibility = "hidden";
        document.getElementById("botonCalcularRectangulo").style.visibility = "hidden";
        document.getElementById("botonCalcularTriangulo").style.visibility = "visible";
    break;
//default
  }
}

function calcularResultadoFigura() {
  var botonClickeado = event.srcElement.id;
  switch (botonClickeado) {
    case 'botonCalcularCuadrado':
    var lado = document.getElementById("valorParametro1").value;
    document.getElementById("divResultado").style.visibility = "visible";
    document.getElementById("valorResultadoCuadrado").innerHTML = "";
    document.getElementById("valorResultadoRectangulo").innerHTML = "";
    document.getElementById("valorResultadoTriangulo").innerHTML = "";
    document.getElementById("valorResultadoCuadrado").innerHTML = lado * lado;
      break;
    case 'botonCalcularRectangulo':
    document.getElementById("valorResultadoCuadrado").innerHTML = "";
    document.getElementById("valorResultadoTriangulo").innerHTML = "";
    var lado1 = document.getElementById("valorParametro1").value;
    var lado2 = document.getElementById("valorParametro2").value;
    document.getElementById("divResultado").style.visibility = "visible";
    document.getElementById("valorResultadoRectangulo").innerHTML = lado1 * lado2;
      break;

    case 'botonCalcularTriangulo':
    document.getElementById("valorResultadoCuadrado").innerHTML = "";
    document.getElementById("valorResultadoRectangulo").innerHTML = "";
    var lado1 = document.getElementById("valorParametro1").value;
    var lado2 = document.getElementById("valorParametro2").value;
    document.getElementById("divResultado").style.visibility = "visible";
    document.getElementById("valorResultadoTriangulo").innerHTML = lado1 * lado2 / 2;
      break;

    //default:
  }
}
