import { motion, useInView } from 'framer-motion';
import { Fragment, useRef } from 'react';
import { proof, sectionTitles } from '../../data/content';
import ExternalLinkPreview from '../ui/ExternalLinkPreview';

const ease = [0.16, 1, 0.3, 1];

const DEVICON_CDN = 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons';

const devicon = (name) => ({
    src: `${DEVICON_CDN}/${name}/${name}-original.svg`,
    fallbackSrc: `${DEVICON_CDN}/${name}/${name}-plain.svg`,
});

const techMeta = {
    Python: { href: 'https://python.org', ...devicon('python') },
    Go: { href: 'https://go.dev', ...devicon('go') },
    JavaScript: { href: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript', ...devicon('javascript') },
    Dart: { href: 'https://dart.dev', ...devicon('dart') },
    Django: { href: 'https://djangoproject.com', ...devicon('django') },
    DRF: {
        href: 'https://django-rest-framework.org',
        ...devicon('django'),
        // subLabel: 'REST',
    },
    FastAPI: { href: 'https://fastapi.tiangolo.com', ...devicon('fastapi') },
    Flask: { href: 'https://flask.palletsprojects.com', ...devicon('flask') },
    SQLAlchemy: { href: 'https://sqlalchemy.org', ...devicon('sqlalchemy') },
    Pydantic: { href: 'https://docs.pydantic.dev', src: 'https://docs.pydantic.dev/latest/favicon.png' },
    Celery: {
        href: 'https://docs.celeryq.dev',
        src: 'https://docs.celeryq.dev/en/stable/_static/celery_512.png',
        fallbackSrc: 'https://raw.githubusercontent.com/celery/celery/main/docs/images/celery_128.png',
    },
    Docker: { href: 'https://docker.com', ...devicon('docker') },
    Nginx: { href: 'https://nginx.org', ...devicon('nginx') },
    pytest: {
        href: 'https://pytest.org',
        src: 'https://docs.pytest.org/en/stable/_static/pytest1.png',
        fallbackSrc: 'https://docs.pytest.org/favicon.ico',
    },
    PostgreSQL: { href: 'https://postgresql.org', ...devicon('postgresql') },
    MySQL: { href: 'https://mysql.com', ...devicon('mysql') },
    SQLite: { href: 'https://sqlite.org', ...devicon('sqlite') },
    pgvector: {
        href: 'https://github.com/pgvector/pgvector',
        ...devicon('postgresql'),
    },
    Redis: { href: 'https://redis.io', ...devicon('redis') },
    RabbitMQ: { href: 'https://rabbitmq.com', src: 'https://www.rabbitmq.com/img/rabbitmq-logo.svg' },
    Supabase: { href: 'https://supabase.com', src: 'https://supabase.com/favicon/favicon-32x32.png' },
    GCP: { href: 'https://cloud.google.com', ...devicon('googlecloud') },
    Linux: { href: 'https://kernel.org', ...devicon('linux') },
    Git: { href: 'https://git-scm.com', ...devicon('git') },
    Postman: {
        href: 'https://postman.com',
        src: 'https://www.vectorlogo.zone/logos/getpostman/getpostman-icon.svg',
        fallbackSrc: 'https://uxwing.com/wp-content/themes/uxwing/download/brands-and-social-media/postman-icon.svg',
    },
};

const onIconError = (event) => {
    const img = event.currentTarget;
    const fallbackSrc = img.dataset.fallbackSrc;
    const failureStep = Number(img.dataset.failureStep || '0');

    if (failureStep === 0 && fallbackSrc && img.src !== fallbackSrc) {
        img.dataset.failureStep = '1';
        img.src = fallbackSrc;
        return;
    }

    img.style.display = 'none';
    img.onerror = null;

    const textFallback = img.parentElement?.querySelector('.stack-tech-icon-fallback');
    if (textFallback) {
        textFallback.style.display = 'inline-flex';
    }
};

// Renamed for editorial clarity — keep same data structure
const stackZones = {
    core: {
        label: 'CORE',
        accent: '#7C6AF7',
        accentSoft: 'rgba(124, 106, 247, 0.3)',
    },
    data: {
        label: 'DATA',
        accent: '#2D9CDB',
        accentSoft: 'rgba(45, 156, 219, 0.3)',
    },
    infra: {
        label: 'INFRA',
        accent: '#27AE60',
        accentSoft: 'rgba(39, 174, 96, 0.3)',
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

                    <div className="stack-zones-symmetric">
                        {Object.entries(proof.stack).map(([category, techs], zoneIndex) => {
                            const zone = stackZones[category];

                            return (
                                <Fragment key={category}>
                                    <motion.div
                                        className="stack-category-divider"
                                        style={{
                                            '--stack-accent': zone.accent,
                                        }}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={stackInView ? { opacity: 1, y: 0 } : {}}
                                        transition={{
                                            duration: 0.5,
                                            ease,
                                            delay: 0.12 + zoneIndex * 0.1,
                                        }}
                                    >
                                        <span className="stack-category-divider-text">
                                            {zone.label}
                                        </span>
                                        <span className="stack-category-divider-line" />
                                    </motion.div>

                                    {techs.map((tech, techIndex) => (
                                        <motion.div
                                            key={tech}
                                            initial={{ opacity: 0, scale: 0.95 }}
                                            animate={stackInView ? { opacity: 1, scale: 1 } : {}}
                                            transition={{
                                                duration: 0.4,
                                                ease,
                                                delay: 0.2 + zoneIndex * 0.1 + techIndex * 0.05,
                                            }}
                                            style={{
                                                '--stack-accent': zone.accent,
                                                '--stack-accent-soft': zone.accentSoft,
                                            }}
                                        >
                                            <ExternalLinkPreview
                                                url={techMeta[tech]?.href}
                                                isStatic={false}
                                                className="stack-tech-link"
                                                aria-label={`${tech} official website`}
                                            >
                                                <span className="stack-tech-icon-wrap">
                                                    <img
                                                        src={techMeta[tech]?.src}
                                                        data-fallback-src={techMeta[tech]?.fallbackSrc || ''}
                                                        alt={`${tech} logo`}
                                                        className="stack-tech-icon"
                                                        width={38}
                                                        height={38}
                                                        loading="lazy"
                                                        onError={onIconError}
                                                    />
                                                    <span className="stack-tech-icon-fallback">
                                                        {tech}
                                                    </span>
                                                </span>
                                                <span className="stack-tech-label">{tech}</span>
                                                {techMeta[tech]?.subLabel && (
                                                    <span className="stack-tech-sub-label">{techMeta[tech].subLabel}</span>
                                                )}
                                            </ExternalLinkPreview>
                                        </motion.div>
                                    ))}
                                </Fragment>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Proof;
