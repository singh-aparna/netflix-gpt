import React from 'react';
import Header from './Header';
import useNowPlayingMovies from '../hooks/useNowPlayingMovies';
import MainContainer from './MainContainer';
import SecondaryContainer from './SecondaryContainer';
import usePopularMovies from '../hooks/usePopularMovies';
import useUpcomingMovies from '../hooks/useUpcomingMovies';
import useTopratedMovies from '../hooks/useTopratedMovies';
import GptSearch from './GptSearch';
import { useSelector } from 'react-redux';

const Browse = () => {
  const showGptSearch = useSelector(store => store.gpt.showGptSearch);
  useNowPlayingMovies();
  usePopularMovies();
  useUpcomingMovies();
  useTopratedMovies();
  return (
    <div>
      <Header />
      {
        showGptSearch ? <GptSearch /> : <div><MainContainer /><SecondaryContainer /></div>
      }

    </div>
  )
}
export default Browse;