import React, {Component} from 'react';
import { Spin, Pagination } from 'antd';

import SearchInput from '../search-input';
import MovieList from '../movie-list';
import ErrorIndicator from '../error-indicator';
import TMDBService from '../../services/tmdb-service';

export default class SearchTab extends Component {

    componentDidMount() {
        this.updateMovies();
    }

    componentDidUpdate(previousProps, previousState) {
        if (previousProps.searchText === this.props.searchText &&
            previousState.page === this.state.page)
            return;
        this.updateMovies();
    }

    tmdbService = new TMDBService();

    state = {
        movies: [],
        page: 1,
        pageSize: 20,
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
        const {searchText} = this.props;
        const page = this.state.page;

        this.tmdbService.getMovies(searchText, page)
            .then(this.onMoviesLoaaded)
            .catch(this.onError);
    }

    render() {
        const { movies, page, pageSize, totalPages, loading, error } = this.state;

        const hasData = !(loading || error);

        const errorMessage = error ? <ErrorIndicator className='error-message'/> : null;
        const spinner = loading ? <Spin className='spinner' size='large'/> : null;
        const content = hasData ? <MovieList movies={movies}/> : null;
        const pagination = hasData && totalPages > 1 ? <Pagination
            className='paginaion'
            size='small'
            pageSize={pageSize}
            pageSizeOptions={[]}
            defaultCurrent={page}
            total={totalPages * pageSize}
            onChange={this.onChangePage}/> : null;

        return(
            <>
                <SearchInput
                    onChangeSearchText={this.props.onChangeSearchText}
                />
                {errorMessage}
                {spinner}
                {content}
                {pagination}
            </>
        );
    }
}