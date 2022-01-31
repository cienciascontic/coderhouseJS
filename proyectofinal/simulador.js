/*jshint esversion: 6 */

// window.onload = function() {
//   comenzarJuego();
// };

//con jQuery
$(document).ready(function() {
  comenzarJuego();
})

let puntajeUsuario = 0;
let respuestaCorrecta;
let catNomCompleto;
let iconoCategoria;
let claseAnterior;
const tiempoParaVerLaRespuesta = 1500;
let textoSetearTiempo;
// para guardar los usuarios y sus puntajes en localStorage
let todosLosUsuarios = [];
let todosLosPuntajes = [];
let bolsaDePreguntas = [];
let tiempoDisponible;
let nombreDeUsuario;

function comenzarJuego() {
  document.getElementById('contenedorPregunta').style.visibility = "visible";
  recuperarUsuarios();
  establecerTiempo();
  definirPreguntas();
  hacerPregunta();
};

function recuperarUsuarios() {
  todosLosUsuarios = JSON.parse(localStorage.getItem("usuariosGuardados"));
  let cantidadDeUsuariosGuardados = todosLosUsuarios.length;
  let ultimoUsuario = todosLosUsuarios[cantidadDeUsuariosGuardados - 1];
  nombreDeUsuario = ultimoUsuario;
}

function establecerTiempo() {
  todosLosTiempos = JSON.parse(localStorage.getItem("tiemposGuardados"));
  let cantidadDeTiemposGuardados = todosLosTiempos.length;
  let tiempoDisponible = todosLosTiempos[cantidadDeTiemposGuardados - 1];
  setTimeout(controlDeTiempo, tiempoDisponible*1000);
};

function definirPreguntas() {
  class Pregunta {
    constructor(idPregunta, categoria, ayuda, enunciado, opciones = [], opcionCorrecta) {
      this.idPregunta = idPregunta;
      this.categoria = categoria;
      this.ayuda = ayuda;
      this.enunciado = enunciado;
      this.opciones = opciones;
      this.opcionCorrecta = opcionCorrecta;
      this.respondida = false;
      this.sinOpciones = false;
    }
    responder() {
      this.respondida = true;
    }
    sinOpciones() {
      this.sinOpciones = true;
    }

  }// fin del constructor}

  bolsaDePreguntas.push(new Pregunta(1,"HIS","https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/Alexander_the_Great_mosaic.jpg/250px-Alexander_the_Great_mosaic.jpg","¿A qué le temía Bucéfalo?", ["A los rebencazos de su amo", "A los ratones", "A su sombra", "Al agua"], "opcion3"));

  bolsaDePreguntas.push(new Pregunta(2,"TEC","https://upload.wikimedia.org/wikipedia/commons/thumb/0/01/LinuxCon_Europe_Linus_Torvalds_03_%28cropped%29.jpg/800px-LinuxCon_Europe_Linus_Torvalds_03_%28cropped%29.jpg","¿Quién se apellida Torvalds?", ["El creador de Wikipedia", "El creador de Linux", "El creador de Twicth", "El creador del pendrive"], "opcion2"));

  bolsaDePreguntas.push(new Pregunta(3,"DEP","https://cdn.pixabay.com/photo/2016/07/28/15/28/winner-1548239_1280.jpg","¿Cuál de estos deportes le otorgó más medallas olímpicas a la Argentina en toda su historia?", ["Hockey sobre césped", "Atletismo", "Tenis", "Boxeo"], "opcion4"));

  bolsaDePreguntas.push(new Pregunta(4,"TEC", "imgs/img-pregunta4.jpg", "¿Qué modelo es esta computadora?", ["Commodore 64", "Atari 130XE", "Talent MSX", "IBM PS 2"], "opcion2"));
};

function hacerPregunta() {
  let cantPreguntas = bolsaDePreguntas.length;
  let indicePregunta = numeroAleatorio(0 , cantPreguntas - 1);

  switch (bolsaDePreguntas[indicePregunta].categoria) {
    case "HIS":
    catNomCompleto = "Historia";
    iconoCategoria = '<i class="fas fa-landmark fa-2x"></i>';
    break;
    case "TEC":
    catNomCompleto = "Tecnología";
    iconoCategoria = '<i class="fas fa-laptop fa-2x"></i>';
    break;
    case "DEP":
    catNomCompleto = "Deportes";
    iconoCategoria = '<i class="fas fa-running fa-2x"></i>';
    break;
    default:
  }

  document.getElementById("imagenPregunta").src = bolsaDePreguntas[indicePregunta].ayuda;
  document.getElementById("idEnunciado").innerHTML = bolsaDePreguntas[indicePregunta].enunciado;
  // ícono de la categoría temática
  let divDeLaCategoriaTematica = document.getElementById("idDivCategoriaTematica");
  divDeLaCategoriaTematica.innerHTML = iconoCategoria + ' &nbsp &nbsp' + catNomCompleto;
  // crear las opciones dinámicamente
  let divDeLasOpciones = document.getElementById("opcionesDeLasPreguntas");
  divDeLasOpciones.innerHTML = "";

  for (var i = 0; i < bolsaDePreguntas.length; i++) {
    let j = i + 1;
    let opcion = "opcion" + j;

    //agregado para crear las opciones dinámicamente
    let opcionDinamica = document.createElement("div");
    opcionDinamica.setAttribute("id", opcion);
    opcionDinamica.setAttribute("class", "opcionPregunta");
    opcionDinamica.setAttribute("onclick", "evaluarRespuesta()");
    divDeLasOpciones.appendChild(opcionDinamica);

    document.getElementById(opcion).innerHTML = bolsaDePreguntas[indicePregunta].opciones[i];
  }

  respuestaCorrecta = bolsaDePreguntas[indicePregunta].opcionCorrecta;

}; //fin de función hacerPregunta

