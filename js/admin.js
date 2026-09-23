


// ELEMENTOS

const formContainer =
    document.getElementById(
        "admin-form-container"
    );


const newsForm =
    document.getElementById(
        "news-form"
    );


const newNewsButton =
    document.getElementById(
        "new-news-button"
    );


const cancelButton =
    document.getElementById(
        "cancel-button"
    );


const adminNewsList =
    document.getElementById(
        "admin-news-list"
    );


const newsCounter =
    document.getElementById(
        "news-counter"
    );


const formTitle =
    document.getElementById(
        "form-title"
    );


// CAMPOS


const newsId =
    document.getElementById(
        "news-id"
    );


const newsTitle =
    document.getElementById(
        "news-title"
    );


const newsCategory =
    document.getElementById(
        "news-category"
    );


const newsDate =
    document.getElementById(
        "news-date"
    );


const newsImage =
    document.getElementById(
        "news-image"
    );


    const imagePreview =
    document.getElementById(
        "image-preview"
    );

let imagenSeleccionada = "";


// SELECCIONAR IMAGEN


newsImage.addEventListener(
    "change",
    () => {

        const archivo =
            newsImage.files[0];


        if (!archivo) {

            imagenSeleccionada = "";

            imagePreview.innerHTML = "";

            return;

        }


        // Comprobar que sea una imagen

        if (!archivo.type.startsWith("image/")) {

            document.getElementById(
                "image-error"
            ).textContent =
                "Selecciona un archivo de imagen válido.";

            newsImage.value = "";

            return;

        }


        // Leer imagen

        const reader =
            new FileReader();


        reader.onload = function(event) {

            imagenSeleccionada =
                event.target.result;


            imagePreview.innerHTML = `

                <img
                    src="${imagenSeleccionada}"
                    alt="Vista previa"
                >

            `;

        };


        reader.readAsDataURL(archivo);

    }
);

const newsDescription =
    document.getElementById(
        "news-description"
    );


const newsContent =
    document.getElementById(
        "news-content"
    );



// VARIABLE PRINCIPAL


let noticias = [];



// CARGAR NOTICIAS


async function cargarNoticias() {

    try {

        // Primero revisamos si ya existen
        // noticias modificadas en localStorage.

        const noticiasGuardadas =
            localStorage.getItem(
                "noticiasAdmin"
            );


        if (noticiasGuardadas) {

            noticias =
                JSON.parse(
                    noticiasGuardadas
                );

        } else {

            // Si no existen modificaciones,
            // cargamos las noticias originales.

            const response =
                await fetch(
                    "../data/noticias.json"
                );


            noticias =
                await response.json();


            guardarNoticias();

        }


        mostrarNoticias();


    } catch (error) {

        console.error(
            "Error cargando noticias:",
            error
        );

    }

}



// GUARDAR EN LOCALSTORAGE


function guardarNoticias() {

    localStorage.setItem(
        "noticiasAdmin",
        JSON.stringify(noticias)
    );

}



// MOSTRAR NOTICIAS

function mostrarNoticias() {

    adminNewsList.innerHTML = "";


    newsCounter.textContent =
        `${noticias.length} ${
            noticias.length === 1
                ? "noticia"
                : "noticias"
        }`;


    // Si no hay noticias

    if (noticias.length === 0) {

        adminNewsList.innerHTML = `

            <div class="admin-empty">

                <h3>
                    No hay noticias registradas
                </h3>

                <p>
                    Crea una nueva noticia
                    para comenzar.
                </p>

            </div>

        `;

        return;

    }


    // Crear cada registro

    noticias.forEach(noticia => {

        const item =
            document.createElement(
                "article"
            );


        item.classList.add(
            "admin-news-item"
        );

        const imagenSrc =
        noticia.imagen.startsWith("data:")
            ? noticia.imagen
            : `../assets/images/${noticia.imagen}`;



        item.innerHTML = `

            <div class="admin-news-info">

            <img
                src="${imagenSrc}"
                alt="${noticia.titulo}"
                class="admin-news-image"
            >

                <div>

                    <span class="news-category">
                        ${noticia.categoria}
                    </span>


                    <h3>
                        ${noticia.titulo}
                    </h3>


                    <p>
                        ${noticia.fecha}
                    </p>

                </div>

            </div>


            <div class="admin-news-actions">

                <button
                    class="admin-edit-button"
                    onclick="editarNoticia(${noticia.id})">

                    Editar

                </button>


                <button
                    class="admin-delete-button"
                    onclick="eliminarNoticia(${noticia.id})">

                    Eliminar

                </button>

            </div>

        `;


        adminNewsList.appendChild(
            item
        );

    });

}


