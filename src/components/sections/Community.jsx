import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { communityWork } from '../../data/content';
import { Card, Badge } from '../ui';
import { fadeInUp, staggerContainer } from '../../lib/animations';

const CommunityCard = ({ item, index }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-50px' });

    return (
        <motion.div
            ref={ref}
            variants={fadeInUp}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            transition={{ delay: index * 0.15 }}
        >
            <Card className="p-6 h-full" glow>
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                    <div>
                        <h3 className="text-lg font-semibold text-text-primary mb-1">
                            {item.role}
                        </h3>
                        <p className="text-accent text-sm font-medium">
                            {item.organization}
                        </p>
                    </div>
                    {item.members && (
                        <Badge variant="accent">{item.members} members</Badge>
                    )}
                </div>

                {/* Description */}
                <p className="text-text-secondary text-sm mb-4">
                    {item.description}
                </p>

                {/* Highlights */}
                <ul className="space-y-2">
                    {item.highlights.map((highlight, i) => (
                        <li key={i} className="flex items-center gap-2 text-text-secondary text-sm">
                            <span className="text-accent">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                            </span>
                            {highlight}
                        </li>
                    ))}
                </ul>
            </Card>
        </motion.div>
    );
};

const Community = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-100px' });

    return (
        <section id="community" ref={ref} className="section-padding bg-dark-900/50">
            <motion.div
                className="section-container"
                variants={staggerContainer}
                initial="hidden"
                animate={isInView ? 'visible' : 'hidden'}
            >
                {/* Section Header */}
                <motion.div className="mb-16 text-center" variants={fadeInUp}>
                    <span className="inline-block text-accent text-sm font-medium tracking-wider uppercase mb-3">
                        Community
                    </span>
                    <h2 className="text-display-sm md:text-display-md font-bold text-text-primary mb-4">
                        Leadership & Mentorship
                    </h2>
                    <p className="text-text-secondary max-w-2xl mx-auto text-lg">
                        Building and nurturing tech communities while helping others grow.
                    </p>
                </motion.div>

                {/* Community Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                    {communityWork.map((item, index) => (
                        <CommunityCard key={item.organization} item={item} index={index} />
                    ))}
                </div>
            </motion.div>
        </section>
    );
};

export default Community;
