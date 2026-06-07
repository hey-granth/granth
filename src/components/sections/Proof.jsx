import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { proof, sectionTitles } from '../../data/content';

const ease = [0.16, 1, 0.3, 1];

const techLinks = {
    Python: 'https://python.org',
    Go: 'https://go.dev',
    Django: 'https://djangoproject.com',
    DRF: 'https://django-rest-framework.org',
    FastAPI: 'https://fastapi.tiangolo.com',
    Flask: 'https://flask.palletsprojects.com',
    Celery: 'https://docs.celeryq.dev',
    Pydantic: 'https://docs.pydantic.dev',
    SQLAlchemy: 'https://sqlalchemy.org',
    PostgreSQL: 'https://postgresql.org',
    Redis: 'https://redis.io',
    pgvector: 'https://github.com/pgvector/pgvector',
    PostGIS: 'https://postgis.net',
    RabbitMQ: 'https://rabbitmq.com',
    Supabase: 'https://supabase.com',
    Neon: 'https://neon.tech',
    MySQL: 'https://mysql.com',
    SQLite: 'https://sqlite.org',
    LanceDB: 'https://lancedb.com',
    TypeScript: 'https://www.typescriptlang.org',
    React: 'https://react.dev',
    'Next.js': 'https://nextjs.org',
    Astro: 'https://astro.build',
    JavaScript: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript',
    Dart: 'https://dart.dev',
    Docker: 'https://docker.com',
    Linux: 'https://kernel.org',
    Nginx: 'https://nginx.org',
    AWS: 'https://aws.amazon.com',
    GCP: 'https://cloud.google.com',
    Vercel: 'https://vercel.com',
    Render: 'https://render.com',
    Git: 'https://git-scm.com',
    pytest: 'https://pytest.org',
    Playwright: 'https://playwright.dev',
    Locust: 'https://locust.io',
    'CI/CD': 'https://github.com/features/actions',
    uv: 'https://docs.astral.sh/uv/',
    Postman: 'https://postman.com',
};

const stackSections = [
    { key: 'backend', title: 'Backend', techs: proof.stack.backend },
    { key: 'data', title: 'Data', techs: proof.stack.data },
    { key: 'frontend', title: 'Frontend', techs: proof.stack.frontend },
    { key: 'operations', title: 'Operations', techs: proof.stack.operations },
];

// Category accents for the editorial stack layout
const stackZones = {
    backend: {
        accent: '#7C6AF7',
    },
    data: {
        accent: '#2D9CDB',
    },
    frontend: {
        accent: '#E76F51',
    },
    operations: {
        accent: '#27AE60',
    },
};

const Proof = () => {
    const ref = useRef(null);
    const stackRef = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-100px' });
    const stackInView = useInView(stackRef, { once: true, margin: '-50px' });

    return (
        <section id="credentials" ref={ref} className="section-padding section-padding--stack relative">
            {/* Subtle section wash */}
            <div
                className="absolute inset-0 pointer-events-none"
                style={{
                    background: `
                        linear-gradient(180deg,
                            transparent 0%,
                            rgba(242, 224, 232, 0.15) 30%,
                            rgba(242, 224, 232, 0.2) 50%,
                            rgba(242, 224, 232, 0.15) 70%,
                            transparent 100%
                        )
                    `,
                }}
            />
            <div className="section-container relative">
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
                        <span className="text-liner text-sm text-text-muted">
                            #{proof.patent.number}
                        </span>
                    </div>
                    <h3 className="text-display-sm text-text-primary mb-2">
                        {proof.patent.title}
                    </h3>
                    <p className="text-liner text-sm text-text-muted">
                        Published {proof.patent.date}
                    </p>
                </motion.div>

                {/* The Stack */}
                <div ref={stackRef} className="stack-constellation">
                    <motion.div
                        className="stack-anchor"
                        initial={{ opacity: 0 }}
                        animate={stackInView ? { opacity: 1 } : {}}
                        transition={{ duration: 0.6, ease }}
                    >
                        <span className="stack-anchor-text">The Stack</span>
                        <div className="stack-anchor-line" />
                    </motion.div>

                    <motion.p
                        className="stack-descriptor"
                        initial={{ opacity: 0, y: 6 }}
                        animate={stackInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.5, ease, delay: 0.05 }}
                    >
                        The tools I reach for first.
                    </motion.p>

                    <div className="stack-section-list">
                        {stackSections.map(({ key, title, techs }, zoneIndex) => {
                            const zone = stackZones[key];

                            return (
                                <motion.section
                                    key={key}
                                    className="stack-section"
                                    style={{
                                        '--stack-accent': zone.accent,
                                    }}
                                    initial={{ opacity: 0, y: 14 }}
                                    animate={stackInView ? { opacity: 1, y: 0 } : {}}
                                    transition={{
                                        duration: 0.5,
                                        ease,
                                        delay: 0.1 + zoneIndex * 0.06,
                                    }}
                                >
                                    <div className="stack-section-header">
                                        <h3 className="stack-category-title">{title}</h3>
                                    </div>

                                    <ul className="stack-pill-list" aria-label={title}>
                                        {techs.map((tech, techIndex) => {
                                            const href = techLinks[tech];

                                            return (
                                                <motion.li
                                                    key={tech}
                                                    className="stack-pill-item"
                                                    initial={{ opacity: 0, y: 4 }}
                                                    animate={stackInView ? { opacity: 1, y: 0 } : {}}
                                                    transition={{
                                                        duration: 0.3,
                                                        ease,
                                                        delay: 0.16 + zoneIndex * 0.04 + techIndex * 0.015,
                                                    }}
                                                >
                                                    <a
                                                        href={href}
                                                        target="_blank"
                                                        rel="noreferrer noopener"
                                                        className="stack-pill"
                                                        style={{ '--stack-pill-accent': zone.accent }}
                                                        aria-label={`${tech} official website`}
                                                    >
                                                        {tech}
                                                    </a>
                                                </motion.li>
                                            );
                                        })}
                                    </ul>
                                </motion.section>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Proof;
