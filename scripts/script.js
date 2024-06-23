document.addEventListener("DOMContentLoaded", function () {

    const footerYear = document.getElementById('currentyear');
    const currentYear = new Date().getFullYear();
    footerYear.textContent = currentYear;

    const lastModified = document.lastModified;
    const lastModifiedParagraph = document.getElementById('lastModified');
    lastModifiedParagraph.textContent = `Last Update: ${lastModified}`;

    const courses = [
        {
            subject: 'CSE',
            number: 110,
            title: 'Introduction to Programming',
            credits: 2,
            certificate: 'Web and Computer Programming',
            description: 'This course will introduce students to programming. It will introduce the building blocks of programming languages (variables, decisions, calculations, loops, array, and input/output) and use them to solve problems.',
            technology: ['Python'],
            completed: false
        },
        {
            subject: 'WDD',
            number: 130,
            title: 'Web Fundamentals',
            credits: 2,
            certificate: 'Web and Computer Programming',
            description: 'This course introduces students to the World Wide Web and to careers in web site design and development. The course is hands on with students actually participating in simple web designs and programming. It is anticipated that students who complete this course will understand the fields of web design and development and will have a good idea if they want to pursue this degree as a major.',
            technology: ['HTML', 'CSS'],
            completed: false
        },
        {
            subject: 'CSE',
            number: 111,
            title: 'Programming with Functions',
            credits: 2,
            certificate: 'Web and Computer Programming',
            description: 'CSE 111 students become more organized, efficient, and powerful computer programmers by learning to research and call functions written by others; to write, call , debug, and test their own functions; and to handle errors within functions. CSE 111 students write programs with functions to solve problems in many disciplines, including business, physical science, human performance, and humanities.',
            technology: ['Python'],
            completed: false
        },
        {
            subject: 'CSE',
            number: 210,
            title: 'Programming with Classes',
            credits: 2,
            certificate: 'Web and Computer Programming',
            description: 'This course will introduce the notion of classes and objects. It will present encapsulation at a conceptual level. It will also work with inheritance and polymorphism.',
            technology: ['C#'],
            completed: false
        },
        {
            subject: 'WDD',
            number: 131,
            title: 'Dynamic Web Fundamentals',
            credits: 2,
            certificate: 'Web and Computer Programming',
            description: 'This course builds on prior experience in Web Fundamentals and programming. Students will learn to create dynamic websites that use JavaScript to respond to events, update content, and create responsive user experiences.',
            technology: ['HTML', 'CSS', 'JavaScript'],
            completed: false
        },
        {
            subject: 'WDD',
            number: 231,
            title: 'Frontend Web Development I',
            credits: 2,
            certificate: 'Web and Computer Programming',
            description: 'This course builds on prior experience with Dynamic Web Fundamentals and programming. Students will focus on user experience, accessibility, compliance, performance optimization, and basic API usage.',
            technology: ['HTML', 'CSS', 'JavaScript'],
            completed: false
        }
    ];

    courses.forEach(course => {
        if (course.title === 'Introduction to Programming' || course.title === 'Web Fundamentals' || course.title === 'Programming with Functions' || course.title === 'Programming with Classes' || course.title === 'Dynamic Web Fundamentals') {
            course.completed = true;
        }
    });

    function displayCourses(courseArray) {
        const coursesDiv = document.querySelector('.courses');
        coursesDiv.innerHTML = '';

        courseArray.forEach(course => {
            const courseButton = document.createElement('button');
            courseButton.classList.add(course.subject.toLowerCase());
            if (course.completed) {
                courseButton.classList.add('completed');
            }
            courseButton.innerHTML = `
                <h3>${course.title}</h3>
            `;
            coursesDiv.appendChild(courseButton);

            courseButton.addEventListener('click', () => {
                toggleDetails(courseButton, course);
            });
        });
    }

    function toggleDetails(courseButton, course) {
        const details = courseButton.querySelector('.details');
        if (details) {
            details.remove(); 
        } else {
            const detailsDiv = document.createElement('div');
            detailsDiv.classList.add('details');
            detailsDiv.innerHTML = `
                <p><strong>Credits:</strong> ${course.credits}</p>
                <p><strong>Description:</strong> ${course.description}</p>
                <p><strong>Technologies:</strong> ${course.technology.join(', ')}</p>
            `;
            courseButton.appendChild(detailsDiv);
        }
    }

    function calculateTotalCredits(courseArray) {
        return courseArray.reduce((total, course) => total + course.credits, 0);
    }

    function updateTotalCredits(courseArray) {
        const totalCredits = calculateTotalCredits(courseArray);
        document.getElementById('totalCredits').textContent = totalCredits;
    }

    displayCourses(courses);
    
    updateTotalCredits(courses);

    const filterButtons = document.querySelectorAll('.filter-buttons button');
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const filter = button.textContent;
            let filteredCourses;
            if (filter === 'All') {
                filteredCourses = courses;
            } else {
                filteredCourses = courses.filter(course => course.subject === filter);
            }
            displayCourses(filteredCourses);
            updateTotalCredits(filteredCourses); 
        });
    });

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
});
