import React from 'react';
import { Input } from 'antd';

import './search-input.css';

const SearchInput = ({tab, onChangeSearchText}) => {

    if (tab !== 1) return;

    return (
        <div className='search-input'>
            <Input.Search
                type='text'
                placeholder='Type to search...'
                centered='true'
                onSearch={onChangeSearchText}
            />
        </div>
    );
};

export default SearchInput;