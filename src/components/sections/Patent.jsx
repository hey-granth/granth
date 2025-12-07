import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { patent } from '../../data/content';
import { Badge } from '../ui';
import { fadeInUp, scaleIn, staggerContainer } from '../../lib/animations';

const Patent = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-100px' });

    return (
        <section id="patent" ref={ref} className="section-padding">
            <motion.div
                className="section-container"
                variants={staggerContainer}
                initial="hidden"
                animate={isInView ? 'visible' : 'hidden'}
            >
                {/* Section Header */}
                <motion.div className="mb-16 text-center" variants={fadeInUp}>
                    <span className="inline-block text-accent text-sm font-medium tracking-wider uppercase mb-3">
                        Innovation
                    </span>
                    <h2 className="text-display-sm md:text-display-md font-bold text-text-primary">
                        Patent
                    </h2>
                </motion.div>

                {/* Patent Card */}
                <motion.div
                    variants={scaleIn}
                    className="max-w-3xl mx-auto"
                >
                    <div className="relative group">
                        {/* Glow effect */}
                        <div className="absolute -inset-1 bg-gradient-to-r from-accent/20 via-accent/10 to-accent/20 rounded-2xl blur-xl opacity-50 group-hover:opacity-75 transition-opacity duration-500" />

                        {/* Card */}
                        <div className="relative bg-dark-800/80 backdrop-blur-xl rounded-2xl border border-dark-600/50 p-8 md:p-10">
                            {/* Status badge */}
                            <div className="flex items-center gap-3 mb-6">
                                <Badge variant="success">{patent.status}</Badge>
                                <span className="text-text-muted text-sm">
                                    Published: {patent.publishedDate}
                                </span>
                            </div>

                            {/* Title */}
                            <h3 className="text-xl md:text-2xl font-semibold text-text-primary mb-4 leading-tight">
                                {patent.title}
                            </h3>

                            {/* Application number */}
                            <div className="flex items-center gap-2 mb-6 text-sm">
                                <span className="text-text-muted">Application No:</span>
                                <span className="text-accent font-mono">{patent.applicationNumber}</span>
                            </div>

                            {/* Description */}
                            <p className="text-text-secondary leading-relaxed">
                                {patent.description}
                            </p>
                        </div>
                    </div>
                </motion.div>
            </motion.div>
        </section>
    );
};

export default Patent;
