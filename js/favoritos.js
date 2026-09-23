
// CONTENEDOR
const favoritesList =
    document.getElementById(
        "favorites-list"
    );



// OBTENER RUTA DE IMAGEN


function obtenerRutaImagen(noticia) {

    // Imagen subida desde Administración

    if (
        noticia.imagen &&
        noticia.imagen.startsWith("data:")
    ) {

        return noticia.imagen;

    }

    return `../assets/images/${noticia.imagen}`;

}



// CARGAR FAVORITOS

async function cargarFavoritos() {

    try {

        let noticias = [];


    
        // LOCALSTORAGE
    

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

        
            // SI NO EXISTE, CARGAR JSON
           

            const response =
                await fetch(
                    "../data/noticias.json"
                );


            noticias =
                await response.json();

        }


  
        // OBTENER FAVORITOS
      

        const favoritos =
            JSON.parse(
                localStorage.getItem(
                    "favoritos"
                )
            ) || [];


     
        const noticiasFavoritas =
            noticias.filter(
                noticia =>
                    favoritos.includes(
                        noticia.id
                    )
            );


        mostrarFavoritos(
            noticiasFavoritas
        );


    } catch (error) {

        console.error(
            "Error cargando favoritos:",
            error
        );

    }

}

// MOSTRAR FAVORITOS

function mostrarFavoritos(noticias) {

    favoritesList.innerHTML = "";


 
    // SIN FAVORITOS
  

    if (noticias.length === 0) {

        favoritesList.innerHTML = `

            <div class="no-favorites">

                <h2>
                    No tienes noticias favoritas
                </h2>

                <p>
                    Guarda las noticias que te
                    interesen y aparecerán aquí.
                </p>

                <a
                    href="noticias.html"
                    class="favorites-button"
                >
                    Explorar noticias
                </a>

            </div>

        `;

        return;

    }



    // MOSTRAR NOTICIAS
   

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


                <div class="news-card-actions">

                    <a
                        href="detalle.html?id=${noticia.id}"
                        class="read-more"
                    >
                        Ver más →
                    </a>


                    <button
                        class="favorite-button"
                        onclick="eliminarFavorito(${noticia.id})"
                    >
                        ♥
                    </button>

                </div>

            </div>

        `;


        favoritesList.appendChild(
            card
        );

    });

}


// ELIMINAR FAVORITO


function eliminarFavorito(id) {

    let favoritos =
        JSON.parse(
            localStorage.getItem(
                "favoritos"
            )
        ) || [];


    favoritos =
        favoritos.filter(
            favoritoId =>
                favoritoId !== id
        );


    localStorage.setItem(
        "favoritos",
        JSON.stringify(
            favoritos
        )
    );


    cargarFavoritos();

}




cargarFavoritos();