import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { projects } from '../../data/content';
import { Card, Badge } from '../ui';
import { fadeInUp, staggerContainer } from '../../lib/animations';

const ProjectCard = ({ project, index }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-50px' });
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <motion.div
            ref={ref}
            variants={fadeInUp}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            transition={{ delay: index * 0.15 }}
            className="h-full"
        >
            <Card
                className="p-6 h-full flex flex-col cursor-pointer"
                glow
                onClick={() => setIsExpanded(!isExpanded)}
            >
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                    <div>
                        <Badge variant="accent" className="mb-3">{project.category}</Badge>
                        <h3 className="text-xl font-semibold text-text-primary">
                            {project.name}
                        </h3>
                    </div>
                    <motion.div
                        animate={{ rotate: isExpanded ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                        className="text-text-muted"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                    </motion.div>
                </div>

                {/* Description */}
                <p className="text-text-secondary text-sm mb-4 flex-grow">
                    {isExpanded ? project.longDescription : project.description}
                </p>

                {/* Expanded content */}
                <motion.div
                    initial={false}
                    animate={{ height: isExpanded ? 'auto' : 0, opacity: isExpanded ? 1 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                >
                    <div className="pt-4 border-t border-dark-600/50">
                        <h4 className="text-sm font-medium text-text-primary mb-3">Key Features</h4>
                        <ul className="space-y-2 mb-4">
                            {project.features.map((feature, i) => (
                                <li key={i} className="flex items-center gap-2 text-text-secondary text-sm">
                                    <span className="text-accent">•</span>
                                    {feature}
                                </li>
                            ))}
                        </ul>
                    </div>
                </motion.div>

                {/* Tech Stack */}
                <div className="flex flex-wrap gap-2 mt-auto pt-4 border-t border-dark-600/50">
                    {project.stack.map((tech) => (
                        <Badge key={tech} variant="default">
                            {tech}
                        </Badge>
                    ))}
                </div>
            </Card>
        </motion.div>
    );
};

const Projects = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-100px' });

    return (
        <section id="projects" ref={ref} className="section-padding bg-dark-900/50">
            <motion.div
                className="section-container"
                variants={staggerContainer}
                initial="hidden"
                animate={isInView ? 'visible' : 'hidden'}
            >
                {/* Section Header */}
                <motion.div className="mb-16 text-center" variants={fadeInUp}>
                    <span className="inline-block text-accent text-sm font-medium tracking-wider uppercase mb-3">
                        Projects
                    </span>
                    <h2 className="text-display-sm md:text-display-md font-bold text-text-primary mb-4">
                        Featured Work
                    </h2>
                    <p className="text-text-secondary max-w-2xl mx-auto text-lg">
                        Case studies showcasing backend architecture, API design, and system optimizations.
                    </p>
                </motion.div>

                {/* Projects Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {projects.map((project, index) => (
                        <ProjectCard key={project.name} project={project} index={index} />
                    ))}
                </div>
            </motion.div>
        </section>
    );
};

export default Projects;
