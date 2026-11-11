/* La Esquina · Cafetería de barrio — JavaScript mínimo, sin dependencias */

/* ---------- Datos de ejemplo de la carta ----------
   Para cambiar la carta basta con editar este array. */
const CARTA = [
  { nombre: "Café con leche", descripcion: "El de siempre, con leche entera o bebida vegetal.", precio: "1,60 €", categoria: "cafe" },
  { nombre: "Cortado", descripcion: "Espresso con un toque de leche, en vaso de cristal.", precio: "1,40 €", categoria: "cafe" },
  { nombre: "Capuchino", descripcion: "Espresso, leche vaporizada y espuma densa con cacao.", precio: "2,20 €", categoria: "cafe" },
  { nombre: "Tostada con tomate", descripcion: "Pan de masa madre, tomate rallado y AOVE.", precio: "2,80 €", categoria: "desayuno" },
  { nombre: "Tostada de aguacate", descripcion: "Aguacate, semillas y un toque de lima sobre masa madre.", precio: "3,90 €", categoria: "desayuno" },
  { nombre: "Mollete con jamón", descripcion: "Mollete antequerano con jamón serrano y tomate.", precio: "3,50 €", categoria: "desayuno" },
  { nombre: "Croissant casero", descripcion: "Hojaldre de mantequilla, horneado cada mañana.", precio: "1,90 €", categoria: "dulce" },
  { nombre: "Bizcocho de limón", descripcion: "Receta de la casa, con glaseado ligero.", precio: "2,40 €", categoria: "dulce" },
  { nombre: "Tarta de zanahoria", descripcion: "Con nueces y cobertura de queso crema.", precio: "3,20 €", categoria: "dulce" }
];

const NOMBRES_CATEGORIA = { cafe: "Cafés", desayuno: "Desayunos", dulce: "Dulces" };
const CLAVE_FAVORITOS = "la-esquina:favoritos";

/* ---------- Estado (localStorage) ---------- */

function leerFavoritos() {
  try {
    return JSON.parse(localStorage.getItem(CLAVE_FAVORITOS)) || [];
  } catch {
    return [];
  }
}

function guardarFavoritos(favoritos) {
  localStorage.setItem(CLAVE_FAVORITOS, JSON.stringify(favoritos));
}

/* ---------- Render de la carta ---------- */

let categoriaActual = "todos";

function pintarCarta() {
  const contenedor = document.getElementById("lista-carta");
  if (!contenedor) return;

  const favoritos = leerFavoritos();
  const productos = CARTA.filter(p => categoriaActual === "todos" || p.categoria === categoriaActual);

  if (productos.length === 0) {
    contenedor.innerHTML = "<p>No hay productos en esta categoría.</p>";
    return;
  }

  contenedor.innerHTML = productos.map(p => {
    const esFavorito = favoritos.includes(p.nombre);
    return `
      <article class="tarjeta">
        <div class="tarjeta-cabecera">
          <h3>${p.nombre}</h3>
          <button class="favorito ${esFavorito ? "activo" : ""}" type="button"
                  data-nombre="${p.nombre}"
                  aria-pressed="${esFavorito}"
                  aria-label="Marcar ${p.nombre} como favorito">${esFavorito ? "♥" : "♡"}</button>
        </div>
        <p>${p.descripcion}</p>
        <p class="tarjeta-precio">${p.precio}</p>
      </article>`;
  }).join("");
}

/* ---------- Interacciones ---------- */

function iniciarCarta() {
  pintarCarta();

  document.querySelectorAll(".filtro").forEach(boton => {
    boton.addEventListener("click", () => {
      document.querySelectorAll(".filtro").forEach(b => b.classList.remove("activo"));
      boton.classList.add("activo");
      categoriaActual = boton.dataset.categoria;
      pintarCarta();
    });
  });

  document.getElementById("lista-carta").addEventListener("click", evento => {
    const boton = evento.target.closest(".favorito");
    if (!boton) return;
    const nombre = boton.dataset.nombre;
    let favoritos = leerFavoritos();
    favoritos = favoritos.includes(nombre)
      ? favoritos.filter(n => n !== nombre)
      : [...favoritos, nombre];
    guardarFavoritos(favoritos);
    pintarCarta();
  });

  const botonReiniciar = document.getElementById("reiniciar-datos");
  if (botonReiniciar) {
    botonReiniciar.addEventListener("click", () => {
      localStorage.removeItem(CLAVE_FAVORITOS);
      pintarCarta();
    });
  }
}

/* ---------- Menú móvil ---------- */

function iniciarNavegacion() {
  const toggle = document.querySelector(".nav-toggle");
  const nav = document.getElementById("menu-principal");
  if (!toggle || !nav) return;

  toggle.addEventListener("click", () => {
    const abierto = nav.classList.toggle("abierto");
    toggle.setAttribute("aria-expanded", abierto);
  });

  nav.querySelectorAll("a").forEach(enlace => {
    enlace.addEventListener("click", () => {
      nav.classList.remove("abierto");
      toggle.setAttribute("aria-expanded", "false");
    });
  });
}

/* ---------- Formulario ----------
   En producción (Netlify) el formulario se envía de forma nativa con
   data-netlify="true". En local no hay servidor que lo procese, así que
   se simula el envío y se muestra un aviso. */

function esLocal() {
  return location.protocol === "file:"
    || location.hostname === "localhost"
    || location.hostname === "127.0.0.1";
}

function iniciarFormulario() {
  const formulario = document.querySelector("form.formulario");
  const aviso = document.getElementById("form-aviso");
  if (!formulario || !aviso || !esLocal()) return;

  formulario.addEventListener("submit", evento => {
    evento.preventDefault();
    if (!formulario.reportValidity()) return;
    formulario.reset();
    aviso.hidden = false;
    aviso.textContent = "Mensaje registrado (simulación local). En la web publicada, este formulario envía los datos de verdad a través de Netlify Forms.";
  });
}

/* ---------- Pie de página ---------- */

function iniciarPie() {
  const anio = document.getElementById("anio");
  if (anio) anio.textContent = new Date().getFullYear();
}

document.addEventListener("DOMContentLoaded", () => {
  iniciarCarta();
  iniciarNavegacion();
  iniciarFormulario();
  iniciarPie();
});
