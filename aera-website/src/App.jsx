import { BrowserRouter as Router, Routes, Route } from 'react-router';
import ScrollToTop from './components/ScrollToTop';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import About from './pages/About';
import Topic from './pages/Topic';
import Team from './pages/Team';
import UnderConstruction from './pages/UnderConstruction';

import './App.css';

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/topic" element={<Topic />} />
        <Route path="/team" element={<Team />} />
        <Route path="/under_construction" element={<UnderConstruction />} />
        {/*>
        <Route path="/pricing" element={<Pricing/>}/>
        <Route path="/contact" element={<Contact/>}/> */}
      </Routes>
    </Router>
  );
}

export default App;
