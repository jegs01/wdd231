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

function showMembershipDetails() {
    const membershipDetails = {
        'NP': '<p>NP Membership: Access to events and resources without fee.</p>',
        'Bronze': '<p>Bronze Membership: Includes special events and basic training.</p>',
        'Silver': '<p>Silver Membership: Includes all Bronze benefits plus advertising.</p>',
        'Gold': '<p>Gold Membership: Includes all Silver benefits plus event discounts.</p>'
    };

    const selectedMembership = document.getElementById('membership-level').value;
    document.getElementById('membership-details').innerHTML = membershipDetails[selectedMembership];
    document.getElementById('dialogBox').showModal();
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

    document.getElementById('openButton').addEventListener('click', showMembershipDetails);

    document.getElementById('closeButton').addEventListener('click', () => {
        document.getElementById('dialogBox').close();
    });
});
