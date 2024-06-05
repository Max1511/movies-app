import React, {Component} from 'react';
import { Spin, Pagination } from 'antd';

import MovieList from '../movie-list';
import ErrorIndicator from '../error-indicator';
import TMDBService from '../../services/tmdb-service';

export default class RatedTab extends Component {

    state = {
        movies: [],
        page: 1,
        pageSize: 20,
        totalPages: 1,
        loading: true,
        error: false
    };

    componentDidMount() {
        this.updateMovies();
    }

    componentDidUpdate(previousProps, previousState) {
        if (previousState.page === this.state.page)
            return;
        this.updateMovies();
    }

    tmdbService = new TMDBService();

    onMoviesLoaaded = (movies) => {
        this.setState(() => {
            const newArray = [];
            movies.forEach((movie) => {
                newArray.push({
                    ...movie,
                    userRating: Number(localStorage.getItem(movie.id))
                });
            });
            return {
                movies: newArray,
                loading: false,
                error: false
            };
        });
    };

    onChangePage = (page) => {
        this.setState({
            page: page,
            loading: true,
        });
    };

    onError = () => {
        this.setState({
            loading: false,
            error: true
        });
    };

    updateMovies = () => {
        const ids = [];
        const pageSize = this.state.pageSize;
        const firstIndex = (this.state.page - 1) * pageSize;
        const minCount = Math.min(pageSize, localStorage.length - firstIndex);

        this.setState({
            totalPages: Math.ceil(localStorage.length / pageSize)
        });

        for (let i = firstIndex; i < firstIndex + minCount; i++) {
            ids.push(localStorage.key(i));
        }
        this.tmdbService.getMoviesById(ids)
            .then(this.onMoviesLoaaded)
            .catch(this.onError);
    };

    render() {
        const {movies, page, pageSize, totalPages, error, loading} = this.state;

        const hasData = !(loading || error);

        const errorMessage = error ? <ErrorIndicator className='error-message'/> : null;
        const spinner = loading ? <Spin className='spinner' size='large'/> : null;
        const content = hasData ? <MovieList movies={movies}/> : null;
        const pagination = totalPages > 1 ? <Pagination
            className='paginaion'
            size='small'
            pageSize={pageSize}
            pageSizeOptions={[]}
            defaultCurrent={page}
            total={totalPages * pageSize}
            onChange={this.onChangePage}/> : null;
        console.log(totalPages);
        return (
            <>
                {errorMessage}
                {spinner}
                {content}
                {pagination}
            </>
        );
    }
}