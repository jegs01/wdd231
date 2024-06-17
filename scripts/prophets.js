const url = 'https://brotherblazzard.github.io/canvas-content/latter-day-prophets.json';
const cards = document.querySelector('#cards');
let prophets = [];

async function getProphetData() {
  try {
    const response = await fetch(url);
    const data = await response.json();
    prophets = data.prophets;
    displayProphets(prophets);
    setInitialFilter();
  } catch (error) {
    console.error('Error fetching prophet data:', error);
  }
}

const displayProphets = (prophets) => {
  cards.innerHTML = ''; 
  prophets.forEach((prophet, index) => {
    let card = document.createElement('section');
    let fullName = document.createElement('h2');
    let birthInfo = document.createElement('p');
    let portrait = document.createElement('img');

    fullName.textContent = `${prophet.name} ${prophet.lastname}`;

    birthInfo.innerHTML = `Date of Birth: ${prophet.birthdate}<br>Place of Birth: ${prophet.birthplace}`;

    portrait.setAttribute('src', prophet.imageurl);
    portrait.setAttribute('alt', `Portrait of ${prophet.name} ${prophet.lastname} - ${index + 1}th Latter-day President`);
    portrait.setAttribute('loading', 'lazy');
    portrait.setAttribute('width', '340');
    portrait.setAttribute('height', '440');

    card.appendChild(fullName);
    card.appendChild(birthInfo);
    card.appendChild(portrait);

    cards.appendChild(card);
  }); 
}

const filters = {
  all: () => true,
  utah: prophet => prophet.birthplace.includes('Utah'),
  outsideUS: prophet => prophet.birthplace.includes('England'),
  aged95: prophet => {
    const birthDate = new Date(prophet.birthdate);
    const deathDate = prophet.death ? new Date(prophet.death) : new Date();
    const age = (deathDate - birthDate) / (1000 * 60 * 60 * 24 * 365);
    return age >= 95;
  },
  tenChildren: prophet => prophet.numofchildren >= 10,
  president15: prophet => prophet.length >= 15,
};

function filterProphets(criteria) {
  console.log('Filtering with criteria:', criteria);
  
  if (!filters.hasOwnProperty(criteria)) {
    console.error('Invalid filter criteria:', criteria);
    return;
  }

  const filteredProphets = criteria === 'all' ? prophets : prophets.filter(filters[criteria]);
  displayProphets(filteredProphets);

  document.querySelectorAll('#filters button').forEach(button => {
    if (button.dataset.criteria === criteria) {
      button.classList.add('selected');
    } else {
      button.classList.remove('selected');
    }
  });
}

function setInitialFilter() {
  const allButton = document.querySelector('#filters button[data-criteria="all"]');
  if (allButton) {
    allButton.classList.add('selected');
  }
}

document.querySelectorAll('#filters button').forEach(button => {
  button.addEventListener('click', () => {
    filterProphets(button.dataset.criteria);
  });
});

getProphetData();
