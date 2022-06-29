import React, { useContext } from 'react';

import GenreCard from './GenreCard';
import SpotifyContext from '../../context/spotify/SpotifyContext';

function GenreResults() {
  const {genres, getMoreGenres} = useContext(SpotifyContext);

  const handleGetMoreGenres = () => {
    getMoreGenres(genres.length)
  }

  if (genres)
    return (
      <>
        <div className="flex flex-wrap justify-center">
      
           {genres.map((genre) => {
             return (
               <GenreCard key={genre.id} id={genre.id} name={genre.name} imgUrl={genre.icons[0].url} link={genre.href}/>
             )
            
           })}
        </div>
        {(genres.length%50 === 0) && 
          (
            <div className="w-full p-10 flex justify-center">
              <button className="btn btn-info shadow-lg shadow-black" onClick={handleGetMoreGenres}>
                More Genres
              </button>
            </div>
          )
        }
        
      </>
      
    )
  
};

export default GenreResults;