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
    { nombre: "Morfología Básica", prereqs: ["Biología Celular"] },
    { nombre: "Ética" },
    { nombre: "Tecnología Médica en el Equipo de Salud", prereqs: ["Introducción a la Tecnología Médica"] },
    { nombre: "Bioseguridad y Procedimientos de Apoyo Diagnóstico" },
    { nombre: "Psicología de Atención al Paciente" }
  ],

  // Semestre 3 al 10 (sin prerrequisitos, puedes añadirlos si quieres)
  [
    { nombre: "Integrado Fisiología-Fisiopatología-Farmacología 1" },
    { nombre: "Salud Poblacional" },
    { nombre: "Infectología Básica" },
    { nombre: "Fundamentos de Física Médica" },
    { nombre: "Matemática Integrada a la Imagenología Médica" }
  ],
  [
    { nombre: "Integrado Fisiología-Fisiopatología-Farmacología 2" },
    { nombre: "Bioética" },
    { nombre: "Epidemiología" },
    { nombre: "Física Médica 1" },
    { nombre: "Anatomía Imagenológica" },
    { nombre: "Hito Evaluativo Integrado" }
  ],
  [
    { nombre: "Persona y Sociedad" },
    { nombre: "Informática Aplicada a Imagenología y Física Médica" },
    { nombre: "Bioestadística" },
    { nombre: "Física Médica 2" },
    { nombre: "Técnicas Radiológicas 1" },
    { nombre: "Anatomía Imagenológica Integrada" }
  ],
  [
    { nombre: "Gestión en Equipos para el Alto Desempeño" },
    { nombre: "Electivo 1: Formación Integral" },
    { nombre: "Radiobiología y Protección Radiológica" },
    { nombre: "Técnicas Radiológicas 2" },
    { nombre: "Gestión de Calidad en Imagenología y Física Médica" },
    { nombre: "Imagenología Patológica" }
  ],
  [
    { nombre: "Electivo 2: Formación Integral" },
    { nombre: "Metodología de la Investigación" },
    { nombre: "Medicina Nuclear" },
    { nombre: "Ultrasonido" },
    { nombre: "Tomografía Computada 1" }
  ],
  [
    { nombre: "Electivo 3: Formación Integral" },
    { nombre: "Tomografía Computada 2" },
    { nombre: "Salud Digital" },
    { nombre: "Radioterapia" },
    { nombre: "Resonancia Magnética" },
    { nombre: "Hito Evaluativo Integrativo Interprofesional" }
  ],
  [
    { nombre: "Gestión de Carrera y Desarrollo Profesional" },
    { nombre: "Análisis Clínico Integrado" },
    { nombre: "Taller de Investigación Aplicado en Tecnología Médica" },
    { nombre: "Electivo 1" },
    { nombre: "Electivo 2" },
    { nombre: "Sistemas de Acreditación de Imagenología y Física Médica" }
  ],
  [
    { nombre: "Internado" }
  ]
];

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
      actualizarBloqueos(); // revisa qué desbloquear
    });

    ramo.boton = boton; // guardamos referencia
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

    const prereqsCompletados = ramo.prereqs.every(nombre => {
      return malla.flat().find(r => r.nombre === nombre)?.boton.classList.contains("completado");
    });

    ramo.boton.disabled = !prereqsCompletados;
    if (prereqsCompletados) {
      ramo.boton.classList.remove("bloqueado");
    } else {
      ramo.boton.classList.add("bloqueado");
    }
  });
}
