// index.js - VERSIÓN OPTIMIZADA Y FUNCIONAL

document.addEventListener('DOMContentLoaded', function() {
    console.log('Misterios Cósmicos - Inicializando...');

    // ===== INICIALIZAR SECCIONES - SOLO 6 ELEMENTOS VISIBLES =====
    function initializeSections() {
        console.log('Ocultando contenido adicional...');
        
        // Ocultar TODOS los elementos adicionales
        const additionalSections = [
            '.photo-gallery-additional',
            '.video-grid-additional', 
            '.cases-grid-additional'
        ];
        
        additionalSections.forEach(selector => {
            const section = document.querySelector(selector);
            if (section) {
                section.style.display = 'none';
                console.log(`Ocultado: ${selector}`);
            }
        });

        // En móvil, limitar carruseles a 6 elementos
        if (window.innerWidth <= 768) {
            initializeMobileCarousels();
        }
    }

    // ===== MENÚ MÓVIL =====
    const menuToggle = document.getElementById('menuToggle');
    const navMenu = document.getElementById('navMenu');
    
    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            const icon = menuToggle.querySelector('i');
            icon.className = navMenu.classList.contains('active') ? 
                'fas fa-times' : 'fas fa-bars';
        });
    }

    // ===== HEADER SCROLL EFFECT =====
    const header = document.querySelector('.main-header');
    if (header) {
        window.addEventListener('scroll', function() {
            header.classList.toggle('scrolled', window.scrollY > 100);
        });
    }

    // ===== SISTEMA DE VOTACIÓN =====
    document.querySelectorAll('.btn-vote').forEach(button => {
        button.addEventListener('click', function() {
            alert('¡Tu voto ha sido registrado! Gracias por participar.');
        });
    });

    // ===== GALERÍA DE IMÁGENES AMPLIABLES =====
    document.querySelectorAll('.gallery-image').forEach(image => {
        image.addEventListener('click', function() {
            const modalImage = document.getElementById('modalImage');
            const imageModal = document.getElementById('imageModal');
            if (modalImage && imageModal) {
                modalImage.src = this.src;
                imageModal.style.display = 'flex';
                document.body.style.overflow = 'hidden';
            }
        });
    });

    // ===== SISTEMA DE REPRODUCCIÓN DE VIDEOS =====
    const videoModal = document.getElementById('videoModal');
    const modalVideo = document.getElementById('modalVideo');
    
    document.querySelectorAll('.play-button').forEach(button => {
        button.addEventListener('click', function() {
            const videoCard = this.closest('.video-card');
            const videoElement = videoCard.querySelector('.video-player');
            const sourceElement = videoElement.querySelector('source');
            
            if (!sourceElement?.src) {
                alert('Error: El video no tiene una fuente válida.');
                return;
            }

            if (modalVideo && videoModal) {
                // Mostrar loading
                const videoLoading = document.querySelector('.video-loading');
                if (videoLoading) videoLoading.classList.add('show');

                // Configurar video
                modalVideo.innerHTML = `
                    <source src="${sourceElement.src}" type="video/mp4">
                    Tu navegador no soporta el elemento video.
                `;
                
                videoModal.style.display = 'flex';
                document.body.style.overflow = 'hidden';

                // Eventos del video
                modalVideo.onloadeddata = () => {
                    if (videoLoading) videoLoading.classList.remove('show');
                    modalVideo.play().catch(() => {
                        // Reproducción automática bloqueada - normal
                    });
                };

                modalVideo.onerror = () => {
                    if (videoLoading) videoLoading.classList.remove('show');
                    alert('Error al cargar el video.');
                };

                modalVideo.load();
            }
        });
    });

    // ===== SISTEMA EXPANDIBLE PARA SECCIONES =====
    document.querySelectorAll('.btn-expand').forEach(button => {
        button.addEventListener('click', function() {
            const sectionType = this.getAttribute('data-section');
            const additionalContent = document.querySelector(`.${sectionType}-grid-additional`);
            
            if (!additionalContent) return;

            // Si ya está expandido, redirigir
            if (additionalContent.style.display === 'grid') {
                const pages = {
                    'photos': 'galeria.html',
                    'videos': 'videos.html', 
                    'cases': 'casos.html'
                };
                window.location.href = pages[sectionType] || 'index.html';
                return;
            }

            // Mostrar contenido adicional
            additionalContent.style.display = 'grid';
            this.textContent = 'Ver página completa';
            this.classList.add('expanded');

            // Scroll suave
            setTimeout(() => {
                additionalContent.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }, 100);

            console.log(`Sección ${sectionType} expandida`);
        });
    });

    // ===== CARRUSEL MÓVIL =====
    function initializeMobileCarousels() {
        if (window.innerWidth > 768) return;

        const carouselConfigs = [
            { container: '.photo-gallery', item: '.photo-item' },
            { container: '.video-grid', item: '.video-card' },
            { container: '.cases-grid', item: '.case-card' }
        ];

        carouselConfigs.forEach(config => {
            const container = document.querySelector(config.container);
            if (!container) return;

            // Convertir a carrusel
            container.style.display = 'flex';
            container.style.overflowX = 'auto';
            container.style.scrollSnapType = 'x mandatory';
            container.style.scrollbarWidth = 'none';
            container.style.msOverflowStyle = 'none';
            
            // Ocultar scrollbar en Webkit
            container.style.WebkitOverflowScrolling = 'touch';
        });
    }

    // ===== CARRUSEL DE NOTICIAS =====
    function initializeNewsCarousel() {
        const carouselTrack = document.querySelector('.carousel-track');
        const carouselSlides = document.querySelectorAll('.carousel-slide');
        const prevButton = document.querySelector('.carousel-prev');
        const nextButton = document.querySelector('.carousel-next');
        const dots = document.querySelectorAll('.dot');

        if (!carouselTrack || carouselSlides.length === 0) return;

        let currentSlide = 0;
        const totalSlides = carouselSlides.length;
        let autoSlideInterval;

        function updateCarousel() {
            const slideWidth = carouselSlides[0].offsetWidth;
            carouselTrack.style.transform = `translateX(-${slideWidth * currentSlide}px)`;
            
            dots.forEach((dot, index) => {
                dot.classList.toggle('active', index === currentSlide);
            });
        }

        function moveToSlide(slideIndex) {
            currentSlide = (slideIndex + totalSlides) % totalSlides;
            updateCarousel();
            resetAutoSlide();
        }

        function nextSlide() {
            moveToSlide(currentSlide + 1);
        }

        function resetAutoSlide() {
            clearInterval(autoSlideInterval);
            autoSlideInterval = setInterval(nextSlide, 5000);
        }

        // Event listeners
        if (prevButton) prevButton.addEventListener('click', () => moveToSlide(currentSlide - 1));
        if (nextButton) nextButton.addEventListener('click', nextSlide);

        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => moveToSlide(index));
        });

        // Auto-avance
        resetAutoSlide();

        // Pausar al interactuar
        carouselTrack.addEventListener('mouseenter', () => clearInterval(autoSlideInterval));
        carouselTrack.addEventListener('mouseleave', resetAutoSlide);
        window.addEventListener('resize', updateCarousel);
    }

    // ===== CERRAR MODALES =====
    function closeAllModals() {
        document.querySelectorAll('.modal').forEach(modal => {
            modal.style.display = 'none';
        });
        document.body.style.overflow = 'auto';
        
        if (modalVideo) {
            modalVideo.pause();
            modalVideo.currentTime = 0;
        }
        
        const videoLoading = document.querySelector('.video-loading');
        if (videoLoading) videoLoading.classList.remove('show');
    }

    document.querySelectorAll('.close-modal').forEach(button => {
        button.addEventListener('click', closeAllModals);
    });

    document.addEventListener('click', (event) => {
        if (event.target.classList.contains('modal')) {
            closeAllModals();
        }
    });

    // ===== FORMULARIOS =====
    const storyForm = document.getElementById('storyForm');
    if (storyForm) {
        storyForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const name = this.querySelector('input[type="text"]').value;
            alert(`¡Gracias ${name} por compartir tu historia!`);
            this.reset();
        });
    }

    document.querySelectorAll('.newsletter-form').forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            const emailInput = this.querySelector('input[type="email"]');
            const email = emailInput?.value;
            if (email) {
                alert(`¡Gracias por suscribirte con ${email}!`);
                emailInput.value = '';
            }
        });
    });

    // ===== SCROLL SUAVE =====
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#' || href === '#!') return;
            
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                const headerHeight = header?.offsetHeight || 0;
                window.scrollTo({
                    top: target.offsetTop - headerHeight,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ===== INICIALIZAR VIDEOS EN MINIATURA =====
    document.querySelectorAll('.video-player').forEach(video => {
        video.muted = true;
        video.loop = true;
        video.playsInline = true;
        video.preload = 'metadata';
        
        video.play().catch(() => {
            // Autoplay bloqueado - normal
        });
    });

    // ===== TECLA ESCAPE =====
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeAllModals();
    });

    // ===== INICIALIZAR TODO =====
    function initializeAll() {
        initializeSections();
        initializeMobileCarousels();
        initializeNewsCarousel();
    }

    // Ejecutar inicialización
    initializeAll();

    // Re-inicializar en resize
    window.addEventListener('resize', initializeAll);

    console.log('Misterios Cósmicos - ✅ Sistema inicializado correctamente');
    console.log('✅ 6 elementos visibles inicialmente');
    console.log('✅ Sistema expandible listo');
    console.log('✅ Carruseles móviles activos');
});

// Manejar orientación en móviles
window.addEventListener('orientationchange', () => {
    setTimeout(() => window.dispatchEvent(new Event('resize')), 300);
});