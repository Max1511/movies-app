import React from 'react';

import { TMBDGenresConsumer } from '../tmdb-genres-context';

import './genres.css';

const Genres = ({ genreIds }) => {
    const elements = genreIds.map((id, index) => {
        return (
            <TMBDGenresConsumer key={index}>
                {
                    (getGenre) => {
                        return (
                            <span
                                key={index}
                                className='genre'>
                                {getGenre(id)}
                            </span>
                        );
                    }
                }
            </TMBDGenresConsumer>
        );
    });

    return(
        <div className='genres'>
            { elements }
        </div>
    );
};

export default Genres;