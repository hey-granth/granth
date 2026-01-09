import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { proof, sectionTitles } from '../../data/content';

const ease = [0.16, 1, 0.3, 1];

// Documentation links for each tool
const techDocs = {
    Python: 'https://docs.python.org/3/',
    Django: 'https://docs.djangoproject.com/',
    FastAPI: 'https://fastapi.tiangolo.com/',
    PostgreSQL: 'https://www.postgresql.org/docs/',
    Redis: 'https://redis.io/docs/',
    Celery: 'https://docs.celeryq.dev/',
    Linux: 'https://www.kernel.org/doc/',
    GCP: 'https://cloud.google.com/docs',
    Git: 'https://git-scm.com/doc',
};

// Stack zone configuration — normalized symmetry
const stackZones = {
    core: { label: 'CORE' },
    data: { label: 'DATA' },
    infra: { label: 'INFRA' },
};

const Proof = () => {
    const ref = useRef(null);
    const stackRef = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-100px' });
    const stackInView = useInView(stackRef, { once: true, margin: '-50px' });

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
                    className="card p-8 mb-20"
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.7, ease, delay: 0.2 }}
                >
                    <div className="flex flex-wrap items-center gap-4 mb-4">
                        <span className="era-badge">Patent {proof.patent.status}</span>
                        <span className="text-liner text-sm text-text-secondary">
                            #{proof.patent.number}
                        </span>
                    </div>
                    <h3 className="text-display-sm text-text-primary mb-2">
                        {proof.patent.title}
                    </h3>
                    <p className="text-liner text-sm text-text-secondary">
                        Published {proof.patent.date}
                    </p>
                </motion.div>

                {/* ═══════════════════════════════════════════════════════════════
                    THE STACK — Symmetric, functional, linked
                ═══════════════════════════════════════════════════════════════ */}
                <div ref={stackRef} className="stack-constellation">
                    {/* Background orbital system */}
                    <div className="stack-orbital-bg">
                        {/* Depth orbs behind each zone */}
                        <div className="stack-depth-orb stack-depth-orb--core" />
                        <div className="stack-depth-orb stack-depth-orb--data" />
                        <div className="stack-depth-orb stack-depth-orb--infra" />

                        {/* Orbital arcs framing the constellation */}
                        <svg
                            className="stack-orbital-arcs"
                            viewBox="0 0 1200 400"
                            preserveAspectRatio="xMidYMid slice"
                        >
                            {/* Outer envelope */}
                            <ellipse
                                cx="600"
                                cy="200"
                                rx="550"
                                ry="180"
                                fill="none"
                                stroke="rgba(109, 40, 217, 0.045)"
                                strokeWidth="1"
                            />
                            {/* Mid arc */}
                            <ellipse
                                cx="600"
                                cy="200"
                                rx="420"
                                ry="140"
                                fill="none"
                                stroke="rgba(124, 58, 237, 0.035)"
                                strokeWidth="0.8"
                                strokeDasharray="4 8"
                            />
                            {/* Inner arc */}
                            <ellipse
                                cx="600"
                                cy="200"
                                rx="280"
                                ry="95"
                                fill="none"
                                stroke="rgba(139, 92, 246, 0.03)"
                                strokeWidth="0.6"
                            />

                            {/* Connecting paths suggesting flow */}
                            <path
                                d="M 180 200 Q 400 150 600 200 Q 800 250 1020 200"
                                fill="none"
                                stroke="rgba(124, 58, 237, 0.025)"
                                strokeWidth="1"
                                strokeDasharray="2 6"
                            />
                            <path
                                d="M 250 280 Q 450 200 600 200 Q 750 200 950 280"
                                fill="none"
                                stroke="rgba(139, 92, 246, 0.02)"
                                strokeWidth="0.8"
                            />
                        </svg>

                        {/* Dense grain overlay for this section */}
                        <div className="stack-grain" />
                    </div>

                    {/* Section anchor — chapter marker style */}
                    <motion.div
                        className="stack-anchor"
                        initial={{ opacity: 0 }}
                        animate={stackInView ? { opacity: 1 } : {}}
                        transition={{ duration: 0.6, ease }}
                    >
                        <span className="stack-anchor-text">The Stack</span>
                        <div className="stack-anchor-line" />
                    </motion.div>

                    {/* Symmetric zone grid */}
                    <div className="stack-zones-symmetric">
                        {Object.entries(proof.stack).map(([category, techs], zoneIndex) => {
                            const zone = stackZones[category];

                            return (
                                <motion.div
                                    key={category}
                                    className="stack-zone-symmetric"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={stackInView ? { opacity: 1, y: 0 } : {}}
                                    transition={{
                                        duration: 0.6,
                                        ease,
                                        delay: 0.15 + zoneIndex * 0.1
                                    }}
                                >
                                    {/* Zone label — aligned baseline */}
                                    <h4 className="stack-zone-label-symmetric">
                                        {zone.label}
                                    </h4>

                                    {/* Clustered items — all uniform */}
                                    <div className="stack-cluster-symmetric">
                                        {techs.map((tech, techIndex) => (
                                            <motion.a
                                                key={tech}
                                                href={techDocs[tech]}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="stack-tech-link"
                                                initial={{ opacity: 0, scale: 0.95 }}
                                                animate={stackInView ? { opacity: 1, scale: 1 } : {}}
                                                transition={{
                                                    duration: 0.4,
                                                    ease,
                                                    delay: 0.25 + zoneIndex * 0.1 + techIndex * 0.06
                                                }}
                                            >
                                                {tech}
                                                <svg
                                                    className="stack-tech-link-icon"
                                                    viewBox="0 0 16 16"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    strokeWidth="1.5"
                                                >
                                                    <path d="M6.5 3.5h6m0 0v6m0-6L4 12" strokeLinecap="round" strokeLinejoin="round" />
                                                </svg>
                                            </motion.a>
                                        ))}
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Proof;
