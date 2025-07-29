document.addEventListener("DOMContentLoaded", function() {
    // Smooth scrolling for navigation links
    document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Simple scroll animations (fade-in effect)
    const sections = document.querySelectorAll('.section-spacing');

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1 // When 10% of the section is visible
    };

    const sectionObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target); // Stop observing once it's visible
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        sectionObserver.observe(section);
    });

    // Add 'fade-in' to the first section immediately if it's visible on load
    // This avoids a delay if the first section is already in view
    if (sections.length > 0) {
        const firstSectionRect = sections[0].getBoundingClientRect();
        if (firstSectionRect.top < window.innerHeight && firstSectionRect.bottom > 0) {
            sections[0].classList.add('fade-in');
        }
    }

    /* --- Galeria de Imagens (Nova Funcionalidade) --- */
    const galleryModal = document.getElementById('gallery-modal');
    const modalImage = document.getElementById('modal-image');
    const closeButton = document.querySelector('.close-button');
    const prevButton = document.querySelector('.prev-button');
    const nextButton = document.querySelector('.next-button');
    const galleryImages = Array.from(document.querySelectorAll('.image-grid img')); // Converte NodeList para Array
    let currentIndex = 0; // Para acompanhar a imagem atualmente exibida

    // Função para abrir o modal e exibir a imagem
    function openModal(index) {
        currentIndex = index;
        modalImage.src = galleryImages[currentIndex].src;
        galleryModal.style.display = 'flex'; // Usar 'flex' para centralizar
        document.body.classList.add('no-scroll'); // Adiciona classe para prevenir scroll no body
    }

    // Função para fechar o modal
    function closeModal() {
        galleryModal.style.display = 'none';
        document.body.classList.remove('no-scroll'); // Remove classe para permitir scroll no body
    }

    // Função para mostrar a imagem anterior
    function showPrevImage() {
        currentIndex = (currentIndex - 1 + galleryImages.length) % galleryImages.length;
        modalImage.src = galleryImages[currentIndex].src;
    }

    // Função para mostrar a imagem seguinte
    function showNextImage() {
        currentIndex = (currentIndex + 1) % galleryImages.length;
        modalImage.src = galleryImages[currentIndex].src;
    }

    // Event Listeners para abrir o modal ao clicar nas imagens da galeria
    galleryImages.forEach((img, index) => {
        img.addEventListener('click', () => openModal(index));
    });

    // Event Listeners para os botões do modal
    closeButton.addEventListener('click', closeModal);
    prevButton.addEventListener('click', showPrevImage);
    nextButton.addEventListener('click', showNextImage);

    // Fechar modal ao clicar fora da imagem (no fundo do modal)
    galleryModal.addEventListener('click', (e) => {
        if (e.target === galleryModal) { // Verifica se o clique foi diretamente no fundo do modal
            closeModal();
        }
    });

    // Fechar modal com a tecla ESC e navegar com as setas do teclado
    document.addEventListener('keydown', (e) => {
        if (galleryModal.style.display === 'flex') { // Apenas se o modal estiver aberto
            if (e.key === 'Escape') {
                closeModal();
            } else if (e.key === 'ArrowLeft') {
                showPrevImage();
            } else if (e.key === 'ArrowRight') {
                showNextImage();
            }
        }
    });
});
