import React, { useContext } from 'react';

import AlbumCard from './AlbumCard';
import SpotifyContext from '../../context/spotify/SpotifyContext';

function AlbumResults() {
  const {albums} = useContext(SpotifyContext);

  if (albums)
    return (
      <div className="flex flex-wrap justify-center">
         
        {albums.map((album) => {
          return (
            <AlbumCard key={album.id} id={album.id} name={album.name} artists={album.artists} imgUrl={album.images[0].url} albumType={album.album_type} albumLink={album.external_urls.spotify}/>
          )
          
        })}
      </div> 
    )
  
};

export default AlbumResults;