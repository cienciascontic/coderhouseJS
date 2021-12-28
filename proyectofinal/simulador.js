let respuestaUsuario;
let puntajeUsuario = 0;

class Pregunta {
  constructor(idPregunta, categoria, enunciado, opciones = [], opcionCorrecta, tiempo) {
    this.idPregunta = idPregunta;
    this.categoria = categoria;
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
      //default:
    }
    let respuestaUsuario = prompt("Categoría: " + this.categoria + "\r\n" + " Pregunta: " + this.enunciado + "\r\n" + "\r\n" + "A. " + this.opciones[0] + "\r\n" + "B. " + this.opciones[1] + "\r\n" + "C. " + this.opciones[2] + "\r\n" + "D. " + this.opciones[3]);
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

    // darResultado() {
    //   if (this.opcionCorrecta === respuestaUsuario) {
    //     alert("Tu respuesta es correcta!");
    //   } else {
    //     alert("Incorrecto");
    //   }
    //}
  }

const pregunta1 = new Pregunta(1,"HIS","¿A qué le temía Bucéfalo?", ["A los rebencazos de su amo", "A los ratones", "A su sombra", "Al agua"], "C", 8000);
const pregunta2 = new Pregunta(2,"TEC","¿Quién se apellida Torvalds?", ["El creador de Wikipedia", "El creador de Linux", "El creador de Twicth", "El creador del pendrive"], "B", 10000);

function mostrarPuntajeTotal() {
alert("Tu puntaje total fue: " + puntajeUsuario + " puntos");
}

pregunta1.hacerPregunta();
  //pregunta1.darResultado();
  pregunta2.hacerPregunta();
  mostrarPuntajeTotal();

// function comenzarJuego() {
//  puntajeUsuario = 0;
//  pregunta1.hacerPregunta();
  //pregunta1.darResultado();
//  pregunta2.hacerPregunta();
//  mostrarPuntajeTotal();
// }
