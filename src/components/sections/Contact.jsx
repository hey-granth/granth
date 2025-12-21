import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { closing, personalInfo } from '../../data/content';

const ease = [0.16, 1, 0.3, 1];

const icons = {
    github: (
        <svg fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
        </svg>
    ),
    linkedin: (
        <svg fill="currentColor" viewBox="0 0 24 24">
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
    ),
    email: (
        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
        </svg>
    ),
};

const Contact = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-50px' });

    return (
        <section
            id="contact"
            ref={ref}
            className="py-24 md:py-32 relative overflow-hidden"
        >
            {/* ═══════════════════════════════════════════════════════════════
                FINAL SECTION — GRAVITATIONAL CONVERGENCE
                Dense, heavy, orbital arcs converging toward closure.
            ═══════════════════════════════════════════════════════════════ */}

            {/* Gravitational pull gradient — intensifying toward center-bottom */}
            <div
                className="absolute inset-0 pointer-events-none"
                style={{
                    background: `
                        radial-gradient(ellipse 85% 65% at 50% 95%, 
                            rgba(109, 40, 217, 0.1) 0%, 
                            rgba(124, 58, 237, 0.04) 30%,
                            transparent 55%
                        ),
                        linear-gradient(180deg,
                            transparent 0%,
                            rgba(8, 5, 18, 0.15) 40%,
                            rgba(6, 4, 14, 0.3) 70%,
                            rgba(5, 3, 12, 0.45) 100%
                        )
                    `,
                }}
            />

            {/* Converging orbital hint — enhanced SVG system */}
            <svg
                className="absolute inset-0 w-full h-full pointer-events-none"
                viewBox="0 0 1920 700"
                preserveAspectRatio="xMidYMid slice"
            >
                {/* Outermost convergence arc */}
                <ellipse
                    cx="960"
                    cy="800"
                    rx="1000"
                    ry="340"
                    fill="none"
                    stroke="rgba(109, 40, 217, 0.05)"
                    strokeWidth="1.2"
                    transform="rotate(-1.5 960 800)"
                />
                {/* Arc 2 */}
                <ellipse
                    cx="960"
                    cy="880"
                    rx="820"
                    ry="280"
                    fill="none"
                    stroke="rgba(124, 58, 237, 0.04)"
                    strokeWidth="0.9"
                    transform="rotate(1 960 880)"
                />
                {/* Arc 3 — dashed texture */}
                <ellipse
                    cx="960"
                    cy="960"
                    rx="640"
                    ry="220"
                    fill="none"
                    stroke="rgba(139, 92, 246, 0.045)"
                    strokeWidth="0.6"
                    strokeDasharray="5 8"
                    transform="rotate(-0.5 960 960)"
                />
                {/* Innermost arc */}
                <ellipse
                    cx="960"
                    cy="1020"
                    rx="460"
                    ry="160"
                    fill="none"
                    stroke="rgba(167, 139, 250, 0.035)"
                    strokeWidth="0.8"
                    transform="rotate(0.5 960 1020)"
                />
            </svg>

            {/* Dense depth marker — center pull, intensified */}
            <div
                className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[350px] pointer-events-none"
                style={{
                    background: `
                        radial-gradient(ellipse 100% 85% at 50% 100%, 
                            rgba(109, 40, 217, 0.08) 0%, 
                            rgba(124, 58, 237, 0.025) 40%,
                            transparent 60%
                        )
                    `,
                    filter: 'blur(55px)',
                }}
            />

            {/* Corner density — left */}
            <div
                className="absolute bottom-0 left-0 w-[40vw] h-[50%] pointer-events-none"
                style={{
                    background: `
                        radial-gradient(ellipse 100% 80% at 0% 100%, 
                            rgba(7, 5, 15, 0.4) 0%, 
                            transparent 50%
                        )
                    `,
                }}
            />

            {/* Corner density — right */}
            <div
                className="absolute bottom-0 right-0 w-[40vw] h-[50%] pointer-events-none"
                style={{
                    background: `
                        radial-gradient(ellipse 100% 80% at 100% 100%, 
                            rgba(7, 5, 15, 0.35) 0%, 
                            transparent 45%
                        )
                    `,
                }}
            />

            {/* Subtle grain intensification */}
            <div
                className="absolute inset-0 pointer-events-none opacity-[0.03]"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='contactgrain'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.7' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23contactgrain)'/%3E%3C/svg%3E")`,
                    mixBlendMode: 'overlay',
                }}
            />

            <div className="section-container relative z-10">
                {/* Frame / divider — orbital accent */}
                <motion.div
                    className="w-12 h-px mb-8"
                    style={{
                        background: 'linear-gradient(90deg, rgba(124, 58, 237, 0.6), rgba(139, 92, 246, 0.2))',
                    }}
                    initial={{ scaleX: 0 }}
                    animate={isInView ? { scaleX: 1 } : {}}
                    transition={{ duration: 0.6, ease }}
                    transformOrigin="left"
                />

                {/* Primary statement — larger, declarative */}
                <motion.h2
                    className="text-display-lg text-text-primary mb-4 max-w-lg"
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.7, ease, delay: 0.1 }}
                >
                    Backend engineering. Production systems. Scale problems.
                </motion.h2>

                {/* Secondary context — one line */}
                <motion.p
                    className="text-liner mb-10"
                    initial={{ opacity: 0, y: 15 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, ease, delay: 0.2 }}
                >
                    Interested in systems work, high-load backends, or technical conversations.
                </motion.p>

                {/* Contact actions — visually dominant, grouped tight */}
                <motion.div
                    className="flex flex-wrap gap-3"
                    initial={{ opacity: 0, y: 15 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, ease, delay: 0.3 }}
                >
                    <a
                        href={personalInfo.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="contact-btn"
                    >
                        {icons.github}
                        GitHub
                    </a>
                    <a
                        href={personalInfo.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="contact-btn"
                    >
                        {icons.linkedin}
                        LinkedIn
                    </a>
                    <a
                        href={`mailto:${personalInfo.email}`}
                        className="contact-btn"
                    >
                        {icons.email}
                        Email
                    </a>
                </motion.div>
            </div>
        </section>
    );
};

export default Contact;
