// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

// Loading animation
window.addEventListener('load', function () {
    // Remove loading screen if exists
    const loader = document.querySelector('.loading');
    if (loader) {
        gsap.to(loader, {
            opacity: 0,
            duration: 0.5,
            onComplete: () => loader.remove()
        });
    }

    // Set initial visibility for animated elements
    gsap.set('.gsap-fade-up, .gsap-fade-left, .gsap-fade-right', {
        opacity: 1
    });

    // Initialize animations
    initAnimations();

    // Set current year
    document.getElementById('current-year').textContent = new Date().getFullYear();

    // Update price info
    updatePriceInfo();

    // Handle form submission
    const form = document.getElementById('question-form');
    if (form) {
        form.addEventListener('submit', handleFormSubmit);
    }

    // Smooth scrolling for navigation
    initSmoothScrolling();

    // Parallax effect for floating angels
    initParallaxEffect();
});

/**
 * Initialize GSAP animations
 */
function initAnimations() {
    // Hero animations
    gsap.from('.hero-section .gsap-fade-up', {
        y: 50,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: 'power3.out'
    });

    // About section animations
    gsap.from('.gsap-fade-left', {
        scrollTrigger: {
            trigger: '#o-mne',
            start: 'top 80%',
            once: true
        },
        x: -50,
        opacity: 0,
        duration: 1,
        ease: 'power3.out'
    });

    gsap.from('.gsap-fade-right', {
        scrollTrigger: {
            trigger: '#o-mne',
            start: 'top 80%',
            once: true
        },
        x: 50,
        opacity: 0,
        duration: 1,
        delay: 0.3,
        ease: 'power3.out'
    });

    // Service cards animation
    const serviceCards = document.querySelectorAll('#sluzby .gsap-fade-up');
    serviceCards.forEach((card, index) => {
        gsap.from(card, {
            scrollTrigger: {
                trigger: '#sluzby',
                start: 'top 80%',
                once: true
            },
            y: 50,
            opacity: 0,
            duration: 0.8,
            delay: index * 0.1,
            ease: 'power3.out'
        });
    });

    // Form section animation
    gsap.from('#formular .gsap-fade-up', {
        scrollTrigger: {
            trigger: '#formular',
            start: 'top 80%',
            once: true
        },
        y: 50,
        opacity: 0,
        duration: 1,
        ease: 'power3.out'
    });

    // Contact cards animation
    const contactCards = document.querySelectorAll('#kontakt .gsap-fade-up');
    contactCards.forEach((card, index) => {
        gsap.from(card, {
            scrollTrigger: {
                trigger: '#kontakt',
                start: 'top 80%',
                once: true
            },
            y: 30,
            opacity: 0,
            duration: 0.8,
            delay: index * 0.1,
            ease: 'power3.out'
        });
    });

    // Decorative circle rotation
    gsap.to('.decorative-circle', {
        rotation: 360,
        duration: 30,
        repeat: -1,
        ease: 'none'
    });

    // Service icons hover effect
    const serviceIcons = document.querySelectorAll('.service-icon-wrapper');
    serviceIcons.forEach(icon => {
        icon.addEventListener('mouseenter', () => {
            gsap.to(icon, {
                scale: 1.1,
                duration: 0.3,
                ease: 'power2.out'
            });
        });

        icon.addEventListener('mouseleave', () => {
            gsap.to(icon, {
                scale: 1,
                duration: 0.3,
                ease: 'power2.out'
            });
        });
    });
}

/**
 * Initialize parallax effect for floating angels
 */
function initParallaxEffect() {
    const angels = document.querySelectorAll('.floating-angel');

    window.addEventListener('mousemove', (e) => {
        const mouseX = e.clientX / window.innerWidth;
        const mouseY = e.clientY / window.innerHeight;

        angels.forEach((angel, index) => {
            const speed = parseFloat(angel.getAttribute('data-speed'));
            const x = (mouseX - 0.5) * speed * 100;
            const y = (mouseY - 0.5) * speed * 100;

            gsap.to(angel, {
                x: x,
                y: y,
                duration: 1,
                ease: 'power2.out'
            });
        });
    });
}

