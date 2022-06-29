import React, { useContext, useEffect } from 'react';

import SpotifyContext from '../context/spotify/SpotifyContext';
import TrackResults from '../components/tracks/TrackResults';

function ArtistDetails() {
  const {artist, loading} = useContext(SpotifyContext);
  console.log(artist);

  return (
    <>
      {(!loading) && (
        <>
          <div className="card lg:card-side bg-base-100 shadow-lg shadow-black">
            <figure>
              <img src={artist.images[0].url} alt="Artist Profile" />
            </figure>
            <div className="card-body flex flex-col items-center justify-evenly">
              <h1 className="font-serif text-4xl font-extrabold text-white">{artist.name}</h1>
              <div className="text-white">
                <span className="text-xl font-bold text-white">Followers: </span>
                <span className="text-lg font-normal text-white">{(artist.followers.total).toLocaleString(undefined, {maximumFractionDigits: 2})}</span>
              </div>
              <div>
                <span className="text-xl font-bold text-white">Popularity: </span>
                <span className="text-lg font-normal text-white">{(artist.popularity)}%</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-xl font-bold text-white underline">Genres</span>
              {artist.genres.map((genre) => {
                return (
                  <div key={genre}>
                    <span className="text-lg font-normal text-white">{genre}</span>
                  </div>
                )
              })}
              </div>
              <div className="card-actions">
                <a href={artist.external_urls.spotify} rel="noreferrer" target="_blank">
                  <button className="btn btn-outline btn-success">View Spotify Page</button>
                </a>
              </div>
            
            </div>
          </div>
          <div className="flex flex-col content-center items-center w-full mt-10">
            <p className="text-white font-bold text-xl">Top Tracks</p>
            <TrackResults />
          </div>
        </>
      )}  
    </>

  )
}

export default ArtistDetails;