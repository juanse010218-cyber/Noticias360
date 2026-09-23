

const featuredContainer =
    document.getElementById("featured-news");



const newsList =
    document.getElementById("news-list");

const searchInput =
    document.getElementById("search-input");

const categoryButtons =
    document.querySelectorAll(".category-button");


const pagination =
    document.querySelector(".pagination");



// VARIABLES GLOBALES

let todasLasNoticias = [];

let categoriaActual = "Todas";



// VARIABLES DE PAGINACIÓN


let paginaActual = 1;

const noticiasPorPagina = 6;



// OBTENER RUTA DE IMAGEN

function obtenerRutaImagen(noticia) {



    if (
        noticia.imagen &&
        noticia.imagen.startsWith("data:")
    ) {

        return noticia.imagen;

    }


    if (
        window.location.pathname.includes("/pages/")
    ) {

        return `../assets/images/${noticia.imagen}`;

    }


    return `assets/images/${noticia.imagen}`;

}


async function cargarNoticias() {

    try {

    
        // PRIMERO: REVISAR LOCALSTORAGE
      
        const noticiasGuardadas =
            localStorage.getItem(
                "noticiasAdmin"
            );


        if (noticiasGuardadas) {

            todasLasNoticias =
                JSON.parse(
                    noticiasGuardadas
                );

        } else {

          
            // SI NO EXISTE LOCALSTORAGE,
            // CARGAR JSON ORIGINAL
         

            const rutaJSON =
                window.location.pathname.includes("/pages/")
                    ? "../data/noticias.json"
                    : "data/noticias.json";


            const response =
                await fetch(
                    rutaJSON
                );


            todasLasNoticias =
                await response.json();

        }


        // HOME
   

        if (featuredContainer) {

            mostrarNoticias(
                todasLasNoticias.slice(
                    0,
                    3
                )
            );

        }


      
        // LISTADO DE NOTICIAS
        

        if (newsList) {

            paginaActual = 1;

            filtrarNoticias();

        }


    } catch (error) {

        console.error(
            "Error cargando las noticias:",
            error
        );

    }

}


// MOSTRAR NOTICIAS DESTACADAS - HOME


function mostrarNoticias(noticias) {

    if (!featuredContainer) {

        return;

    }


    featuredContainer.innerHTML = "";


    noticias.forEach(noticia => {

        const card =
            document.createElement(
                "article"
            );


        card.classList.add(
            "news-card"
        );


        const imagen =
            obtenerRutaImagen(
                noticia
            );


        card.innerHTML = `

            <img
                src="${imagen}"
                alt="${noticia.titulo}"
            >

            <div class="news-card-content">

                <span class="news-category">
                    ${noticia.categoria}
                </span>

                <h3>
                    ${noticia.titulo}
                </h3>

                <p class="news-date">
                    ${noticia.fecha}
                </p>

                <button
                    class="favorite-button"
                    onclick="agregarFavorito(${noticia.id})"
                    aria-label="Agregar a favoritos"
                >
                    ♡
                </button>

            </div>

        `;


        featuredContainer.appendChild(
            card
        );

    });

}


// MOSTRAR LISTADO DE NOTICIAS

function mostrarListado(noticias) {

    if (!newsList) {

        return;

    }


    newsList.innerHTML = "";


    // SIN RESULTADOS
  
    if (noticias.length === 0) {

        newsList.innerHTML = `

            <div class="no-results">

                <h3>
                    No se encontraron noticias
                </h3>

                <p>
                    Intenta realizar otra búsqueda
                    o seleccionar otra categoría.
                </p>

            </div>

        `;


        actualizarPaginacion(
            0
        );


        return;

    }


    // CALCULAR TOTAL DE PÁGINAS
    

    const totalPaginas =
        Math.ceil(
            noticias.length /
            noticiasPorPagina
        );


    // SEGURIDAD
   

    if (
        paginaActual >
        totalPaginas
    ) {

        paginaActual =
            totalPaginas;

    }


    if (
        paginaActual < 1
    ) {

        paginaActual = 1;

    }



    // CALCULAR RANGO
   
    const inicio =
        (
            paginaActual - 1
        ) *
        noticiasPorPagina;


    const fin =
        inicio +
        noticiasPorPagina;


    // OBTENER NOTICIAS DE LA PÁGINA
  

    const noticiasPagina =
        noticias.slice(
            inicio,
            fin
        );


    // CREAR TARJETAS
   

    noticiasPagina.forEach(
        noticia => {

            const card =
                document.createElement(
                    "article"
                );


            card.classList.add(
                "news-card"
            );


            const imagen =
                obtenerRutaImagen(
                    noticia
                );


            card.innerHTML = `

                <img
                    src="${imagen}"
                    alt="${noticia.titulo}"
                >

                <div class="news-card-content">

                    <span class="news-category">
                        ${noticia.categoria}
                    </span>

                    <h3>
                        ${noticia.titulo}
                    </h3>

                    <p class="news-date">
                        ${noticia.fecha}
                    </p>

                    <div class="news-card-actions">

                        <a
                            href="detalle.html?id=${noticia.id}"
                            class="read-more"
                        >
                            Ver más →
                        </a>

                        <button
                            class="favorite-button"
                            onclick="agregarFavorito(${noticia.id})"
                            aria-label="Agregar a favoritos"
                        >
                            ♡
                        </button>

                    </div>

                </div>

            `;


            newsList.appendChild(
                card
            );

        });



    // ACTUALIZAR PAGINACIÓN

    actualizarPaginacion(
        totalPaginas
    );

}


// BUSCAR Y FILTRAR NOTICIAS

