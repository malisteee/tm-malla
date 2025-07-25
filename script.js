const malla = [
  ["Química General y Orgánica", "Antropología", "Introducción a la Tecnología Médica", "Biología Celular", "Matemáticas Básica", "Integrado en Habilidades Científicas para la Tecnología Médica"],
  ["Bioquímica General", "Morfología Básica", "Ética", "Tecnología Médica en el Equipo de Salud", "Bioseguridad y Procedimientos de Apoyo Diagnóstico", "Psicología de Atención al Paciente"],
  ["Integrado Fisiología-Fisiopatología-Farmacología 1", "Salud Poblacional", "Infectología Básica", "Fundamentos de Física Médica", "Matemática Integrada a la Imagenología Médica"],
  ["Integrado Fisiología-Fisiopatología-Farmacología 2", "Bioética", "Epidemiología", "Física Médica 1", "Anatomía Imagenológica", "Hito Evaluativo Integrado"],
  ["Persona y Sociedad", "Informática Aplicada a Imagenología y Física Médica", "Bioestadística", "Física Médica 2", "Técnicas Radiológicas 1", "Anatomía Imagenológica Integrada"],
  ["Gestión en Equipos para el Alto Desempeño", "Electivo 1: Formación Integral", "Radiobiología y Protección Radiológica", "Técnicas Radiológicas 2", "Gestión de Calidad en Imagenología y Física Médica", "Imagenología Patológica"],
  ["Electivo 2: Formación Integral", "Metodología de la Investigación", "Medicina Nuclear", "Ultrasonido", "Tomografía Computada 1"],
  ["Electivo 3: Formación Integral", "Tomografía Computada 2", "Salud Digital", "Radioterapia", "Resonancia Magnética", "Hito Evaluativo Integrativo Interprofesional"],
  ["Gestión de Carrera y Desarrollo Profesional", "Análisis Clínico Integrado", "Taller de Investigación Aplicado en Tecnología Médica", "Electivo 1", "Electivo 2", "Sistemas de Acreditación de Imagenología y Física Médica"],
  ["Internado"]
];

const prerrequisitos = {
  "Bioquímica General": ["Química General y Orgánica"],
  "Ética": ["Antropología"],
  "Tecnología Médica en el Equipo de Salud": ["Introducción a la Tecnología Médica"],
  "Integrado Fisiología-Fisiopatología-Farmacología 1": ["Bioquímica General"],
  "Infectología Básica": ["Morfología Básica"],
  "Fundamentos de Física Médica": ["Matemáticas Básica"],
  "Matemática Integrada a la Imagenología Médica": ["Matemáticas Básica"],
  "Integrado Fisiología-Fisiopatología-Farmacología 2": ["Integrado Fisiología-Fisiopatología-Farmacología 1"],
  "Epidemiología": ["Salud Poblacional"],
  "Física Médica 1": ["Fundamentos de Física Médica"],
  "Anatomía Imagenológica": ["Morfología Básica"],
  "Hito Evaluativo Integrado": ["Bioseguridad y Procedimientos de Apoyo Diagnóstico", "Psicología de Atención al Paciente", "Integrado Fisiología-Fisiopatología-Farmacología 1"],
  "Persona y Sociedad": ["Ética"],
  "Informática Aplicada a Imagenología y Física Médica": ["Matemática Integrada a la Imagenología Médica"],
  "Bioestadística": ["Matemáticas Básica"],
  "Física Médica 2": ["Física Médica 1"],
  "Anatomía Imagenológica Integrada": ["Física Médica 1", "Anatomía Imagenológica"],
  "Radiobiología y Protección Radiológica": ["Física Médica 2"],
  "Técnicas Radiológicas 2": ["Física Médica 2", "Técnicas Radiológicas 1"],
  "Imagenología Patológica": ["Anatomía Imagenológica Integrada"],
  "Medicina Nuclear": ["Radiobiología y Protección Radiológica", "Técnicas Radiológicas 2"],
  "Ultrasonido": ["Imagenología Patológica"],
  "Tomografía Computada 1": ["Técnicas Radiológicas 2", "Imagenología Patológica"],
  "Tomografía Computada 2": ["Tomografía Computada 1"],
  "Radioterapia": ["Tomografía Computada 1"],
  "Resonancia Magnética": ["Imagenología Patológica"],
  "Hito Evaluativo Integrativo Interprofesional": ["Radiobiología y Protección Radiológica", "Imagenología Patológica"],
  "Análisis Clínico Integrado": ["Tomografía Computada 2", "Resonancia Magnética"],
  "Taller de Investigación Aplicado en Tecnología Médica": ["Medicina Nuclear", "Ultrasonido"],
  "Internado": ["Hito Evaluativo Integrativo Interprofesional", "Taller de Investigación Aplicado en Tecnología Médica"]
};

const contenedor = document.getElementById("contenedor-malla");

let estado = JSON.parse(localStorage.getItem("estado-ramos")) || {};

function guardarEstado() {
  localStorage.setItem("estado-ramos", JSON.stringify(estado));
}

function estaAprobado(ramo) {
  return estado[ramo];
}

function tienePrerrequisitos(ramo) {
  const pre = prerrequisitos[ramo];
  return pre ? pre.every(p => estaAprobado(p)) : true;
}

function actualizarProgreso() {
  const total = document.querySelectorAll(".ramo").length;
  const completados = document.querySelectorAll(".ramo.completado").length;
  const porcentaje = ((completados / total) * 100).toFixed(0);
  document.getElementById("progreso-barra").style.width = `${porcentaje}%`;
  document.getElementById("progreso-texto").textContent = `${porcentaje}% completado`;
}

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

    const bloqueado = !tienePrerrequisitos(ramo);
    if (bloqueado) boton.classList.add("bloqueado");

    if (estado[ramo]) {
      boton.classList.add("completado");
    }

    boton.addEventListener("click", () => {
      if (boton.classList.contains("bloqueado")) return;

      boton.classList.toggle("completado");
      estado[ramo] = boton.classList.contains("completado");
      guardarEstado();

      actualizarRamos(); // para reactivar los que dependan de este
      actualizarProgreso();
    });

    semestreDiv.appendChild(boton);
  });

  contenedor.appendChild(semestreDiv);
});

function actualizarRamos() {
  document.querySelectorAll(".ramo").forEach(boton => {
    const nombre = boton.textContent;
    const bloqueado = prerrequisitos[nombre] && !tienePrerrequisitos(nombre);

    if (bloqueado) {
      boton.classList.add("bloqueado");
      boton.classList.remove("completado");
    } else {
      boton.classList.remove("bloqueado");
      if (estado[nombre]) boton.classList.add("completado");
    }
  });
}

actualizarRamos();
actualizarProgreso();
