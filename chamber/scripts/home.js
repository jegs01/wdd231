document.addEventListener("DOMContentLoaded", function() {
    // Set the current year and last modified date
    document.getElementById('year').textContent = new Date().getFullYear();
    document.getElementById('last-modified').textContent = document.lastModified;

    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('nav ul');
    const town = document.querySelector('#town');
    const townOne = document.querySelector('#town-one');
    const townTwo = document.querySelector('#town-two');
    const townThree = document.querySelector('#town-three');
    const description = document.querySelector('#description')
    const weatherImage = document.querySelector('#weather-image');
    const temperature = document.querySelector('#temperature');
    const descriptionOne = document.querySelector('#description-one');
    const descriptionTwo = document.querySelector('#description-two');
    const descriptionThree = document.querySelector('#description-three');
    const weatherImageOne = document.querySelector('#weather-image-one');
    const weatherImageTwo = document.querySelector('#weather-image-two');
    const weatherImageThree = document.querySelector('#weather-image-three');
    const temperatureOne = document.querySelector('#temperature-one');
    const temperatureTwo = document.querySelector('#temperature-two');
    const temperatureThree = document.querySelector('#temperature-three');

    // Toggle menu visibility on hamburger click
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('show');
    });

    // Fetch and display weather data
    const apiKey = 'a3931b5210cc445c82393bfca94b8456';
    const lat = 6.524754155504311;
    const lon = 3.3936791843556624;

    fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=imperial`)
        .then(response => response.json())
        .then(data => {
            displayWeather(data);
        })
        .catch(error => console.error('Error fetching weather data:', error));

    function displayWeather(data) {
       town.innerHTML = data.city.name
       description.innerHTML = data.list[0].weather[0].description
       const iconsrc = `https://openweathermap.org/img/wn/${data.list[0].weather[0].icon}@2x.png`
       weatherImage.setAttribute('src', iconsrc)
       weatherImage.setAttribute('alt', data.list[0].weather[0].icon)
       temperature.innerHTML = `${data.list[0].main.temp}&deg;F`

       townOne.innerHTML = data.city.name
       descriptionOne.innerHTML = data.list[8].weather[0].description
       const iconsrcOne = `https://openweathermap.org/img/wn/${data.list[8].weather[0].icon}@2x.png`
       weatherImageOne.setAttribute('src', iconsrcOne)
       weatherImageOne.setAttribute('alt', data.list[8].weather[0].icon)
       temperatureOne.innerHTML = `${data.list[8].main.temp}&deg;F`

       townTwo.innerHTML = data.city.name
       descriptionTwo.innerHTML = data.list[16].weather[0].description
       const iconsrcTwo = `https://openweathermap.org/img/wn/${data.list[16].weather[0].icon}@2x.png`
       weatherImageTwo.setAttribute('src', iconsrcTwo)
       weatherImageTwo.setAttribute('alt', data.list[16].weather[0].icon)
       temperatureTwo.innerHTML = `${data.list[16].main.temp}&deg;F`

       townThree.innerHTML = data.city.name
       descriptionThree.innerHTML = data.list[24].weather[0].description
       const iconsrcThree = `https://openweathermap.org/img/wn/${data.list[24].weather[0].icon}@2x.png`
       weatherImageThree.setAttribute('src', iconsrcThree)
       weatherImageThree.setAttribute('alt', data.list[24].weather[0].icon)
       temperatureThree.innerHTML = `${data.list[24].main.temp}&deg;F`
    }

    // Fetch and display company spotlights
    fetch('https://jegs01.github.io/wdd231/chamber/data/members.json')
        .then(response => response.json())
        .then(companies => {
            displaySpotlights(companies);
        })
        .catch(error => console.error('Error fetching company data:', error));

    function getRandomElements(arr, count) {
        const shuffled = arr.sort(() => 0.5 - Math.random());
        return shuffled.slice(0, count);
    }

    function displaySpotlights(companies) {
        const spotlightContainer = document.getElementById('spotlightCompanies');
        const filteredCompanies = companies.filter(company => company.membershipLevel <= 2);
        const selectedCompanies = getRandomElements(filteredCompanies, 3);

        selectedCompanies.forEach(company => {
            const companyDiv = document.createElement('div');
            companyDiv.classList.add('spotlight-company');
            companyDiv.classList.add('member');

            if (company.membershipLevel === 1) {
                company.membershipLevel = 'Gold';
            } else if (company.membershipLevel === 2) {
                company.membershipLevel = 'Silver';
            } else {
                company.membershipLevel = 'Regular';
            }

            companyDiv.innerHTML = `
                <img src="https://jegs01.github.io/wdd231/chamber/images/${company.image}" alt="${company.name}">
                <h3>${company.name}</h3>
                <p>${company.address}</p>
                <p>${company.phone}</p>
                <a href="${company.website}">Visit Website</a>
                <h4>Membership Level: ${company.membershipLevel}</h4>
            `;
            spotlightContainer.appendChild(companyDiv);
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
