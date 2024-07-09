function setTimestamp() {
    document.getElementById('timestamp').value = new Date().toISOString();
}

function displayFormDetails() {
    const urlParams = new URLSearchParams(window.location.search);
    document.getElementById('first-name').textContent = urlParams.get('first-name');
    document.getElementById('last-name').textContent = urlParams.get('last-name');
    document.getElementById('email').textContent = urlParams.get('email');
    document.getElementById('phone').textContent = urlParams.get('phone');
    document.getElementById('organization').textContent = urlParams.get('organization');
    document.getElementById('timestamp').textContent = urlParams.get('timestamp');
}

document.addEventListener("DOMContentLoaded", function() {
    document.getElementById('year').textContent = new Date().getFullYear();
    document.getElementById('last-modified').textContent = document.lastModified;

    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('nav ul');

    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('show');
    });

    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    const navLinkElements = document.querySelectorAll('nav ul li a');

    navLinkElements.forEach(link => {
        const linkPath = link.getAttribute('href').split('/').pop() || 'index.html';

        if (linkPath === currentPath) {
            link.classList.add('current');
        }
    });

    if (document.getElementById('timestamp')) {
        setTimestamp();
    }

    if (window.location.pathname.endsWith('thankyou.html')) {
        displayFormDetails();
    }

    document.querySelectorAll('.openButton').forEach(button => {
        button.addEventListener('click', (e) => {
            const dialogId = e.target.getAttribute('data-dialog');
            document.getElementById(dialogId).showModal();
        });
    });

    document.querySelectorAll('.close').forEach(button => {
        button.addEventListener('click', (e) => {
            const dialogId = e.target.getAttribute('data-dialog');
            document.getElementById(dialogId).close();
        });
    });

    const lazyImages = document.querySelectorAll("img.lazy");

    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove("lazy");
                observer.unobserve(img);
            }
        });
    });

    lazyImages.forEach(image => {
        imageObserver.observe(image);
    });

    // Display visit message
    const visitMessage = document.getElementById("visit-message");
    const lastVisit = localStorage.getItem("lastVisit");
    const now = Date.now();

    if (!lastVisit) {
        visitMessage.textContent = "Welcome! Let us know if you have any questions.";
    } else {
        const lastVisitDate = new Date(parseInt(lastVisit));
        const daysSinceLastVisit = Math.floor((now - lastVisitDate.getTime()) / (1000 * 60 * 60 * 24));
        if (daysSinceLastVisit < 1) {
            visitMessage.textContent = "Back so soon! Awesome!";
        } else if (daysSinceLastVisit === 1) {
            visitMessage.textContent = "You last visited 1 day ago.";
        } else {
            visitMessage.textContent = `You last visited ${daysSinceLastVisit} days ago.`;
        }
    }

    localStorage.setItem("lastVisit", now);
});
