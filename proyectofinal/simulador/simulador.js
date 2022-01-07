let respuestaUsuario;
let puntajeUsuario = 0;

function comenzarJuego() {
  document.getElementById('contenedorPregunta').style.visibility = "visible";
  hacerPregunta();
}


class Pregunta {
  constructor(idPregunta, categoria, ayuda, enunciado, opciones = [], opcionCorrecta, tiempo) {
    this.idPregunta = idPregunta;
    this.categoria = categoria;
    this.ayuda = ayuda;
    this.enunciado = enunciado;
    this.opciones = opciones;
    this.opcionCorrecta = opcionCorrecta;
    this.tiempo = tiempo; // en milisegundos
    this.respondida = false;
    this.sinOpciones = false;
  }
  responder() {
    this.respondida = true;
  }
  sinOpciones() {
    this.sinOpciones = true;
  }

  transformarCategoria() {
    switch (this.categoria) {
      case "HIS":
      this.categoria = "Historia";
      break;
      case "TEC":
      this.categoria = "Tecnología";
      break;
      case "DEP":
      this.categoria = "Deportes";
      break;
      //default:
    }
  }
};// fin del constructor

const bolsaDePreguntas = [];
bolsaDePreguntas.push(new Pregunta(1,"HIS","https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/Alexander_the_Great_mosaic.jpg/250px-Alexander_the_Great_mosaic.jpg","¿A qué le temía Bucéfalo?", ["A los rebencazos de su amo", "A los ratones", "A su sombra", "Al agua"], "opcion3", 3000));

bolsaDePreguntas.push(new Pregunta(2,"TEC","https://upload.wikimedia.org/wikipedia/commons/thumb/0/01/LinuxCon_Europe_Linus_Torvalds_03_%28cropped%29.jpg/800px-LinuxCon_Europe_Linus_Torvalds_03_%28cropped%29.jpg","¿Quién se apellida Torvalds?", ["El creador de Wikipedia", "El creador de Linux", "El creador de Twicth", "El creador del pendrive"], "opcion2", 5000));

bolsaDePreguntas.push(new Pregunta(3,"DEP","https://cdn.pixabay.com/photo/2016/07/28/15/28/winner-1548239_1280.jpg","¿Cuál de estos deportes le otorgó más medallas olímpicas a la Argentina en toda su historia?", ["Hockey sobre césped", "Atletismo", "Tenis", "Boxeo"], "opcion4", 3000));

bolsaDePreguntas.push(new Pregunta(4,"TEC", "imgs/img-pregunta4.jpg", "¿Qué modelo es esta computadora?", ["Commodore 64", "Atari 130XE", "Talent MSX", "IBM PS 2"], "opcion2", 3000));

function mostrarPuntaje() {
alert("Tu puntaje es: " + puntajeUsuario + " puntos");
}

function numeroAleatorio(min, max) {
   return Math.round(Math.random() * (max - min) + min);
}

let respuestaCorrecta;

function controlDeTiempo() {
  alert('Se te venció el tiempo');
  hacerPregunta();
}

function hacerPregunta() {
  //setTimeout(controlDeTiempo, 7000);
  let indicePregunta = numeroAleatorio(0,bolsaDePreguntas.length - 1);
  //console.log("El índice es" + indicePregunta);
  document.getElementById("imagenPregunta").src = bolsaDePreguntas[indicePregunta].ayuda;
  document.getElementById("idEnunciado").innerHTML = bolsaDePreguntas[indicePregunta].enunciado;
  for (var i = 0; i < 4; i++) {
    let j = i + 1;
    let opcion = "opcion" + j;
    document.getElementById(opcion).innerHTML = bolsaDePreguntas[indicePregunta].opciones[i];
  }
  respuestaCorrecta = bolsaDePreguntas[indicePregunta].opcionCorrecta;

}

function evaluarRespuesta(){
let opcionCliqueada = event.srcElement.id;
if (opcionCliqueada === respuestaCorrecta) {
  puntajeUsuario ++;
alert("Bien!")
} else {
  alert("No es correcta");
}
mostrarPuntaje();
}

comenzarJuego();

//
