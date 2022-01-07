let respuestaUsuario;
let puntajeUsuario = 0;
let indiceAlAzar;
let preguntaElegida;

function numAleatorio(min, max) {
  var min = Math.ceil(min);
  var max = Math.floor(max);

  // El máximo es exclusivo y el mínimo es inclusivo
  return Math.floor(Math.random() * (max - min)) + min;
}

class Pregunta {
  constructor(idPregunta, categoria, ayuda, enunciado, opciones = [], opcionCorrecta, tiempo) {
    this.idPregunta = idPregunta;
    this.categoria = categoria;
    this.ayuda = ayuda;
    this.enunciado = enunciado;
    this.opciones = opciones;
    this.opcionCorrecta = opcionCorrecta.toUpperCase();
    this.tiempo = tiempo; // en milisegundos
    this.respondida = false;
    this.conOpciones = true;
  }
  responder() {
    this.respondida = true;
  }
  conOpciones() {
    this.conOpciones = true;
  }
  sinOpciones() {
    this.conOpciones = false;
  }

  hacerPregunta() {
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
    let respuestaUsuario = prompt("Categoría: " + this.categoria + "\r\n" + "\r\n" + " Pregunta: " + this.enunciado + "\r\n" + "\r\n" + "A. " + this.opciones[0] + "\r\n" + "B. " + this.opciones[1] + "\r\n" + "C. " + this.opciones[2] + "\r\n" + "D. " + this.opciones[3]);
    //evaluar la respuesta del usuario

    if (this.opcionCorrecta === respuestaUsuario.toUpperCase()) {
      puntajeUsuario = puntajeUsuario + 1;
      alert("Tu respuesta es correcta!");
    } else {
      alert("Incorrecto");
    }
    // fin de evaluar respuesta del usuario
    }
    // fin de método "hacerPregunta"

  }

const pregunta1 = new Pregunta(1,"HIS","https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/Alexander_the_Great_mosaic.jpg/250px-Alexander_the_Great_mosaic.jpg","¿A qué le temía Bucéfalo?", ["A los rebencazos de su amo", "A los ratones", "A su sombra", "Al agua"], "C", 8000);
const pregunta2 = new Pregunta(2,"TEC","https://es.wikipedia.org/wiki/Linus_Torvalds#/media/Archivo:LinuxCon_Europe_Linus_Torvalds_03_(cropped).jpg","¿Quién se apellida Torvalds?", ["El creador de Wikipedia", "El creador de Linux", "El creador de Twicth", "El creador del pendrive"], "B", 10000);
const pregunta3 = new Pregunta(3,"DEP","https://cdn.pixabay.com/photo/2016/07/28/15/28/winner-1548239_1280.jpg","¿Cuál de estos deportes le otorgó más medallas olímpicas a la Argentina en toda su historia?", ["Hockey sobre césped", "Atletismo", "Tenis", "Boxeo"], "D", 8000);

function mostrarPuntajeTotal() {
alert("Tu puntaje total fue: " + puntajeUsuario + " puntos");
}

let arrayDePreguntas = [];
arrayDePreguntas = [pregunta1, pregunta2, pregunta3];

  // pregunta1.hacerPregunta();
  //pregunta2.hacerPregunta();
  // pregunta3.hacerPregunta();

  function jugar() {
    indiceAlAzar = numAleatorio(0,arrayDePreguntas.length);
    preguntaElegida = arrayDePreguntas[indiceAlAzar];
    preguntaElegida.hacerPregunta();
  }

  //mostrarPuntajeTotal();
