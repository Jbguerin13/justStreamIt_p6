const ApiUrlTitles = "http://localhost:8000/api/v1/titles/"
const urlTest = "http://localhost:8000/api/v1/titles/?sort_by=-imdb_score,-votes";


//function to fetch data from url APIrest
// Fonction pour récupérer les données depuis l'API
async function loadJsonFromUrl(url) {
    try {
        const response = await fetch(url);
        const jsonData = await response.json();
        return jsonData;
    } catch (error) {
        console.error('Erreur lors du chargement des données:', error);
    }
}

// Fonction pour récupérer l'URL du film par ID
async function getUrlBestMovieById(url) {
    let jsonData = await loadJsonFromUrl(url)
    let movieId = jsonData.results[0].id;
    let movieUrlByID = ApiUrlTitles + movieId;
    return movieUrlByID;
}

// Fonction pour récupérer le json du meilleur film
async function jsonBestMovie() {
    const movieUrlByID = await getUrlBestMovieById(urlTest);
    if (movieUrlByID) {
        const data = await loadJsonFromUrl(movieUrlByID);
        return data;
    } else {
        console.error('Failed to load data');
    }
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