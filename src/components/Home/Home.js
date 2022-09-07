import React, { useEffect } from 'react';
import MovieListing from '../MovieListing/MovieListing';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAsyncMovies, fetchAsyncShows } from '../../features/movies/movieSlice';
import './Home.scss';

const Home = () => {

    const status = useSelector((state) => state.movies.status);

    const dispatch = useDispatch();
    const movieText = "Mission";
    const showText = "Friends";

    useEffect(() => {
        dispatch(fetchAsyncMovies(movieText));
        dispatch(fetchAsyncShows(showText));
    }, [dispatch]);

    return (
        <div>
            {
                status === 'loading'
                    ?
                    (<div className='loading'>...Loading</div>)
                    :
                    (
                        <>
                            <div className='banner-img'></div>
                            <MovieListing />
                        </>
                    )}
        </div>
    );
};

export default Home;