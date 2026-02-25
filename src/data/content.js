// Portfolio content — declarative tone, short lines, numbers over adjectives

export const personalInfo = {
    name: "Granth Agarwal",
    email: "granthcodes@gmail.com",
    portfolio: "https://granth.tech",
    github: "https://github.com/hey-granth",
    linkedin: "https://linkedin.com/in/granth-agarwal",
    twitter: "https://x.com/heygranth",
    resume: "/resume.pdf",
};

// Hero — lead with name, follow with claim, end with anchor
export const hero = {
    statement: "I build systems that don't break.",
    subtext: "Backend architecture · Scale · Ownership",
};

// Section titles — track names, not blog headers
export const sectionTitles = {
    work: "THE WORK",
    philosophy: "HOW I BUILD",
    timeline: "THE ERAS",
    proof: "CREDENTIALS",
    close: "—",
};

// Projects — feature drops
export const projects = [
    {
        name: "Stockway",
        tagline: "Role-based supply chain operations",
        problem: "Complex supply chain routing across multiple vendors and roles.",
        solution: "Role-based supply chain backend with complex order workflows.",
        depth: [
            "Multi-tenant architecture with strict RBAC",
            "Supabase authentication & PostGIS geospatial discovery",
            "REST API for orders, payments, delivery tracking",
            "Async workflows handled by Celery + Redis",
        ],
        metrics: {
            value: "40+",
            label: "APIs shipped",
        },
        stack: ["Django REST Framework", "React", "PostgreSQL", "PostGIS", "Celery", "Redis"],
        ownership: "Designed architecture. Wrote every line.",
    },
    {
        name: "TrustSystem",
        tagline: "Patent-backed identity verification",
        problem: "Platforms needed fraud detection that doesn't destroy UX.",
        solution: "Multi-modal verification with vector similarity search.",
        depth: [
            "Real-time fraud detection pipelines and identity workflows",
            "pgvector + Sentence Transformers for identity matching",
            "Deployed as 4 robust Django apps with 12+ models and 18+ APIs",
        ],
        metrics: {
            value: "Patent Published",
            label: "#202511094809",
        },
        stack: ["Django REST Framework", "PostgreSQL", "pgvector", "Redis"],
        ownership: "Sole architect. Research to implementation.",
    },
    {
        name: "DemoForge",
        tagline: "Automated website demo generator",
        problem: "Manual recording of platform demos is inconsistent and non-deterministic.",
        solution: "Playwright-based browser automation with Docker worker isolation.",
        depth: [
            "Playwright-based deterministic interaction recording",
            "Redis-backed job queue for concurrent rendering",
            "WebM-to-MP4 video processing pipeline using FFmpeg"
        ],
        metrics: {
            value: "Automated",
            label: "Browser Demos",
        },
        stack: ["Node.js", "Playwright", "Docker", "FFmpeg", "Redis"],
        ownership: "End-to-end architecture and pipeline integration.",
    },
    {
        name: "MemeTrends",
        tagline: "Real-time analytics engine",
        problem: "Viral content tracking requires recency-aware scoring.",
        solution: "Redis leaderboards powered by Celery-based time-decayed scoring.",
        depth: [
            "API-only backend mapped to a JWT authentication flow",
            "Celery background computation for score decay algorithms",
            "Redis sorted sets for O(log N) leaderboard operations",
        ],
        metrics: {
            value: "Real-time",
            label: "Leaderboard updates",
        },
        stack: ["Django REST Framework", "Redis", "Celery", "PostgreSQL"],
        ownership: "Algorithm design to deployment.",
    },
];

// Philosophy — statements, not explanations
export const philosophy = {
    intro: "The contract between chaos and reliability.",
    pillars: [
        {
            title: "Async-First",
            description: "Long tasks go to queues. Celery + Redis.",
        },
        {
            title: "230+ Tests",
            description: "If it's not tested, it's not shipped.",
        },
        {
            title: "Horizontal Scale",
            description: "Stateless services. Design for replicas from day one.",
        },
        {
            title: "Observe Everything",
            description: "Structured logging. Debug production without guessing.",
        },
    ],
    credo: "Scared to deploy on Friday? Architecture problem.",
};

// Eras — not bullet points
export const eras = [
    {
        name: "The Contract Era",
        title: "Freelance Backend Developer",
        company: "Freelance",
        period: "Oct 2025 – Jan 2026",
        narrative: "Full ownership. Architecture to deployment.",
        highlights: [
            "Scalable backend architecture from scratch",
            "40+ REST APIs heavily integrating RBAC",
            "Geospatial queries via PostGIS",
            "Redis caching & Celery + RabbitMQ workflows",
            "Targeted performance tuning and automated testing",
        ],
    },
    {
        name: "The Internship Arc",
        title: "Python Developer",
        company: "EverythingAboutAI",
        period: "Jul – Aug 2025",
        narrative: "FastAPI. Automation. Production exposure.",
        highlights: [
            "FastAPI automation services",
            "Make.com pipeline integrations",
            "Production QA",
        ],
    },
    {
        name: "The Community Chapter",
        title: "Core Team Lead",
        company: "Elixir Tech Community",
        period: "Ongoing",
        narrative: "5000+ members. Workshops. Mentorship.",
        highlights: [
            "Technical community of 5000+",
            "Workshops and hackathons",
            "GFG ABESEC Technical Coordinator",
        ],
    },
];

// Proof — metrics as punchlines
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

// Close — no begging
export const closing = {
    statement: "Open to backend engineering roles.",
    links: [
        { label: "GitHub", href: "https://github.com/hey-granth", icon: "github" },
        { label: "LinkedIn", href: "https://linkedin.com/in/granth-agarwal", icon: "linkedin" },
        { label: "Email", href: "mailto:granthcodes@gmail.com", icon: "email" },
    ],
};

// Navigation
export const navLinks = [
    { name: "Work", href: "#work" },
    { name: "Philosophy", href: "#philosophy" },
    { name: "Eras", href: "#eras" },
    { name: "Credentials", href: "#credentials" },
    { name: "Contact", href: "#contact" },
    { name: "Blog", href: "/blog", external: true },
];
