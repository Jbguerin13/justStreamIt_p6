const ApiUrlTitles = "http://localhost:8000/api/v1/titles/"
const urlTest = "http://localhost:8000/api/v1/titles/?sort_by=-imdb_score,-votes";
const urlMystery = "http://localhost:8000/api/v1/titles/?sort_by=-imdb_score,-votes&genre=mystery"
const urlAction = "http://localhost:8000/api/v1/titles/?sort_by=-imdb_score,-votes&genre=action"
const urlComedy = "http://localhost:8000/api/v1/titles/?sort_by=-imdb_score,-votes&genre=comedy"


// function to fetch data sort by imdb&votes
async function loadJsonFromUrl(url) {
    try {
        const response = await fetch(url);
        const jsonData = await response.json();
        return jsonData;
    } catch (error) {
        console.error('Erreur lors du chargement des données:', error);
    }
}

// fct to fetch the best movie url
async function getUrlBestMovieById(url) {
    let jsonData = await loadJsonFromUrl(url)
    let movieId = jsonData.results[0].id;
    let movieUrlByID = ApiUrlTitles + movieId;
    return movieUrlByID;
}

// fct to fetch the best movie json
async function jsonBestMovie() {
    const movieUrlByID = await getUrlBestMovieById(urlTest);
    if (movieUrlByID) {
        const data = await loadJsonFromUrl(movieUrlByID);
        return data;
    } else {
        console.error('Failed to load data');
    }
}

// Function to fetch the URLs of the 6 best movies
async function getUrlsSixBestMoviesById(url) {
    let jsonData = await loadJsonFromUrl(url);
    let listMovieUrls = [];

    for (let i = 0; i < 6; i++) {
        let movieId = jsonData.results[i].id;
        let movieUrlByID = ApiUrlTitles + movieId;
        movieUrls.push(movieUrlByID);
    }

    return listMovieUrls;
}



const bestMovieJson = await jsonBestMovie()
console.log(bestMovieJson)

// Injection data in HTML Element Best Movie

// function bestFilmResultMainPage(jsonDataBestMovie){
//     document.getElementById("bestMovie_image_url")
//     .innerHTML = "<img src=" + jsonDataBestMovie.image_url + "alt='Best Film Image' height='400' width='400'/>";
//     document.getElementById("bestMovie_title")
//     .innerHTML = bestMovieJson.title;
//     document.getElementById("bestFilm__description")
//     .innerHTML = jsonDataBestMovie.description;
//     }

// modal window - when click to detail button

// Modal window - when clicking the detail button
function fetchDataForModalWindow(jsonDataBestMovie) {
    document.getElementById("modal-cover")
        .src = jsonDataBestMovie.image_url;
    document.getElementById("modal-title")
        .innerHTML = jsonDataBestMovie.title;
    document.getElementById("modal-year")
        .innerHTML = jsonDataBestMovie.year;
    document.getElementById("modal-genres")
        .innerHTML = jsonDataBestMovie.genres.join(', ');
    document.getElementById("modal-duration")
        .innerHTML = jsonDataBestMovie.duration + ' min';
    document.getElementById("modal-imdb")
        .innerHTML = `IMDb: ${jsonDataBestMovie.imdb_score}`;
    document.getElementById("modal-directors")
        .innerHTML = jsonDataBestMovie.directors.join(', ');
    document.getElementById("modal-cast")
        .innerHTML = jsonDataBestMovie.actors.join(', ');
    document.getElementById("modal-country")
        .innerHTML = jsonDataBestMovie.countries.join(', ');
    document.getElementById("modal-box-office")
        .innerHTML = jsonDataBestMovie.box_office;
    document.getElementById("modal-desc")
        .innerHTML = jsonDataBestMovie.long_description;
    
    // Display the modal
    const modal = document.getElementById('modal');
    modal.style.display = 'flex';
}

// Function to close the modal
function closeModal() {
    const modal = document.getElementById('modal');
    modal.style.display = 'none';
}

// Add event listener for closing the modal
document.querySelector('.close').addEventListener('click', closeModal);
document.getElementById('modal').addEventListener('click', function (e) {
    if (e.target === document.getElementById('modal')) {
        closeModal();
    }
});

async function main() {
    // Load best movie and inject data into the page
    const bestMovieJson = await jsonBestMovie();
    bestFilmResultMainPage(bestMovieJson);

    // Setup event listener for the detail button
    document.querySelector('#best-movie button').addEventListener('click', function () {
        fetchDataForModalWindow(bestMovieJson);
    });
}

main();

// Setup selection per genre
let genresUrl = "http://localhost:8000/api/v1/genres/"

// Fetch the list of genres and populate the genre selection
async function loadGenres() {
    let jsonData = await loadJsonFromUrl(genresUrl);
    let genreList = jsonData.results.map(genre => genre.name);

    // Populate the genre dropdown or list
    let genreSelect = document.querySelector('#genre-select');
    genreList.forEach(genre => {
        let option = document.createElement('option');
        option.value = genre;
        option.textContent = genre;
        genreSelect.appendChild(option);
    });
}

// Event listener for genre selection
document.querySelector('#genre-select').addEventListener('change', async function () {
    let selectedGenre = this.value;
    let genreUrl = `${ApiUrlTitles}?sort_by=-imdb_score,-votes&genre=${selectedGenre}`;
    let genreMovies = await getUrlsSixBestMoviesById(genreUrl);

    // Inject genre movie data into the corresponding section
    // Implementation similar to `bestFilmResultMainPage`
});

loadGenres();