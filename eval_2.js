function limpiarFormulario() {
    document.getElementById('registroForm').reset();

    var camposIds = ['nombre', 'rut', 'fecha', 'cv', 'email', 'genero', 'password', 're_password'];

    for (var i = 0; i < camposIds.length; i++) {
        var input = document.getElementById(camposIds[i]);
        input.classList.remove('is-invalid');
        input.classList.remove('is-valid');
    }
}

function esRutValido(rut) {
    var valor = rut.replace(/\./g, '').trim();
    if (valor.length < 8) return false;

    var tmp = valor.split('-');
    if (tmp.length !== 2) return false;

    var digv = tmp[1].toLowerCase();
    var rutNum = parseInt(tmp[0]);

    var m = 0, s = 1;
    for (; rutNum; rutNum = Math.floor(rutNum / 10)) {
        s = (s + rutNum % 10 * (9 - m++ % 6)) % 11;
    }
    var dvEsperado = s ? s - 1 : 'k';
    return dvEsperado == digv;
}

function validarFormulario(evento) {
    evento.preventDefault();
    var esValido = true;

    var listaIds = ['nombre', 'rut', 'fecha', 'cv', 'email', 'genero', 'password', 're_password'];
    for (var i = 0; i < listaIds.length; i++) {
        document.getElementById(listaIds[i]).classList.remove('is-invalid');
        document.getElementById(listaIds[i]).classList.remove('is-valid');
    }

    var formDatos = {
        nombre: document.getElementById('nombre'),
        rut: document.getElementById('rut'),
        fecha: document.getElementById('fecha'),
        cv: document.getElementById('cv'),
        email: document.getElementById('email'),
        genero: document.getElementById('genero'),
        password: document.getElementById('password'),
        re_password: document.getElementById('re_password')
    };

    if (formDatos.nombre.value.trim() === '') {
        formDatos.nombre.classList.add('is-invalid');
        formDatos.nombre.nextElementSibling.innerText = 'El nombre completo es requerido.';
        esValido = false;
    } else {
        formDatos.nombre.classList.add('is-valid');
    }

    if (formDatos.rut.value.trim() === '' || esRutValido(formDatos.rut.value) === false) {
        formDatos.rut.classList.add('is-invalid');
        formDatos.rut.nextElementSibling.innerText = 'RUT requerido y válido (Ej: 12345678-9).';
        esValido = false;
    } else {
        formDatos.rut.classList.add('is-valid');
    }

    if (formDatos.fecha.value.trim() !== '') {
        var regexFecha = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/;
        if (regexFecha.test(formDatos.fecha.value) === false) {
            formDatos.fecha.classList.add('is-invalid');
            formDatos.fecha.nextElementSibling.innerText = 'El formato debe ser dd/MM/yyyy.';
            esValido = false;
        } else {
            formDatos.fecha.classList.add('is-valid');
        }
    } else {
        formDatos.fecha.classList.add('is-valid');
    }

    if (formDatos.cv.value.trim() !== '') {
        var archivo = formDatos.cv.files[0].name.toLowerCase();
        if (archivo.endsWith('.pdf') === false && archivo.endsWith('.docx') === false) {
            formDatos.cv.classList.add('is-invalid');
            formDatos.cv.nextElementSibling.innerText = 'Solo archivos .pdf o .docx';
            esValido = false;
        } else {
            formDatos.cv.classList.add('is-valid');
        }
    } else {
        formDatos.cv.classList.add('is-valid');
    }

    if (formDatos.email.value.trim() === '') {
        formDatos.email.classList.add('is-invalid');
        formDatos.email.nextElementSibling.innerText = 'Email requerido. Formato: usuario@servidor.algo.';
        esValido = false;
    } else {
        var regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (regexEmail.test(formDatos.email.value) === false) {
            formDatos.email.classList.add('is-invalid');
            formDatos.email.nextElementSibling.innerText = 'Email requerido. Formato: usuario@servidor.algo.';
            esValido = false;
        } else {
            formDatos.email.classList.add('is-valid');
        }
    }

    formDatos.genero.classList.add('is-valid');

    if (formDatos.password.value.trim() === '') {
        formDatos.password.classList.add('is-invalid');
        formDatos.password.nextElementSibling.innerText = 'La contraseña es obligatoria.';
        esValido = false;
    } else {
        var regexPass = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,12}$/;
        if (regexPass.test(formDatos.password.value) === false) {
            formDatos.password.classList.add('is-invalid');
            formDatos.password.nextElementSibling.innerText = 'Req: 8-12 caract., 1 mayúscula, 1 minúscula, 1 número y 1 especial.';
            esValido = false;
        } else {
            formDatos.password.classList.add('is-valid');
        }
    }

    if (formDatos.re_password.value.trim() === '' || formDatos.re_password.value !== formDatos.password.value) {
        formDatos.re_password.classList.add('is-invalid');
        formDatos.re_password.nextElementSibling.innerText = 'Las contraseñas no coinciden.';
        esValido = false;
    } else {
        formDatos.re_password.classList.add('is-valid');
    }

    if (esValido === true) {
        alert("¡Validación exitosa! Envío de datos correcto.");
    }
}