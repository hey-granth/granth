// Portfolio content — architect voice, declarative, precise

export const personalInfo = {
    name: "Granth Agarwal",
    email: "granthcodes@gmail.com",
    portfolio: "https://granth.tech",
    github: "https://github.com/hey-granth",
    linkedin: "https://linkedin.com/in/granth-agarwal",
    twitter: "https://x.com/heygranth",
    resume: "/resume.pdf",
};

// Hero
export const hero = {
    statement: "I architect backend systems built to hold under pressure.",
    subtext: "Systems Design · Reliability · Ownership",
};

// Section titles
export const sectionTitles = {
    work: "WORK",
    philosophy: "APPROACH",
    timeline: "RECORD",
    proof: "CREDENTIALS",
    close: "—",
};

// Projects — context, constraint, decision, result
export const projects = [
    {
        name: "Stockway",
        tagline: "Multi-tenant supply chain backend",
        problem: "Supply chain routing across vendors required strict role isolation and geospatial awareness.",
        solution: "Multi-tenant RBAC architecture with PostGIS discovery and async order workflows.",
        depth: [
            "Strict role-based access control across tenant boundaries",
            "PostGIS geospatial queries for vendor discovery",
            "REST API surface covering orders, payments, and delivery tracking",
            "Celery + Redis for async workflow orchestration",
        ],
        metrics: {
            value: "40+",
            label: "APIs shipped",
        },
        stack: ["Django REST Framework", "React", "PostgreSQL", "PostGIS", "Celery", "Redis"],
        ownership: "Sole architect. Every layer, every line.",
    },
    {
        name: "TrustSystem",
        tagline: "Multi-modal identity verification",
        problem: "Fraud detection systems that degrade user experience are not adopted.",
        solution: "Vector similarity search for identity matching with minimal friction.",
        depth: [
            "Real-time fraud detection pipelines with configurable thresholds",
            "pgvector + Sentence Transformers for semantic identity matching",
            "4 Django applications, 12+ models, 18+ API endpoints",
        ],
        metrics: {
            value: "Patent Published",
            label: "#202511094809",
        },
        stack: ["Django REST Framework", "PostgreSQL", "pgvector", "Redis"],
        ownership: "Research through implementation. Single owner.",
    },
    {
        name: "DemoForge",
        tagline: "Deterministic browser demo automation",
        problem: "Manual demo recording is inconsistent and does not scale.",
        solution: "Playwright automation with Docker isolation and video processing pipeline.",
        depth: [
            "Deterministic browser interaction recording via Playwright",
            "Redis-backed job queue for concurrent render workers",
            "WebM-to-MP4 transcoding pipeline using FFmpeg"
        ],
        metrics: {
            value: "Automated",
            label: "Browser Demos",
        },
        stack: ["Node.js", "Playwright", "Docker", "FFmpeg", "Redis"],
        ownership: "Architecture through pipeline integration.",
    },
    {
        name: "MemeTrends",
        tagline: "Time-decayed leaderboard engine",
        problem: "Viral content tracking requires recency-aware scoring at sub-second latency.",
        solution: "Redis sorted sets with Celery-computed time-decay scoring functions.",
        depth: [
            "JWT-authenticated API-only backend",
            "Background score decay computation via Celery workers",
            "Redis sorted sets for O(log N) leaderboard operations",
        ],
        metrics: {
            value: "Real-time",
            label: "Leaderboard updates",
        },
        stack: ["Django REST Framework", "Redis", "Celery", "PostgreSQL"],
        ownership: "Algorithm design through deployment.",
    },
];

// Philosophy — structured principles
export const philosophy = {
    intro: "Reliability is not an afterthought. It is the architecture.",
    pillars: [
        {
            title: "Async-First",
            description: "Long-running operations go to queues. Response times stay predictable.",
        },
        {
            title: "230+ Tests",
            description: "Untested code is unfinished code. Coverage is a deployment requirement.",
        },
        {
            title: "Horizontal Scale",
            description: "Stateless services. Designed for replicas from day one.",
        },
        {
            title: "Observe Everything",
            description: "Structured logging. Production issues are diagnosed, not guessed at.",
        },
    ],
    credo: "If deploying on Friday requires courage, the architecture needs revision.",
};

// Experience record
export const eras = [
    {
        name: "Contract Work",
        title: "Freelance Backend Developer",
        company: "Independent",
        period: "Oct 2025 – Jan 2026",
        narrative: "Full ownership. Architecture through deployment.",
        highlights: [
            "Backend architecture from requirements to production",
            "40+ REST APIs with role-based access control",
            "PostGIS geospatial query integration",
            "Redis caching and Celery + RabbitMQ async workflows",
            "Performance tuning and automated test coverage",
        ],
    },
    {
        name: "Internship",
        title: "Python Developer",
        company: "EverythingAboutAI",
        period: "Jul – Aug 2025",
        narrative: "FastAPI services. Automation pipelines. Production exposure.",
        highlights: [
            "FastAPI automation services",
            "Make.com pipeline integrations",
            "Production QA and deployment processes",
        ],
    },
    {
        name: "Community",
        title: "Core Team Lead",
        company: "Elixir Tech Community",
        period: "Ongoing",
        narrative: "5000+ members. Technical workshops. Mentorship.",
        highlights: [
            "Technical community leadership, 5000+ members",
            "Workshop facilitation and hackathon coordination",
            "GFG ABESEC Technical Coordinator",
        ],
    },
];

// Credentials
export const proof = {
    patent: {
        title: "Multi-Modal Identity Verification System",
        number: "202511094809",
        date: "Nov 28, 2025",
        status: "Published",
    },
    metrics: [
        { value: "40+", label: "APIs" },
        { value: "230+", label: "Tests" },
        { value: "5000+", label: "Community" },
        { value: "1", label: "Patent" },
    ],
    stack: {
        core: ["Python", "Django REST Framework", "FastAPI"],
        data: ["PostgreSQL", "pgvector", "Redis", "Celery"],
        infra: ["Linux", "GCP", "RabbitMQ", "Git"],
    },
};

// Contact
export const closing = {
    statement: "Open to backend engineering roles where reliability matters.",
    links: [
        { label: "GitHub", href: "https://github.com/hey-granth", icon: "github" },
        { label: "LinkedIn", href: "https://linkedin.com/in/granth-agarwal", icon: "linkedin" },
        { label: "Email", href: "mailto:granthcodes@gmail.com", icon: "email" },
    ],
};

// Navigation
export const navLinks = [
    { name: "Work", href: "#work" },
    { name: "Approach", href: "#philosophy" },
    { name: "Record", href: "#eras" },
    { name: "Credentials", href: "#credentials" },
    { name: "Contact", href: "#contact" },
    { name: "Writing", href: "/blog", external: true },
];
