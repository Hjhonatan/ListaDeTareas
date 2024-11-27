// Selección de elementos del DOM
const entradaTexto = document.querySelector("input[type='text']");
const entradaFecha = document.querySelector("#date-input");
const botonAgregar = document.querySelector(".btn-add");
const listaTareas = document.querySelector("ul");
const mensajeVacio = document.querySelector(".empty");

let tareaEnEdicion = null; // Variable para rastrear la tarea que se está editando

// Evento para agregar o editar tareas
botonAgregar.addEventListener("click", (e) => {
  e.preventDefault();

  const texto = entradaTexto.value; // Capturar texto de la tarea
  const fecha = entradaFecha.value; // Capturar fecha y hora

  if (texto !== "" && fecha !== "") {
    if (tareaEnEdicion) {
      // Si estamos editando una tarea, actualizamos texto y fecha
      tareaEnEdicion.querySelector(".texto-tarea").textContent = texto;
      tareaEnEdicion.querySelector(".fecha-tarea").textContent = formatearFecha(fecha);
      tareaEnEdicion = null; // Restablecer la variable de edición
    } else {
      // Crear un nuevo elemento de tarea
      const tarea = document.createElement("li");

      const parrafoTexto = document.createElement("p");
      parrafoTexto.textContent = texto;
      parrafoTexto.className = "texto-tarea";

      const parrafoFecha = document.createElement("p");
      parrafoFecha.textContent = formatearFecha(fecha);
      parrafoFecha.className = "fecha-tarea";

      tarea.appendChild(parrafoTexto);
      tarea.appendChild(parrafoFecha);
      tarea.appendChild(agregarBotonEliminar());
      tarea.appendChild(agregarBotonEditar());
      tarea.appendChild(agregarBotonCompletar());
      listaTareas.appendChild(tarea);
    }

    // Limpiar campos de entrada
    entradaTexto.value = "";
    entradaFecha.value = "";
    mensajeVacio.style.display = "none";
  }
});

// Función para crear el botón de eliminar
function agregarBotonEliminar() {
  const botonEliminar = document.createElement("button");

  botonEliminar.textContent = "X";
  botonEliminar.className = "btn-eliminar";

  botonEliminar.addEventListener("click", (e) => {
    const tarea = e.target.parentElement;
    listaTareas.removeChild(tarea);

    if (listaTareas.querySelectorAll("li").length === 0) {
      mensajeVacio.style.display = "block";
    }
  });

  return botonEliminar;
}

// Función para crear el botón de editar
function agregarBotonEditar() {
  const botonEditar = document.createElement("button");

  botonEditar.textContent = "Editar";
  botonEditar.className = "btn-editar";

  botonEditar.addEventListener("click", (e) => {
    const tarea = e.target.parentElement;

    entradaTexto.value = tarea.querySelector(".texto-tarea").textContent; // Cargar texto
    const textoFecha = tarea.querySelector(".fecha-tarea").textContent;
    entradaFecha.value = revertirFormatearFecha(textoFecha); // Convertir fecha a formato compatible
    tareaEnEdicion = tarea; // Guardar referencia a la tarea en edición
  });

  return botonEditar;
}

// Función para crear el botón de completar
function agregarBotonCompletar() {
  const botonCompletar = document.createElement("button");

  botonCompletar.textContent = "Tarea terminada";
  botonCompletar.className = "btn-completar";

  botonCompletar.addEventListener("click", (e) => {
    const tarea = e.target.parentElement;

    // Alternar entre completada y no completada
    tarea.classList.toggle("completada");
  });

  return botonCompletar;
}

// Función para formatear la fecha a un formato más amigable
function formatearFecha(fecha) {
  const opciones = { year: "numeric", month: "long", day: "numeric", hour: "2-digit", minute: "2-digit" };
  return new Date(fecha).toLocaleDateString("es-ES", opciones);
}

// Función para revertir el formato de fecha a "yyyy-MM-ddTHH:mm"
function revertirFormatearFecha(fechaTexto) {
  const fecha = new Date(fechaTexto);
  const año = fecha.getFullYear();
  const mes = String(fecha.getMonth() + 1).padStart(2, "0");
  const día = String(fecha.getDate()).padStart(2, "0");
  const horas = String(fecha.getHours()).padStart(2, "0");
  const minutos = String(fecha.getMinutes()).padStart(2, "0");
  return `${año}-${mes}-${día}T${horas}:${minutos}`;
}
