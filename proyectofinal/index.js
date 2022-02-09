/*jshint esversion: 6 */

let tiempoUsuario;
let puntajeUsuario;
let divUsuario = document.getElementById("idDivUsuario");

function seteoInicial() {
  animarTitulos();
  textoNombreDeUsuario();
  inputNombreDeUsuario();
  lineaEnBlancoDpsDeUsuario();
  guardarUsuariosEnLocalStorage();
  textoTiempoDeJuego();
  selectorTiempoDeJuego();
  seleccionarTiempoDeJuego();
};

function animarTitulos(){
  $("#idTituloPortada").hide();
  $("#idSubTituloPortada").hide();
  $("#idDivUsuario").hide();
  $("#idDivClaseTiempo").hide();
  $("#idTituloPortada").fadeIn(4000, function() {
    $("#idTituloPortada").animate({fontSize: '+=10px'}, "slow");
    $("#idSubTituloPortada").fadeIn(2000, function() {
      $("#idDivUsuario").slideUp(1000).slideDown(1000).fadeIn(1000, function() {
        $("#idDivClaseTiempo").fadeIn(1000, function() {
          $("#idBotonPortada").fadeIn(1000);
        })
      });
    });
  });

};

function textoNombreDeUsuario() {

  $("#idDivUsuario").append("Nombre del jugador" + "<br>").css("text-align","center");

};

function inputNombreDeUsuario() {
  // input de nombre de usuario
  let inputNombreDeUsuario = document.createElement("input");
  inputNombreDeUsuario.setAttribute("type", "text");
  inputNombreDeUsuario.setAttribute("id", "idNombreDeUsuario");
  divUsuario.appendChild(inputNombreDeUsuario);
};

function lineaEnBlancoDpsDeUsuario() {
  // insertar salto de línea
  let padreDelBreak = document.getElementById('idDivSaltoDeLinea');
  let lineaEnBlanco = document.createElement('br');
  padreDelBreak.appendChild(lineaEnBlanco);
};

//con jQuery
function guardarUsuariosEnLocalStorage() {
  $("#idNombreDeUsuario").on('focusout', eventoUsuario =>
  {
      nombreDeUsuario = eventoUsuario.currentTarget.value;
      let losUsuariosGuardados = [];
      if (localStorage.getItem("usuariosGuardados") === null)
        {
          losUsuariosGuardados.push(nombreDeUsuario);
          localStorage.setItem("usuariosGuardados", JSON.stringify(losUsuariosGuardados));
        }
        else
        {
          losUsuariosGuardados = JSON.parse(localStorage.getItem("usuariosGuardados"));
          losUsuariosGuardados.push(nombreDeUsuario);
          localStorage.setItem("usuariosGuardados", JSON.stringify(losUsuariosGuardados));
        }
  })
};

function textoTiempoDeJuego() {
  // con jQuery
  $("#idDivClaseTiempo").append("<div id='idDelTextoDelTiempo'>Tiempo de juego en segundos</div>");
  // insertar salto de línea
  $("#idDelTextoDelTiempo").append("<br>");
  // fin jQuery
};

function selectorTiempoDeJuego() {
  // input de tiempo de juego
  // con jQuery
  $("#idDelTextoDelTiempo").append("<select id='idSelectorTiempoDeJuego'></select>");
};

function seleccionarTiempoDeJuego() { //cargar los tiempos en el "select".
  //Array de tiempos
    let tiemposDeJuego = ["--elegir tiempo--", 5, 10, 15, 20, 30, 40, 50, 60];
  // Recorremos el array de tiempos con jQuery
    for(let i=0; i < tiemposDeJuego.length; i++){
        $("#idSelectorTiempoDeJuego").append(`<option value="${tiemposDeJuego[i]}">${tiemposDeJuego[i]}</option>`);
    }
atraparElValorSeleccionado();
};

function atraparElValorSeleccionado() {
  //con jQuery
 $("#idSelectorTiempoDeJuego").change(function(){
tiempoUsuario = $("#idSelectorTiempoDeJuego option:selected").val();
})

};

function guardarTiemposEnLocalStorage() {
    let losTiemposGuardados = [];

    if (localStorage.getItem("tiemposGuardados") === null) {
      losTiemposGuardados.push(tiempoUsuario);
      localStorage.setItem("tiemposGuardados", JSON.stringify(losTiemposGuardados));
    } else {
      losTiemposGuardados = JSON.parse(localStorage.getItem("tiemposGuardados"));
      losTiemposGuardados.push(tiempoUsuario);
      localStorage.setItem("tiemposGuardados", JSON.stringify(losTiemposGuardados));
    }

};

seteoInicial();

$("#idBotonPortada").click(function() {
    guardarTiemposEnLocalStorage();
    location.href = "simulador.html";
});
