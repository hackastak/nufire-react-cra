import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';

import {SpotifyProvider} from './context/spotify/SpotifyContext';
import Navbar from './components/layouts/Navbar';
import Home from './pages/Home';
import Albums from './pages/Albums';
import Artists from './pages/Artists';
import ArtistDetails from './pages/ArtistDetails';
import Genres from './pages/Genres';
import Playlists from './pages/Playlists';
import Tracks from './pages/Tracks';
import TrackDetails from './pages/TrackDetails';
import User from './pages/User';


function App() {
  return (
    <SpotifyProvider>
      <Router>
        <div className="flex flex-col h-screen">
          <div>
            <Navbar />
          </div>
          
          <main className="container mx-auto px-3 pb-12">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/albums" element={<Albums />} />
            <Route path="/artists" element={<Artists />} />
            <Route path="/artist-details" element={<ArtistDetails />} />
            <Route path="/genres" element={<Genres />} />
            <Route path="/playlists" element={<Playlists />} />
            <Route path="/tracks" element={<Tracks />} />
            <Route path="/track-details" element={<TrackDetails />} />
            <Route path="/user/:login" element={<User />} />
          </Routes>
          </main>
        </div>
      </Router>
    </SpotifyProvider>
    
  );
}

export default App;
