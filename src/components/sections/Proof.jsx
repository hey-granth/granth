import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { proof, sectionTitles } from '../../data/content';

const ease = [0.16, 1, 0.3, 1];

const Proof = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-100px' });

    return (
        <section id="credentials" ref={ref} className="section-padding relative">
            {/* Section-specific depth layer */}
            <div
                className="absolute inset-0 pointer-events-none"
                style={{
                    background: `
                        linear-gradient(180deg, 
                            rgba(7, 7, 18, 0.5) 0%, 
                            rgba(10, 10, 24, 0.6) 50%, 
                            rgba(7, 7, 18, 0.5) 100%
                        )
                    `,
                }}
            />
            <div className="section-container">
                {/* Header */}
                <motion.header
                    className="mb-16"
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8, ease }}
                >
                    <span className="track-title">{sectionTitles.proof}</span>
                    <h2 className="text-display-xl text-text-primary mt-4">
                        Proof. Not promises.
                    </h2>
                </motion.header>

                {/* Metrics grid */}
                <motion.div
                    className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16"
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.7, ease, delay: 0.1 }}
                >
                    {proof.metrics.map((metric) => (
                        <div key={metric.label} className="text-center">
                            <div className="metric-value">{metric.value}</div>
                            <div className="metric-label mt-2">{metric.label}</div>
                        </div>
                    ))}
                </motion.div>

                {/* Patent */}
                <motion.div
                    className="card p-8 mb-16"
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.7, ease, delay: 0.2 }}
                >
                    <div className="flex flex-wrap items-center gap-4 mb-4">
                        <span className="era-badge">Patent {proof.patent.status}</span>
                        <span className="text-liner text-xs text-text-dim">
                            #{proof.patent.number}
                        </span>
                    </div>
                    <h3 className="text-display-sm text-text-primary mb-2">
                        {proof.patent.title}
                    </h3>
                    <p className="text-liner text-xs text-text-dim">
                        Published {proof.patent.date}
                    </p>
                </motion.div>

                {/* Stack */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : {}}
                    transition={{ duration: 0.7, delay: 0.3 }}
                >
                    <h3 className="track-title mb-6">The Stack</h3>
                    <div className="grid sm:grid-cols-3 gap-6">
                        {Object.entries(proof.stack).map(([category, techs]) => (
                            <div key={category}>
                                <h4 className="text-liner text-xs text-text-dim uppercase tracking-wider mb-3">
                                    {category}
                                </h4>
                                <div className="flex flex-wrap gap-2">
                                    {techs.map((tech) => (
                                        <span key={tech} className="tech-badge">{tech}</span>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default Proof;