// ==========================================
// ABRIR FORMULARIO NUEVO
// ==========================================

newNewsButton.addEventListener(
    "click",
    () => {

        limpiarFormulario();

        formTitle.textContent =
            "Crear noticia";

        formContainer.classList.remove(
            "hidden"
        );

        newsTitle.focus();

    }
);


// ==========================================
// CANCELAR
// ==========================================

cancelButton.addEventListener(
    "click",
    () => {

        limpiarFormulario();

        formContainer.classList.add(
            "hidden"
        );

    }
);


// ==========================================
// LIMPIAR FORMULARIO
// ==========================================

function limpiarFormulario() {

    newsForm.reset();

    newsId.value = "";

       imagenSeleccionada = "";

    imagePreview.innerHTML = "";

    limpiarErrores();

}


// ==========================================
// LIMPIAR ERRORES
// ==========================================

function limpiarErrores() {

    document
        .querySelectorAll(".admin-error")
        .forEach(error => {

            error.textContent = "";

        });

}


// ==========================================
// VALIDAR FORMULARIO
// ==========================================

function validarFormulario() {

    let valido = true;

    limpiarErrores();


    if (
        newsTitle.value.trim() === ""
    ) {

        document.getElementById(
            "title-error"
        ).textContent =
            "El título es obligatorio.";

        valido = false;

    }


    if (
        newsCategory.value === ""
    ) {

        document.getElementById(
            "category-error"
        ).textContent =
            "Selecciona una categoría.";

        valido = false;

    }


    if (
        newsDate.value === ""
    ) {

        document.getElementById(
            "date-error"
        ).textContent =
            "La fecha es obligatoria.";

        valido = false;

    }


if (
    !imagenSeleccionada
) {

    document.getElementById(
        "image-error"
    ).textContent =
        "Debes seleccionar una imagen.";

    valido = false;

}


    if (
        newsDescription.value.trim() === ""
    ) {

        document.getElementById(
            "description-error"
        ).textContent =
            "La descripción es obligatoria.";

        valido = false;

    }


    if (
        newsContent.value.trim() === ""
    ) {

        document.getElementById(
            "content-error"
        ).textContent =
            "El contenido es obligatorio.";

        valido = false;

    }


    return valido;

}


// ==========================================
// GUARDAR / EDITAR
// ==========================================

newsForm.addEventListener(
    "submit",
    event => {

        event.preventDefault();


        if (!validarFormulario()) {

            return;

        }


        const id =
            newsId.value
                ? Number(newsId.value)
                : generarNuevoId();


        const noticia = {

            id: id,

            categoria:
                newsCategory.value,

            titulo:
                newsTitle.value.trim(),

            fecha:
                formatearFecha(
                    newsDate.value
                ),

            imagen:
                 imagenSeleccionada,

            descripcion:
                newsDescription.value.trim(),

            contenido:
                newsContent.value.trim()

        };


        // EDITAR

        const indice =
            noticias.findIndex(
                item =>
                    item.id === id
            );


        if (indice !== -1) {

            noticias[indice] =
                noticia;

        } else {

            // CREAR

            noticias.push(
                noticia
            );

        }


        // Guardar cambios

        guardarNoticias();


        // Actualizar pantalla

        mostrarNoticias();


        // Cerrar formulario

        limpiarFormulario();

        formContainer.classList.add(
            "hidden"
        );


        alert(
            "Noticia guardada correctamente."
        );

    }
);


