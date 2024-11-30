// Redirect function for navigation
function redirectTo(page) {
    window.location.href = page;
}

// Movies Data
const movies = [
    { 
        title: "Interstellar", 
        poster: "https://th.bing.com/th/id/R.f00ef4ef28062a3ffe32c80cfa039c86?rik=UKxcb7t5jAetVQ&pid=ImgRaw&r=0",
        description: "A science fiction epic exploring the cosmos.",
        tickets: ["2024-01-01", "2024-01-02", "2024-01-03"]
    },
    { 
        title: "Spider-Man: Across The Spider-Verse", 
        poster: "https://posterspy.com/wp-content/uploads/2020/12/spiderverse.jpg",
        description: "Join Miles Morales in the multiverse adventure.",
        tickets: ["2024-01-05", "2024-01-06", "2024-01-07"]
    },
    { 
        title: "Gladiator II", 
        poster: "https://m.media-amazon.com/images/I/81hNyq5+WnL._AC_SY679_.jpg",
        description: "The epic saga continues in Gladiator II.",
        tickets: ["2024-02-01", "2024-02-02", "2024-02-03"]
    },
    { 
        title: "Oppenheimer", 
        poster: "https://m.media-amazon.com/images/I/71eWURHqyoL._AC_SL1500_.jpg",
        description: "A biographical drama of the atomic bomb inventor.",
        tickets: ["2024-03-01", "2024-03-02", "2024-03-03"]
    },
    { 
        title: "Barbie", 
        poster: "https://m.media-amazon.com/images/I/61k+5i5b8nL._AC_SY679_.jpg",
        description: "Step into the colorful world of Barbie!",
        tickets: ["2024-04-01", "2024-04-02", "2024-04-03"]
    },
    { 
        title: "Mission: Impossible - Dead Reckoning", 
        poster: "https://m.media-amazon.com/images/I/81hNyq5+WnL._AC_SY679_.jpg",
        description: "Ethan Hunt is back with another thrilling mission!",
        tickets: ["2024-05-01", "2024-05-02", "2024-05-03"]
    }
];

let currentSlide = 0;

// Load Carousel
function loadCarousel() {
    const slidesContainer = document.querySelector(".carousel-wrapper");
    movies.forEach(movie => {
        const slide = document.createElement("div");
        slide.classList.add("carousel-slides");
        slide.style.backgroundImage = `url(${movie.poster})`;
        slide.innerHTML = `
            <h2>${movie.title}</h2>
            <p>${movie.description}</p>
        `;
        slidesContainer.appendChild(slide);
    });
}

// Update Slide
function updateSlide() {
    const slidesContainer = document.querySelector(".carousel-wrapper");
    slidesContainer.style.transform = `translateX(-${currentSlide * 100}%)`;
}

// Next Slide
function nextSlide() {
    currentSlide = (currentSlide + 1) % movies.length;
    updateSlide();
}

// Previous Slide
function prevSlide() {
    currentSlide = (currentSlide - 1 + movies.length) % movies.length;
    updateSlide();
}

// Load Movies for Both Sections
function loadMovies(containerClass) {
    const container = document.querySelector(containerClass);
    if (!container) return;

    movies.forEach(movie => {
        const movieCard = document.createElement('div');
        movieCard.classList.add('movie');
        movieCard.innerHTML = `
            <img src="${movie.poster}" alt="${movie.title}">
            <h3>${movie.title}</h3>
        `;

        // Add hover effect for "See More Details"
        const hoverEffect = document.createElement('div');
        hoverEffect.classList.add('hover-details');
        hoverEffect.textContent = "See More Details";
        movieCard.appendChild(hoverEffect);

        // Redirect to movie details page on click
        movieCard.onclick = () => {
            sessionStorage.setItem('selectedMovie', JSON.stringify(movie));
            redirectTo('movie.html');
        };

        container.appendChild(movieCard);
    });
}

// Load Movie Details on movie.html
function loadMovieDetails() {
    const movieDetailsSection = document.querySelector('#movie-details');
    if (!movieDetailsSection) return; // Exit if not on the details page

    const movie = JSON.parse(sessionStorage.getItem('selectedMovie'));
    if (!movie) {
        document.body.innerHTML = `<p>Error: No movie data found.</p>`;
        return;
    }

    document.getElementById('movie-title').textContent = movie.title;
    document.getElementById('movie-description').textContent = movie.description;

    const ticketDates = document.getElementById('ticket-dates');
    movie.tickets.forEach(date => {
        const li = document.createElement('li');
        li.textContent = date;
        li.onclick = () => {
            alert(`You selected ${date} for ${movie.title}!`);
        };
        ticketDates.appendChild(li);
    });
}

// Initialize Functions
document.addEventListener("DOMContentLoaded", () => {
    loadCarousel();
    loadMovies('.movie-container'); // For the "Now Showing" section
    loadMovies('.all-movies-container'); // For the "All Movies" section
    loadMovieDetails();
    updateSlide();
    setInterval(nextSlide, 5000); // Auto-scroll every 5 seconds
});

async function fetchMovies() {
    const response = await fetch('http://localhost:8080/movies');
    const movies = await response.json();
    console.log(movies);
}

async function fetchSeats(movieId) {
    const response = await fetch(`http://localhost:8080/seats/${movieId}`);
    const seatMap = await response.json();
    console.log(seatMap);
}

document.addEventListener("DOMContentLoaded", () => {
    fetchMovies();
});
