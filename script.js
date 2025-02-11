document.addEventListener('DOMContentLoaded', function() {
    // Inicializar AOS
    AOS.init({
        duration: 1000,
        once: true
    });

    // Menú móvil
    const menuMovil = document.querySelector('.menu-movil');
    const menu = document.querySelector('.menu');

    menuMovil.addEventListener('click', function() {
        menu.classList.toggle('activo');
        menuMovil.classList.toggle('activo');
    });

    // Cerrar menú al hacer clic en un enlace
    const menuLinks = document.querySelectorAll('.menu a');
    menuLinks.forEach(link => {
        link.addEventListener('click', () => {
            menu.classList.remove('activo');
            menuMovil.classList.remove('activo');
        });
    });

    // Cambiar estilo del encabezado al hacer scroll
    const header = document.querySelector('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Animación de fade-in al hacer scroll
    const fadeElements = document.querySelectorAll('.fade-in');
    const fadeIn = () => {
        fadeElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            if (elementTop < windowHeight - 100) {
                element.classList.add('visible');
            }
        });
    };

    window.addEventListener('scroll', fadeIn);
    fadeIn(); // Llamar una vez al cargar la página

    // Smooth scroll para enlaces internos
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Formulario de contacto (si existe en la página)
    const formularioContacto = document.getElementById('formulario-contacto');
    if (formularioContacto) {
        formularioContacto.addEventListener('submit', function(e) {
            e.preventDefault();
            // Aquí puedes agregar la lógica para enviar el formulario
            alert('Gracias por tu mensaje. Nos pondremos en contacto contigo pronto.');
            formularioContacto.reset();
        });
    }

    // Efecto parallax para la sección hero
    const hero = document.querySelector('.hero');
    window.addEventListener('scroll', () => {
        const scrollPosition = window.pageYOffset;
        hero.style.backgroundPositionY = `${scrollPosition * 0.5}px`;
    });

    // Animación de números (si existen en la página)
    const numeros = document.querySelectorAll('.numero-animado');
    const animarNumeros = () => {
        numeros.forEach(numero => {
            const target = parseInt(numero.getAttribute('data-target'));
            const count = parseInt(numero.innerText);
            const increment = target / 200;

            if (count < target) {
                numero.innerText = Math.ceil(count + increment);
                setTimeout(animarNumeros, 1);
            } else {
                numero.innerText = target;
            }
        });
    };

    // Iniciar animación de números cuando estén en el viewport
    const observerOptions = {
        threshold: 0.5
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animarNumeros();
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    numeros.forEach(numero => {
        observer.observe(numero);
    });
});
// Funcionalidad común para todas las páginas
document.addEventListener('DOMContentLoaded', function() {
    // Inicializar AOS
    AOS.init();

    // Funcionalidad del menú móvil (asumiendo que ya está en el script original)
    const menuToggle = document.querySelector('.menu-movil');
    const menu = document.querySelector('.menu');

    menuToggle.addEventListener('click', () => {
        menu.classList.toggle('active');
    });

    // Detectar la página actual y ejecutar funciones específicas
    const currentPage = document.body.id;
    switch(currentPage) {
        case 'productos':
            initProductos();
            break;
        case 'galeria':
            initGaleria();
            break;
        case 'contacto':
            initContacto();
            break;
    }
});

// Funciones específicas para la página de Productos
function initProductos() {
    const filtros = document.querySelectorAll('.filtro-btn');
    const productos = document.querySelectorAll('.producto');

    filtros.forEach(filtro => {
        filtro.addEventListener('click', () => {
            const categoria = filtro.getAttribute('data-filtro');

            // Actualizar botones de filtro activos
            filtros.forEach(f => f.classList.remove('activo'));
            filtro.classList.add('activo');

            // Filtrar productos
            productos.forEach(producto => {
                if (categoria === 'todos' || producto.getAttribute('data-categoria') === categoria) {
                    producto.style.display = 'block';
                } else {
                    producto.style.display = 'none';
                }
            });
        });
    });
}

// Funciones específicas para la página de Galería
function initGaleria() {
    // Inicializar Lightbox
    lightbox.option({
        'resizeDuration': 200,
        'wrapAround': true
    });
}

// Funciones específicas para la página de Contacto
function initContacto() {
    const formulario = document.getElementById('formulario-contacto');
    
    formulario.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Aquí iría la lógica para enviar el formulario
        // Por ahora, solo mostraremos un mensaje de éxito
        alert('¡Gracias por tu mensaje! Te contactaremos pronto.');
        formulario.reset();
    });

    // Inicializar el mapa (ejemplo con Leaflet)
    if (typeof L !== 'undefined') {  // Asegúrate de haber incluido Leaflet
        const map = L.map('mapa-container').setView([40.416775, -3.703790], 13);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);

        L.marker([40.416775, -3.703790]).addTo(map)
            .bindPopup('Tejas Artesanales')
            .openPopup();
    }
}