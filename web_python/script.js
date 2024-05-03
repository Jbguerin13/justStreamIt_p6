//function to fetch data from url APIrest
function loadJsonFromUrl(url){
    fetch(url)
    .then(response => response.json())
    .then(jsonData => {return jsonData})
    .catch(error => {
        //error management
        console.error('error fetching data', error);
    })
}

//general function to fetch elem by id
function fetchMovieById(jsonData){
    let id = jsonData.results[0].id;
    let movieUrlByID = "http://localhost:8000/api/v1/" + id;
    return movieUrlByID
}



//Best movie API request
let bestMovieJsonUrl = "http://localhost:8000/api/v1/titles/?sort_by=-imdb_score,-votes";

//url to delete

let jsonDataBestMovie = loadJsonFromUrl(bestMovieJsonUrl)
console.log(jsonDataBestMovie)

//let bestMovie = "http://localhost:8000/api/v1/titles/9008642"

// Injection data in HTML Element Best Movie

function bestFilmResultMainPage(result){
    document.getElementById("bestMovie_image_url").innerHTML = "<img src=" + result.image_url + "alt='Best Film Image' height='400' width='400'/>";
    document.getElementById("bestMovie_title").innerHTML = result.title;
    document.getElementById("bestFilm__description").innerHTML = result.description;
  }