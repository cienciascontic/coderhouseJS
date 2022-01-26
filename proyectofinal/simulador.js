/*jshint esversion: 6 */
let puntajeUsuario = 0;
let respuestaCorrecta;
let catNomCompleto;
let iconoCategoria;
let claseAnterior;
let tiempoDisponible = 500;
let textoSetearTiempo;
// para guardar los usuarios y sus puntajes en localStorage
let todosLosUsuarios = [];
let todosLosPuntajes = [];

function ocultarPreguntaYBoton() {
document.getElementById('contenedorPregunta').style.visibility = "hidden";
document.getElementById('idBotonHacerPregunta').style.visibility = "hidden";
  seteoInicial();
}

function seteoInicial() {

  let divUsuario = document.getElementById("idDivUsuario");
  //  texto para ingresar nombre de usuario
  let textoUsuario = document.createElement("div");
  textoUsuario.innerHTML = "Ingrese su nombre de usuario:";
  textoUsuario.style.textAlign = "center";

  divUsuario.appendChild(textoUsuario);

  let divParental = document.getElementById("idDivUsuario");
  // input de nombre de usuario
  let inputNombreDeUsuario = document.createElement("input");
  inputNombreDeUsuario.setAttribute("type", "text");
  inputNombreDeUsuario.setAttribute("id", "idNombreDeUsuario");

  divParental.appendChild(inputNombreDeUsuario);

  document.getElementById("idNombreDeUsuario").addEventListener('focusout', eventoUsuario => {
      nombreDeUsuario = eventoUsuario.currentTarget.value;
      let losUsuariosGuardados = [];
      if (localStorage.getItem("usuariosGuardados") === null) {
        losUsuariosGuardados.push(nombreDeUsuario);
        localStorage.setItem("usuariosGuardados", JSON.stringify(losUsuariosGuardados));
      } else {
        losUsuariosGuardados = JSON.parse(localStorage.getItem("usuariosGuardados"));
        losUsuariosGuardados.push(nombreDeUsuario);
        localStorage.setItem("usuariosGuardados", JSON.stringify(losUsuariosGuardados));
      }

  })

  let divPadre = document.getElementById("idDivClaseTiempo");
  // input de tiempo de juego
  let tiempoDeJuego = document.createElement("input");
  tiempoDeJuego.setAttribute("type", "number");
  tiempoDeJuego.setAttribute("id", "idInputTiempoDeJuego");

  divPadre.appendChild(tiempoDeJuego);

  // texto de tiempo de juego
  textoSetearTiempo = document.createElement("div");
  textoSetearTiempo.innerHTML = "Ingresar tiempo de juego en segundos y luego dar ENTER";
  textoSetearTiempo.style.textAlign = "center";

  let divActual = document.getElementById("idDivClaseTiempo");
  divActual.style.textAlign = "center";
  document.body.insertBefore(textoSetearTiempo, divActual);

    document.getElementById("idInputTiempoDeJuego").addEventListener('keyup', evento => {
      if (evento.keyCode === 13) {
        tiempoDisponible = parseInt(evento.currentTarget.value);
        comenzarJuego();
      }
    })
}

function comenzarJuego() {
  document.getElementById('contenedorPregunta').style.visibility = "visible";
  document.getElementById('idBotonHacerPregunta').style.visibility = "visible";
  setTimeout(controlDeTiempo, tiempoDisponible*1000);
  hacerPregunta();
}

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

const bolsaDePreguntas = [];
bolsaDePreguntas.push(new Pregunta(1,"HIS","https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/Alexander_the_Great_mosaic.jpg/250px-Alexander_the_Great_mosaic.jpg","¿A qué le temía Bucéfalo?", ["A los rebencazos de su amo", "A los ratones", "A su sombra", "Al agua"], "opcion3"));

bolsaDePreguntas.push(new Pregunta(2,"TEC","https://upload.wikimedia.org/wikipedia/commons/thumb/0/01/LinuxCon_Europe_Linus_Torvalds_03_%28cropped%29.jpg/800px-LinuxCon_Europe_Linus_Torvalds_03_%28cropped%29.jpg","¿Quién se apellida Torvalds?", ["El creador de Wikipedia", "El creador de Linux", "El creador de Twicth", "El creador del pendrive"], "opcion2"));