// ==========================================
// GENERAR ID
// ==========================================

function generarNuevoId() {

    if (noticias.length === 0) {

        return 1;

    }


    return Math.max(
        ...noticias.map(
            noticia =>
                noticia.id
        )
    ) + 1;

}


// ==========================================
// FORMATEAR FECHA
// ==========================================

function formatearFecha(fecha) {

    const partes =
        fecha.split("-");


    return `${partes[2]} de ${
        obtenerMes(partes[1])
    } de ${partes[0]}`;

}


// ==========================================
// OBTENER MES
// ==========================================

function obtenerMes(numero) {

    const meses = {

        "01": "enero",
        "02": "febrero",
        "03": "marzo",
        "04": "abril",
        "05": "mayo",
        "06": "junio",
        "07": "julio",
        "08": "agosto",
        "09": "septiembre",
        "10": "octubre",
        "11": "noviembre",
        "12": "diciembre"

    };


    return meses[numero];

}


// ==========================================
// EDITAR NOTICIA
// ==========================================

function editarNoticia(id) {

    const noticia =
        noticias.find(
            item =>
                item.id === id
        );


    if (!noticia) {

        return;

    }


    formTitle.textContent =
        "Editar noticia";


    newsId.value =
        noticia.id;


    newsTitle.value =
        noticia.titulo;


    newsCategory.value =
        noticia.categoria;


   imagenSeleccionada =
    noticia.imagen;


imagePreview.innerHTML = `

    <img
        src="${noticia.imagen.startsWith("data:")
            ? noticia.imagen
            : "../assets/images/" + noticia.imagen}"
        alt="Imagen actual"
    >

`;


    newsDescription.value =
        noticia.descripcion;


    newsContent.value =
        noticia.contenido;


    // Convertir fecha de texto
    // a formato YYYY-MM-DD

    newsDate.value =
        convertirFechaInput(
            noticia.fecha
        );


    formContainer.classList.remove(
        "hidden"
    );


    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

}


// ==========================================
// CONVERTIR FECHA
// ==========================================

function convertirFechaInput(fecha) {

    const partes =
        fecha.split(" ");


    if (partes.length !== 4) {

        return "";

    }


    const dia =
        partes[0];


    const mes =
        obtenerNumeroMes(
            partes[2]
        );


    const año =
        partes[3];


    return `${año}-${mes}-${dia.padStart(2, "0")}`;

}


// ==========================================
// OBTENER NÚMERO DEL MES
// ==========================================

function obtenerNumeroMes(mes) {

    const meses = {

        enero: "01",
        febrero: "02",
        marzo: "03",
        abril: "04",
        mayo: "05",
        junio: "06",
        julio: "07",
        agosto: "08",
        septiembre: "09",
        octubre: "10",
        noviembre: "11",
        diciembre: "12"

    };


    return meses[mes] || "01";

}


// ==========================================
// ELIMINAR NOTICIA
// ==========================================

function eliminarNoticia(id) {

    const noticia =
        noticias.find(
            item =>
                item.id === id
        );


    if (!noticia) {

        return;

    }


    const confirmar =
        confirm(
            `¿Seguro que deseas eliminar la noticia "${noticia.titulo}"?`
        );


    if (!confirmar) {

        return;

    }


    noticias =
        noticias.filter(
            item =>
                item.id !== id
        );


    guardarNoticias();


    mostrarNoticias();


    alert(
        "Noticia eliminada correctamente."
    );

}


// ==========================================
// INICIAR
// ==========================================

cargarNoticias();