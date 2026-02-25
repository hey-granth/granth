import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { navLinks, personalInfo } from '../../data/content';

const ease = [0.16, 1, 0.3, 1];

const Navbar = () => {
    const [isVisible, setIsVisible] = useState(true);
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [activeSection, setActiveSection] = useState('home');
    const lastScrollY = useRef(0);

    const { scrollY } = useScroll();
    const location = useLocation();
    const navigate = useNavigate();

    useMotionValueEvent(scrollY, 'change', (latest) => {
        const previous = lastScrollY.current;

        if (latest > previous && latest > 100) {
            setIsVisible(false);
            setIsMobileMenuOpen(false);
        } else {
            setIsVisible(true);
        }

        setIsScrolled(latest > 50);
        lastScrollY.current = latest;
    });

    useEffect(() => {
        const handleScroll = () => {
            const sectionIds = ['home', 'work', 'philosophy', 'eras', 'credentials', 'contact'];

            for (const sectionId of [...sectionIds].reverse()) {
                const element = document.getElementById(sectionId);
                if (element) {
                    const rect = element.getBoundingClientRect();
                    if (rect.top <= 150) {
                        setActiveSection(sectionId);
                        break;
                    }
                }
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToSection = (href) => {
        const element = document.querySelector(href);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
        setIsMobileMenuOpen(false);
    };

    const handleSectionClick = (e, href) => {
        e.preventDefault();
        setIsMobileMenuOpen(false);

        // If we're on a blog page, navigate to home first then scroll
        if (location.pathname.startsWith('/blog')) {
            navigate('/' + href);
            // Wait for navigation to complete, then scroll
            setTimeout(() => {
                const element = document.querySelector(href);
                if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                }
            }, 100);
        } else {
            // If we're already on home, just scroll
            scrollToSection(href);
        }
    };

    return (
        <motion.header
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'glass' : ''}`}
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: isVisible ? 0 : -100, opacity: isVisible ? 1 : 0 }}
            transition={{ duration: 0.4, ease }}
        >
            <nav className="section-container">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <Link
                        to="/"
                        className="text-text-primary font-display font-bold text-xl"
                    >
                        <span className="accent">G</span>
                        <span className="text-text-dim">.</span>
                    </Link>

                    {/* Desktop nav */}
                    <div className="hidden md:flex items-center gap-1">
                        {navLinks.map((link) => {
                            const sectionId = link.href.replace('#', '');
                            const isActive = link.external ? location.pathname.startsWith('/blog') : activeSection === sectionId;

                            const commonClasses = `px-3 py-2 text-liner text-sm uppercase tracking-wider transition-colors ${isActive ? 'accent' : 'text-text-secondary hover:text-text-primary'
                                }`;

                            if (link.external) {
                                return (
                                    <Link key={link.name} to={link.href} className={commonClasses}>
                                        {link.name}
                                    </Link>
                                );
                            }

                            return (
                                <a
                                    key={link.name}
                                    href={link.href}
                                    className={commonClasses}
                                    onClick={(e) => handleSectionClick(e, link.href)}
                                >
                                    {link.name}
                                </a>
                            );
                        })}
                    </div>

                    {/* Mobile menu button */}
                    <button
                        className="md:hidden p-2 text-text-secondary hover:text-text-primary"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        aria-label="Toggle menu"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                            {isMobileMenuOpen ? (
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            ) : (
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                            )}
                        </svg>
                    </button>
                </div>

                {/* Mobile menu */}
                <AnimatePresence>
                    {isMobileMenuOpen && (
                        <motion.div
                            className="md:hidden glass border-t border-dark-700 relative z-50"
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.2 }}
                            style={{ pointerEvents: 'auto' }}
                        >
                            <div className="py-4 space-y-1 relative z-50">
                                {navLinks.map((link) => {
                                    const sectionId = link.href.replace('#', '');
                                    const isActive = link.external ? location.pathname.startsWith('/blog') : activeSection === sectionId;

                                    if (link.external) {
                                        return (
                                            <Link
                                                key={link.name}
                                                to={link.href}
                                                className={`block px-4 py-3 text-liner text-base uppercase tracking-wider transition-colors cursor-pointer relative z-50 ${isActive ? 'accent' : 'text-text-secondary hover:text-text-primary'}`}
                                                onClick={() => setIsMobileMenuOpen(false)}
                                            >
                                                {link.name}
                                            </Link>
                                        );
                                    }

                                    return (
                                        <a
                                            key={link.name}
                                            href={link.href}
                                            className={`block px-4 py-3 text-liner text-base uppercase tracking-wider transition-colors cursor-pointer relative z-50 ${isActive ? 'accent' : 'text-text-secondary hover:text-text-primary'}`}
                                            onClick={(e) => handleSectionClick(e, link.href)}
                                        >
                                            {link.name}
                                        </a>
                                    );
                                })}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </nav>
        </motion.header>
    );
};

export default Navbar;
