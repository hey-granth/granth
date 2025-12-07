import { motion, useInView } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import { personalInfo } from '../../data/content';
import { Button, AnimatedText } from '../ui';
import { fadeInUp, staggerContainer, textReveal } from '../../lib/animations';

// Floating particles for subtle ambient effect
const Particles = () => {
    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[...Array(20)].map((_, i) => (
                <motion.div
                    key={i}
                    className="absolute w-1 h-1 bg-accent/30 rounded-full"
                    style={{
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`,
                    }}
                    animate={{
                        y: [0, -30, 0],
                        opacity: [0.2, 0.6, 0.2],
                        scale: [1, 1.5, 1],
                    }}
                    transition={{
                        duration: 4 + Math.random() * 4,
                        repeat: Infinity,
                        delay: Math.random() * 4,
                        ease: 'easeInOut',
                    }}
                />
            ))}
        </div>
    );
};

// Animated role text that cycles through roles
const RoleText = ({ roles }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % roles.length);
        }, 3000);
        return () => clearInterval(interval);
    }, [roles.length]);

    return (
        <div className="h-8 md:h-10 overflow-hidden">
            <motion.div
                key={currentIndex}
                initial={{ y: 40, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -40, opacity: 0 }}
                transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="text-accent text-lg md:text-xl font-medium"
            >
                {roles[currentIndex]}
            </motion.div>
        </div>
    );
};

const Hero = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });

    return (
        <section
            id="home"
            ref={ref}
            className="relative min-h-screen flex items-center justify-center overflow-hidden"
        >
            {/* Background gradient */}
            <div className="absolute inset-0 bg-gradient-to-b from-dark-950 via-dark-900 to-dark-950" />

            {/* Subtle glow orbs */}
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
            <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent/3 rounded-full blur-3xl" />

            {/* Floating particles */}
            <Particles />

            {/* Content */}
            <motion.div
                className="relative z-10 section-container text-center"
                variants={staggerContainer}
                initial="hidden"
                animate={isInView ? 'visible' : 'hidden'}
            >
                {/* Name */}
                <motion.div variants={fadeInUp} className="mb-4">
                    <h1 className="text-display-lg md:text-display-xl font-bold text-text-primary">
                        <AnimatedText text={personalInfo.name} staggerDelay={0.08} wordBased />
                    </h1>
                </motion.div>

                {/* Animated roles */}
                <motion.div variants={fadeInUp} className="mb-6">
                    <RoleText roles={personalInfo.roles} />
                </motion.div>

                {/* Tagline */}
                <motion.p
                    variants={fadeInUp}
                    className="text-text-secondary text-lg md:text-xl max-w-2xl mx-auto mb-10 text-balance"
                >
                    {personalInfo.tagline}
                </motion.p>

                {/* CTAs */}
                <motion.div
                    variants={fadeInUp}
                    className="flex flex-wrap items-center justify-center gap-4"
                >
                    <Button
                        href={personalInfo.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        variant="primary"
                        size="lg"
                    >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                        </svg>
                        GitHub
                    </Button>

                    <Button
                        href={`mailto:${personalInfo.email}`}
                        variant="secondary"
                        size="lg"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                        Email Me
                    </Button>

                    <Button
                        href={personalInfo.resume}
                        target="_blank"
                        variant="outline"
                        size="lg"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        Resume
                    </Button>
                </motion.div>

                {/* Scroll indicator */}
                <motion.div
                    className="mt-16 flex justify-center"
                    variants={fadeInUp}
                >
                    <motion.div
                        className="w-6 h-10 rounded-full border-2 border-text-muted/30 flex justify-center p-2"
                        animate={{ y: [0, 8, 0] }}
                        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                    >
                        <motion.div className="w-1 h-2 bg-text-muted/50 rounded-full" />
                    </motion.div>
                </motion.div>
            </motion.div>
        </section>
    );
};

export default Hero;
