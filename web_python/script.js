// Main urls and cst
const apiUrlTitles = "http://localhost:8000/api/v1/titles/";
const MainUrlBestMovie = "http://localhost:8000/api/v1/titles/?sort_by=-imdb_score,-votes";
const apiUrlGenres = "http://localhost:8000/api/v1/genres/?page_size=30";
const modalContainer = document.querySelector(".modal-container");

// Function to fetch data for modal window
async function fetchDataForModalWindow(movieUrl) {
    return fetch(movieUrl)
        .then(response => response.json())
        .then(data => {
            document.getElementById('modal-cover').src = data["image_url"];
            document.getElementById('modal-title').innerHTML = data["title"];
            document.getElementById('modal-year').innerHTML = data["year"];
            document.getElementById('modal-duration').innerHTML = data["duration"] + " min";
            document.getElementById('modal-genres').innerHTML = data["genres"];
            document.getElementById('modal-imdb').innerHTML = data["imdb_score"] + " / 10";
            document.getElementById('modal-rating').innerHTML = data["rated"];
            document.getElementById('modal-directors').innerHTML = data["directors"];
            document.getElementById('modal-cast').innerHTML = data["actors"] + "...";
            document.getElementById('modal-country').innerHTML = data["countries"];
            document.getElementById('modal-desc').innerHTML = data["long_description"];
            
            // worldwide_gross_income is null management
            let modalBoxOffice = document.getElementById('modal-box-office');
            if (data["worldwide_gross_income"] == null)
                modalBoxOffice.innerHTML = "N/A";
            else
                modalBoxOffice.innerHTML = data["worldwide_gross_income"] + " " + data["budget_currency"];
        });
}

// Add click event to .modal-triggers elements
function modalToggleButtons() {
    const modalTriggers = document.querySelectorAll(".modal-trigger");
    
    modalTriggers.forEach(trigger => {
        trigger.addEventListener("click", () => {
            getBestMovieDetails(apiUrlTitles);
            modalContainer.classList.toggle("active"); // Add or remove active class to modal window
        });
    });
}
modalToggleButtons();

// Function to display 6 best movies
function displayMovies(category, movieData) {
    
    let limitedMovieData = movieData.slice(0, 6);

    let targetElement = document.getElementById(category);

    limitedMovieData.forEach(data => {
        const imageUrl = data.image_url ? data.image_url : "img/JSI_logo.jpeg";
        
        const movieElement = document.createElement("div");
        movieElement.classList.add("movie");

        const imgCover = document.createElement("img");
        imgCover.src = imageUrl;
        imgCover.alt = data.original_title;

        imgCover.onerror = function() {
            this.onerror = null;
            this.src = "img/JSI_logo.jpeg";
        };

        const title = document.createElement("p");
        title.textContent = data.original_title;

        imgCover.addEventListener('click', () => {
            let movieUrl = `${apiUrlTitles}${data.id}`;
            fetchDataForModalWindow(movieUrl);
            modalContainer.classList.toggle("active");
        });

        movieElement.appendChild(imgCover);
        movieElement.appendChild(title);
        targetElement.appendChild(movieElement);
    });
}

// Function to fetch and display movies by category
function fetchAndDisplayMovies(category) {
    let url = `${MainUrlBestMovie}&genre=${category}&page_size=6`;
    fetch(url)
        .then(response => response.json())
        .then(data => {
            const movieUrls = data.results.map(result => `${apiUrlTitles}${result.id}`);
            Promise.all(movieUrls.map(url => fetch(url)))
                .then(responses => Promise.all(responses.map(res => res.json())))
                .then(movieData => displayMovies(category, movieData))
                .catch(error => console.error(`Error fetching movie details for category ${category}:`, error));
        })
        .catch(error => console.error(`Error fetching movies for category ${category}:`, error));
}

// Fetch Data of the best movie
function getBestMovieDetails(apiUrlTitles) {
    const bestMovieImg = document.getElementById("bestmovieimg");
    const titleElement = document.querySelector(".bestMovie h2");
    const descriptionElement = document.querySelector(".bestMovie p");

    fetch(MainUrlBestMovie)
        .then(response => response.json())
        .then(data => {
            const bestMovie = data.results[0];
            const bestMovieUrl = `${apiUrlTitles}${bestMovie.id}`;

            fetch(bestMovieUrl)
                .then(response => response.json())
                .then(movieDetails => {
                    bestMovieImg.src = movieDetails.image_url;
                    titleElement.textContent = movieDetails.title;
                    descriptionElement.textContent = movieDetails.description;
                    fetchDataForModalWindow(bestMovieUrl);
                })
                .catch(error => console.error('Error fetching movie details:', error));
        })
        .catch(error => console.error('Error fetching best movie:', error));
}

// Fetch best movie data details and display movies by category on window load
let categories = ["mystery", "action", "comedy"];

window.addEventListener('load', () => {
    getBestMovieDetails(apiUrlTitles);

    categories.forEach(category => {
        fetchAndDisplayMovies(category);
    });
});

// Function to update movie list based on selected category
function updateMoviesByCategory(category) {
    const targetElement = document.getElementById("categoryChoice");
    const targetCat = document.getElementsByClassName("movies")[4];

    targetElement.textContent = category;

    targetCat.id = category;

    targetCat.innerHTML = "";

    fetchAndDisplayMovies(category);
}

// Fetch populatecategories
async function fetchAndPopulateGenres() {
    try {
        const response = await fetch(apiUrlGenres);
        const data = await response.json();

        const submenu = document.querySelector('.submenu');

        data.results.forEach(genre => {
            const li = document.createElement('li');
            const a = document.createElement('a');
            a.href = '#';
            a.textContent = genre.name;
            
            // Add click event to dropdown menu items for each category
            a.addEventListener('click', (event) => {
                event.preventDefault();
                updateMoviesByCategory(genre.name);
            });
            
            li.appendChild(a);
            submenu.appendChild(li);
        });
    } catch (error) {
        console.error('Erreur lors de la récupération des catégories :', error);
    }
}

window.addEventListener('load', fetchAndPopulateGenres);
