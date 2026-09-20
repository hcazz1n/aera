import { BrowserRouter as Router, Routes, Route } from 'react-router';
import ScrollToTop from './components/ScrollToTop';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Topic from './pages/Topic';
import Team from './pages/Team';
import UnderConstruction from './pages/UnderConstruction';
import logo from './assets/aera_connected_sm_ctr.png'

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
      <Footer logoSrc={logo} />
    </Router>
  );
}

export default App;
