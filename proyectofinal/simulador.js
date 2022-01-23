let puntajeUsuario = 0;
let respuestaCorrecta;
let catNomCompleto;
let iconoCategoria;
let claseAnterior;
let tiempoDisponible;

//const tiempoDisponible = 15000;

function establecerTiempoDeJuego() {
    tiempoDisponible = prompt("Tiempo de juego (en segundos): ");
    comenzarJuego();
}

function comenzarJuego() {
  document.getElementById('contenedorPregunta').style.visibility = "visible";
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
  alert('Se te venció el tiempo. Tu puntaje fue de: ' + puntajeUsuario);
  hacerPregunta();
}

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

  //

  document.getElementById("idSpanIconoCategoria").classList.add(iconoCategoria, "icofont-2x");

  for (var i = 0; i < bolsaDePreguntas.length; i++) {
    let j = i + 1;
    let opcion = "opcion" + j;
    document.getElementById(opcion).innerHTML = bolsaDePreguntas[indicePregunta].opciones[i];
  }

  respuestaCorrecta = bolsaDePreguntas[indicePregunta].opcionCorrecta;

}

function evaluarRespuesta(){
  //clearTimeout(tiempoEnContestar);
let opcionCliqueada = event.srcElement.id;
let textoOpcionCliqueada = document.getElementById(opcionCliqueada).innerHTML;

if (opcionCliqueada === respuestaCorrecta) {
  document.getElementById(opcionCliqueada).innerHTML = textoOpcionCliqueada + "   " + '<i class="icofont-nerd-smile" style="color: green; font-weight: bold; font-size: 30px"></i>';
  puntajeUsuario ++;
}
else {
  document.getElementById(opcionCliqueada).innerHTML = textoOpcionCliqueada + "   " + '<i class="icofont-sad" style="color: red; font-weight: bold; font-size: 30px"></i>';
  puntajeUsuario --;
}

}

establecerTiempoDeJuego();
