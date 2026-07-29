import {useState, useEffect} from 'react';
import { Link } from "react-router";
import './Navbar.css';

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if(window.scrollY > 50){
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };
        window.addEventListener('scroll', handleScroll)

        return () => window.removeEventListener('scroll', handleScroll)
    }, []); //creates the listener once only, and removes it once component unmounted

    return (
        <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
        <div className="nav-container">
            <Link to="/" className="nav-logo">
            <img src="/src/assets/aera_transparent.png" alt="AERA Logo" />
            </Link>
            
            <div className="nav-links">
            <Link to="/">Home</Link>
            <Link to="/about">About</Link>
            <Link to="/topic">Topics</Link>
            <Link to="/team">Meet the Team</Link>
            <Link to="/under_construction">Contact Us</Link>
            <Link to="/under_construction" className="register-btn">Register</Link>
            </div>
        </div>
        </nav>
    );
};

export default Navbar


