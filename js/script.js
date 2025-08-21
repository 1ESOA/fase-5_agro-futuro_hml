// Aguarda o carregamento completo do DOM
document.addEventListener('DOMContentLoaded', function() {
    
    // ===== NAVEGAÇÃO SUAVE =====
    const navLinks = document.querySelectorAll('nav a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerHeight = document.querySelector('header').offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Fecha o menu mobile se estiver aberto
                const nav = document.getElementById('nav');
                const menuToggle = document.getElementById('menu-toggle');
                nav.classList.remove('open');
                menuToggle.classList.remove('active');
            }
        });
    });

    // ===== MENU HAMBURGUER =====
    const menuToggle = document.getElementById('menu-toggle');
    const nav = document.getElementById('nav');
    
    menuToggle.addEventListener('click', function() {
        nav.classList.toggle('open');
        menuToggle.classList.toggle('active');
    });

    // Fecha o menu ao clicar fora dele
    document.addEventListener('click', function(e) {
        if (!nav.contains(e.target) && !menuToggle.contains(e.target)) {
            nav.classList.remove('open');
            menuToggle.classList.remove('active');
        }
    });

    // ===== ANIMAÇÃO ON SCROLL =====
    const sections = document.querySelectorAll('.section');
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
                
                // Atualiza navegação ativa
                updateActiveNavLink(entry.target.id);
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        sectionObserver.observe(section);
    });

    // ===== NAVEGAÇÃO ATIVA =====
    function updateActiveNavLink(sectionId) {
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${sectionId}`) {
                link.classList.add('active');
            }
        });
    }

    // ===== HEADER SCROLL EFFECT =====
    const header = document.querySelector('header');
    let lastScrollTop = 0;

    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Adiciona classe quando rola a página
        if (scrollTop > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        lastScrollTop = scrollTop;
    });

    // ===== BOTÃO VOLTAR AO TOPO =====
    const backToTopBtn = document.getElementById('back-to-top');
    
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }
    });

    backToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // ===== VALIDAÇÃO DO FORMULÁRIO =====
    const contactForm = document.getElementById('contact-form');
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Validação dos campos
        const nome = document.getElementById('nome').value.trim();
        const email = document.getElementById('email').value.trim();
        const assunto = document.getElementById('assunto').value;
        const mensagem = document.getElementById('mensagem').value.trim();
        
        let isValid = true;
        let errorMessage = '';
        
        // Validação do nome
        if (nome.length < 2) {
            isValid = false;
            errorMessage += 'Nome deve ter pelo menos 2 caracteres.\n';
        }
        
        // Validação do email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            isValid = false;
            errorMessage += 'Por favor, insira um email válido.\n';
        }
        
        // Validação do assunto
        if (!assunto) {
            isValid = false;
            errorMessage += 'Por favor, selecione um assunto.\n';
        }
        
        // Validação da mensagem
        if (mensagem.length < 10) {
            isValid = false;
            errorMessage += 'Mensagem deve ter pelo menos 10 caracteres.\n';
        }
        
        if (isValid) {
            // Simula envio do formulário
            showFormMessage('Mensagem enviada com sucesso! Entraremos em contato em breve.', 'success');
            contactForm.reset();
        } else {
            showFormMessage(errorMessage, 'error');
        }
    });

    // ===== FUNÇÃO PARA MOSTRAR MENSAGENS DO FORMULÁRIO =====
    function showFormMessage(message, type) {
        // Remove mensagem anterior se existir
        const existingMessage = document.querySelector('.form-message');
        if (existingMessage) {
            existingMessage.remove();
        }
        
        const messageDiv = document.createElement('div');
        messageDiv.className = `form-message ${type}`;
        messageDiv.style.cssText = `
            padding: 15px;
            margin: 20px 0;
            border-radius: 8px;
            font-weight: 500;
            ${type === 'success' 
                ? 'background: #d4edda; color: #155724; border: 1px solid #c3e6cb;' 
                : 'background: #f8d7da; color: #721c24; border: 1px solid #f5c6cb;'
            }
        `;
        messageDiv.textContent = message;
        
        contactForm.appendChild(messageDiv);
        
        // Remove a mensagem após 5 segundos
        setTimeout(() => {
            messageDiv.remove();
        }, 5000);
    }

    // ===== ANIMAÇÃO DOS CARDS DE TECNOLOGIA =====
    const techCards = document.querySelectorAll('.tech-card');
    
    const cardObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 100);
            }
        });
    }, { threshold: 0.1 });

    techCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'all 0.6s ease';
        cardObserver.observe(card);
    });

    // ===== GALERIA COM LIGHTBOX SIMPLES =====
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    galleryItems.forEach(item => {
        item.addEventListener('click', function() {
            const img = this.querySelector('img');
            const overlay = this.querySelector('.gallery-overlay');
            const title = overlay.querySelector('h3').textContent;
            
            // Cria lightbox simples
            createLightbox(img.src, title);
        });
    });

    function createLightbox(imageSrc, title) {
        const lightbox = document.createElement('div');
        lightbox.className = 'lightbox';
        lightbox.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.9);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 10000;
            opacity: 0;
            transition: opacity 0.3s ease;
        `;
        
        const lightboxContent = document.createElement('div');
        lightboxContent.style.cssText = `
            max-width: 90%;
            max-height: 90%;
            text-align: center;
        `;
        
        const img = document.createElement('img');
        img.src = imageSrc;
        img.style.cssText = `
            max-width: 100%;
            max-height: 80vh;
            object-fit: contain;
            border-radius: 10px;
        `;
        
        const titleElement = document.createElement('h3');
        titleElement.textContent = title;
        titleElement.style.cssText = `
            color: white;
            margin-top: 20px;
            font-size: 1.5rem;
        `;
        
        const closeBtn = document.createElement('button');
        closeBtn.innerHTML = '×';
        closeBtn.style.cssText = `
            position: absolute;
            top: 20px;
            right: 30px;
            background: none;
            border: none;
            color: white;
            font-size: 3rem;
            cursor: pointer;
            z-index: 10001;
        `;
        
        lightboxContent.appendChild(img);
        lightboxContent.appendChild(titleElement);
        lightbox.appendChild(lightboxContent);
        lightbox.appendChild(closeBtn);
        
        document.body.appendChild(lightbox);
        
        // Anima a entrada
        setTimeout(() => {
            lightbox.style.opacity = '1';
        }, 10);
        
        // Fecha o lightbox
        function closeLightbox() {
            lightbox.style.opacity = '0';
            setTimeout(() => {
                document.body.removeChild(lightbox);
            }, 300);
        }
        
        closeBtn.addEventListener('click', closeLightbox);
        lightbox.addEventListener('click', function(e) {
            if (e.target === lightbox) {
                closeLightbox();
            }
        });
        
        // Fecha com ESC
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                closeLightbox();
            }
        });
    }

    // ===== ANIMAÇÃO DOS NÚMEROS ESTATÍSTICOS =====
    const statNumbers = document.querySelectorAll('.stat-number');
    
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateNumber(entry.target);
            }
        });
    }, { threshold: 0.5 });

    statNumbers.forEach(stat => {
        statsObserver.observe(stat);
    });

    function animateNumber(element) {
        const finalNumber = element.textContent;
        const isMillions = finalNumber.includes('M');
        const isBillions = finalNumber.includes('B');
        
        let targetValue;
        if (isMillions) {
            targetValue = parseInt(finalNumber) * 1000000;
        } else if (isBillions) {
            targetValue = parseInt(finalNumber) * 1000000000;
        } else {
            targetValue = parseInt(finalNumber);
        }
        
        let currentValue = 0;
        const increment = targetValue / 100;
        const duration = 2000; // 2 segundos
        const stepTime = duration / 100;
        
        const timer = setInterval(() => {
            currentValue += increment;
            
            if (currentValue >= targetValue) {
                currentValue = targetValue;
                clearInterval(timer);
            }
            
            let displayValue;
            if (isBillions) {
                displayValue = Math.floor(currentValue / 1000000000) + 'B';
            } else if (isMillions) {
                displayValue = Math.floor(currentValue / 1000000) + 'M';
            } else {
                displayValue = Math.floor(currentValue).toLocaleString();
            }
            
            element.textContent = displayValue;
        }, stepTime);
    }

    // ===== PARALLAX SUAVE NO HERO =====
    const heroBackground = document.querySelector('.hero-background');
    
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const parallaxSpeed = 0.5;
        
        if (heroBackground) {
            heroBackground.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
        }
    });

    // ===== INICIALIZAÇÃO =====
    console.log('🌱 Agricultura do Futuro - Site carregado com sucesso!');
    
    // Mostra a primeira seção imediatamente
    const heroSection = document.getElementById('hero');
    if (heroSection) {
        heroSection.classList.add('show');
    }
});

