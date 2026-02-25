import { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { navLinks, personalInfo } from '../../data/content';

const ease = [0.4, 0, 0.2, 1];
const EXPAND_LETTERS = ['R', 'A', 'N', 'T', 'H'];

const Navbar = () => {
    const [isVisible, setIsVisible] = useState(true);
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [activeSection, setActiveSection] = useState('home');
    const [isLogoHovered, setIsLogoHovered] = useState(false);
    const [scrollDepth, setScrollDepth] = useState(0); // 0–1
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
        setScrollDepth(Math.min(latest / 100, 1));
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

        if (location.pathname.startsWith('/blog')) {
            navigate('/' + href);
            setTimeout(() => {
                const element = document.querySelector(href);
                if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                }
            }, 100);
        } else {
            scrollToSection(href);
        }
    };

    // Scroll-reactive nav styles
    const blurAmount = 16 + scrollDepth * 8;
    const navShadowOpacity = 0.18 + scrollDepth * 0.08;

    return (
        <motion.header
            className="fixed top-0 left-0 right-0 z-50"
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: isVisible ? 0 : -100, opacity: isVisible ? 1 : 0 }}
            transition={{ duration: 0.4, ease }}
            style={{ pointerEvents: isVisible ? 'auto' : 'none' }}
        >
            <nav
                className="transition-all duration-300"
                style={{
                    maxWidth: '1100px',
                    margin: '20px auto 0',
                    padding: '14px 28px',
                    borderRadius: '999px',
                    background: 'linear-gradient(to bottom, rgba(255,255,255,0.45), rgba(255,255,255,0.18))',
                    backdropFilter: `blur(${blurAmount}px) saturate(120%)`,
                    WebkitBackdropFilter: `blur(${blurAmount}px) saturate(120%)`,
                    border: '1px solid rgba(255,255,255,0.35)',
                    boxShadow: `inset 0 1px 0 rgba(255,255,255,0.6), 0 15px 40px rgba(120,100,200,${navShadowOpacity})`,
                }}
            >
                <div className="flex items-center justify-between">
                    {/* Logo — serif with meta reveal */}
                    <Link
                        to="/"
                        className="font-bold text-xl flex items-baseline"
                        style={{
                            fontFamily: 'var(--font-serif)',
                            color: isLogoHovered ? 'var(--color-plum)' : 'var(--color-text-primary)',
                            letterSpacing: isLogoHovered ? '0.03em' : `${-0.02 * scrollDepth}em`,
                            transition: 'color 0.2s cubic-bezier(0.4,0,0.2,1), letter-spacing 0.3s cubic-bezier(0.4,0,0.2,1)',
                            textDecoration: 'none',
                        }}
                        onMouseEnter={() => setIsLogoHovered(true)}
                        onMouseLeave={() => setIsLogoHovered(false)}
                    >
                        <span>G</span>
                        <span style={{ color: 'var(--color-plum)' }}>.</span>
                        {/* Expanding letters */}
                        <span
                            style={{
                                display: 'inline-flex',
                                overflow: 'hidden',
                                maxWidth: isLogoHovered ? '120px' : '0px',
                                transition: 'max-width 0.35s cubic-bezier(0.4,0,0.2,1)',
                            }}
                        >
                            {EXPAND_LETTERS.map((letter, i) => (
                                <span
                                    key={letter}
                                    style={{
                                        display: 'inline-block',
                                        opacity: isLogoHovered ? 1 : 0,
                                        transform: isLogoHovered ? 'translateY(0)' : 'translateY(4px)',
                                        transition: `opacity 0.2s cubic-bezier(0.4,0,0.2,1) ${i * 40}ms, transform 0.2s cubic-bezier(0.4,0,0.2,1) ${i * 40}ms`,
                                        fontSize: '0.75em',
                                        letterSpacing: '0.04em',
                                    }}
                                >
                                    {letter}
                                </span>
                            ))}
                        </span>
                    </Link>

                    {/* Desktop nav */}
                    <div className="hidden md:flex items-center gap-1">
                        {navLinks.map((link) => {
                            const sectionId = link.href.replace('#', '');
                            const isActive = link.external ? location.pathname.startsWith('/blog') : activeSection === sectionId;

                            const commonClasses = `px-3 py-2 text-sm tracking-wider transition-colors duration-200 ${isActive ? 'text-plum font-medium' : ''
                                }`;

                            const linkStyle = {
                                fontFamily: 'var(--font-sans)',
                                letterSpacing: '0.08em',
                                textTransform: 'uppercase',
                                fontSize: '0.8125rem',
                                color: isActive ? 'var(--color-plum)' : 'rgba(40,30,70,0.85)',
                            };

                            if (link.external) {
                                return (
                                    <Link key={link.name} to={link.href} className={commonClasses} style={linkStyle}>
                                        {link.name}
                                    </Link>
                                );
                            }

                            return (
                                <a
                                    key={link.name}
                                    href={link.href}
                                    className={commonClasses}
                                    style={linkStyle}
                                    onClick={(e) => handleSectionClick(e, link.href)}
                                    onMouseEnter={(e) => { if (!isActive) e.target.style.color = '#7E64E8'; }}
                                    onMouseLeave={(e) => { if (!isActive) e.target.style.color = 'rgba(40,30,70,0.85)'; }}
                                >
                                    {link.name}
                                </a>
                            );
                        })}
                    </div>

                    {/* Mobile menu button */}
                    <button
                        className="md:hidden p-2"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        aria-label="Toggle menu"
                        style={{ color: 'rgba(40,30,70,0.85)' }}
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
                            className="md:hidden mt-3"
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.2 }}
                        >
                            <div className="py-2 space-y-1" style={{ borderTop: '1px solid rgba(255,255,255,0.3)' }}>
                                {navLinks.map((link) => {
                                    const sectionId = link.href.replace('#', '');
                                    const isActive = link.external ? location.pathname.startsWith('/blog') : activeSection === sectionId;

                                    const mobileClasses = `block px-4 py-3 text-base uppercase tracking-wider transition-colors duration-200 cursor-pointer ${isActive ? 'font-medium' : ''
                                        }`;

                                    const mobileStyle = {
                                        fontFamily: 'var(--font-sans)',
                                        letterSpacing: '0.08em',
                                        color: isActive ? 'var(--color-plum)' : 'rgba(40,30,70,0.85)',
                                    };

                                    if (link.external) {
                                        return (
                                            <Link
                                                key={link.name}
                                                to={link.href}
                                                className={mobileClasses}
                                                style={mobileStyle}
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
                                            className={mobileClasses}
                                            style={mobileStyle}
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