function numeroAleatorio(min, max) {
   return Math.round(Math.random() * (max - min) + min);
};

function controlDeTiempo() {
  document.getElementById('contenedorPregunta').style.visibility = "hidden";
  textoResultado = document.getElementById("idDivResultado");
  textoResultado.innerHTML = "Se agotó el tiempo " + nombreDeUsuario + ". Obtuviste: " + puntajeUsuario + " puntos";

  guardarPuntajesEnLocalStorage();

let divPadreCuadroDeHonor = document.getElementById("idDivCuadroDeHonor");
let usuariosDelCuadro = JSON.parse(localStorage.getItem("usuariosGuardados"));
let usuariosDelCuadroInvertidos = usuariosDelCuadro.reverse();
let puntajesDelCuadro = JSON.parse(localStorage.getItem("puntajesGuardados"));
let puntajesDelCuadroInvertidos = puntajesDelCuadro.reverse();
let tiemposDelCuadro = JSON.parse(localStorage.getItem("tiemposGuardados"));
let tiemposDelCuadroInvertidos = tiemposDelCuadro.reverse();

let tablaCuadroDeHonor = document.createElement('table');
let encabezadoTablaCuadroDeHonor = document.createElement('thead');
let cuerpoTablaCuadroDeHonor = document.createElement('tbody');

tablaCuadroDeHonor.appendChild(encabezadoTablaCuadroDeHonor);
tablaCuadroDeHonor.appendChild(cuerpoTablaCuadroDeHonor);

// Agregar la tabla al div de cuadro de honor
document.getElementById('idDivCuadroDeHonor').appendChild(tablaCuadroDeHonor);

// Crear y agregar encabezados de la tabla
let encabezado = document.createElement('tr');
let encabezadoColumna1 = document.createElement('th');
encabezadoColumna1.innerHTML = "Usuario";
let encabezadoColumna2 = document.createElement('th');
encabezadoColumna2.innerHTML = "Puntaje";
let encabezadoColumna3 = document.createElement('th');
encabezadoColumna3.innerHTML = "Tiempo";

encabezado.appendChild(encabezadoColumna1);
encabezado.appendChild(encabezadoColumna2);
encabezado.appendChild(encabezadoColumna3);
encabezadoTablaCuadroDeHonor.appendChild(encabezado);

// Crear y agregar datos a cada fila de la tabla
for (var i = 0; i < usuariosDelCuadro.length; i++) {

    let fila = document.createElement('tr');
    //fila.setAttribute('id', 'fila' + i);
    let filaUsuario = document.createElement('td');
    filaUsuario.setAttribute('id', 'filaUsuario' + i);
    filaUsuario.innerHTML = usuariosDelCuadroInvertidos[i];
    let filaPuntaje = document.createElement('td');
    filaPuntaje.setAttribute('id', 'filaPuntaje' + i);
    filaPuntaje.innerHTML = puntajesDelCuadroInvertidos[i];
    let filaTiempo = document.createElement('td');
    filaTiempo.innerHTML = tiemposDelCuadroInvertidos[i];
    filaTiempo.setAttribute('id', 'filaTiempo' + i);

    fila.appendChild(filaUsuario);
    fila.appendChild(filaPuntaje);
    fila.appendChild(filaTiempo);
    cuerpoTablaCuadroDeHonor.appendChild(fila);
}
    // resaltar la primera fila
    let primeraCeldaUsuario = document.getElementById('filaUsuario0');
    primeraCeldaUsuario.style.backgroundColor = "rgb(192,137,143,240)";

    let primeraCeldaPuntaje = document.getElementById('filaPuntaje0');
    primeraCeldaPuntaje.style.backgroundColor = "rgb(192,137,143,240)";

    let primeraCeldaTiempo = document.getElementById('filaTiempo0');
    primeraCeldaTiempo.style.backgroundColor = "rgb(192,137,143,240)";

}; // fin de función controlDeTiempo()

function guardarPuntajesEnLocalStorage() {
    let losPuntajesGuardados = [];

    if (localStorage.getItem("puntajesGuardados") === null) {
      losPuntajesGuardados.push(puntajeUsuario);
      localStorage.setItem("puntajesGuardados", JSON.stringify(losPuntajesGuardados));
    } else {
      losPuntajesGuardados = JSON.parse(localStorage.getItem("puntajesGuardados"));
      losPuntajesGuardados.push(puntajeUsuario);
      localStorage.setItem("puntajesGuardados", JSON.stringify(losPuntajesGuardados));
    }
};

function evaluarRespuesta(){
let opcionCliqueada = event.srcElement.id;
let textoOpcionCliqueada = document.getElementById(opcionCliqueada).innerHTML;

if (opcionCliqueada === respuestaCorrecta) {
  document.getElementById(opcionCliqueada).innerHTML = textoOpcionCliqueada + "   " + '<i class="far fa-laugh-wink" style="color: green; font-weight: bold; font-size: 30px"></i>';
  puntajeUsuario ++;
}
else {
  document.getElementById(opcionCliqueada).innerHTML = textoOpcionCliqueada + "   " + '<i class="fas fa-dizzy" style="color: red; font-weight: bold; font-size: 30px"></i>';
  puntajeUsuario --;
}
setTimeout(hacerPregunta,tiempoParaVerLaRespuesta);
}

//limpiarFondo();
