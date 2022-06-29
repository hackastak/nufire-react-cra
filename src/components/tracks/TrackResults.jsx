import React, { useContext } from 'react';

import SpotifyContext from '../../context/spotify/SpotifyContext';
import TrackCard from './TrackCard';

function TrackResults() {
  const {tracks, playlistTracks, loading} = useContext(SpotifyContext);


  return (
    <>
      {(!loading) && (
        
          <table className="table table-zebra w-full mt-3 shadow-lg shadow-black rounded-3xl">
            <thead>
              <tr className="text-white font-bold">
                <th>Track</th>
                <th>Album</th>
                <th className="text-center">Duration</th>
                <th className="text-center">Popularity</th>
                <th className="text-center">Explicit</th>
              </tr>
            </thead>
            <tbody>
              {tracks.map((track) => {
                return (
                  (track.id) ? (
                    <TrackCard 
                      key={track.id}
                      id={track.id}
                      name={track.name}
                      trackLink={track.external_urls.spotify}
                      albumName={track.album.name}
                      albumLink={track.album.external_urls.spotify}
                      duration={track.duration_ms}
                      rating={track.explicit}
                      popularity={track.popularity}
                    />
                ) : (
                  <TrackCard 
                      key={track.track.id}
                      id={track.track.id}
                      name={track.track.name}
                      trackLink={track.track.external_urls.spotify}
                      albumName={track.track.album.name}
                      albumLink={track.track.album.external_urls.spotify}
                      duration={track.track.duration_ms}
                      rating={track.track.explicit}
                      popularity={track.track.popularity}
                    />
                ))
              })}
            </tbody>

          </table>
      )}
    </>
    
  )
}

export default TrackResults