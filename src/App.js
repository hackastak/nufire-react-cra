import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Navbar from './components/layouts/Navbar';

function App() {
  return (
    <Router>
      <div className="flex flex-col justify-between h-screen">
        <Navbar />
        <main className="container mx-auto px-3 pb-12">
          
        </main>
      </div>
    </Router>
  );
}

export default App;
