// Portfolio content — declarative tone, short lines, numbers over adjectives

export const personalInfo = {
    name: "Granth Agarwal",
    email: "granthcodes@gmail.com",
    github: "https://github.com/hey-granth",
    linkedin: "https://linkedin.com/in/granth-agarwal",
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
        name: "TrustSystem",
        tagline: "Patent-backed identity verification",
        problem: "Platforms needed fraud detection that doesn't destroy UX.",
        solution: "Multi-modal verification with vector similarity search.",
        depth: [
            "pgvector + Sentence Transformers for identity matching",
            "Real-time fraud detection pipeline",
            "Configurable verification thresholds",
        ],
        metrics: {
            value: "Patent Published",
            label: "#202511094809",
        },
        stack: ["Django", "PostgreSQL", "pgvector", "Redis"],
        ownership: "Sole architect. Research to implementation.",
    },
    {
        name: "StandardStitch",
        tagline: "Multi-tenant commerce at scale",
        problem: "School uniforms. Multiple vendors. Complex routing.",
        solution: "Enterprise backend with PostGIS spatial queries.",
        depth: [
            "Multi-tenant architecture with data isolation",
            "PostGIS warehouse routing",
            "OTP + RBAC authentication",
        ],
        metrics: {
            value: "40+",
            label: "APIs shipped",
        },
        stack: ["Django", "PostgreSQL", "PostGIS", "Celery"],
        ownership: "Designed architecture. Wrote every line.",
    },
    {
        name: "MemeTrends",
        tagline: "Real-time analytics engine",
        problem: "Viral content tracking requires recency-aware scoring.",
        solution: "Redis leaderboards with time-decay algorithms.",
        depth: [
            "Redis sorted sets for O(log N) operations",
            "Time-decay prevents stale content",
            "Celery background computation",
        ],
        metrics: {
            value: "Real-time",
            label: "Leaderboard updates",
        },
        stack: ["Django", "Redis", "Celery", "PostgreSQL"],
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
        title: "Backend Developer",
        company: "Freelance",
        period: "Oct 2025 – Present",
        narrative: "Full ownership. Architecture to deployment.",
        highlights: [
            "Scalable backend architecture from scratch",
            "40+ REST APIs",
            "230+ automated tests",
            "PostGIS routing",
            "Redis + Celery workflows",
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
        core: ["Python", "Django", "FastAPI"],
        data: ["PostgreSQL", "Redis", "Celery"],
        infra: ["Linux", "GCP", "Git"],
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
