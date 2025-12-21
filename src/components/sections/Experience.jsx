import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { eras, sectionTitles } from '../../data/content';

const ease = [0.16, 1, 0.3, 1];

const EraCard = ({ era, index }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-50px' });

    return (
        <motion.article
            ref={ref}
            className="relative pl-8 md:pl-12 pb-12"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease, delay: index * 0.1 }}
        >
            {/* Timeline line */}
            <div className="absolute left-0 top-2 bottom-0 w-px bg-dark-600" />

            {/* Timeline dot */}
            <div className="absolute left-0 top-2 w-2 h-2 -translate-x-[3px] rounded-full bg-jamun" />

            {/* Content */}
            <div className="mb-3">
                <span className="era-badge">{era.name}</span>
            </div>

            <h3 className="text-display-sm text-text-primary">
                {era.title}
            </h3>

            <div className="flex items-center gap-2 mt-1 text-liner text-xs">
                <span className="accent">{era.company}</span>
                <span className="text-text-dim">·</span>
                <span className="text-text-dim">{era.period}</span>
            </div>

            <p className="text-liner mt-4 mb-4">
                {era.narrative}
            </p>

            <ul className="grid sm:grid-cols-2 gap-x-6 gap-y-1">
                {era.highlights.map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-liner text-xs text-text-muted">
                        <span className="accent">→</span>
                        {item}
                    </li>
                ))}
            </ul>
        </motion.article>
    );
};

const Experience = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-100px' });

    return (
        <section id="eras" ref={ref} className="section-padding">
            <div className="section-container">
                {/* Header */}
                <motion.header
                    className="mb-16"
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8, ease }}
                >
                    <span className="track-title">{sectionTitles.timeline}</span>
                    <h2 className="text-display-xl text-text-primary mt-4">
                        Not jobs. Eras.
                    </h2>
                </motion.header>

                {/* Timeline */}
                <div>
                    {eras.map((era, index) => (
                        <EraCard key={era.name} era={era} index={index} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Experience;
