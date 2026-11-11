# La Esquina · Landing de cafetería de barrio

Landing page de una cafetería de barrio ficticia, hecha a medida con HTML semántico, CSS y JavaScript, sin frameworks, sin dependencias y sin proceso de build. Diseño mobile-first y responsive.

Proyecto de práctica: el negocio, los datos de contacto y los productos son inventados.

## Cómo arrancar el proyecto en local

No hace falta instalar nada. Dos opciones:

**Opción 1 — abrir el archivo directamente**

Abre `index.html` en el navegador con doble clic.

**Opción 2 — servidor local (recomendada)**

Con Python instalado, desde la carpeta del proyecto:

```bash
python3 -m http.server 8000
```

y abre <http://localhost:8000>.

También vale `npx serve` si prefieres Node.

## Estructura del proyecto

```
├── index.html     → página principal (estructura semántica: header, main, sections, footer)
├── gracias.html   → página de confirmación tras enviar el formulario en producción
├── styles.css     → estilos mobile-first (móvil primero, breakpoints en 640px y 960px)
├── script.js      → carta dinámica, favoritos con localStorage, menú móvil y formulario
└── favicon.svg    → icono de la pestaña
```

## Qué está simulado

- **El negocio**: "La Esquina" es una cafetería inventada; dirección, teléfono, email y precios son ficticios.
- **La carta**: los productos son datos de ejemplo definidos en el array `CARTA` de `script.js`. Editar ese array cambia la carta.
- **El formulario de contacto**:
  - **En local** el envío está simulado: JavaScript intercepta el envío, limpia el formulario y muestra un aviso. No sale ningún dato del navegador.
  - **En producción (Netlify)** el mismo formulario funciona de verdad mediante Netlify Forms, gracias a los atributos `data-netlify="true"`, el campo oculto `form-name` y el honeypot `bot-field` (antispam). Los mensajes llegan al panel de Netlify sin configurar ningún servidor.

## Cómo reiniciar los datos de ejemplo

Los únicos datos que se guardan son los **favoritos** marcados con ♥ en la carta, que viven en el `localStorage` del navegador (clave `la-esquina:favoritos`). Nada se envía a ningún servidor.

Para reiniciarlos:

- Pulsa el botón **"Reiniciar datos de ejemplo"** al final de la sección de la carta, o
- borra el `localStorage` del sitio desde las herramientas de desarrollo del navegador (Aplicación → Almacenamiento local → borrar).

## Publicación en Netlify (gratis)

1. Sube esta carpeta a un repositorio de GitHub.
2. En [netlify.com](https://www.netlify.com), crea cuenta (gratis) y elige **"Add new site" → "Import an existing project"**.
3. Conecta GitHub y selecciona el repositorio.
4. No hay build: deja vacíos los campos de comando y como directorio de publicación la raíz (`/`).
5. Netlify asigna una URL pública con HTTPS (p. ej. `la-esquina.netlify.app`). Cada push a GitHub republica la web automáticamente.

## Criterios cubiertos

- ✅ Se ve bien en móvil (diseño mobile-first, probado a 390px) y en escritorio.
- ✅ Formulario de contacto funcional con Netlify Forms (nombre, email, teléfono opcional, mensaje y consentimiento).
- ✅ URL pública de previsualización al desplegar en Netlify.
