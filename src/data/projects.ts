export interface Project {
    title: string;
    description: string;
    githubUrl: string;
    tags: string[];
    colors: string[];
}

export const allProjects: Project[] = [
    {
        title: "AI Chat Assistant",
        description: "A conversational AI powered by LLMs with RAG capabilities for context-aware responses.",
        githubUrl: "https://github.com/rxhul",
        tags: ["Python", "FastAPI", "LangChain"],
        colors: ["#0894FF", "#C959DD", "#FF2E54", "#FF9004"],
    },
    {
        title: "MLOps Pipeline",
        description: "End-to-end machine learning pipeline with automated training, testing, and deployment.",
        githubUrl: "https://github.com/rxhul",
        tags: ["Python", "Docker", "Kubernetes"],
        colors: ["#22c55e", "#10b981", "#059669", "#047857"],
    },
    {
        title: "Backend API Service",
        description: "High-performance REST API built with FastAPI featuring async operations and caching.",
        githubUrl: "https://github.com/rxhul",
        tags: ["FastAPI", "PostgreSQL", "Redis"],
        colors: ["#8b5cf6", "#a855f7", "#d946ef", "#ec4899"],
    },
    {
        title: "Data Processing Engine",
        description: "Scalable data processing system for handling large datasets with real-time analytics.",
        githubUrl: "https://github.com/rxhul",
        tags: ["Python", "Apache Spark", "Kafka"],
        colors: ["#f59e0b", "#f97316", "#ef4444", "#dc2626"],
    },
    {
        title: "Vector Database Search",
        description: "Semantic search engine using vector embeddings for intelligent document retrieval.",
        githubUrl: "https://github.com/rxhul",
        tags: ["Python", "FAISS", "OpenAI"],
        colors: ["#06b6d4", "#0891b2", "#0e7490", "#155e75"],
    },
    {
        title: "Authentication Service",
        description: "Secure JWT-based authentication microservice with OAuth2 and SSO support.",
        githubUrl: "https://github.com/rxhul",
        tags: ["Node.js", "JWT", "OAuth2"],
        colors: ["#84cc16", "#65a30d", "#4d7c0f", "#3f6212"],
    },
    {
        title: "Real-time Dashboard",
        description: "Live analytics dashboard with WebSocket connections for streaming data visualization.",
        githubUrl: "https://github.com/rxhul",
        tags: ["React", "WebSocket", "D3.js"],
        colors: ["#f43f5e", "#e11d48", "#be123c", "#9f1239"],
    },
    {
        title: "Task Queue System",
        description: "Distributed task queue for background job processing with retry mechanisms.",
        githubUrl: "https://github.com/rxhul",
        tags: ["Python", "Celery", "RabbitMQ"],
        colors: ["#a78bfa", "#8b5cf6", "#7c3aed", "#6d28d9"],
    },
];

// Featured projects are the first 4
export const featuredProjects = allProjects.slice(0, 4);
