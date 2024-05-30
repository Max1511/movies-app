import React from 'react';

import './genres.css';

const Genres = ({ genreIds }) => {
    const elements = genreIds.map((id, index) => {
        return (
            <span
                key={index}
                className='genre'>
                {id}
            </span>
        );
    });

    return(
        <div className='genres'>
            { elements }
        </div>
    );
};

export default Genres;