import React, {useContext} from 'react';
import { Link } from 'react-router-dom';

import SpotifyContext from '../../context/spotify/SpotifyContext';
import PlaylistResults from '../playlists/PlaylistResults';

function ExplorePanel() {
  const {loading, deleteResults} = useContext(SpotifyContext);

  return (
    <>
      {/*
      <div className="w-full text-center">
        <h2 className="text-lg color-">Welcome to NuFire! Click one of the buttons below to start exploring.</h2>
      </div>
      */}  
      
    {(window.location.pathname !== '/') && (
      <div className="flex justify-evenly mt-5 w-full">
        {(!loading) && (
          <Link to="/">
            <button className="btn btn-error shadow-lg shadow-black" onClick={deleteResults}>
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>
              Clear All
            </button>
          </Link>
        )}
        
      </div>
    )}
    {(window.location.pathname === '/') && <PlaylistResults />}
    </>
  )
}

export default ExplorePanel