bolsaDePreguntas.push(new Pregunta(3,"DEP","https://cdn.pixabay.com/photo/2016/07/28/15/28/winner-1548239_1280.jpg","¿Cuál de estos deportes le otorgó más medallas olímpicas a la Argentina en toda su historia?", ["Hockey sobre césped", "Atletismo", "Tenis", "Boxeo"], "opcion4"));

bolsaDePreguntas.push(new Pregunta(4,"TEC", "imgs/img-pregunta4.jpg", "¿Qué modelo es esta computadora?", ["Commodore 64", "Atari 130XE", "Talent MSX", "IBM PS 2"], "opcion2"));

function numeroAleatorio(min, max) {
   return Math.round(Math.random() * (max - min) + min);
}

function controlDeTiempo() {
  document.getElementById('contenedorPregunta').style.visibility = "hidden";
  document.getElementById('idBotonHacerPregunta').style.visibility = "hidden";
  document.getElementById('idDivClaseTiempo').style.visibility = "hidden";
  textoSetearTiempo.innerHTML = "Se agotó el tiempo. Obtuviste: " + puntajeUsuario + " puntos";

  let losPuntajesGuardados = [];

  if (localStorage.getItem("puntajesGuardados") === null) {
    losPuntajesGuardados.push(puntajeUsuario);
    localStorage.setItem("puntajesGuardados", JSON.stringify(losPuntajesGuardados));
  } else {
    losPuntajesGuardados = JSON.parse(localStorage.getItem("puntajesGuardados"));
    losPuntajesGuardados.push(puntajeUsuario);
    localStorage.setItem("puntajesGuardados", JSON.stringify(losPuntajesGuardados));
  }

let divPadreCuadroDeHonor = document.getElementById("idDivCuadroDeHonor");
let usuariosDelCuadro = JSON.parse(localStorage.getItem("usuariosGuardados"));
let puntajesDelCuadro = JSON.parse(localStorage.getItem("puntajesGuardados"));

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
    let filaUsuario = document.createElement('td');
    filaUsuario.innerHTML = usuariosDelCuadro[i];
    let filaPuntaje = document.createElement('td');
    filaPuntaje.innerHTML = puntajesDelCuadro[i];
    let filaTiempo = document.createElement('td');
    filaTiempo.innerHTML = "próximamente...";

    fila.appendChild(filaUsuario);
    fila.appendChild(filaPuntaje);
    fila.appendChild(filaTiempo);
    cuerpoTablaCuadroDeHonor.appendChild(fila);
}

}; // fin de función controlDeTiempo()

function hacerPregunta() {
  let indicePregunta = numeroAleatorio(0,bolsaDePreguntas.length - 1);
  claseAnterior = document.getElementById("idSpanIconoCategoria").classList.value;

if (claseAnterior != "") {
  document.getElementById("idSpanIconoCategoria").classList.value = "nada";
  document.getElementById("idSpanIconoCategoria").classList.remove("nada");
}
  switch (bolsaDePreguntas[indicePregunta].categoria) {
    case "HIS":
    catNomCompleto = "Historia";
    iconoCategoria = "icofont-university";
    break;
    case "TEC":
    catNomCompleto = "Tecnología";
    iconoCategoria = "icofont-computer";
    break;
    case "DEP":
    catNomCompleto = "Deportes";
    iconoCategoria = "icofont-runner";
    break;
    default:
  }

  document.getElementById("imagenPregunta").src = bolsaDePreguntas[indicePregunta].ayuda;
  document.getElementById("idEnunciado").innerHTML = bolsaDePreguntas[indicePregunta].enunciado;
  document.getElementById("idCategoria").innerHTML = catNomCompleto;

  document.getElementById("idSpanIconoCategoria").classList.add(iconoCategoria, "icofont-2x");

  for (var i = 0; i < bolsaDePreguntas.length; i++) {
    let j = i + 1;
    let opcion = "opcion" + j;
    document.getElementById(opcion).innerHTML = bolsaDePreguntas[indicePregunta].opciones[i];
  }

  respuestaCorrecta = bolsaDePreguntas[indicePregunta].opcionCorrecta;

}

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

}

ocultarPreguntaYBoton();
