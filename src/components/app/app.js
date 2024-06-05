import React, {Component} from 'react';
import debounce from 'lodash.debounce';
import { Tabs } from 'antd';

import SearchTab from '../search-tab';
import RatedTab from '../rated-tab';
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

    renderTab = () => {
        return this.state.tab == 1 ? (
            <SearchTab
                onChangeSearchText={this.onChangeSearchText}
                searchText={this.state.searchText}
            />
        ) :
            (<RatedTab/>);
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
                <TMBDGenresProvider value={this.getGenre}>
                    {this.renderTab()}
                </TMBDGenresProvider>
            </main>
        );
    }
}