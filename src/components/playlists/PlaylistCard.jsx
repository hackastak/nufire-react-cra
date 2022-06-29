import React, { useContext } from 'react';
import { Link } from 'react-router-dom';

import SpotifyContext from '../../context/spotify/SpotifyContext';

function PlaylistCard(props) {
  const {getPlaylistTracks} = useContext(SpotifyContext);

  const handleGetPlaylistTracks = (e) => {
    getPlaylistTracks(e.target.id);
  }

  return (
    <div className="card flex-column shadow-xl p-0 mx-5 mt-10 w-64">
      <figure className="shadow-sm w-full">
        <img src={props.imgUrl} alt="Genre Cover" />
      </figure>
      <div className="card-body items-center text-center">
        <h2 className="card-title text-white">{props.name}</h2>
        <div className="card-actions flex flex-column flex-wrap justify-center items-center mt-3">
          <a href={props.link} target="_blank" rel="noreferrer">
            <button className="btn btn-outline btn-sm btn-success shadow-sm shadow-black">View in Spotify</button>
          </a>
          <Link to="/tracks" state={{ playlistId: props.id, playlistImage: props.imgUrl, playlistName: props.name, playlistLink: props.link }}>
            <button id={props.id} className="btn btn-outline btn-sm btn-success shadow-sm shadow-black" onClick={handleGetPlaylistTracks}>Get Tracks</button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default PlaylistCard;