// Animowane przejścia między stronami
function showPageAnimated(newPageId) {
    const current = document.querySelector('.page.active');
    const next = document.getElementById(newPageId);

    if (current === next) return;

    if (current) {
        current.classList.remove('active');
        current.classList.add('page-exit');
        setTimeout(() => {
            current.classList.remove('page-exit');
            current.style.display = 'none';
        }, 1000);
    }

    if (next) {
        next.classList.add('page-enter');
        next.style.display = 'block';
        setTimeout(() => {
            next.classList.add('active', 'page-active');
            next.classList.remove('page-enter');
            setTimeout(() => {
                next.classList.remove('page-active');
            }, 1000);
        }, 20);
    }
}

document.addEventListener('DOMContentLoaded', function() {
    // Automatyczna obsługa kliknięć w nawigacji
    const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href').replace('#', '');
            if (document.getElementById(targetId)) {
                e.preventDefault();
                showPageAnimated(targetId);
                navLinks.forEach(l => l.classList.remove('active'));
                this.classList.add('active');
            }
        });
    });

    // Pokaż domyślną stronę na start
    const firstPage = document.querySelector('.page');
    if (firstPage) {
        showPageAnimated(firstPage.id);
        // Ustaw aktywny link
        const activeLink = document.querySelector(`.nav-links a[href="#${firstPage.id}"]`);
        if (activeLink) {
            activeLink.classList.add('active');
        }
    }

    // Obsługa formularza kontaktowego (bez alertów)
    // UWAGA: Usunięto kod obsługujący alert, ponieważ Formspree zajmuje się wysyłką.
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        // Nie ma potrzeby dodawania listenera, Formspree działa natywnie.
    }
    

    // Animacje wejścia elementów
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.animate').forEach(element => {
        observer.observe(element);
    });

    // Kod dla nawigacji mobilnej
    const hamburger = document.getElementById('hamburger-menu');
    const navWrapper = document.getElementById('mobile-menu');

    if (hamburger && navWrapper) {
        hamburger.addEventListener('click', function() {
            navWrapper.classList.toggle('open');
            hamburger.classList.toggle('open');
        });

        // Zamknięcie menu po kliknięciu linku nawigacyjnego
        const navLinksMobile = navWrapper.querySelectorAll('.nav-link');
        navLinksMobile.forEach(link => {
            link.addEventListener('click', function() {
                navWrapper.classList.remove('open');
                hamburger.classList.remove('open');
            });
        });
    }
});