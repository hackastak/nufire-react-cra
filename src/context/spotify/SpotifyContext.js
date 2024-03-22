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
      },
      data: 'grant_type=client_credentials&client_id=' + CLIENT_ID + '&client_secret=' + CLIENT_SECRET,
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
      console.log('What you are looking for did not make it. Try again?');
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
      console.log('What you are looking for did not make it. Try again?');
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
      console.log('What you are looking for did not make it. Try again?');
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
      console.log('What you are looking for did not make it. Try again?');
    } else {
      console.log(playlists.data.playlists.items);
      dispatch({
        type: 'GET_PLAYLISTS',
        payload: playlists.data.playlists.items
      });
    }
  }

  const getFeaturedPlaylists = async () => {
    setLoading();
    if (state.token === '') {
      await getToken();
    }
    const playlists = await axios(`${SPOTIFY_API}v1/browse/featured-playlists?country=US&offset=0&limit=50`, {
      method: 'GET',
      headers: {
        'Authorization' : 'Bearer ' + state.token
      }
    });
    if(!playlists) {
      console.log('What you are looking for did not make it. Try again?');
    } else {
      console.log(playlists.data.playlists.items)
      dispatch({
        type: 'GET_PLAYLISTS',
        payload: playlists.data.playlists.items,
      })
    }
  }

  const getRecommendations = async (searchInputsObject) => {
    setLoading();

    const playlists = await axios(`${SPOTIFY_API}v1/recommendations?limit=10&market=ES&seed_artists=4NHQUGzhtTLFvgF5SZesLK&seed_genres=classical%2Ccountry&seed_tracks=0c6xIDDpzE81m2q797ordA`, {
      method: 'GET',
      headers: {
        'Authorization' : 'Bearer ' + state.token
      }
    });
    if(!playlists) {
      console.log('What you are looking for did not make it. Try again?');
    } else {
      console.log(playlists)
      
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
      console.log('What you are looking for did not make it. Try again?');
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
      console.log('What you are looking for did not make it. Try again?');
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
      console.log('What you are looking for did not make it. Try again?');
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
      console.log('What you are looking for did not make it. Try again?');
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
    getRecommendations,
    getGenres,
    getMoreGenres,
    getGenrePlaylists,
    getFeaturedPlaylists,
    getPlaylistTracks,
    getAlbumTracks,
    getArtistDetails,
    getArtistTopTracks,
    deleteResults,
    
  }}>
    {children}
  </SpotifyContext.Provider>
};

export default SpotifyContext;
