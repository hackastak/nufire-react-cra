const spotifyReducer = (state, action) => {
    switch(action.type) {
      case 'GET_TOKEN':
        return {
          ...state,
          token: action.payload,
          loading: false,
        }
      case 'GET_NEW_RELEASES':
        return {
          ...state,
          albums: action.payload,
          loading: false,
        }
      case 'GET_GENRES':
        return {
          ...state,
          genres: action.payload,
          loading: false,
        }
      case 'GET_MORE_GENRES':
        return {
          ...state,
          genres: state.genres.concat(action.payload),
          loading: false,
        }
      case 'GET_PLAYLISTS':
        return {
          ...state,
          playlists: action.payload,
          loading: false
        }
      case 'GET_ARTIST_DETAILS':
        return {
          ...state,
          artist: action.payload,
          loading: false,
        }
      case 'GET_TRACKS':
        return {
          ...state,
          tracks: action.payload,
          loading: false,
        }
      case 'SET_LOADING':
        return {
          ...state,
          loading: true,
        }
      case 'DELETE_RESULTS':
        return {
          ...state,
          genres: [],
          playlists: [],
          artists: [],
          artist: {},
          tracks: [],
          loading: false,
        }
      default:
        return state
    }
};

export default spotifyReducer;