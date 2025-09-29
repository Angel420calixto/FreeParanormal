// index.js - VERSIÓN DEFINITIVA QUE SÍ FUNCIONA

document.addEventListener('DOMContentLoaded', function() {
    console.log('Misterios Cósmicos - Inicializando...');

    // ===== FORZAR OCULTAMIENTO DE CONTENIDO ADICIONAL =====
    function hideAdditionalContent() {
        console.log('Ocultando contenido adicional...');
        
        // Seleccionar y ocultar TODO el contenido adicional
        const additionalSections = [
            '.photo-gallery-additional',
            '.video-grid-additional', 
            '.cases-grid-additional'
        ];
        
        additionalSections.forEach(selector => {
            const elements = document.querySelectorAll(selector);
            elements.forEach(element => {
                element.style.display = 'none';
                element.style.visibility = 'hidden';
                element.style.opacity = '0';
                element.style.height = '0';
                element.style.overflow = 'hidden';
            });
        });
    }

    // ===== SISTEMA EXPANDIBLE CORREGIDO =====
    function initializeExpandableSections() {
        document.querySelectorAll('.btn-expand').forEach(button => {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                const sectionType = this.getAttribute('data-section');
                const additionalContent = document.querySelector(`.${sectionType}-grid-additional`);
                
                if (!additionalContent) return;

                // Si ya está visible, redirigir
                if (additionalContent.style.display === 'grid' || 
                    additionalContent.style.display === 'block' ||
                    window.getComputedStyle(additionalContent).display !== 'none') {
                    
                    const pages = {
                        'photos': 'galeria.html',
                        'videos': 'videos.html', 
                        'cases': 'casos.html'
                    };
                    window.location.href = pages[sectionType] || 'index.html';
                    return;
                }

                // MOSTRAR contenido adicional
                additionalContent.style.display = 'grid';
                additionalContent.style.visibility = 'visible';
                additionalContent.style.opacity = '1';
                additionalContent.style.height = 'auto';
                additionalContent.style.overflow = 'visible';

                // Cambiar texto del botón
                this.textContent = 'Ver página completa';
                this.classList.add('expanded');

                // Scroll suave
                setTimeout(() => {
                    additionalContent.scrollIntoView({ 
                        behavior: 'smooth', 
                        block: 'start' 
                    });
                }, 100);

                console.log(`Sección ${sectionType} expandida`);
            });
        });
    }

    // ===== EJECUTAR INMEDIATAMENTE AL CARGAR =====
    
    // 1. Ocultar contenido adicional inmediatamente
    hideAdditionalContent();
    
    // 2. Inicializar sistema expandible
    initializeExpandableSections();
    
    // 3. Forzar nuevamente después de un breve delay (por si CSS lo muestra)
    setTimeout(hideAdditionalContent, 100);
    setTimeout(hideAdditionalContent, 500);

    // ===== RESTO DEL CÓDIGO (igual que antes) =====
    
    // Menú móvil
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

    // Header scroll effect
    const header = document.querySelector('.main-header');
    if (header) {
        window.addEventListener('scroll', function() {
            header.classList.toggle('scrolled', window.scrollY > 100);
        });
    }

    // Galería de imágenes
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

    // Sistema de videos
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
                const videoLoading = document.querySelector('.video-loading');
                if (videoLoading) videoLoading.classList.add('show');

                modalVideo.innerHTML = `
                    <source src="${sourceElement.src}" type="video/mp4">
                    Tu navegador no soporta el elemento video.
                `;
                
                videoModal.style.display = 'flex';
                document.body.style.overflow = 'hidden';

                modalVideo.onloadeddata = () => {
                    if (videoLoading) videoLoading.classList.remove('show');
                    modalVideo.play().catch(() => {});
                };

                modalVideo.onerror = () => {
                    if (videoLoading) videoLoading.classList.remove('show');
                    alert('Error al cargar el video.');
                };

                modalVideo.load();
            }
        });
    });

    // Cerrar modales
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

    // Tecla Escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeAllModals();
    });

    console.log('Misterios Cósmicos - ✅ Sistema inicializado CORRECTAMENTE');
});

// Forzar ocultamiento también cuando la página termine de cargar
window.addEventListener('load', function() {
    setTimeout(() => {
        const additionalSections = [
            '.photo-gallery-additional',
            '.video-grid-additional', 
            '.cases-grid-additional'
        ];
        
        additionalSections.forEach(selector => {
            const elements = document.querySelectorAll(selector);
            elements.forEach(element => {
                element.style.display = 'none';
            });
        });
    }, 1000);
});