/**
 * Initialize smooth scrolling
 */
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('.navbar-nav a');

    navLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                const navHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = targetElement.offsetTop - navHeight;

                gsap.to(window, {
                    scrollTo: {
                        y: targetPosition,
                        autoKill: false
                    },
                    duration: 1,
                    ease: 'power3.inOut'
                });

                // Close mobile menu if open
                const navbarCollapse = document.querySelector('.navbar-collapse');
                if (navbarCollapse.classList.contains('show')) {
                    const bsCollapse = new bootstrap.Collapse(navbarCollapse);
                    bsCollapse.hide();
                }
            }
        });
    });
}

/**
 * Update price info based on current day
 */
function updatePriceInfo() {
    const today = new Date().getDay();
    const priceStatus = document.getElementById('price-status');

    if (priceStatus) {
        if (today === 5 || today === 6) { // Friday or Saturday
            priceStatus.innerHTML = '<span class="text-success">ZDARMA</span>';
            priceStatus.classList.add('text-success');
        } else {
            priceStatus.textContent = 'za 200 Kč';
        }
    }
}

/**
 * Handle form submission
 */
function handleFormSubmit(event) {
    event.preventDefault();

    // Get form values
    const formData = {
        name: document.getElementById('name').value.trim(),
        email: document.getElementById('email').value.trim(),
        phone: document.getElementById('phone').value.trim(),
        question: document.getElementById('question').value.trim(),
        date: new Date().toISOString(),
        isFreeDay: (new Date().getDay() === 5 || new Date().getDay() === 6)
    };

    // Animate form submission
    const submitButton = event.target.querySelector('button[type="submit"]');
    const originalText = submitButton.innerHTML;

    // Show loading state
    submitButton.disabled = true;
    submitButton.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span>Odesílám...';

    // Simulate form submission (in real app, this would be an API call)
    setTimeout(() => {
        // Create success message
        const formCard = document.querySelector('#formular .card');
        const successHtml = `
            <div class="success-message">
                <i class="bi bi-check-circle-fill text-success" style="font-size: 3rem;"></i>
                <h3 class="mt-3">Děkuji za Váš dotaz!</h3>
                <p class="lead">Vážený/á ${formData.name},</p>
                <p>Váš dotaz byl úspěšně odeslán. Odpovím Vám co nejdříve na e-mail ${formData.email}.</p>
                <button class="btn btn-primary mt-3" onclick="resetForm()">
                    <i class="bi bi-plus-circle me-2"></i>Položit další dotaz
                </button>
            </div>
        `;

        // Animate transition
        gsap.to(formCard, {
            opacity: 0,
            y: -20,
            duration: 0.3,
            onComplete: () => {
                formCard.innerHTML = successHtml;
                gsap.to(formCard, {
                    opacity: 1,
                    y: 0,
                    duration: 0.5
                });
            }
        });

        // Log submission (would be sent to server)
        console.log('Form submitted:', formData);

    }, 1500);
}

/**
 * Reset form to initial state
 */
window.resetForm = function () {
    location.reload();
};

// Add scroll-based animations for navbar
let lastScroll = 0;
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    const currentScroll = window.pageYOffset;

    if (currentScroll > 100) {
        navbar.classList.add('shadow-lg');
    } else {
        navbar.classList.remove('shadow-lg');
    }

    lastScroll = currentScroll;
});

// Add magnetic effect to buttons
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('mousemove', (e) => {
        const rect = button.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;

        gsap.to(button, {
            x: x * 0.3,
            y: y * 0.3,
            duration: 0.3,
            ease: 'power2.out'
        });
    });

    button.addEventListener('mouseleave', () => {
        gsap.to(button, {
            x: 0,
            y: 0,
            duration: 0.3,
            ease: 'power2.out'
        });
    });
});

// Add reveal animation for elements
gsap.utils.toArray('.reveal').forEach(element => {
    gsap.from(element, {
        scrollTrigger: {
            trigger: element,
            start: 'top 85%',
            once: true
        },
        y: 30,
        opacity: 0,
        duration: 1,
        ease: 'power3.out'
    });
});
