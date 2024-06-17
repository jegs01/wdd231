document.addEventListener('DOMContentLoaded', () => {
    const directory = document.getElementById('directory');
    const gridViewBtn = document.getElementById('grid-view');
    const listViewBtn = document.getElementById('list-view');
    const yearSpan = document.getElementById('year');
    const lastModifiedSpan = document.getElementById('last-modified');

    // Display the current year
    yearSpan.textContent = new Date().getFullYear();

    // Display the last modified date
    lastModifiedSpan.textContent = document.lastModified;

    // Fetch and display the member data
    async function fetchMembers() {
        try {
            const response = await fetch('data/members.json');
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            const members = await response.json();
            displayMembers(members, 'grid');
        } catch (error) {
            console.error('Error fetching members:', error);
        }
    }

    function displayMembers(members, view) {
        directory.innerHTML = '';
        if (view === 'grid') {
            directory.classList.add('grid');
            directory.classList.remove('list');
        } else {
            directory.classList.add('list');
            directory.classList.remove('grid');
        }
        members.forEach(member => {
            const card = document.createElement('div');
            card.className = view === 'grid' ? 'card' : 'list-item';
            card.innerHTML = `
                <img src="images/${member.image}" alt="${member.name} Logo">
                <h2>${member.name}</h2>
                <p>${member.address}</p>
                <p>${member.phone}</p>
                <a href="${member.website}" target="_blank">${member.website}</a>
            `;
            directory.appendChild(card);
        });
    }

    gridViewBtn.addEventListener('click', () => {
        fetchMembers().then(members => displayMembers(members, 'grid'));
    });

    listViewBtn.addEventListener('click', () => {
        fetchMembers().then(members => displayMembers(members, 'list'));
    });

    // Initial fetch and display
    fetchMembers();
});
