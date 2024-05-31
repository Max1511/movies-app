import React from 'react';
import { format } from 'date-fns';
import { Progress, Rate } from 'antd';

import Genres from '../genres';

import './movie.css';

const Movie = ({ movie }) => {

    const trimText = (text, trimPosition) => {
        if (text.length > trimPosition) {
            for (let i = trimPosition; i < text.length; i++) {
                if (text[i] === ' ') {
                    return text.slice(0, i) + '...';
                }
            }
        }
        return text;
    };

    const showDate = (date) => {
        if (typeof date === 'undefined' || date === '') return false;
        return true;
    };

    const vote = movie.vote_average;
    const progressColor = vote < 3 ? '#E90000' : vote < 5 ? '#E97E00' : vote < 7 ? '#E9D100' : '#66E900';

    const dateElement = showDate(movie.release_date) ?
        <span className='release-date'>{format(new Date(movie.release_date), 'MMMM dd, yyyy')}</span> :
        null;

    return(
        <div className='element'>
            <img className='poster'
                src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                alt={movie.title}>
            </img>
            <div className='description'>
                <div className='top'>
                    <h2 className='title'>{trimText(movie.title, 22)}</h2>
                    <Progress
                        className='progress'
                        type='circle'
                        size='small'
                        strokeColor={progressColor}
                        format={percent => (percent * 0.1).toFixed(1)}
                        percent={vote * 10}/>
                </div>
                {dateElement}
                <Genres genreIds={movie.genre_ids}/>
                <div className='bottom'>
                    <p className='overview'>{trimText(movie.overview, 150)}</p>
                    <Rate allowHalf='true' count={10}/>
                </div>
            </div>
        </div>
    );
};

export default Movie;