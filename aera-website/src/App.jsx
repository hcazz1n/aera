import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';

import './App.css'; 

function App() {
  return (
    <Router>
      {/* Elements placed outside the <Routes> block stay locked in place 
        across the whole site. Your banners will go here.
      */}
      {/* <RegBanner /> */}
      {/* <TopBanner /> */}

      <Routes>
        {/* Route for your main landing page */}
        <Route path="/" element={<Home />} />
        
        {/* Future routes will go here:
        <Route path="/about" element={<About />} />
        <Route path="/topics" element={<Topics />} />
        <Route path="/staff" element={<Staff />} />
        <Route path="/contact" element={<Contact />} />
        */}
      </Routes>

      {/* Your footer banner goes here */}
      {/* <BottomBanner /> */}
    </Router>
  );
}

export default App;