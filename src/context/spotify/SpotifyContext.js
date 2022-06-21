import { createContext, useReducer } from 'react';
import axios from 'axios';

import spotifyReducer from './SpotifyReducer.js';

const SpotifyContext = createContext();

const AUTH_ENDPOINT = process.env.REACT_APP_AUTH_ENDPOINT;
const SPOTIFY_API = process.env.REACT_APP_SPOTIFY_API;
const CLIENT_ID = process.env.REACT_APP_CLIENT_ID;
const CLIENT_SECRET = process.env.REACT_APP_CLIENT_SECRET;

export const SpotifyProvider = ({children}) => {
  const initialState = {
    token: '',
    genres: [],
    playlists: [],
    artists: [],
    artist: {},
    loading: false,
  }

  const [state, dispatch] = useReducer(spotifyReducer, initialState);
  const getToken = async () => {
    const data = await axios(`${AUTH_ENDPOINT}`, {
      headers: {
        'Content-Type' : 'application/x-www-form-urlencoded',
        'Authorization' : 'Basic ' + btoa(CLIENT_ID + ':' + CLIENT_SECRET)
      },
      data: 'grant_type=client_credentials',
      method: 'POST'
    });
    if(!data) {
      console.log('Well... fuck...');
      
    } else {
      dispatch({
        type: 'GET_TOKEN',
        payload: data.data.access_token,
      })
    }
  };

  const getGenres = async () => {
    console.log(state.token);
    console.log(SPOTIFY_API);
    const genres = await axios(`${SPOTIFY_API}v1/browse/categories?offset=0&limit=50`, {
      method: 'GET',
      headers: {
        'Authorization' : 'Bearer ' + state.token
      }
    });
    if(!genres) {
      console.log(state.token)
      console.log('Somethin all fucked up!');
    } else {
      console.log(genres.data.categories.items);
      dispatch({
        type: 'GET_GENRES',
        payload: genres
      });
    }

  }



  return <SpotifyContext.Provider value={{
    token: state.token,
    genres: state.genres,
    playlists: state.playlists,
    artists: state.artists,
    artist: state.artist,
    loading: state.loading,
    getToken,
    getGenres,
  }}>
    {children}
  </SpotifyContext.Provider>
};

export default SpotifyContext;