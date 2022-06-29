import React, { useContext, useEffect } from 'react';

import SpotifyContext from '../context/spotify/SpotifyContext';
import ExplorePanel from '../components/layouts/ExplorePanel';
import AlbumResults from '../components/albums/AlbumResults';

function Albums() {
  const {albums, getToken} = useContext(SpotifyContext);

  useEffect(() => {
    getToken();
  }, []);

  return (
    <>
      <ExplorePanel />
      {albums.length > 0 && (
        <AlbumResults />
      )}
    </>
  )
}

export default Albums;