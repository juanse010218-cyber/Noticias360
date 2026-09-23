

const parametros =
    new URLSearchParams(
        window.location.search
    );


const noticiaId =
    Number(
        parametros.get("id")
    );


// CONTENEDOR


const detailContainer =
    document.getElementById(
        "news-detail"
    );




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


// CARGAR NOTICIA


async function cargarDetalle() {

    try {

        let noticias = [];



        //LOCALSTORAGE


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


   
        // BUSCAR NOTICIA
        

        const noticia =
            noticias.find(
                item =>
                    item.id === noticiaId
            );


  
        // NOTICIA NO ENCONTRADA
      

        if (!noticia) {

            detailContainer.innerHTML = `

                <div class="no-results">

                    <h2>
                        Noticia no encontrada
                    </h2>

                    <p>
                        La noticia que buscas
                        no existe.
                    </p>

                    <a
                        href="noticias.html"
                        class="read-more"
                    >
                        ← Volver a noticias
                    </a>

                </div>

            `;

            return;

        }


    
        // MOSTRAR DETALLE
      

        mostrarDetalle(noticia);


    } catch (error) {

        console.error(
            "Error cargando el detalle:",
            error
        );

    }

}


// MOSTRAR DETALLE


function mostrarDetalle(noticia) {

    const imagen =
        obtenerRutaImagen(noticia);


    detailContainer.innerHTML = `

        <div class="detail-breadcrumb">

            <a href="../index.html">
                Inicio
            </a>

            /

            <a href="noticias.html">
                Noticias
            </a>

            /

            Detalle

        </div>


        <div class="detail-content">

            <div class="detail-image">

                <img
                    src="${imagen}"
                    alt="${noticia.titulo}"
                >

            </div>

            <div class="detail-information">

                <span class="news-category">
                    ${noticia.categoria}
                </span>


                <h1>
                    ${noticia.titulo}
                </h1>


                <p class="news-date">
                    ${noticia.fecha}
                </p>


                <p class="detail-description">
                    ${noticia.descripcion}
                </p>


                <p class="detail-text">
                    ${noticia.contenido}
                </p>


                <div class="detail-actions">


                    <!-- FAVORITO -->

                    <button
                        id="favorite-detail"
                        class="detail-button"
                    >
                        ♡ Guardar en favoritos
                    </button>


                    <!-- CONTACTO -->

                    <a
                        href="contacto.html"
                        class="detail-button secondary"
                    >
                        Contactar
                    </a>


                </div>

            </div>

        </div>

    `;


    configurarFavorito(
        noticia.id
    );

}


// FAVORITOS


function configurarFavorito(id) {

    const button =
        document.getElementById(
            "favorite-detail"
        );


    if (!button) {

        return;

    }


   
    // OBTENER FAVORITOS
 

    let favoritos =
        JSON.parse(
            localStorage.getItem(
                "favoritos"
            )
        ) || [];


    // COMPROBAR SI YA ES FAVORITO
  

    if (
        favoritos.includes(id)
    ) {

        button.innerHTML =
            "♥ En favoritos";

    }



    //BOTÓN
  

    button.addEventListener(
        "click",
        () => {


            favoritos =
                JSON.parse(
                    localStorage.getItem(
                        "favoritos"
                    )
                ) || [];


            // QUITAR FAVORITO

            if (
                favoritos.includes(id)
            ) {


                favoritos =
                    favoritos.filter(
                        favoritoId =>
                            favoritoId !== id
                    );


                button.innerHTML =
                    "♡ Guardar en favoritos";


            } else {


   
                // AGREGAR FAVORITO

                favoritos.push(id);


                button.innerHTML =
                    "♥ En favoritos";

            }


            // GUARDAR CAMBIOS
    
            localStorage.setItem(
                "favoritos",
                JSON.stringify(
                    favoritos
                )
            );

        }
    );

}


// ==========================================
// INICIAR
// ==========================================

cargarDetalle();