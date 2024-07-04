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
});
