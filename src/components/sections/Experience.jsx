import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { experiences } from '../../data/content';
import { Card, Badge } from '../ui';
import { fadeInUp, fadeInLeft, staggerContainer } from '../../lib/animations';

const ExperienceCard = ({ experience, index }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-50px' });
    const isLeft = index % 2 === 0;

    return (
        <motion.div
            ref={ref}
            className="relative"
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            variants={fadeInUp}
            transition={{ delay: index * 0.2 }}
        >
            {/* Timeline connector */}
            <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-dark-600 -translate-x-1/2 hidden md:block" />

            {/* Timeline dot */}
            <motion.div
                className="absolute left-0 md:left-1/2 top-8 w-3 h-3 bg-accent rounded-full -translate-x-1/2 hidden md:block z-10"
                initial={{ scale: 0 }}
                animate={isInView ? { scale: 1 } : { scale: 0 }}
                transition={{ delay: index * 0.2 + 0.3, type: 'spring' }}
            >
                <div className="absolute inset-0 bg-accent rounded-full animate-ping opacity-50" />
            </motion.div>

            <div className={`md:w-1/2 ${isLeft ? 'md:pr-12' : 'md:pl-12 md:ml-auto'}`}>
                <Card className="p-6" glow>
                    <div className="flex flex-wrap items-center gap-3 mb-4">
                        <Badge variant="accent">{experience.type}</Badge>
                        <span className="text-text-muted text-sm">{experience.period}</span>
                    </div>

                    <h3 className="text-xl font-semibold text-text-primary mb-1">
                        {experience.title}
                    </h3>
                    <p className="text-accent text-sm font-medium mb-4">
                        {experience.company}
                    </p>

                    <ul className="space-y-2">
                        {experience.highlights.map((highlight, i) => (
                            <motion.li
                                key={i}
                                className="flex items-start gap-2 text-text-secondary text-sm"
                                initial={{ opacity: 0, x: -10 }}
                                animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
                                transition={{ delay: index * 0.2 + 0.4 + i * 0.1 }}
                            >
                                <span className="text-accent mt-1.5">
                                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                    </svg>
                                </span>
                                {highlight}
                            </motion.li>
                        ))}
                    </ul>
                </Card>
            </div>
        </motion.div>
    );
};

const Experience = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-100px' });

    return (
        <section id="experience" ref={ref} className="section-padding">
            <motion.div
                className="section-container"
                variants={staggerContainer}
                initial="hidden"
                animate={isInView ? 'visible' : 'hidden'}
            >
                {/* Section Header */}
                <motion.div className="mb-16 text-center" variants={fadeInUp}>
                    <span className="inline-block text-accent text-sm font-medium tracking-wider uppercase mb-3">
                        Experience
                    </span>
                    <h2 className="text-display-sm md:text-display-md font-bold text-text-primary">
                        Professional Journey
                    </h2>
                </motion.div>

                {/* Timeline */}
                <div className="space-y-12 relative">
                    {experiences.map((experience, index) => (
                        <ExperienceCard key={index} experience={experience} index={index} />
                    ))}
                </div>
            </motion.div>
        </section>
    );
};

export default Experience;
