// Datos de los ramos y prerequisitos
const ramos = [
  {
    semestre: 1,
    nombre: "Química General y Orgánica"
  },
  {
    semestre: 1,
    nombre: "Antropología"
  },
  {
    semestre: 1,
    nombre: "Introducción a la Tecnología Médica"
  },
  {
    semestre: 1,
    nombre: "Biología Celular"
  },
  {
    semestre: 1,
    nombre: "Matemáticas Básica"
  },
  {
    semestre: 1,
    nombre: "Integrado en Habilidades Científicas para la Tecnología Médica"
  },
  {
    semestre: 2,
    nombre: "Bioquímica General",
    prerequisitos: ["Química General y Orgánica"]
  },
  {
    semestre: 2,
    nombre: "Morfología Básica"
  },
  {
    semestre: 2,
    nombre: "Ética",
    prerequisitos: ["Antropología"]
  },
  {
    semestre: 2,
    nombre: "Tecnología Médica en el Equipo de Salud",
    prerequisitos: ["Introducción a la Tecnología Médica"]
  },
  {
    semestre: 2,
    nombre: "Bioseguridad y Procedimientos de Apoyo Diagnóstico"
  },
  {
    semestre: 2,
    nombre: "Psicología de Atención al Paciente"
  }
];

// Cargar estado desde localStorage
const estado = JSON.parse(localStorage.getItem("estadoRamos")) || {};

function crearMalla() {
  const contenedor = document.getElementById("contenedor-malla");
  contenedor.innerHTML = "";

  for (let i = 1; i <= 2; i++) {
    const semestreDiv = document.createElement("div");
    semestreDiv.classList.add("semestre");

    const titulo = document.createElement("h2");
    titulo.textContent = `Semestre ${i}`;
    semestreDiv.appendChild(titulo);

    const cursosDelSemestre = ramos.filter(r => r.semestre === i);

    cursosDelSemestre.forEach(ramo => {
      const div = document.createElement("div");
      div.classList.add("curso");
      div.textContent = ramo.nombre;

      const estadoRamo = estado[ramo.nombre];

      // Si tiene prerequisitos y alguno no está aprobado, bloquear
      const bloqueado = ramo.prerequisitos?.some(
        prereq => !estado[prereq]
      );

      if (estadoRamo) {
        div.classList.add("aprobado");
      } else if (bloqueado) {
        div.classList.add("bloqueado");
      }

      div.addEventListener("click", () => {
        if (div.classList.contains("bloqueado")) return;

        div.classList.toggle("aprobado");
        estado[ramo.nombre] = div.classList.contains("aprobado");

        localStorage.setItem("estadoRamos", JSON.stringify(estado));
        crearMalla();
        actualizarProgreso();
      });

      semestreDiv.appendChild(div);
    });

    contenedor.appendChild(semestreDiv);
  }

  actualizarProgreso();
}

function actualizarProgreso() {
  const total = ramos.length;
  const aprobados = Object.values(estado).filter(e => e).length;
  const porcentaje = Math.round((aprobados / total) * 100);

  document.getElementById("progreso-barra").style.width = `${porcentaje}%`;
  document.getElementById("progreso-texto").textContent = `${porcentaje}% completado`;
}

crearMalla();
