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

document.addEventListener('DOMContentLoaded', () => {
    const birdContainer = document.getElementById('bird-container');
    const modal = document.getElementById('bird-modal');
    const modalContent = modal ? modal.querySelector('.modal-content') : null;
    const closeModalBtn = modal ? modal.querySelector('.close') : null;
    const birdModalName = document.getElementById('bird-modal-name');
    const birdModalImage = document.getElementById('bird-modal-image');
    const birdModalBinomialName = document.getElementById('bird-modal-binomial-name');
    const birdModalConservationStatus = document.getElementById('bird-modal-conservation-status');
    const birdModalClassification = document.getElementById('bird-modal-classification');
    const birdModalLink = document.getElementById('bird-modal-link');

    const fetchBirdData = async (family) => {
        const cachedData = localStorage.getItem(family);
        if (cachedData) {
            return JSON.parse(cachedData);
        }
        
        try {
            const response = await fetch(`https://birds-species.p.rapidapi.com/birds_api/group?meta_property=scientific_classification&meta_property_attribute=family&property_value=${family}`, {
                method: 'GET',
                headers: {
                    'x-rapidapi-host': 'birds-species.p.rapidapi.com',
                    'x-rapidapi-key': 'df9981657dmshc156546c636faeep1d9b35jsnf602ea373dd0'
                }
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            localStorage.setItem(family, JSON.stringify(data));
            return data;
        } catch (error) {
            console.error('Error fetching bird data:', error);
            throw error;
        }
    };

    const processBirdData = (data) => {
        birdContainer.innerHTML = '';

        if (!Array.isArray(data)) {
            throw new TypeError('Expected an array of bird data');
        }

        data.forEach(bird => {
            const birdCard = document.createElement('div');
            birdCard.className = 'bird-card';
            
            const birdImage = document.createElement('img');
            birdImage.src = bird.img_src_set['1.5x'];
            birdImage.alt = bird.name; 
            birdImage.loading = 'lazy'; 
            birdCard.appendChild(birdImage);

            const birdName = document.createElement('h2');
            birdName.textContent = bird.name;
            birdCard.appendChild(birdName);

            birdCard.addEventListener('click', () => {
                openModal(bird);
            });

            birdContainer.appendChild(birdCard);
        });
    };

    const openModal = (bird) => {
        if (!modal) return;
        
        birdModalName.textContent = bird.name;
        birdModalImage.src = bird.img_src_set['2x'];
        birdModalImage.alt = bird.name; 
        birdModalBinomialName.textContent = `Binomial Name: ${bird.meta.binomial_name}`;
        birdModalConservationStatus.textContent = `Conservation Status: ${bird.meta.conservation_status}`;
        birdModalClassification.textContent = `Classification: ${bird.meta.scientific_classification.domain}, ${bird.meta.scientific_classification.kingdom}, ${bird.meta.scientific_classification.phylum}, ${bird.meta.scientific_classification.class}, ${bird.meta.scientific_classification.order}, ${bird.meta.scientific_classification.family}, ${bird.meta.scientific_classification.genus}, ${bird.meta.scientific_classification.species}`;
        birdModalLink.href = bird.url;

        modal.showModal();
    };

    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', () => {
            modal.close();
        });
    }

    window.addEventListener('click', (event) => {
        if (event.target == modal) {
            modal.close();
        }
    });

    if (document.getElementById('timestamp')) {
        setTimestamp();
    }

    if (window.location.pathname.endsWith('thankyou.html')) {
        displayFormDetails();
    }

    const handleButtonClick = async (family, button) => {
        try {
            const data = await fetchBirdData(family);
            processBirdData(data);
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
});

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
});
