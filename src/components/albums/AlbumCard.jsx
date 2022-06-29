import React, { useContext } from 'react';
import { Link } from 'react-router-dom';

import SpotifyContext from '../../context/spotify/SpotifyContext';

function AlbumCard(props) {
  const {getArtistDetails, getArtistTopTracks} = useContext(SpotifyContext);

  const handleGetArtistDetails = (event) => {
    getArtistDetails(event.target.id);
    getArtistTopTracks(event.target.id);
  }

  return (
    <div className="card flex-column shadow-xl p-0 mx-5 mt-10 w-80">
      <figure className="shadow-sm w-full">
        <img src={props.imgUrl} alt="Genre Cover" />
      </figure>
      <div className="w-full mt-px mb-1 justify-center">
            <p className="text-white text-center">{props.albumType}</p>
      </div>
      <div className="card-body items-center text-center h-full justify-between p-2">
        <div className="h-2/5">
          <h2 className="text-2xl font-bold text-white">{props.name}</h2>
        </div>
        
        
        <div className="card-actions flex-column flex-wrap justify-around items-center mt-3">
          <div className="flex-column content-center justify-center mb-3 w-full">
            <h2 className="text-lg font-bold text-white">
              Artists:
            </h2>
            {props.artists.map((artist) => {
              return (
                <Link to="/artist-details" key={artist.id}>
                  <button id={artist.id} className="btn btn-sm btn-outline btn-error shadow-sm shadow-black w-full mb-1" onClick={handleGetArtistDetails}>
                    {artist.name}
                  </button>
                </Link>
                
              )
              
            })}
            
          </div>
          <div className="album-actions mt-auto">
            <button className="btn btn-outline btn-sm btn-info shadow-sm shadow-black mb-1 mr-1">Get Tracks</button>
            <a href={props.albumLink} className="mt-auto" target="_blank" rel="noreferrer">
              <button className="btn btn-outline btn-sm btn-success shadow-sm shadow-black">View in Spotify</button>
            </a>
          </div>
          
        </div>
      </div>
    </div>
  )
}

export default AlbumCard;