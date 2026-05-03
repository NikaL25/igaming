document.addEventListener('DOMContentLoaded', () => {
    
    AOS.init({
        duration: 800,
        once: true, 
        offset: 100
    });

    const burgerBtn = document.querySelector('.nav__burger');
    const navMenu = document.querySelector('.nav__menu');

    if (burgerBtn && navMenu) {
        burgerBtn.addEventListener('click', () => {
            navMenu.classList.toggle('is-active');
        });

        document.querySelectorAll('.nav__link').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('is-active');
            });
        });
    }

    const modal = document.querySelector('.js-modal');
    const playButtons = document.querySelectorAll('.js-play-btn');
    const closeElements = document.querySelectorAll('.js-modal-close');
    const iframeContainer = document.querySelector('.js-iframe-container');

    const openModal = (e) => {
        e.preventDefault();
        
        iframeContainer.innerHTML = `<iframe src="slot/index.html" allowfullscreen></iframe>`;        

        
        modal.classList.add('is-active');
        document.body.style.overflow = 'hidden'; 
    };

    const closeModal = () => {
        modal.classList.remove('is-active');
        document.body.style.overflow = '';
        
        setTimeout(() => {
            iframeContainer.innerHTML = '';
        }, 300);
    };

    playButtons.forEach(btn => {
        btn.addEventListener('click', openModal);
    });

    closeElements.forEach(el => {
        el.addEventListener('click', closeModal);
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('is-active')) {
            closeModal();
        }
    });

});
