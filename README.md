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
├── src/
│   ├── app/
│   │   ├── components/                # Componentes reutilizables e independientes
│   │   │   ├── contacto/              # Módulo de formulario de interacción
│   │   │   │   ├── contacto.component.css
│   │   │   │   ├── contacto.component.html
│   │   │   │   └── contacto.component.ts
│   │   │   ├── detalle/               # Módulo para lectura extendida de noticias
│   │   │   │   ├── detalle.component.css
│   │   │   │   ├── detalle.component.html
│   │   │   │   └── detalle.component.ts
│   │   │   ├── favoritos/             # Módulo de noticias guardadas
│   │   │   │   ├── favoritos.component.css
│   │   │   │   ├── favoritos.component.html
│   │   │   │   └── favoritos.component.ts
│   │   │   └── noticias/              # Módulo principal (Feed, catálogo y filtros)
│   │   │       ├── noticias.component.css
│   │   │       ├── noticias.component.html
│   │   │       └── noticias.component.ts
│   │   │
│   │   ├── administracion/            # Módulo de gestión interna (CRUD)
│   │   │   ├── administracion.component.css
│   │   │   ├── administracion.component.html
│   │   │   └── administracion.component.ts
│   │   │
│   │   ├── models/                    # Definición de interfaces y tipos de datos
│   │   │   └── noticia.model.ts
│   │   │
│   │   ├── services/                  # Lógica de negocio e inyección de datos
│   │   │   └── noticias.service.ts
│   │   │
│   │   ├── app.component.css          # Estilos globales de la estructura raíz
│   │   ├── app.component.html         # Navbar, router-outlet y layout principal
│   │   ├── app.component.ts           # Componente raíz
│   │   ├── app.config.ts              # Configuración de proveedores y enrutamiento
│   │   └── app.routes.ts              # Definición de rutas principales de la SPA
│   │
│   ├── assets/                        # Recursos estáticos
│   │   ├── images/                    # Imágenes locales del sistema
│   │   └── noticias.json              # Mapeo inicial de datos
│   │
│   ├── index.html                     # HTML principal de entrada
│   ├── main.ts                        # Punto de entrada para el arranque (Bootstrapping)
│   └── styles.css                     # Hojas de estilo globales y variables CSS
│
├── angular.json                       # Configuración del CLI de Angular y Build
├── package.json                       # Gestión de dependencias y scripts de ejecución
└── tsconfig.json                      # Configuración del compilador de TypeScript
