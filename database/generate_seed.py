import uuid
import json

# Data from local files
experiences = [
    {
        "company": "PayMe India",
        "location": "Noida, India",
        "roles": [
            {
                "title": "Backend Developer Intern",
                "period": "June 2025 - July 2025",
                "description": "At PayMe India, I developed APIs for personalized horoscopes and built a RAG-based chatbot using FAISS and external APIs. I integrated Razorpay to enable monetized access and optimized backend workflows to enhance user experience through behavior analysis. My work involved building end-to-end ML pipelines, from data preprocessing to model deployment.",
                "skills": ["Python", "Backend Development", "React.js", "Next.js", "FastAPI", "Django", "RAG", "Vector Databases"],
            }
        ]
    },
    {
        "company": "ProCreator Solutions",
        "location": "Navi Mumbai, India",
        "roles": [
            {
                "title": "Developer Intern",
                "period": "June 2024 - July 2024",
                "description": "During my internship at ProCreator, I developed a custom WordPress plugin for ZIP processing and GCS URL generation. I co-founded an internal ML initiative, conducting weekly training and applied ML research for automation and analytics. Additionally, I created onboarding documentation and tutorials to streamline team processes and productivity.",
                "skills": ["Machine Learning", "Web Development", "WordPress", "Plugin Development", "GCS", "Zoho Suite"],
            }
        ]
    },
    {
        "company": "Bennett University Student Council",
        "location": "Greater Noida, India",
        "roles": [
            {
                "title": "Vice President",
                "period": "July 2025 - December 2025",
                "description": "As Vice President, I oversaw the financial operations of the Bennett University Student Council, including budgeting, sponsorship management, and all the monetary transactions for the tenure of 2025-26.",
                "skills": ["Sponsorship Management", "Financial Management", "Budget Management", "Event Management", "Stakeholder Management", "Sponsorship Marketing", "Team Management"],
            },
            {
                "title": "Sub Head Sponsorships",
                "period": "July 2024 - June 2025",
                "description": "As Sub Head Sponsorships, I was responsible for raising sponsorships for the events of the Bennett University Student Council. I worked closely with a team of 90+ members to ensure that all the sponsorship activities were carried out smoothly and effectively.",
                "skills": ["Sponsorship Management", "Event Management", "Stakeholder Management", "Sponsorship Marketing", "Team Management"],
            }
        ]
    },
    {
        "company": "Association for Computing Machinery, Bennett University",
        "location": "Greater Noida, India",
        "roles": [
            {
                "title": "Treasurer",
                "period": "July 2024 - June 2025",
                "description": "As Treasurer, I was responsible for managing the financial operations of the ACM, Bennett University. I worked closely with a team of 50+ members to ensure that all the financial activities were carried out smoothly and effectively.",
                "skills": ["Financial Management", "Budget Management", "Event Management", "Stakeholder Management", "Sponsorship Marketing", "Team Management"],
            },
            {
                "title": "Social Media Junior Core",
                "period": "July 2023 - June 2024",
                "description": "As Social Media Junior Core, I was responsible for managing the social media operations of the ACM, Bennett University. I worked closely with a team of 50+ members to ensure that all the social media activities were carried out smoothly and effectively.",
                "skills": ["Social Media Management", "Content Creation", "Event Management", "Stakeholder Management", "Sponsorship Marketing", "Team Management"],
            }
        ]
    },
    {
        "company": "Project Nirvi",
        "location": "Greater Noida, India",
        "roles": [
            {
                "title": "Operations Head",
                "period": "September 2024 - January 2025",
                "description": "As Operations Head, I was responsible for managing the operations of the Enactus Project Nirvi. I worked closely with the team to ensure that all the logistics and operations were carried out smoothly and effectively.",
                "skills": ["Operations Management", "Logistics Management", "Event Management", "Stakeholder Management", "Team Management"],
            },
            {
                "title": "Marketing Team Member",
                "period": "March 2024 - September 2024",
                "description": "As Marketing Team Member, I was responsible for brainstorming new ideas for products and the marketing aspect of the Enactus Project Nirvi. I worked closely with the team to ensure that all the marketing activities were carried out smoothly and effectively.",
                "skills": ["Marketing Management", "Event Management", "Stakeholder Management", "Team Management"],
            }
        ]
    },
    {
        "company": "Enactus Bennett University",
        "location": "Greater Noida, India",
        "roles": [
            {
                "title": "Project Management Team",
                "period": "March 2024 - August 2024",
                "description": "As Project Management Team, I was responsible for brainstorming new ideas for products and the marketing aspect of the all ongoing Enactus Projects. I worked closely with the team to ensure that all the marketing activities were carried out smoothly and effectively.",
                "skills": ["Project Management", "Event Management", "Stakeholder Management", "Team Management"],
            }
        ]
    },
    {
        "company": "Alexis - The Social Welfare Club",
        "location": "Greater Noida, India",
        "roles": [
            {
                "title": "Head Sponsorships",
                "period": "August 2024 - May 2025",
                "description": "As Head Sponsorships, I was responsible for managing the financial operations of the Alexis - The Social Welfare Club. I worked closely with a team of 50+ members to ensure that all the financial activities were carried out smoothly and effectively.",
                "skills": ["Financial Management", "Budget Management", "Event Management", "Stakeholder Management", "Team Management"],
            }
        ]
    },
    {
        "company": "IEEE Bennett University",
        "location": "Greater Noida, India",
        "roles": [
            {
                "title": "Junior Core Member - Technical",
                "period": "September 2023 - June 2024",
                "description": "As Junior Core Member - Technical, I was responsible for managing the technical operations of the IEEE Bennett University. I worked closely with a team of 50+ members to ensure that all the technical activities were carried out smoothly and effectively.",
                "skills": ["Technical Management", "Event Management", "Stakeholder Management", "Team Management"],
            }
        ]
    }
]

