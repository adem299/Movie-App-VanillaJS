const API_KEY = 'api_key=727d4be56cbb5ba696d271608baef3f9';
const BASE_URL = 'https://api.themoviedb.org/3/';
const API_URL = BASE_URL + '/discover/movie?sort_by=popularity.desc&' + API_KEY;
const IMG_URL = 'https://image.tmdb.org/t/p/w500/';
const searchURL = BASE_URL + '/search/movie?' + API_KEY;

getMovies(API_URL);

const main = document.getElementById('main');
const form = document.getElementById('form');
const search = document.getElementById('search');

function getMovies(url) {
    fetch(url).then(res => res.json()).then(data=> {
        showMovies(data.results);
    });

}

function showMovies(data) {
    main.innerHTML = '';
    data.forEach(movie => {
        const {title, poster_path, vote_average, overview} = movie;
        const movieElement = document.createElement('div');
        movieElement.classList.add('movie');
        movieElement.innerHTML = `
            <img src="${IMG_URL+poster_path}" alt="${title}">
            <div class="movie-info">
                <h3>${title}</h3>
                <span class="rate">${vote_average}</span>
            </div>

            <div class="overview">
                <h3>Detail Info</h3>
                <p class="text-start">${overview}</p>
                
            </div>
        
        `

        main.appendChild(movieElement);
    });
}

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const searchTerm = search.value;

    if(searchTerm) {
        getMovies(searchURL+'&query='+searchTerm);
    }else {
        getMovies(API_URL);
    }
})