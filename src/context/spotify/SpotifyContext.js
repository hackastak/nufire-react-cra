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
    tracks: [],
    artists: [],
    artist: {},
    albums: [],
    loading: false,
  }

  const [state, dispatch] = useReducer(spotifyReducer, initialState);
  const getToken = async () => {
    setLoading();
    const data = await axios(`${AUTH_ENDPOINT}`, {
      headers: {
        'Content-Type' : 'application/x-www-form-urlencoded',
        'Authorization' : 'Basic ' + btoa(CLIENT_ID + ':' + CLIENT_SECRET)
      },
      data: 'grant_type=client_credentials',
      method: 'POST'
    });
    if(!data) {
      console.log('Token not available... check your Shopify Developer Tools.');
    } else {
      dispatch({
        type: 'GET_TOKEN',
        payload: data.data.access_token,
      });
    }
  };

  const getNewReleases = async () => {
    setLoading();
    const newReleases = await axios(`${SPOTIFY_API}v1/browse/new-releases?country=US&offset=0&limit=50`, {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + state.token
      }
    });
    if(!newReleases) {
      console.log('The shit you looking for did not make it homie... try again')
    } else {
      dispatch({
        type:'GET_NEW_RELEASES',
        payload: newReleases.data.albums.items,
      });
    }
  }

  const getGenres = async () => {
    setLoading();
    const genres = await axios(`${SPOTIFY_API}v1/browse/categories?country=US&offset=0&limit=50`, {
      method: 'GET',
      headers: {
        'Authorization' : 'Bearer ' + state.token
      }
    });
    if(!genres) {
      console.log('Genres are not available. Something may be broken');
    } else {
      dispatch({
        type: 'GET_GENRES',
        payload: genres.data.categories.items
      });
    }
  }
  
  const getMoreGenres = async (offset) => {
    setLoading();
    const moreGenres = await axios(`${SPOTIFY_API}v1/browse/categories?country=US&offset=${offset}&limit=50`, {
      method: 'GET',
      headers: {
        'Authorization' : 'Bearer ' + state.token
      }
    });
    if (!moreGenres) {
      console.log("Sorry bro... that shit ain't here.. try again!");
    } else {
      dispatch({
        type: 'GET_MORE_GENRES',
        payload: moreGenres.data.categories.items
      })
    }
  }

  

  const getGenrePlaylists = async (categoryId) => {
    setLoading();
    const playlists = await axios(`${SPOTIFY_API}v1/browse/categories/${categoryId}/playlists?country=US&offset=0&limit=50`, {
      method: 'GET',
      headers: {
        'Authorization' : 'Bearer ' + state.token
      }
    });
    if(!playlists) {
      console.log('Well shit. We cant find this shit anywhere.');
    } else {
      console.log(playlists.data.playlists.items);
      dispatch({
        type: 'GET_PLAYLISTS',
        payload: playlists.data.playlists.items
      });
    }
  }

  const getPlaylistTracks = async (playlistId) => {
    setLoading();
    const tracks = await axios(`${SPOTIFY_API}v1/playlists/${playlistId}/tracks?offset=0&limit=100`, {
      method: 'GET',
      headers: {
        'Authorization' : 'Bearer ' + state.token
      }
    });
    if(!tracks) {
      console.log('Here we go again... Bro... it aint here!');
    } else {
      console.log(tracks.data.items);
      dispatch({
        type: 'GET_TRACKS',
        payload: tracks.data.items
      });
    }
  }
  
  const getAlbumTracks = async (albumId) => {
    // setLoading();
    const tracks = await axios(`${SPOTIFY_API}v1/albums/${albumId}/tracks?offset=0&limit=50`, {
      method: 'GET',
      headers: {
        'Authorization' : 'Bearer ' + state.token
      }
    });
    if(!tracks) {
      console.log('Well bro... you missed again.')
    } else {
      console.log(tracks.data.tracks);
     
    }

  }

  const getArtistDetails = async (artistId) => {
    setLoading();
    const artist = await axios(`${SPOTIFY_API}v1/artists/${artistId}`, {
      method: 'GET',
      headers: {
        'Authorization' : 'Bearer ' + state.token
      }
    });
    if(!artist) {
      console.log('Homie... it aint here... try again.');
    } else {
      dispatch({
        type: 'GET_ARTIST_DETAILS',
        payload: artist.data,
      })
    }
  }
  
  const getArtistTopTracks = async(artistID) => {
    setLoading();
    const tracks = await axios(`${SPOTIFY_API}v1/artists/${artistID}/top-tracks?market=US`, {
      method: 'GET',
      headers: {
        'Authorization' : 'Bearer ' + state.token
      }
    });
    if(!tracks) {
      console.log('Nope, no top tracks here... try again.')
    } else {
      console.log(tracks.data.tracks);
      dispatch({
        type: 'GET_TRACKS',
        payload: tracks.data.tracks,
      })
    }
    console.log(state.tracks);
  }

  const deleteResults = () => {
    dispatch ({
      type: 'DELETE_RESULTS',
    });
  }

  const setLoading = () => dispatch({type: 'SET_LOADING'});

  return <SpotifyContext.Provider value={{
    token: state.token,
    genres: state.genres,
    playlists: state.playlists,
    tracks: state.tracks,
    artists: state.artists,
    artist: state.artist,
    albums: state.albums,
    loading: state.loading,
    getToken,
    getNewReleases,
    getGenres,
    getMoreGenres,
    getGenrePlaylists,
    getPlaylistTracks,
    getArtistDetails,
    getArtistTopTracks,
    deleteResults,
    
  }}>
    {children}
  </SpotifyContext.Provider>
};

export default SpotifyContext;