projects = [
    {
        "title": "AI Chat Assistant",
        "description": "A conversational AI powered by LLMs with RAG capabilities for context-aware responses.",
        "githubUrl": "https://github.com/rxhul",
        "tags": ["Python", "FastAPI", "LangChain"],
        "colors": ["#0894FF", "#C959DD", "#FF2E54", "#FF9004"],
    },
    {
        "title": "MLOps Pipeline",
        "description": "End-to-end machine learning pipeline with automated training, testing, and deployment.",
        "githubUrl": "https://github.com/rxhul",
        "tags": ["Python", "Docker", "Kubernetes"],
        "colors": ["#22c55e", "#10b981", "#059669", "#047857"],
    },
    {
        "title": "Backend API Service",
        "description": "High-performance REST API built with FastAPI featuring async operations and caching.",
        "githubUrl": "https://github.com/rxhul",
        "tags": ["FastAPI", "PostgreSQL", "Redis"],
        "colors": ["#8b5cf6", "#a855f7", "#d946ef", "#ec4899"],
    },
    {
        "title": "Data Processing Engine",
        "description": "Scalable data processing system for handling large datasets with real-time analytics.",
        "githubUrl": "https://github.com/rxhul",
        "tags": ["Python", "Apache Spark", "Kafka"],
        "colors": ["#f59e0b", "#f97316", "#ef4444", "#dc2626"],
    },
    {
        "title": "Vector Database Search",
        "description": "Semantic search engine using vector embeddings for intelligent document retrieval.",
        "githubUrl": "https://github.com/rxhul",
        "tags": ["Python", "FAISS", "OpenAI"],
        "colors": ["#06b6d4", "#0891b2", "#0e7490", "#155e75"],
    },
    {
        "title": "Authentication Service",
        "description": "Secure JWT-based authentication microservice with OAuth2 and SSO support.",
        "githubUrl": "https://github.com/rxhul",
        "tags": ["Node.js", "JWT", "OAuth2"],
        "colors": ["#84cc16", "#65a30d", "#4d7c0f", "#3f6212"],
    },
    {
        "title": "Real-time Dashboard",
        "description": "Live analytics dashboard with WebSocket connections for streaming data visualization.",
        "githubUrl": "https://github.com/rxhul",
        "tags": ["React", "WebSocket", "D3.js"],
        "colors": ["#f43f5e", "#e11d48", "#be123c", "#9f1239"],
    },
    {
        "title": "Task Queue System",
        "description": "Distributed task queue for background job processing with retry mechanisms.",
        "githubUrl": "https://github.com/rxhul",
        "tags": ["Python", "Celery", "RabbitMQ"],
        "colors": ["#a78bfa", "#8b5cf6", "#7c3aed", "#6d28d9"],
    },
]

