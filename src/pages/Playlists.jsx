import React, {useContext} from 'react';

import SpotifyContext from '../context/spotify/SpotifyContext';
import ExplorePanel from '../components/layouts/ExplorePanel';
import PlaylistResults from '../components/playlists/PlaylistResults';


function Playlists() {
   const {loading} = useContext(SpotifyContext);

  return (
    <>
      <ExplorePanel />
      {!loading && (
        <>
          <PlaylistResults />
        </>
      )}
    </>
  )
}

export default Playlists;