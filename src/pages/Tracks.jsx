import React, {useContext} from 'react';
import {useLocation} from 'react-router-dom';

import SpotifyContext from '../context/spotify/SpotifyContext';
import ExplorePanel from '../components/layouts/ExplorePanel';
import TrackResults from '../components/tracks/TrackResults';

function Tracks() {
  const {loading} = useContext(SpotifyContext);
  const location = useLocation();
  const {playlistImage, playlistLink, playlistName} = location.state
  return (
    <>
        <ExplorePanel />
        <div className="w-full flex justify-center">
          <div className="card flex-column shadow-lg shadow-black p-0 mx-5 mt-10 w-64">
            <figure className="shadow-sm w-full">
              <img src={playlistImage} alt="Genre Cover" />
            </figure>
            <div className="card-body items-center text-center">
              <div className="card-actions flex flex-column flex-wrap justify-center items-center">
                <a href={playlistLink} target="_blank" rel="noreferrer">
                  <button className="btn btn-outline btn-sm btn-success shadow-sm shadow-black">View in Spotify</button>
                </a>
              </div>
            </div>
          </div>
        </div>
        
      {!loading && (
        <>
          <div className="flex flex-col content-center items-center w-full mt-10">
            <p className="text-white font-bold text-xl">{playlistName}</p>
            <TrackResults />
          </div>
        </>
      )}
    </>
  )
}

export default Tracks;