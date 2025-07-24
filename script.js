const malla = [
  // Semestre 1
  ["Química General y Orgánica", "Antropología", "Introducción a la Tecnología Médica", "Biología Celular", "Matemáticas Básica", "Integrado en Habilidades Científicas para la Tecnología Médica"],
  // Semestre 2
  ["Bioquímica General", "Morfología Básica", "Ética", "Tecnología Médica en el Equipo de Salud", "Bioseguridad y Procedimientos de Apoyo Diagnóstico", "Psicología de Atención al Paciente"],
  // Semestre 3
  ["Integrado Fisiología-Fisiopatología-Farmacología 1", "Salud Poblacional", "Infectología Básica", "Fundamentos de Física Médica", "Matemática Integrada a la Imagenología Médica"],
  // Semestre 4
  ["Integrado Fisiología-Fisiopatología-Farmacología 2", "Bioética", "Epidemiología", "Física Médica 1", "Anatomía Imagenológica", "Hito Evaluativo Integrado"],
  // Semestre 5
  ["Persona y Sociedad", "Informática Aplicada a Imagenología y Física Médica", "Bioestadística", "Física Médica 2", "Técnicas Radiológicas 1", "Anatomía Imagenológica Integrada"],
  // Semestre 6
  ["Gestión en Equipos para el Alto Desempeño", "Electivo 1: Formación Integral", "Radiobiología y Protección Radiológica", "Técnicas Radiológicas 2", "Gestión de Calidad en Imagenología y Física Médica", "Imagenología Patológica"],
  // Semestre 7
  ["Electivo 2: Formación Integral", "Metodología de la Investigación", "Medicina Nuclear", "Ultrasonido", "Tomografía Computada 1"],
  // Semestre 8
  ["Electivo 3: Formación Integral", "Tomografía Computada 2", "Salud Digital", "Radioterapia", "Resonancia Magnética", "Hito Evaluativo Integrativo Interprofesional"],
  // Semestre 9
  ["Gestión de Carrera y Desarrollo Profesional", "Análisis Clínico Integrado", "Taller de Investigación Aplicado en Tecnología Médica", "Electivo 1", "Electivo 2", "Sistemas de Acreditación de Imagenología y Física Médica"],
  // Semestre 10
  ["Internado"]
];

// Prerrequisitos: mapa de ramos con sus requisitos
const prerrequisitos = {
  "Física Médica 2": ["Física Médica 1"],
  "Técnicas Radiológicas 1": ["Física Médica 1", "Anatomía Imagenológica"],
  "Técnicas Radiológicas 2": ["Técnicas Radiológicas 1"],
  "Radiobiología y Protección Radiológica": ["Física Médica 2"],
  "Tomografía Computada 1": ["Técnicas Radiológicas 2"],
  "Tomografía Computada 2": ["Tomografía Computada 1"],
  "Radioterapia": ["Radiobiología y Protección Radiológica"],
  "Resonancia Magnética": ["Física Médica 2"]
};

const contenedor = document.getElementById("contenedor-malla");

function crearMalla() {
  contenedor.innerHTML = "";
  malla.forEach((ramos, index) => {
    const semestreDiv = document.createElement("div");
    semestreDiv.className = "semestre";
    const titulo = document.createElement("h2");
    titulo.textContent = `Semestre ${index + 1}`;
    semestreDiv.appendChild(titulo);

    ramos.forEach(ramo => {
      const boton = document.createElement("button");
      boton.textContent = ramo;
      boton.className = "ramo";

      const requisitos = prerrequisitos[ramo];
      if (requisitos && !requisitos.every(req => localStorage.getItem(req) === "true")) {
        boton.classList.add("bloqueado");
        boton.disabled = true;
      }

      if (localStorage.getItem(ramo) === "true") {
        boton.classList.add("completado");
      }

      boton.addEventListener("click", () => {
        if (!boton.classList.contains("bloqueado")) {
          boton.classList.toggle("completado");
          localStorage.setItem(ramo, boton.classList.contains("completado"));
          crearMalla();
          actualizarProgreso();
        }
      });

      semestreDiv.appendChild(boton);
    });

    contenedor.appendChild(semestreDiv);
  });
  actualizarProgreso();
}

function actualizarProgreso() {
  const total = document.querySelectorAll(".ramo").length;
  const completados = document.querySelectorAll(".ramo.completado").length;
  const porcentaje = ((completados / total) * 100).toFixed(0);
  document.getElementById("progreso-barra").style.width = `${porcentaje}%`;
  document.getElementById("progreso-texto").textContent = `${porcentaje}% completado`;
}

crearMalla();
