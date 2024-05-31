import React, {Component} from 'react';
import debounce from 'lodash.debounce';
import { Tabs } from 'antd';

import SearchInput from '../search-input';
import MovieList from '../movie-list';
import TMDBService from '../../services/tmdb-service';
import { TMBDGenresProvider } from '../tmdb-genres-context';

import './app.css';

export default class App extends Component {

    tmdbService = new TMDBService;

    state = {
        tab: 1,
        searchText: '',
        genreList: []
    };

    componentDidMount() {
        this.tmdbService.getGenres()
            .then((data) => {
                this.setState({
                    genreList: data.genres
                });
            });
    }

    tabs = [
        {
            key: 1,
            label: 'Search'
        },
        {
            key: 2,
            label: 'Rated'
        }
    ];

    debouncedSearchText = debounce((text) => {
        this.setState({
            searchText: text
        });
    }, 1000);

    getGenre = (id) => {
        return this.state.genreList.find(genre => genre.id === id).name;
    };

    onChangeTab = (key) => {
        this.setState({
            tab: key
        });
    };

    onChangeSearchText = (text) => {
        this.debouncedSearchText(text);
    };

    render() {
        return(
            <main className='main'>
                <Tabs
                    defaultActiveKey='1'
                    items={this.tabs}
                    centered
                    onChange={this.onChangeTab}
                />
                <SearchInput
                    tab={this.state.tab}
                    onChangeSearchText={this.onChangeSearchText}
                />
                <TMBDGenresProvider value={this.getGenre}>
                    <MovieList
                        tab={this.state.tab}
                        searchText={this.state.searchText}
                    />
                </TMBDGenresProvider>
            </main>
        );
    }
}