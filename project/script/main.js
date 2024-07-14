import { fetchBirdData } from './fetchBirdData.js'; 
import { processBirdData } from './processBirdData.js';
import { openModal, setupModalClose } from './domUtils.js';

document.addEventListener("DOMContentLoaded", function() {
    document.getElementById('year').textContent = new Date().getFullYear();
    document.getElementById('last-modified').textContent = document.lastModified;

    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('nav ul');

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('show');
        });
    }

    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    const navLinkElements = document.querySelectorAll('nav ul li a');

    navLinkElements.forEach(link => {
        const linkPath = link.getAttribute('href').split('/').pop() || 'index.html';

        if (linkPath === currentPath) {
            link.classList.add('current');
        }
    });

    const birdContainer = document.getElementById('bird-container');
    const modal = document.getElementById('bird-modal');
    const closeModalBtn = modal ? modal.querySelector('.close') : null;

    const modalElements = {
        modal,
        birdModalName: document.getElementById('bird-modal-name'),
        birdModalImage: document.getElementById('bird-modal-image'),
        birdModalBinomialName: document.getElementById('bird-modal-binomial-name'),
        birdModalConservationStatus: document.getElementById('bird-modal-conservation-status'),
        birdModalClassification: document.getElementById('bird-modal-classification'),
        birdModalLink: document.getElementById('bird-modal-link')
    };

    const handleButtonClick = async (family, button) => {
        try {
            const data = await fetchBirdData(family);
            processBirdData(data, birdContainer, (bird) => openModal(bird, modalElements));
        } catch (error) {
            console.error('Error fetching bird data:', error);
            const errorMessage = document.createElement('p');
            errorMessage.textContent = `Failed to load bird data: ${error.message}`;
            birdContainer.appendChild(errorMessage);
        }

        document.querySelectorAll('.species-btn').forEach(btn => {
            btn.classList.remove('active');
        });

        button.classList.add('active');
    };

    const buttonMappings = {
        'bucorvidae-btn': 'bucorvidae',
        'anatidae-btn': 'anatidae',
        'accipitridae-btn': 'accipitridae',
        'corvidae-btn': 'corvidae',
        'columbidae-btn': 'columbidae',
        'falconidae-btn': 'falconidae',
        'fringillidae-btn': 'fringillidae',
        'paridae-btn': 'paridae',
        'psittacidae-btn': 'psittacidae',
        'strigidae-btn': 'strigidae',
        'trochilidae-btn': 'trochilidae'
    };

    Object.keys(buttonMappings).forEach(buttonId => {
        const button = document.getElementById(buttonId);
        if (button) {
            button.addEventListener('click', () => handleButtonClick(buttonMappings[buttonId], button));
        }
    });

    const initialButton = document.getElementById('falconidae-btn');
    if (initialButton) {
        handleButtonClick('falconidae', initialButton);
    }

    setupModalClose(modal, closeModalBtn);

    if (document.getElementById('timestamp')) {
        setTimestamp();
    }

    if (window.location.pathname.endsWith('thankyou.html')) {
        displayFormDetails();
    }
});

function setTimestamp() {
    document.getElementById('timestamp').value = new Date().toISOString();
}

function displayFormDetails() {
    const urlParams = new URLSearchParams(window.location.search);
    document.getElementById('first-name').textContent = urlParams.get('first-name');
    document.getElementById('last-name').textContent = urlParams.get('last-name');
    document.getElementById('email').textContent = urlParams.get('email');
    document.getElementById('bird-species-name').textContent = urlParams.get('bird-species-name');
    document.getElementById('description').textContent = urlParams.get('description');
    document.getElementById('timestamp').textContent = urlParams.get('timestamp');
}
