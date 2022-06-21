import React, {useEffect, useContext} from 'react';

// import axios from 'axios';
import SpotifyContext from '../context/spotify/SpotifyContext';


function Home() {

  console.log('RENDERING HOME COMPONENT');
  const {getToken, getGenres} = useContext(SpotifyContext);

  useEffect(() => {
    getToken();
  }, []);
  

  return (
    <>
      <div>Home</div>
      <button className="btn btn-outline btn-info" onClick={getGenres}>
        Genres
      </button>
      
    </>
    
  )
}

export default Home