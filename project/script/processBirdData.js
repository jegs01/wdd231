export const processBirdData = (data, birdContainer, openModal) => {
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
