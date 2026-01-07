import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { loadPosts } from '../lib/markdown';
import { Navbar, Footer } from '../components/layout';
import BackgroundDepth from '../components/BackgroundDepth';
import Section from '../components/layout/Section';
import { fadeInUp, staggerContainer } from '../lib/animations';

const posts = loadPosts();

const Blog = () => {
    const grouped = useMemo(() => posts, []);

    return (
        <>
            <BackgroundDepth />
            <Navbar />
            <main className="relative z-10">
                <Section
                    id="blog"
                    title="The Build Log"
                    subtitle="Thinking in shipping order"
                    className="pt-28"
                >
                    <motion.div
                        className="grid gap-6 md:gap-8"
                        variants={staggerContainer}
                        initial="hidden"
                        animate="visible"
                    >
                        {grouped.map((post) => (
                            <motion.article
                                key={post.slug}
                                className="card p-6 md:p-8 flex flex-col gap-4"
                                variants={fadeInUp}
                            >
                                <div className="flex flex-wrap items-center justify-between gap-3">
                                    <div className="flex items-center gap-2 text-sm text-text-muted">
                                        <span className="track-title text-xs text-accent">POST</span>
                                        <span className="text-text-secondary">{post.formattedDate}</span>
                                    </div>
                                    <div className="flex gap-2 flex-wrap">
                                        {post.tags.map((tag) => (
                                            <span key={tag} className="tech-badge">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                                <Link to={`/blog/${post.slug}`} className="hover:text-accent transition-colors">
                                    <h3 className="text-display-sm md:text-display-md font-bold">{post.title}</h3>
                                </Link>
                                {post.summary && (
                                    <p className="text-text-secondary text-base leading-relaxed">
                                        {post.summary}
                                    </p>
                                )}
                                <div className="flex items-center gap-3 text-sm">
                                    <Link
                                        to={`/blog/${post.slug}`}
                                        className="inline-flex items-center gap-2 text-accent font-medium"
                                    >
                                        Read
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="w-4 h-4"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            strokeWidth={1.5}
                                            stroke="currentColor"
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
                                        </svg>
                                    </Link>
                                </div>
                            </motion.article>
                        ))}
                    </motion.div>
                </Section>
            </main>
            <Footer />
        </>
    );
};

export default Blog;

