import {useState, useEffect} from 'react';
import { Link } from "react-router";
import styles from './Navbar.module.css';

const cx = (...classNames) => classNames.map((className) => styles[className]).filter(Boolean).join(' ');

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
        <nav className={cx('navbar', isScrolled && 'scrolled')}>
        <div className={cx('nav-container')}>
            <Link to="/" className={cx('nav-logo')}>
            <img src="/src/assets/aera_transparent.png" alt="AERA Logo" />
            </Link>
            
            <div className={cx('nav-links')}>
            <Link to="/">Home</Link>
            <Link to="/about">About</Link>
            <Link to="/topic">Topics</Link>
            <Link to="/team">Meet the Team</Link>
            <Link to="/under_construction">Contact Us</Link>
            <Link to="https://docs.google.com/forms/d/e/1FAIpQLScfigf8fhJnxRxKzjVP7v7g2iz7XoHNjmo52ggVRnNaqTFHVA/viewform?pli=1" target="_blank" rel="noopener noreferrer" className={cx('register-btn')}>Register</Link>
            </div>
        </div>
        </nav>
    );
};

export default Navbar

