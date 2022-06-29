import React, { useContext } from 'react';

import PlaylistCard from './PlaylistCard';
import SpotifyContext from '../../context/spotify/SpotifyContext';

function PlaylistResults() {
  const {playlists} = useContext(SpotifyContext);

  if (playlists)
    return (
      <div className="flex flex-wrap justify-center">
         
        {playlists.map((playlist) => {
          return (
            <PlaylistCard key={playlist.id} id={playlist.id} name={playlist.name} imgUrl={playlist.images[0].url} link={playlist.external_urls.spotify}/>
          )
          
        })}
      </div> 
    )
  
};

export default PlaylistResults;