cool_stuff = [
    {
        "image": "/Rahul 1.png",
        "prompt": "Create a stylized comic-style portrait of a young Indian man with curly black hair, wearing a black hoodie. The art style should be vibrant and modern with bold outlines, similar to pop art or graphic novel illustrations. The background should feature colorful abstract shapes and patterns."
    },
    {
        "image": "/Rahul 2.png",
        "prompt": "Generate a comic-style illustration of a young Indian man in a dynamic pose, wearing casual streetwear. Use bold colors, strong shadows, and graphic novel aesthetics. Add urban graffiti-style elements in the background with bright yellows and contrasting colors."
    },
    {
        "image": "/Rahul 3.png",
        "prompt": "Create an animated-style portrait of a young Indian man with curly hair in a confident stance. The style should be reminiscent of modern animation or comic books with clean lines, vibrant colors, and expressive details. Include stylized background elements."
    },
]

def format_array(arr):
    # PostgreSQL array literal format: '{"a", "b"}'
    # Must escape double quotes if present in elements
    items = []
    for item in arr:
        # Simple escape: replace " with \"
        escaped = item.replace('"', '\\"')
        items.append(f'"{escaped}"')
    return "'{" + ", ".join(items) + "}'"

def escape_str(s):
    # Escape single quotes for SQL
    return s.replace("'", "''")

sql_statements = []

# Generate Experience SQL
for i, exp in enumerate(experiences):
    exp_id = str(uuid.uuid4())
    company = escape_str(exp["company"])
    location = escape_str(exp["location"])
    order_index = i
    
    sql_statements.append(
        f"INSERT INTO experiences (id, company, location, order_index, is_visible) VALUES ('{exp_id}', '{company}', '{location}', {order_index}, TRUE);"
    )
    
    for r_idx, role in enumerate(exp["roles"]):
        title = escape_str(role["title"])
        period = escape_str(role["period"])
        desc = escape_str(role["description"]) # Handle description typo in source if any
        skills_sql = format_array(role["skills"])
        role_order = r_idx
        
        sql_statements.append(
            f"INSERT INTO roles (experience_id, title, period, description, skills, order_index) VALUES ('{exp_id}', '{title}', '{period}', '{desc}', {skills_sql}, {role_order});"
        )
        
# Generate Projects SQL
for i, proj in enumerate(projects):
    title = escape_str(proj["title"])
    desc = escape_str(proj["description"])
    github = escape_str(proj["githubUrl"])
    tags_sql = format_array(proj["tags"])
    colors_sql = format_array(proj["colors"])
    is_featured = "TRUE" if i < 4 else "FALSE"
    order_index = i
    
    sql_statements.append(
        f"INSERT INTO projects (title, description, github_url, tags, colors, is_featured, is_visible, order_index) VALUES ('{title}', '{desc}', '{github}', {tags_sql}, {colors_sql}, {is_featured}, TRUE, {order_index});"
    )

# Generate Cool Stuff SQL
for i, item in enumerate(cool_stuff):
    image_url = escape_str(item["image"])
    prompt = escape_str(item["prompt"])
    order_index = i

    sql_statements.append(
        f"INSERT INTO cool_stuff (image_url, prompt, order_index) VALUES ('{image_url}', '{prompt}', {order_index});"
    )

print("\n".join(sql_statements))
