import { useParams, Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Navbar, Footer } from '../components/layout';
import BackgroundDepth from '../components/BackgroundDepth';
import Section from '../components/layout/Section';
import { loadPostBySlug } from '../lib/markdown';

const BlogPost = () => {
    const { slug } = useParams();
    const post = loadPostBySlug(slug);

    if (!post) {
        return (
            <>
                <BackgroundDepth />
                <Navbar />
                <main className="relative z-10">
                    <Section id="blog" title="Post not found" className="pt-28">
                        <p className="text-text-secondary">That post does not exist.</p>
                        <Link to="/blog" className="text-accent underline">Return to blog</Link>
                    </Section>
                </main>
                <Footer />
            </>
        );
    }

    return (
        <>
            <BackgroundDepth />
            <Navbar />
            <main className="relative z-10">
                <Section
                    id="blog"
                    title={post.title}
                    subtitle={post.formattedDate}
                    className="pt-28"
                >
                    <article className="card p-6 md:p-10 prose prose-invert max-w-4xl mx-auto">
                        <ReactMarkdown remarkPlugins={[remarkGfm]}>{post.content}</ReactMarkdown>
                        <div className="mt-8 flex items-center justify-between text-sm text-text-muted">
                            <div className="flex gap-2 flex-wrap">
                                {post.tags.map((tag) => (
                                    <span key={tag} className="tech-badge">
                                        {tag}
                                    </span>
                                ))}
                            </div>
                            <Link to="/blog" className="text-accent font-medium">Back to all posts</Link>
                        </div>
                    </article>
                </Section>
            </main>
            <Footer />
        </>
    );
};

export default BlogPost;

