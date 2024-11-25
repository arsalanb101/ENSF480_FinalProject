// Redirect function for navigation
function redirectTo(page) {
    window.location.href = page;
}

// Movies Data (Shared Across Pages)
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
        poster: "https://posterspy.com/wp-content/uploads/2020/12/spiderverse.jpg",
        description: "Join Miles Morales in the multiverse adventure.",
        tickets: ["2024-01-05", "2024-01-06", "2024-01-07"]
    },
    { 
        title: "Spider-Man: Across The Spider-Verse", 
        poster: "https://posterspy.com/wp-content/uploads/2020/12/spiderverse.jpg",
        description: "Join Miles Morales in the multiverse adventure.",
        tickets: ["2024-01-05", "2024-01-06", "2024-01-07"]
    },
    { 
        title: "Spider-Man: Across The Spider-Verse", 
        poster: "https://posterspy.com/wp-content/uploads/2020/12/spiderverse.jpg",
        description: "Join Miles Morales in the multiverse adventure.",
        tickets: ["2024-01-05", "2024-01-06", "2024-01-07"]
    },
    { 
        title: "Spider-Man: Across The Spider-Verse", 
        poster: "https://posterspy.com/wp-content/uploads/2020/12/spiderverse.jpg",
        description: "Join Miles Morales in the multiverse adventure.",
        tickets: ["2024-01-05", "2024-01-06", "2024-01-07"]
    },

];

// Logic for the Main Page (main.html)
function loadMovies() {
    const container = document.querySelector('.movie-container');
    if (!container) return; // Exit if not on the main page

    movies.forEach((movie, index) => {
        const movieCard = document.createElement('div');
        movieCard.classList.add('movie');
        movieCard.innerHTML = `
            <img src="${movie.poster}" alt="${movie.title}">
            <h3>${movie.title}</h3>
        `;
        movieCard.onclick = () => {
            sessionStorage.setItem('selectedMovie', JSON.stringify(movie));
            window.location.href = 'movie.html';
        };
        container.appendChild(movieCard);
    });
}

// Logic for the Movie Details Page (movie.html)
function loadMovieDetails() {
    const movieDetailsSection = document.querySelector('#movie-details');
    if (!movieDetailsSection) return; // Exit if not on the details page

    const movie = JSON.parse(sessionStorage.getItem('selectedMovie'));
    if (!movie) return;

    document.getElementById('movie-title').textContent = movie.title;
    document.getElementById('movie-description').textContent = movie.description;

    const ticketDates = document.getElementById('ticket-dates');
    movie.tickets.forEach(date => {
        const li = document.createElement('li');
        li.textContent = date;
        ticketDates.appendChild(li);
    });
}

// Automatically run functions based on the current page
document.addEventListener('DOMContentLoaded', () => {
    loadMovies();
    loadMovieDetails();
});
