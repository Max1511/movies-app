export default class TMDBService {
    _apiKey = 'e169eedb283d44076de7c8eaddd196bd';
    _apiSearch = 'https://api.themoviedb.org/3/search/movie';
    _apiMovie = 'https://api.themoviedb.org/3/movie';
    _apiGenres = 'https://api.themoviedb.org/3/genre/movie/list';

    getMovies = async (searchText, page) => {
        const link = `${this._apiSearch}?query=${searchText}&page=${page}&api_key=${this._apiKey}`;
        const result = await fetch(link);

        if (!result.ok) {
            throw new Error(`Could not fetch ${link}. Received ${result.status}`);
        }
        return await result.json();
    };

    getMoviesById = async (ids) => {
        const movies = [];
        for (let i = 0; i < ids.length; i++) {
            const link = `${this._apiMovie}/${ids[i]}?api_key=${this._apiKey}`;
            const result = await fetch(link);

            if (!result.ok) {
                throw new Error(`Could not fetch ${link}. Received ${result.status}`);
            }
            movies.push(await result.json());
        }
        return movies;
    };

    getGenres = async () => {
        const link = `${this._apiGenres}?api_key=${this._apiKey}`;
        const result = await fetch(link);

        if (!result.ok) {
            throw new Error(`Could not fetch ${link}. Received ${result.status}`);
        }
        return await result.json();
    };
}