# 📰 Noticias 360

## 📌 Descripción

Noticias 360 es una aplicación web de noticias desarrollada como proyecto académico para el módulo de Desarrollo de Front-end.

La aplicación permite a los usuarios explorar noticias de diferentes categorías como Tecnología, Turismo, Educación y Negocios, consultar el detalle de cada noticia, realizar búsquedas, filtrar contenido, guardar noticias en favoritos y contactar con la plataforma.

El proyecto implementa HTML, CSS y JavaScript, utilizando un archivo JSON para la información inicial de las noticias y `localStorage` para gestionar funcionalidades como favoritos y la administración de noticias.

---

## 🎯 Objetivo

Desarrollar una aplicación Front-end funcional que permita presentar información de noticias de manera organizada, dinámica e intuitiva, aplicando conceptos de HTML, CSS y JavaScript.

---

## 🚀 Funcionalidades

### 🏠 Página de inicio

- Presentación de Noticias 360.
- Header con navegación.
- Sección principal de bienvenida.
- Noticias destacadas.
- Acceso al listado de noticias.
- Footer con información general.

### 📰 Listado de noticias

- Visualización de noticias mediante tarjetas.
- Búsqueda por título y descripción.
- Filtrado por categoría.
- Paginación.
- Acceso al detalle de cada noticia.
- Agregar noticias a favoritos.

### 📄 Detalle de noticia

Cada noticia cuenta con una vista detallada que incluye:

- Imagen.
- Categoría.
- Título.
- Fecha.
- Descripción.
- Contenido completo.
- Opción para guardar en favoritos.
- Acceso a la página de contacto.

### ❤️ Favoritos

Los usuarios pueden:

- Guardar noticias como favoritas.
- Consultar su lista de favoritos.
- Acceder al detalle de una noticia.
- Eliminar noticias de favoritos.

La información de favoritos se almacena mediante `localStorage`.

### 📞 Contacto

La aplicación cuenta con un formulario de contacto que incluye:

- Nombre.
- Correo electrónico.
- Asunto.
- Mensaje.
- Validaciones de campos obligatorios.
- Validación de correo electrónico.
- Mensaje de confirmación.

### ⚙️ Administración de noticias

Se implementó un mini CRUD para la gestión de noticias:

- Crear noticias.
- Visualizar noticias.
- Editar noticias.
- Eliminar noticias.
- Seleccionar imágenes desde el equipo.
- Vista previa de imágenes.

Las noticias administradas se almacenan mediante `localStorage`.

---

## 🛠️ Tecnologías utilizadas

- HTML5
- CSS3
- JavaScript
- JSON
- LocalStorage
- Git
- GitHub

---

## 📂 Estructura del proyecto

```text
Noticias360/
│
├── assets/
│   ├── icons/
│   └── images/
│
├── css/
│   └── styles.css
│
├── data/
│   └── noticias.json
│
├── js/
│   ├── admin.js
│   ├── contacto.js
│   ├── detalle.js
│   ├── favoritos.js
│   └── noticias.js
│
├── pages/
│   ├── admin.html
│   ├── contacto.html
│   ├── detalle.html
│   ├── favoritos.html
│   └── noticias.html
│
└── index.html