function filtrarNoticias() {

    if (!newsList) {

        return;

    }


    // OBTENER TEXTO DE BÚSQUEDA

    const texto =
        searchInput
            ? searchInput.value
                .toLowerCase()
                .trim()
            : "";



    const resultado =
        todasLasNoticias.filter(
            noticia => {

                const titulo =
                    noticia.titulo
                        ? noticia.titulo
                            .toLowerCase()
                        : "";


                const descripcion =
                    noticia.descripcion
                        ? noticia.descripcion
                            .toLowerCase()
                        : "";


                const coincideTitulo =
                    titulo.includes(
                        texto
                    );


                const coincideDescripcion =
                    descripcion.includes(
                        texto
                    );


                const coincideCategoria =
                    categoriaActual === "Todas" ||
                    noticia.categoria ===
                        categoriaActual;


                return (
                    (
                        coincideTitulo ||
                        coincideDescripcion
                    )
                    &&
                    coincideCategoria
                );

            }
        );




    paginaActual = 1;


    // MOSTRAR RESULTADOS
   

    mostrarListado(
        resultado
    );

}



// ACTUALIZAR PAGINACIÓN


function actualizarPaginacion(
    totalPaginas
) {

    if (!pagination) {

        return;

    }



    // LIMPIAR PAGINACIÓN


    pagination.innerHTML = "";


    // SI NO HAY PÁGINAS
   
    if (
        totalPaginas <= 0
    ) {

        return;

    }

    // BOTÓN ANTERIOR
  

    const previousButton =
        document.createElement(
            "button"
        );


    previousButton.id =
        "previous-page";


    previousButton.textContent =
        "←";


    previousButton.disabled =
        paginaActual === 1;


    previousButton.addEventListener(
        "click",
        () => {

            if (
                paginaActual > 1
            ) {

                paginaActual--;

                filtrarNoticias();

            }

        }
    );


    pagination.appendChild(
        previousButton
    );


    // NÚMEROS DE PÁGINA
  
    for (
        let pagina = 1;
        pagina <= totalPaginas;
        pagina++
    ) {

        const pageButton =
            document.createElement(
                "button"
            );


        pageButton.classList.add(
            "page-number"
        );


        pageButton.textContent =
            pagina;


        if (
            pagina === paginaActual
        ) {

            pageButton.classList.add(
                "active"
            );

        }


        pageButton.addEventListener(
            "click",
            () => {

                paginaActual =
                    pagina;

                mostrarPaginaActual();

            }
        );


        pagination.appendChild(
            pageButton
        );

    }



    // BOTÓN SIGUIENTE
   

    const nextButton =
        document.createElement(
            "button"
        );


    nextButton.id =
        "next-page";


    nextButton.textContent =
        "→";


    nextButton.disabled =
        paginaActual === totalPaginas;


    nextButton.addEventListener(
        "click",
        () => {

            if (
                paginaActual <
                totalPaginas
            ) {

                paginaActual++;

                mostrarPaginaActual();

            }

        }
    );


    pagination.appendChild(
        nextButton
    );

}


// MOSTRAR PÁGINA ACTUAL


function mostrarPaginaActual() {

    if (!newsList) {

        return;

    }


    const texto =
        searchInput
            ? searchInput.value
                .toLowerCase()
                .trim()
            : "";


    const resultado =
        todasLasNoticias.filter(
            noticia => {

                const titulo =
                    noticia.titulo
                        ? noticia.titulo
                            .toLowerCase()
                        : "";


                const descripcion =
                    noticia.descripcion
                        ? noticia.descripcion
                            .toLowerCase()
                        : "";


                const coincideTitulo =
                    titulo.includes(
                        texto
                    );


                const coincideDescripcion =
                    descripcion.includes(
                        texto
                    );


                const coincideCategoria =
                    categoriaActual === "Todas" ||
                    noticia.categoria ===
                        categoriaActual;


                return (
                    (
                        coincideTitulo ||
                        coincideDescripcion
                    )
                    &&
                    coincideCategoria
                );

            }
        );


    mostrarListado(
        resultado
    );

}



// FILTRO POR CATEGORÍA

categoryButtons.forEach(
    button => {

        button.addEventListener(
            "click",
            () => {

          

                categoryButtons.forEach(
                    btn => {

                        btn.classList.remove(
                            "active"
                        );

                    }
                );



                button.classList.add(
                    "active"
                );



                categoriaActual =
                    button.dataset.category ||
                    button.textContent.trim();

                paginaActual = 1;
               

                filtrarNoticias();

            }
        );

    }
);


// BUSCADOR


if (searchInput) {

    searchInput.addEventListener(
        "input",
        () => {

            paginaActual = 1;

            filtrarNoticias();

        }
    );

}

// BOTÓN DE BÚSQUEDA

const searchButton =
    document.getElementById(
        "search-button"
    );


if (searchButton) {

    searchButton.addEventListener(
        "click",
        () => {

            paginaActual = 1;

            filtrarNoticias();

        }
    );

}

// AGREGAR NOTICIA A FAVORITOS

function agregarFavorito(id) {

    let favoritos =
        JSON.parse(
            localStorage.getItem(
                "favoritos"
            )
        ) || [];

    // COMPROBAR SI YA EXISTE


    if (
        !favoritos.includes(id)
    ) {

        favoritos.push(
            id
        );


        localStorage.setItem(
            "favoritos",
            JSON.stringify(
                favoritos
            )
        );


        alert(
            "Noticia agregada a favoritos."
        );

    } else {

        alert(
            "Esta noticia ya está en favoritos."
        );

    }

}

// INICIAR APLICACIÓN


cargarNoticias();