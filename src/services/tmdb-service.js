export default class TMDBService {
    _apiKey = 'e169eedb283d44076de7c8eaddd196bd';
    _apiTrending = 'https://api.themoviedb.org/3/trending/movie/day';
    _apiSearch = 'https://api.themoviedb.org/3/search/movie';
    _apiGenres = 'https://api.themoviedb.org/3/genre/movie/list';

    getMovies = async (tab, searchText, page) => {
        let link = `${this._apiTrending}?page=${page}&api_key=${this._apiKey}`;
        if (tab == 1) {
            link = `${this._apiSearch}?query=${searchText}&page=${page}&api_key=${this._apiKey}`;
        }

        const result = await fetch(link);

        if (!result.ok) {
            throw new Error(`Could not fetch ${link}. Received ${result.status}`);
        }
        return await result.json();
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