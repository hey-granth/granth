import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { personalInfo, hero } from '../../data/content';

// Animation config
const ease = [0.16, 1, 0.3, 1];

const Hero = () => {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"]
    });

    const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
    const y = useTransform(scrollYProgress, [0, 0.5], [0, 100]);

    return (
        <section
            id="home"
            ref={containerRef}
            className="relative min-h-screen min-h-dvh flex items-center justify-center overflow-hidden"
        >
            {/* ═══════════════════════════════════════════════════════════════
                HERO ZONE — OPEN, SPACIOUS, ORBITAL
                The name sits within cosmic space, not on a dark void.
            ═══════════════════════════════════════════════════════════════ */}

            {/* Central orbital glow — soft, behind the name */}
            <div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[600px]"
                style={{
                    background: `
                        radial-gradient(ellipse 100% 80% at 50% 50%, 
                            rgba(124, 58, 237, 0.06) 0%, 
                            rgba(109, 40, 217, 0.025) 35%,
                            transparent 55%
                        )
                    `,
                    filter: 'blur(80px)',
                }}
            />

            {/* Subtle orbital ring hint — enhanced concentric system */}
            <svg
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[130%] h-[130%] max-w-[1800px]"
                viewBox="0 0 1800 1350"
                preserveAspectRatio="xMidYMid slice"
                style={{
                    animation: 'hero-ring-drift 120s ease-in-out infinite',
                }}
            >
                {/* Outermost ring — largest, most subtle */}
                <ellipse
                    cx="900"
                    cy="675"
                    rx="820"
                    ry="420"
                    fill="none"
                    stroke="rgba(124, 58, 237, 0.025)"
                    strokeWidth="0.6"
                    transform="rotate(-10 900 675)"
                />
                {/* Ring 2 */}
                <ellipse
                    cx="900"
                    cy="675"
                    rx="680"
                    ry="350"
                    fill="none"
                    stroke="rgba(139, 92, 246, 0.035)"
                    strokeWidth="0.8"
                    transform="rotate(5 900 675)"
                />
                {/* Ring 3 — dashed for texture */}
                <ellipse
                    cx="900"
                    cy="675"
                    rx="540"
                    ry="280"
                    fill="none"
                    stroke="rgba(167, 139, 250, 0.045)"
                    strokeWidth="0.6"
                    strokeDasharray="6 10"
                    transform="rotate(-3 900 675)"
                />
                {/* Ring 4 */}
                <ellipse
                    cx="900"
                    cy="675"
                    rx="400"
                    ry="205"
                    fill="none"
                    stroke="rgba(139, 92, 246, 0.05)"
                    strokeWidth="1"
                    transform="rotate(8 900 675)"
                />
                {/* Innermost ring — brightest */}
                <ellipse
                    cx="900"
                    cy="675"
                    rx="260"
                    ry="135"
                    fill="none"
                    stroke="rgba(124, 58, 237, 0.06)"
                    strokeWidth="1.2"
                    transform="rotate(-5 900 675)"
                />
            </svg>

            {/* Depth marker — upper left, distant */}
            <div
                className="absolute -top-[10%] -left-[5%] w-[400px] h-[300px]"
                style={{
                    background: `
                        radial-gradient(ellipse 100% 100% at 50% 50%, 
                            rgba(139, 92, 246, 0.04) 0%, 
                            transparent 50%
                        )
                    `,
                    filter: 'blur(100px)',
                }}
            />

            {/* Depth marker — lower right */}
            <div
                className="absolute -bottom-[15%] -right-[8%] w-[450px] h-[350px]"
                style={{
                    background: `
                        radial-gradient(ellipse 100% 100% at 50% 50%, 
                            rgba(109, 40, 217, 0.035) 0%, 
                            transparent 55%
                        )
                    `,
                    filter: 'blur(90px)',
                }}
            />

            {/* Name stage light — very subtle spotlight */}
            <div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[55%] w-[600px] h-[200px]"
                style={{
                    background: `
                        radial-gradient(ellipse 100% 60% at 50% 50%, 
                            rgba(167, 139, 250, 0.03) 0%, 
                            transparent 45%
                        )
                    `,
                    filter: 'blur(50px)',
                }}
            />

            {/* Content — strict centered column */}
            <motion.div
                className="relative z-10 section-container flex flex-col items-center text-center"
                style={{ y, opacity }}
            >
                {/* THE NAME — dominant, first thing the eye lands on */}
                <motion.h1
                    className="text-name text-text-primary mb-4"
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, ease }}
                >
                    <span className="accent">G</span>ranth Agarwal
                </motion.h1>

                {/* Claim — one line, system-level */}
                <motion.p
                    className="text-display-md text-text-secondary mt-6 max-w-xl"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.9, ease, delay: 0.2 }}
                >
                    {hero.statement}
                </motion.p>

                {/* Credibility anchor — liner notes */}
                <motion.p
                    className="text-liner mt-8"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                >
                    {hero.subtext}
                </motion.p>

                {/* Social links — secondary, quiet */}
                <motion.div
                    className="mt-16 flex items-center gap-8"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.7 }}
                >
                    <a
                        href={personalInfo.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="link-quiet"
                        aria-label="GitHub"
                    >
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                        </svg>
                    </a>
                    <a
                        href={personalInfo.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="link-quiet"
                        aria-label="LinkedIn"
                    >
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                        </svg>
                    </a>
                    <a
                        href={`mailto:${personalInfo.email}`}
                        className="link-quiet"
                        aria-label="Email"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                        </svg>
                    </a>
                </motion.div>
            </motion.div>

            {/* Scroll hint — minimal */}
            <motion.div
                className="absolute bottom-8 left-1/2 -translate-x-1/2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.3 }}
                transition={{ delay: 1.5 }}
            >
                <div className="w-px h-8 bg-gradient-to-b from-text-muted to-transparent" />
            </motion.div>
        </section>
    );
};

export default Hero;
