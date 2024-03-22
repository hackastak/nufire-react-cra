import React, {useContext} from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';

import NuFireLogo from './NuFireLogo';
import SpotifyContext from '../../context/spotify/SpotifyContext';
import PlaylistResults from '../playlists/PlaylistResults';

function Navbar({user}) {
  const {getNewReleases, getGenres, getFeaturedPlaylists, loading} = useContext(SpotifyContext)

  return (
    <div className="navbar mb-12 shadow-lg bg-neutral text-neutral-content">
      <div className="container mx-auto">
        <div className="flex-none px-2 m-1">
          <a href="/"><NuFireLogo /></a>
        </div>
        <div className="flex-1 px-2 mx-2">
          <div className="flex justify-end">
            <Link to="/" className="btn btn-ghost btn-sm rounded-btn" onClick={getFeaturedPlaylists}>
              Featured Playlists
            </Link>
            <Link to="/albums" className="btn btn-ghost btn-sm rounded-btn" onClick={getNewReleases}>
              New Releases
            </Link>
            {/* Need to add search form for recommendations  */}
            {/* <Link to="/artists">
          <button className="btn glass shadow-lg shadow-black w-40 my-2">
            Recommendations
          </button>
        </Link> */}
            <Link to="/genres" className="btn btn-ghost btn-sm rounded-btn" onClick={getGenres}>
              All Genres
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

Navbar.defaultProps = {
  user: {username: ''},
}

Navbar.propTypes = {
  user: PropTypes.object,
}

export default Navbar;
