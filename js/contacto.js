


const contactForm =
    document.getElementById("contact-form");


const nombre =
    document.getElementById("nombre");


const correo =
    document.getElementById("correo");


const asunto =
    document.getElementById("asunto");


const mensaje =
    document.getElementById("mensaje");


const successMessage =
    document.getElementById("success-message");



// FUNCIÓN PARA MOSTRAR ERROR

function mostrarError(
    elemento,
    mensaje
) {

    const error =
        document.getElementById(
            `${elemento.id}-error`
        );


    error.textContent = mensaje;

    elemento.classList.add(
        "input-error"
    );

}



// LIMPIAR ERROR

function limpiarError(elemento) {

    const error =
        document.getElementById(
            `${elemento.id}-error`
        );


    error.textContent = "";

    elemento.classList.remove(
        "input-error"
    );

}



// VALIDAR CORREO


function validarCorreo(correo) {

    const expresion =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    return expresion.test(correo);

}



// VALIDAR FORMULARIO


function validarFormulario() {

    let formularioValido = true;


    limpiarError(nombre);
    limpiarError(correo);
    limpiarError(asunto);
    limpiarError(mensaje);


    successMessage.textContent = "";



    // NOMBRE

    if (nombre.value.trim() === "") {

        mostrarError(
            nombre,
            "El nombre es obligatorio."
        );

        formularioValido = false;

    }


    // CORREO


    if (correo.value.trim() === "") {

        mostrarError(
            correo,
            "El correo es obligatorio."
        );

        formularioValido = false;

    } else if (
        !validarCorreo(
            correo.value.trim()
        )
    ) {

        mostrarError(
            correo,
            "Ingresa un correo válido."
        );

        formularioValido = false;

    }



    // ASUNTO
   

    if (asunto.value.trim() === "") {

        mostrarError(
            asunto,
            "El asunto es obligatorio."
        );

        formularioValido = false;

    }


    // MENSAJE
   
    if (mensaje.value.trim() === "") {

        mostrarError(
            mensaje,
            "El mensaje es obligatorio."
        );

        formularioValido = false;

    }


    return formularioValido;

}


// ENVIAR FORMULARIO


contactForm.addEventListener(
    "submit",
    function(event) {

        event.preventDefault();


        const valido =
            validarFormulario();

        if (!valido) {

            return;

        }



        successMessage.textContent =
            "¡Mensaje enviado correctamente! Gracias por contactarnos.";

        contactForm.reset();

    }
);