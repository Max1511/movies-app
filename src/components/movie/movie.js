import React from 'react';
import { format } from 'date-fns';

import Genres from '../genres';

import './movie.css';

const Movie = ({ movie }) => {

    const trimText = (text) => {
        const trimPosition = 150;
        if (text.length > trimPosition) {
            for (let i = trimPosition; i < text.length; i++) {
                if (text[i] === ' ') {
                    return text.slice(0, i) + '...';
                }
            }
        }
        return text;
    };

    return(
        <div className='element'>
            <img className='poster'
                src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                alt={movie.title}>
            </img>
            <div className='description'>
                <h2 className='title'>{movie.title}</h2>
                <span className='release-date'>{format(new Date(movie.release_date), 'MMMM dd, yyyy')}</span>
                <Genres genreIds={movie.genre_ids} />
                <p className='overview'>{trimText(movie.overview)}</p>
            </div>
        </div>
    );
};

export default Movie;