import React from 'react';
import { Input } from 'antd';

import './search-input.css';

const SearchInput = ({onChangeSearchText}) => {

    const onChange = function(event) {
        onChangeSearchText(event.target.defaultValue + event.nativeEvent.data);
    };

    return (
        <div className='search-input'>
            <Input
                type='text'
                placeholder='Type to search...'
                centered='true'
                onChange={onChange}
            />
        </div>
    );
};

export default SearchInput;