import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import './Navbar.css';

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [activeSection, setActiveSection] = useState('');
    const [isScrolled, setIsScrolled] = useState(false);
    const [isDesktopExpanded, setIsDesktopExpanded] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const scrolled = window.scrollY;
            setIsScrolled(scrolled > 100);

            const sections = ['about', 'gallery', 'heritage', 'characteristics'];
            let current = '';

            for (const section of sections) {
                const element = document.getElementById(section);
                if (element) {
                    const rect = element.getBoundingClientRect();
                    if (rect.top <= 150 && rect.bottom >= 150) {
                        current = section;
                        break;
                    }
                }
            }
            setActiveSection(current);
        };

        window.addEventListener('scroll', handleScroll);
        handleScroll();
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const closeMenu = () => {
        setIsMenuOpen(false);
        document.body.style.overflow = '';
    };

    const handleMouseEnter = () => {
        if (window.innerWidth > 1024 && isScrolled) {
            setIsDesktopExpanded(true);
        }
    };

    const handleMouseLeave = () => {
        if (window.innerWidth > 1024 && isScrolled) {
            setIsDesktopExpanded(false);
        }
    };

    const handleHamburgerClick = (e) => {
        e.preventDefault();
        e.stopPropagation();
        
        const isMobile = window.innerWidth <= 1024;
        
        if (isMobile) {
            const newState = !isMenuOpen;
            setIsMenuOpen(newState);
            // Prevent body scroll when menu is open
            document.body.style.overflow = newState ? 'hidden' : '';
        } else if (isScrolled) {
            setIsDesktopExpanded(!isDesktopExpanded);
        }
    };

    return (
        <nav
            className={`navbar ${isScrolled ? 'navbar--scrolled' : ''} ${isScrolled && isDesktopExpanded ? 'navbar--expanded' : ''}`}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <div className="container navbar__container">
                <a href="#" className="navbar__logo">
                    FRENCH BULLDOG
                </a>

                <button
                    className={`navbar__hamburger ${isMenuOpen ? 'navbar__hamburger--active' : ''}`}
                    onClick={handleHamburgerClick}
                    aria-label="Toggle menu"
                >
                    {isMenuOpen ? (
                        <X size={24} strokeWidth={2} color="var(--color-champagne)" />
                    ) : (
                        <Menu size={24} strokeWidth={2} color="var(--color-champagne)" />
                    )}
                </button>

                <ul className={`navbar__menu ${isMenuOpen ? 'navbar__menu--open' : ''}`}>
                    <li>
                        <a href="#about" onClick={closeMenu} className={activeSection === 'about' ? 'active' : ''}>
                            About
                        </a>
                    </li>
                    <li>
                        <a href="#gallery" onClick={closeMenu} className={activeSection === 'gallery' ? 'active' : ''}>
                            Gallery
                        </a>
                    </li>
                    <li>
                        <a href="#heritage" onClick={closeMenu} className={activeSection === 'heritage' ? 'active' : ''}>
                            Heritage
                        </a>
                    </li>
                    <li>
                        <a href="#characteristics" onClick={closeMenu} className={activeSection === 'characteristics' ? 'active' : ''}>
                            Characteristics
                        </a>
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;
