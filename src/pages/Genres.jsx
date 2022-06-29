import React, { useContext } from 'react';

import SpotifyContext from '../context/spotify/SpotifyContext';
import ExplorePanel from '../components/layouts/ExplorePanel';
import GenreResults from '../components/genres/GenreResults';

function Genres() {
  const {genres, deleteResults} = useContext(SpotifyContext);

  return (
    <>
      <ExplorePanel />
      {genres.length > 0 && (
        <>
          <GenreResults />
        </>
      )}
    </>
    
  )
}

export default Genres;