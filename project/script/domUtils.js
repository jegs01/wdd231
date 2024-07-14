export const openModal = (bird, modalElements) => {
    const { modal, birdModalName, birdModalImage, birdModalBinomialName, birdModalConservationStatus, birdModalClassification, birdModalLink } = modalElements;
    
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

export const setupModalClose = (modal, closeModalBtn) => {
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
};
