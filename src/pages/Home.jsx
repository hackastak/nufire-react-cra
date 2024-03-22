import React, {useEffect, useContext} from 'react';

import SpotifyContext from '../context/spotify/SpotifyContext';
import ExplorePanel from '../components/layouts/ExplorePanel';


function Home() {

  console.log('RENDERING HOME COMPONENT');
  const {token, getToken, getFeaturedPlaylists} = useContext(SpotifyContext);

  useEffect(() => {
    getToken()
  }, []);

  useEffect(() => {
    getFeaturedPlaylists();
  }, [token]);
  

  return (
    <>
      <ExplorePanel /> 

    </>
    
    
  )
}

export default Home;
