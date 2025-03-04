document.addEventListener('DOMContentLoaded', () => {
    // Menu Hamburguer
    const menuContainer = document.getElementById('menu-container');
    const hamburguer = document.getElementById('hamburguer');

    // Abrir/Fechar Menu Hamburguer
    hamburguer.addEventListener('click', (e) => {
        e.stopPropagation(); // Impede a propagação do clique
        menuContainer.classList.toggle('active');
        document.body.style.overflow = menuContainer.classList.contains('active') ? 'hidden' : 'auto'; // Bloqueia/libera o scroll da página
        hamburguer.setAttribute('aria-expanded', menuContainer.classList.contains('active')); // Atualiza o estado do botão
    });

    // Fechar Menu ao Clicar Fora
    document.addEventListener('click', (e) => {
        if (!e.target.closest('#menu-container') && !e.target.closest('#hamburguer')) {
            menuContainer.classList.remove('active');
            document.body.style.overflow = 'auto'; // Libera o scroll da página
            hamburguer.setAttribute('aria-expanded', 'false'); // Atualiza o estado do botão
        }
    });

    // Fechar Menu ao Clicar em um Link (Opcional)
    const navbarLinks = document.querySelectorAll('.navbar a');
    navbarLinks.forEach(link => {
        link.addEventListener('click', () => {
            menuContainer.classList.remove('active');
            document.body.style.overflow = 'auto'; // Libera o scroll da página
            hamburguer.setAttribute('aria-expanded', 'false'); // Atualiza o estado do botão
        });
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
            e.preventDefault(); // Impede o comportamento padrão do link
            const targetId = this.getAttribute('href'); // Pega o ID do alvo
            const targetElement = document.querySelector(targetId); // Seleciona o elemento alvo

            if (targetElement) {
                // Calcula a posição do topo do elemento alvo
                const headerHeight = document.querySelector('header').offsetHeight; // Altura do header
                const offsetTop = targetElement.offsetTop - headerHeight; // Compensa a altura do header

                // Rola a página até o topo do elemento alvo
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth' // Scroll suave
                });
            }
        });
    });

    // Envio do Formulário de Contato
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
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
    }
});