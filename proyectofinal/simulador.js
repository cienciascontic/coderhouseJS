/*jshint esversion: 6 */
let bolsaDePreguntas = [];
$.ajax({
  url: "preguntas.json",
  dataType: "json",
  success: function (respuesta) {
    definirPreguntas(respuesta);
  },
});

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
let tiempoDisponible;
let nombreDeUsuario;

function comenzarJuego() {
  $("#contenedorPregunta").show();
  $("#idDivCuadroDeHonor").hide();
  recuperarUsuarios();
  establecerTiempo();
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

function definirPreguntas(respuesta) {
  bolsaDePreguntas = respuesta;
  comenzarJuego();
}

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
    case "GEO":
    catNomCompleto = "Geografía";
    iconoCategoria = '<i class="fas fa-globe fa-2x"></i>';
    break;
    case "CIE":
    catNomCompleto = "Ciencias";
    iconoCategoria = '<i class="fas fa-atom fa-2x"></i>';
    break;
    case "LIT":
    catNomCompleto = "Literatura";
    iconoCategoria = '<i class="fas fa-book-reader fa-2x"></i>';
    break;
    case "REL":
    catNomCompleto = "Religión";
    iconoCategoria = '<i class="fas fa-praying-hands fa-2x"></i>';
    break;
    case "MUS":
    catNomCompleto = "Música";
    iconoCategoria = '<i class="fas fa-compact-disc fa-2x"></i>';
    break;
    case "CTV":
    catNomCompleto = "Cine y TV";
    iconoCategoria = '<i class="fas fa-film fa-2x"></i>';
    break;
    default:
  }

  document.getElementById("imagenPregunta").src = bolsaDePreguntas[indicePregunta].ayuda;
  $("#idEnunciado").text(bolsaDePreguntas[indicePregunta].enunciado);
  // ícono de la categoría temática
  let divDeLaCategoriaTematica = document.getElementById("idDivCategoriaTematica");
  divDeLaCategoriaTematica.innerHTML = iconoCategoria + ' &nbsp &nbsp' + catNomCompleto;
  // crear las opciones dinámicamente
  let divDeLasOpciones = document.getElementById("opcionesDeLasPreguntas");
  divDeLasOpciones.innerHTML = "";

  const cantOpciones = 4; //cantidad de opciones disponibles para cada pregunta
  for (var i = 0; i < cantOpciones; i++) {
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
  $("#contenedorPregunta").hide();
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
$("#idDivCuadroDeHonor").append(tablaCuadroDeHonor).fadeIn(3000);

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

    mostrarBotonVolverAJugar();

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
};

function mostrarBotonVolverAJugar() {
  $("#idDivCuadroDeHonor").prepend("<button id='idBtnJugarDeNuevo'>Volver a jugar</button>");
  $("#idBtnJugarDeNuevo").css({
    "background-color": "#EECC47",
    "border-radius": "5px",
    "height": "40px",
    "cursor": "pointer"
  });

  $("#idBtnJugarDeNuevo").click(function() {

    location.href = "index.html";
    });

};
