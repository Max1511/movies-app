import React, {useRef} from 'react';

import Movie from '../movie';

import './movie-list.css';

const MovieList = ({ movies }) => {

    const maxIdRef = useRef(0);
    const elements = movies.map((movie) => {
        maxIdRef.current++;
        return (
            <li key={maxIdRef.current}>
                <Movie movie={movie}/>
            </li>
        );
    });

    return(
        <ul className='movie-list'>
            { elements }
        </ul>
    );
};

export default MovieList;