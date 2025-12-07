import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { skillCategories } from '../../data/content';
import { Section } from '../layout';
import { Card, Badge } from '../ui';
import { fadeInUp, staggerContainer } from '../../lib/animations';

const SkillCard = ({ category, index }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-50px' });

    return (
        <motion.div
            ref={ref}
            variants={fadeInUp}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            transition={{ delay: index * 0.1 }}
        >
            <Card className="p-6 h-full" glow>
                <div className="flex items-center gap-3 mb-4">
                    <span className="text-2xl">{category.icon}</span>
                    <h3 className="text-lg font-semibold text-text-primary">
                        {category.title}
                    </h3>
                </div>
                <div className="flex flex-wrap gap-2">
                    {category.skills.map((skill) => (
                        <Badge key={skill} variant="default">
                            {skill}
                        </Badge>
                    ))}
                </div>
            </Card>
        </motion.div>
    );
};

const About = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-100px' });

    return (
        <section id="about" ref={ref} className="section-padding bg-dark-900/50">
            <motion.div
                className="section-container"
                variants={staggerContainer}
                initial="hidden"
                animate={isInView ? 'visible' : 'hidden'}
            >
                {/* Section Header */}
                <motion.div className="mb-16 text-center" variants={fadeInUp}>
                    <span className="inline-block text-accent text-sm font-medium tracking-wider uppercase mb-3">
                        About Me
                    </span>
                    <h2 className="text-display-sm md:text-display-md font-bold text-text-primary mb-4">
                        Skills & Expertise
                    </h2>
                    <p className="text-text-secondary max-w-2xl mx-auto text-lg">
                        Building robust backend systems with a focus on scalability, security, and clean architecture.
                    </p>
                </motion.div>

                {/* Skills Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {skillCategories.map((category, index) => (
                        <SkillCard key={category.title} category={category} index={index} />
                    ))}
                </div>
            </motion.div>
        </section>
    );
};

export default About;
