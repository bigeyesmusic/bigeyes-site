document.addEventListener('DOMContentLoaded', () => {
    // Menu Hamburguer
    const menuContainer = document.getElementById('menu-container');
    const hamburguer = document.getElementById('hamburguer');

    hamburguer.addEventListener('click', () => {
        const isActive = menuContainer.classList.toggle('active');
        document.body.style.overflow = isActive ? 'hidden' : 'auto';
        hamburguer.setAttribute('aria-expanded', isActive);
    });

    document.addEventListener('click', (e) => {
        if (!e.target.closest('#menu-container') && !e.target.closest('#hamburguer')) {
            menuContainer.classList.remove('active');
            document.body.style.overflow = 'auto';
            hamburguer.setAttribute('aria-expanded', 'false');
        }
    });

    // Scroll to Top
    const scrollToTopBtn = document.getElementById('scrollToTopBtn');

    window.addEventListener('scroll', () => {
        scrollToTopBtn.classList.toggle('show', window.scrollY > 300);
    });

    scrollToTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // Slider de Catálogo
    const sliderContainer = document.querySelector('.slider-container');
    const slides = document.querySelectorAll('.slide');
    const prevButton = document.querySelector('.slider-prev');
    const nextButton = document.querySelector('.slider-next');
    let currentIndex = 0;

    function updateSlider() {
        const offset = -currentIndex * 100;
        sliderContainer.style.transform = `translateX(${offset}%)`;
    }

    prevButton.addEventListener('click', () => {
        currentIndex = (currentIndex > 0) ? currentIndex - 1 : slides.length - 1;
        updateSlider();
    });

    nextButton.addEventListener('click', () => {
        currentIndex = (currentIndex < slides.length - 1) ? currentIndex + 1 : 0;
        updateSlider();
    });

    // Scroll Suave para Links Âncora
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetSection = document.querySelector(this.getAttribute('href'));
            if (targetSection) {
                targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });
});

document.querySelector('.contact-form').addEventListener('submit', function (e) {
    e.preventDefault(); // Impede o envio padrão do formulário

    // Captura os dados do formulário
    const formData = new FormData(this);

    // Envia os dados via fetch
    fetch('faleconosco.php', {
        method: 'POST',
        body: formData,
    })
    .then(response => response.json())
    .then(data => {
        if (data.status === "success") {
            alert(data.message); // Exibe mensagem de sucesso
            this.reset(); // Limpa o formulário
        } else {
            alert(data.message); // Exibe mensagem de erro
        }
    })
    .catch(error => {
        console.error('Erro:', error);
        alert('Ocorreu um erro ao enviar a mensagem.');
    });
});

document.querySelector('.contact-form').addEventListener('submit', function (e) {
    e.preventDefault();

    const formData = new FormData(this);

    fetch('faleconosco.php', {
        method: 'POST',
        body: formData,
    })
    .then(response => response.json())
    .then(data => {
        if (data.status === "success") {
            alert(data.message);
            this.reset();
        } else {
            alert(data.message);
        }
    })
    .catch(error => {
        console.error('Erro:', error);
        alert('Ocorreu um erro ao enviar a mensagem.');
    });
});