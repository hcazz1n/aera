import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from "react-router";
import { Menu, X } from 'lucide-react';
import styles from './Navbar.module.css';
import logo from '../assets/aera_transparent.png';

const cx = (...classNames) => classNames.map((className) => styles[className]).filter(Boolean).join(' ');

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const menuRef = useRef(null);
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => {
            if(window.scrollY > 50){
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };
        window.addEventListener('scroll', handleScroll);

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Close mobile dropdown when route changes
    useEffect(() => {
        setIsOpen(false);
    }, [location.pathname]);

    // Close mobile dropdown when clicking outside or pressing Escape
    useEffect(() => {
        if (!isOpen) return;

        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        const handleKeyDown = (event) => {
            if (event.key === 'Escape') {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        document.addEventListener('touchstart', handleClickOutside);
        document.addEventListener('keydown', handleKeyDown);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            document.removeEventListener('touchstart', handleClickOutside);
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [isOpen]);

    return (
        <nav className={cx('navbar', isScrolled && 'scrolled')}>
            <div className={cx('nav-container')}>
                <Link to="/" className={cx('nav-logo')}>
                    <img src={logo} alt="AERA Logo" />
                </Link>
                
                {/* Desktop navigation */}
                <div className={cx('nav-links')}>
                    <Link to="/">Home</Link>
                    <Link to="/about">About</Link>
                    <Link to="/topic">Topics</Link>
                    <Link to="/team">Meet the Team</Link>
                    <Link to="/contact">Contact Us</Link>
                    <Link to="https://docs.google.com/forms/d/e/1FAIpQLScfigf8fhJnxRxKzjVP7v7g2iz7XoHNjmo52ggVRnNaqTFHVA/viewform?pli=1" target="_blank" rel="noopener noreferrer" className={cx('register-btn')}>Register</Link>
                </div>

                {/* Mobile dropdown menu (accessible on the right side) */}
                <div className={cx('mobile-menu-wrapper')} ref={menuRef}>
                    <button
                        type="button"
                        className={cx('mobile-menu-btn')}
                        onClick={() => setIsOpen((prev) => !prev)}
                        aria-expanded={isOpen}
                        aria-controls="mobile-nav-dropdown"
                        aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
                    >
                        {isOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>

                    {isOpen && (
                        <div id="mobile-nav-dropdown" className={cx('mobile-dropdown')}>
                            <Link to="/" className={cx('dropdown-item')} onClick={() => setIsOpen(false)}>Home</Link>
                            <Link to="/about" className={cx('dropdown-item')} onClick={() => setIsOpen(false)}>About</Link>
                            <Link to="/topic" className={cx('dropdown-item')} onClick={() => setIsOpen(false)}>Topics</Link>
                            <Link to="/team" className={cx('dropdown-item')} onClick={() => setIsOpen(false)}>Meet the Team</Link>
                            <Link to="/contact" className={cx('dropdown-item')} onClick={() => setIsOpen(false)}>Contact Us</Link>
                            <Link
                                to="https://docs.google.com/forms/d/e/1FAIpQLScfigf8fhJnxRxKzjVP7v7g2iz7XoHNjmo52ggVRnNaqTFHVA/viewform?pli=1"
                                target="_blank"
                                rel="noopener noreferrer"
                                className={cx('dropdown-register-btn')}
                                onClick={() => setIsOpen(false)}
                            >
                                Register
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;

