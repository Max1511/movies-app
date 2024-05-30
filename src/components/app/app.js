import React, {Component} from 'react';
//import debounce from 'lodash.debounce';
import { Tabs } from 'antd';

import SearchInput from '../search-input';
import MovieList from '../movie-list';

import './app.css';

export default class App extends Component {

    state = {
        tab: 1,
        searchText: ''
    };

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

    onChangeTab = (key) => {
        this.setState({
            tab: key
        });
    };

    onChangeSearchText = (text) => {
        this.setState({
            searchText: text
        });
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
                <MovieList
                    tab={this.state.tab}
                    searchText={this.state.searchText}
                />
            </main>
        );
    }
}