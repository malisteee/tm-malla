const malla = [
  // Semestre 1
  ["Química General y Orgánica", "Antropología", "Introducción a la Tecnología Médica", "Biología Celular", "Matemáticas Básica", "Integrado en Habilidades Científicas para la Tecnología Médica"],

  // Semestre 2
  ["Bioquímica General", "Morfología Básica", "Ética", "Tecnología Médica en el Equipo de Salud", "Bioseguridad y Procedimientos de Apoyo Diagnóstico", "Psicología de Atención al Paciente"],

  // Semestre 3
  ["Física General", "Anatomía Radiológica", "Fisiología Humana", "Procesamiento Digital de Imágenes", "Fundamentos de Administración en Salud", "Gestión en Salud"],

  // Semestre 4
  ["Imagenología General", "Fundamentos de Radioterapia", "Semiología", "Técnicas de Procesamiento Imagenológico", "Taller de Investigación I", "Formación Ciudadana"],

  // Semestre 5
  ["Imagenología Osteomuscular", "Imagenología de Tórax", "Imagenología de Abdomen", "Fundamentos de Resonancia Magnética", "Bioética", "Taller de Investigación II"],

  // Semestre 6
  ["Técnicas Especiales en Imagenología", "Imagenología en Urgencias", "Física Radiológica", "Resonancia Magnética Avanzada", "Radiobiología", "Taller de Investigación III"],

  // Semestre 7
  ["Práctica Profesional I", "Evaluación de Tecnología en Salud", "Gestión de Calidad", "Electivo Profesional I"],

  // Semestre 8
  ["Práctica Profesional II", "Formulación y Evaluación de Proyectos", "Electivo Profesional II"],

  // Semestre 9
  ["Internado Profesional I"],

  // Semestre 10
  ["Internado Profesional II"]
];

// Generar tarjetas
const contenedor = document.getElementById("contenedor-malla");

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
    boton.addEventListener("click", () => {
      boton.classList.toggle("completado");
      actualizarProgreso();
    });
    semestreDiv.appendChild(boton);
  });

  contenedor.appendChild(semestreDiv);
});

// Progreso
function actualizarProgreso() {
  const total = document.querySelectorAll(".ramo").length;
  const completados = document.querySelectorAll(".ramo.completado").length;
  const porcentaje = ((completados / total) * 100).toFixed(0);

  document.getElementById("progreso-barra").style.width = `${porcentaje}%`;
  document.getElementById("progreso-texto").textContent = `${porcentaje}% completado`;
}
