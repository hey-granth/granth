// Portfolio content data

export const personalInfo = {
    name: "Granth Agarwal",
    roles: ["Backend Developer", "Python Specialist", "API Architect"],
    tagline: "Architecting scalable backends, APIs, and automation systems.",
    email: "granthcodes@gmail.com",
    github: "https://github.com/hey-granth",
    linkedin: "https://linkedin.com/in/granth-agarwal",
    resume: "/resume.pdf", // Will be served from public folder
};

export const skillCategories = [
    {
        title: "Languages",
        skills: ["Python", "SQL", "HTML", "CSS"],
        icon: "💻"
    },
    {
        title: "Frameworks",
        skills: ["Django", "DRF", "FastAPI", "Flask", "Celery"],
        icon: "⚡"
    },
    {
        title: "Tools",
        skills: ["Git", "GitHub", "Postman", "Redis", "RabbitMQ"],
        icon: "🛠️"
    },
    {
        title: "Databases",
        skills: ["PostgreSQL", "MySQL", "SQLite", "Supabase"],
        icon: "🗄️"
    },
    {
        title: "Infrastructure",
        skills: ["Linux", "GCP", "Serverless Functions"],
        icon: "☁️"
    },
    {
        title: "Soft Skills",
        skills: ["Leadership", "Community Building", "Mentoring", "Technical Writing"],
        icon: "🎯"
    }
];

export const experiences = [
    {
        title: "Backend Developer (Contract)",
        company: "Freelance",
        period: "Oct 2025 – Present",
        type: "Contract",
        highlights: [
            "Designed and implemented scalable backend architecture",
            "Built OTP + RBAC authentication systems",
            "Developed 40+ REST APIs for core business operations",
            "Implemented PostGIS warehouse routing solutions",
            "Optimized performance with Redis caching + Celery async workflows",
            "Wrote 230+ automated tests ensuring high code reliability"
        ]
    },
    {
        title: "Python Developer Intern",
        company: "EverythingAboutAI",
        period: "Jul – Aug 2025",
        type: "Internship",
        highlights: [
            "Built FastAPI automation services for internal tools",
            "Integrated Make.com pipelines for workflow automation",
            "Conducted QA + structured testing for production systems"
        ]
    }
];

export const projects = [
    {
        name: "TrustSystem",
        description: "Identity verification and fraud detection platform with vector search capabilities for enhanced security.",
        longDescription: "A comprehensive identity verification system featuring real-time fraud detection using machine learning, vector similarity search for identity matching, and robust user verification workflows.",
        stack: ["Django", "PostgreSQL", "pgvector", "Redis", "Sentence Transformers"],
        features: [
            "Identity verification pipelines",
            "Fraud detection algorithms",
            "Vector similarity search",
            "Real-time processing"
        ],
        category: "Security"
    },
    {
        name: "StandardStitch",
        description: "Multi-tenant commerce backend with comprehensive RBAC onboarding and geospatial capabilities.",
        longDescription: "Enterprise-grade multi-tenant e-commerce platform with role-based access control, comprehensive onboarding workflows, and PostGIS integration for location-based services.",
        stack: ["Django", "PostgreSQL", "PostGIS", "Redis", "Celery"],
        features: [
            "Multi-tenant architecture",
            "RBAC onboarding system",
            "PostGIS location services",
            "Scalable commerce backend"
        ],
        category: "E-Commerce"
    },
    {
        name: "MemeTrends",
        description: "Analytics backend featuring Redis leaderboards and time-decayed scoring algorithms.",
        longDescription: "Real-time analytics platform for tracking meme trends with sophisticated time-decay scoring algorithms, Redis-powered leaderboards, and Celery-based background processing.",
        stack: ["Django", "Redis", "Celery", "PostgreSQL"],
        features: [
            "Redis leaderboard system",
            "Time-decayed scoring",
            "Celery background tasks",
            "Real-time analytics"
        ],
        category: "Analytics"
    }
];

export const patent = {
    title: "Multi-Modal Identity and Behavior Verification System for Online Platforms",
    applicationNumber: "202511094809",
    publishedDate: "Nov 28, 2025",
    description: "A novel system combining multiple verification modalities including biometric, behavioral, and contextual signals to provide robust identity verification for online platforms, enabling fraud prevention and enhanced user security.",
    status: "Published"
};

export const communityWork = [
    {
        role: "Core Team Lead",
        organization: "Elixir Tech Community",
        description: "Leading a vibrant tech community of 5000+ members",
        members: "5000+",
        highlights: [
            "Organizing technical workshops and hackathons",
            "Mentoring aspiring developers",
            "Building community partnerships"
        ]
    },
    {
        role: "Technical Coordinator",
        organization: "GFG ABESEC Chapter",
        description: "Coordinating technical activities and events",
        highlights: [
            "Conducting coding sessions",
            "Organizing technical competitions",
            "Facilitating peer learning"
        ]
    }
];

export const navLinks = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Experience", href: "#experience" },
    { name: "Projects", href: "#projects" },
    { name: "Patent", href: "#patent" },
    { name: "Community", href: "#community" },
    { name: "Contact", href: "#contact" }
];
