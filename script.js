const malla = [
  // Semestre 1
  [
    { nombre: "Química General y Orgánica" },
    { nombre: "Antropología" },
    { nombre: "Introducción a la Tecnología Médica" },
    { nombre: "Biología Celular" },
    { nombre: "Matemáticas Básica" },
    { nombre: "Integrado en Habilidades Científicas para la Tecnología Médica" }
  ],
  // Semestre 2
  [
    { nombre: "Bioquímica General", prereqs: ["Química General y Orgánica"] },
    { nombre: "Morfología Básica" },
    { nombre: "Ética", prereqs: ["Antropología"] },
    { nombre: "Tecnología Médica en el Equipo de Salud", prereqs: ["Introducción a la Tecnología Médica"] },
    { nombre: "Bioseguridad y Procedimientos de Apoyo Diagnóstico" },
    { nombre: "Psicología de Atención al Paciente" }
  ],
  // Semestre 3
  [
    { nombre: "Integrado Fisiología-Fisiopatología-Farmacología 1", prereqs: ["Bioquímica General"] },
    { nombre: "Salud Poblacional" },
    { nombre: "Infectología Básica", prereqs: ["Morfología Básica"] },
    { nombre: "Fundamentos de Física Médica", prereqs: ["Matemáticas Básica"] },
    { nombre: "Matemática Integrada a la Imagenología Médica", prereqs: ["Matemáticas Básica"] }
  ],
  // Semestre 4
  [
    { nombre: "Integrado Fisiología-Fisiopatología-Farmacología 2", prereqs: ["Integrado Fisiología-Fisiopatología-Farmacología 1"] },
    { nombre: "Bioética" },
    { nombre: "Epidemiología", prereqs: ["Salud Poblacional"] },
    { nombre: "Física Médica 1", prereqs: ["Fundamentos de Física Médica"] },
    { nombre: "Anatomía Imagenológica", prereqs: ["Morfología Básica"] },
    { nombre: "Hito Evaluativo Integrado", prereqs: ["Bioseguridad y Procedimientos de Apoyo Diagnóstico", "Psicología de Atención al Paciente", "Integrado Fisiología-Fisiopatología-Farmacología 1", "Infectología Básica", "Fundamentos de Física Médica", "Matemática Integrada a la Imagenología Médica"] }
  ],
  // Semestre 5
  [
    { nombre: "Persona y Sociedad", prereqs: ["Ética"] },
    { nombre: "Informática Aplicada a Imagenología y Física Médica", prereqs: ["Matemática Integrada a la Imagenología Médica"] },
    { nombre: "Bioestadística", prereqs: ["Matemáticas Básica"] },
    { nombre: "Física Médica 2", prereqs: ["Física Médica 1"] },
    { nombre: "Técnicas Radiológicas 1" },
    { nombre: "Anatomía Imagenológica Integrada", prereqs: ["Física Médica 1", "Anatomía Imagenológica"] }
  ],
  // Semestre 6
  [
    { nombre: "Gestión en Equipos para el Alto Desempeño" },
    { nombre: "Electivo 1: Formación Integral" },
    { nombre: "Radiobiología y Protección Radiológica", prereqs: ["Física Médica 2"] },
    { nombre: "Técnicas Radiológicas 2", prereqs: ["Física Médica 2", "Técnicas Radiológicas 1"] },
    { nombre: "Gestión de Calidad en Imagenología y Física Médica" },
    { nombre: "Imagenología Patológica", prereqs: ["Anatomía Imagenológica Integrada"] }
  ],
  // Semestre 7
  [
    { nombre: "Electivo 2: Formación Integral" },
    { nombre: "Metodología de la Investigación" },
    { nombre: "Medicina Nuclear", prereqs: ["Radiobiología y Protección Radiológica", "Técnicas Radiológicas 2"] },
    { nombre: "Ultrasonido", prereqs: ["Imagenología Patológica"] },
    { nombre: "Tomografía Computada 1", prereqs: ["Técnicas Radiológicas 2", "Imagenología Patológica"] }
  ],
  // Semestre 8
  [
    { nombre: "Electivo 3: Formación Integral" },
    { nombre: "Tomografía Computada 2", prereqs: ["Tomografía Computada 1"] },
    { nombre: "Salud Digital" },
    { nombre: "Radioterapia", prereqs: ["Tomografía Computada 1"] },
    { nombre: "Resonancia Magnética", prereqs: ["Imagenología Patológica"] },
    { nombre: "Hito Evaluativo Integrativo Interprofesional", prereqs: ["Técnicas Radiológicas 2", "Imagenología Patológica", "Medicina Nuclear", "Tomografía Computada 1", "Ultrasonido"] }
  ],
  // Semestre 9
  [
    { nombre: "Gestión de Carrera y Desarrollo Profesional" },
    { nombre: "Análisis Clínico Integrado", prereqs: ["Tomografía Computada 2", "Resonancia Magnética"] },
    { nombre: "Taller de Investigación Aplicado en Tecnología Médica en Imagenología y Física Médica", prereqs: ["Medicina Nuclear", "Tomografía Computada 2", "Radioterapia", "Resonancia Magnética"] },
    { nombre: "Electivo 1" },
    { nombre: "Electivo 2" },
    { nombre: "Sistemas de Acreditación de Imagenología y Física Médica" }
  ],
  // Semestre 10
  [
    { nombre: "Internado", prereqs: ["Medicina Nuclear", "Tomografía Computada 2", "Radioterapia", "Resonancia Magnética", "Taller de Investigación Aplicado en Tecnología Médica en Imagenología y Física Médica"] }
  ]
];

// Construcción de la malla
const contenedor = document.getElementById("contenedor-malla");

malla.forEach((ramos, index) => {
  const semestreDiv = document.createElement("div");
  semestreDiv.className = "semestre";
  const titulo = document.createElement("h2");
  titulo.textContent = `Semestre ${index + 1}`;
  semestreDiv.appendChild(titulo);

  ramos.forEach(ramo => {
    const boton = document.createElement("button");
    boton.textContent = ramo.nombre;
    boton.className = "ramo";
    boton.disabled = ramo.prereqs?.length > 0;
    if (boton.disabled) boton.classList.add("bloqueado");

    boton.addEventListener("click", () => {
      if (boton.disabled) return;

      boton.classList.toggle("completado");
      actualizarProgreso();
      actualizarBloqueos();
    });

    ramo.boton = boton;
    semestreDiv.appendChild(boton);
  });

  contenedor.appendChild(semestreDiv);
});

function actualizarProgreso() {
  const total = document.querySelectorAll(".ramo").length;
  const completados = document.querySelectorAll(".ramo.completado").length;
  const porcentaje = ((completados / total) * 100).toFixed(0);

  document.getElementById("progreso-barra").style.width = `${porcentaje}%`;
  document.getElementById("progreso-texto").textContent = `${porcentaje}% completado`;
}

function actualizarBloqueos() {
  malla.flat().forEach(ramo => {
    if (!ramo.prereqs || ramo.prereqs.length === 0) return;

    const completados = ramo.prereqs.every(nombre => {
      const prereq = malla.flat().find(r => r.nombre === nombre);
      return prereq?.boton.classList.contains("completado");
    });

    ramo.boton.disabled = !completados;
    if (completados) {
      ramo.boton.classList.remove("bloqueado");
    } else {
      ramo.boton.classList.add("bloqueado");
    }
  });
}
