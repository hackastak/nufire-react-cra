import React, {useEffect, useContext} from 'react';

import SpotifyContext from '../context/spotify/SpotifyContext';
import ExplorePanel from '../components/layouts/ExplorePanel';


function Home() {

  console.log('RENDERING HOME COMPONENT');
  const {getToken} = useContext(SpotifyContext);

  useEffect(() => {
    getToken();
  }, []);
  

  return (
    <>
      <ExplorePanel /> 

    </>
    
    
  )
}

export default Home;