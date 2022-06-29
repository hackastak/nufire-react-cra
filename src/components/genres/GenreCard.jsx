import React, { useContext } from 'react';
import { Link } from 'react-router-dom';

import SpotifyContext from '../../context/spotify/SpotifyContext';

function GenreCard(props) {
  const {getGenrePlaylists} = useContext(SpotifyContext);

  function handleGenrePlaylists(e) {
    getGenrePlaylists(e.target.id);
  }

  return (
    <div className="card flex-column shadow-xl p-0 mx-5 mt-10 w-64">
      <figure className="shadow-sm w-full">
        <img src={props.imgUrl} alt="Genre Cover" />
      </figure>
      <div className="card-body items-center text-center">
        <h2 className="card-title text-white">{props.name}</h2>
        <div className="card-actions flex flex-column flex-wrap justify-center items-center mt-3">
          <Link to="/playlists">
            <button className="btn btn-outline btn-sm btn-info shadow-sm shadow-black" id={props.id} onClick={handleGenrePlaylists}>Get Playlists</button>
          </Link>
        </div>

      </div>
    </div>
  )
}

export default GenreCard;