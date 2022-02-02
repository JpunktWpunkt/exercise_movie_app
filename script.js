const API_URL = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=7a4e6b10dedd14583f6ffedb1d90f17d&page=1';
const IMG_PATH = 'https://image.tmdb.org/t/p/w1280';
const SEARCH_API = 'https://api.themoviedb.org/3/search/movie?api_key=7a4e6b10dedd14583f6ffedb1d90f17d&query="';
const main = document.getElementById('main');
const form = document.getElementById('form');
const search = document.getElementById('search');

// Initializes movies
getMovies(API_URL);

async function getMovies(url) {
    const response = await fetch(url)
    const data = await response.json()

    showMovies(data.results)
    console.log(data.results)
}

function showMovies(movies) {
    main.innerHTML = ''

    movies.forEach((movie) => {
        const { title, poster_path, vote_average, overview } = movie

        const movieElement = document.createElement('div');
        movieElement.classList.add('movie');

        movieElement.innerHTML = `

        <img src="${IMG_PATH + poster_path}"
             alt="${title}">
        <div class="movie-info">
            <h3>${title}</h3>
            <span class="${getClassByRate(vote_average)}">${vote_average}</span>
        </div>
        <div class="overview">
            <h3>Overview</h3>
            ${overview}
        </div>
`
        main.appendChild(movieElement);
    })
}

//Search
form.addEventListener('submit', (event) => {
    event.preventDefault()

    const searchTerm = search.value;
    console.log(searchTerm);


    if (searchTerm && searchTerm !== '') {
        getMovies(SEARCH_API + searchTerm)

        search.value = ''
    } else {
        window.location.reload()
    }
});


// ranking
function getClassByRate(vote) {
    if (vote >= 8) {
        return 'green'
    } else if (vote >= 5) {
        return 'orange'
    } else {
        return 'red'
    }
}






