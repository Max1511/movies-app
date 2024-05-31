import React, {Component} from 'react';
import { Spin, Pagination } from 'antd';

import Movie from '../movie';
import ErrorIndicator from '../error-indicator';
import TMDBService from '../../services/tmdb-service';

import './movie-list.css';

export default class MovieList extends Component {

    componentDidMount() {
        this.updateMovies();
    }

    componentDidUpdate(previousProps, previousState) {
        if (previousProps.tab !== this.props.tab) {
            this.setState({
                page: 1,
                loading: true,
            });
        }
        if (previousProps.tab === this.props.tab &&
            previousProps.searchText === this.props.searchText &&
            previousState.page === this.state.page)
            return;
        this.updateMovies();
    }

    tmdbService = new TMDBService();

    state = {
        movies: [],
        page: 1,
        totalPages: 1,
        loading: true,
        error: false
    };

    onMoviesLoaaded = (data) => {
        this.setState({
            movies: data.results,
            totalPages: data.total_pages,
            loading: false,
            error: false
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

    updateMovies() {
        const {tab, searchText} = this.props;
        const page = this.state.page;

        this.tmdbService.getMovies(tab, searchText, page)
            .then(this.onMoviesLoaaded)
            .catch(this.onError);
    }

    render() {
        const { movies, page, totalPages, loading, error } = this.state;

        const hasData = !(loading || error);

        const errorMessage = error ? <ErrorIndicator className='error-message'/> : null;
        const spinner = loading ? <Spin className='spinner' size='large'/> : null;
        const content = hasData ? <MovieListView movies={movies}/> : null;
        const pagination = hasData && totalPages > 1 ? <Pagination
            className='paginaion'
            size='small'
            pageSize={movies.length}
            pageSizeOptions={[]}
            defaultCurrent={page}
            total={totalPages}
            onChange={this.onChangePage}/> : null;

        return(
            <React.Fragment>
                {errorMessage}
                {spinner}
                {content}
                {pagination}
            </React.Fragment>
        );
    }
}

const MovieListView = ({ movies }) => {

    const elements = movies.map((movie, index) => {
        return (
            <li key={index}>
                <Movie movie={movie} />
            </li>
        );
    });

    return(
        <ul className='movie-list'>
            { elements }
        </ul>
    );
};