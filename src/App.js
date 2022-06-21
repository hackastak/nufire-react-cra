import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';

import Navbar from './components/layouts/Navbar';
import Home from './pages/Home';
import User from './pages/User';

import {SpotifyProvider} from './context/spotify/SpotifyContext';

function App() {
  return (
    <SpotifyProvider>
      <Router>
        <div className="flex flex-col justify-between h-screen">
          <Navbar />
          <main className="container mx-auto px-3 pb-12">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/user/:login" element={<User />} />
          </Routes>
          </main>
        </div>
      </Router>
    </SpotifyProvider>
    
  );
}

export default App;
