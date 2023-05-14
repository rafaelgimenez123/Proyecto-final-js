const alumno_nombre = document.getElementById("alumno_nombre");
const alumno_curso = document.getElementById("alumno_curso");
const alumno_edad = document.getElementById("alumno_edad");
const alumno_descripcion = document.getElementById("alumno_descripcion");
const contenedor_alumno = document.getElementById("contenedor_alumnos");

class Alumno {
  constructor(nombre, curso, edad, descripcion) {
    this.nombre = nombre;
    this.curso = curso;
    this.edad = edad;
    this.descripcion = descripcion;
  }
}

async function cargarAlumnos() {
  try {
    const response = await fetch("./alumnos.json");
    const alumnos = await response.json();

    alumnos.forEach((alumno) => {
      const Alumno_element = createAlumnoElement(alumno);
      contenedor_alumno.appendChild(Alumno_element);
    });
  } catch (error) {
    console.error("Error al cargar los alumnos:", error);
  }
}

const createAlumnoElement = (alumno) => {
  const Alumno_element = document.createElement("div");
  Alumno_element.classList.add("card");
  Alumno_element.innerHTML = `
    <div class="container_card">
      <h3>${alumno.nombre}</h3>
      <ul>
        <li>Edad alumno: ${alumno.edad}</li>
        <li>Curso alumno: ${alumno.curso}</li>
        <li>Descripción alumno: ${alumno.descripcion}</li>
      </ul>
    </div>
  `;
  return Alumno_element;
};

const CrearAlumno = (event) => {
  event.preventDefault();
  if (![alumno_nombre, alumno_curso, alumno_edad, alumno_descripcion].every((element) => element.value)) {
    Swal.fire('Ingresa todos los campos para continuar');
    return;
  }

  const nuevoAlumno = new Alumno(
    alumno_nombre.value,
    alumno_curso.value,
    alumno_edad.value,
    alumno_descripcion.value
  );

  let listaAlumnos = JSON.parse(localStorage.getItem('alumnos')) || [];
  listaAlumnos.push(nuevoAlumno);
  localStorage.setItem('alumnos', JSON.stringify(listaAlumnos));

  const Alumno_element = createAlumnoElement(nuevoAlumno);
  contenedor_alumno.appendChild(Alumno_element);
};

function mostrarAlumnos() {
  const contenedor_alumno = document.getElementById("contenedor_alumnos");
  const listaAlumnos = JSON.parse(localStorage.getItem('alumnos')) || [];

  listaAlumnos.forEach((alumno) => {
    const Alumno_element = createAlumnoElement(alumno);
    contenedor_alumno.appendChild(Alumno_element);
  });
}

const form = document.getElementById("submit_button_form");
form.addEventListener("submit", CrearAlumno);

(async () => {
  await cargarAlumnos();
  mostrarAlumnos();
})();