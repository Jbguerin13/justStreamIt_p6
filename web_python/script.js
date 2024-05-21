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

async function main() {

}
main()
 // setup detailButton

// let detailButton = document.querySelectorAll('button')
// detailButton.addEventListener("click", function () {console.log("ok button")});

//setup selection per genre

let genresUrl = "http://localhost:8000/api/v1/genres/"

// recup de la liste des genres


//logique de la recuperation du genre via la liste 
// pour tout name dans results.name
// if evenement user == name :
// return name