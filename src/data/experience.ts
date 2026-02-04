export interface Role {
    title: string;
    period: string;
    description: string;
    skills: string[];
}

export interface Experience {
    company: string;
    location: string;
    roles: Role[]; // Multiple roles for promotions
}

// Experiences with grouped roles for promotions
export const experiences: Experience[] = [
    {
        company: "PayMe India",
        location: "Noida, India",
        roles: [
            {
                title: "Backend Developer Intern",
                period: "June 2025 - July 2025",
                description: "At PayMe India, I developed APIs for personalized horoscopes and built a RAG-based chatbot using FAISS and external APIs. I integrated Razorpay to enable monetized access and optimized backend workflows to enhance user experience through behavior analysis. My work involved building end-to-end ML pipelines, from data preprocessing to model deployment.",
                skills: ["Python", "Backend Development", "React.js", "Next.js", "FastAPI", "Django", "RAG", "Vector Databases"],
            }
        ]
    },
    {
        company: "ProCreator Solutions",
        location: "Navi Mumbai, India",
        roles: [
            {
                title: "Developer Intern",
                period: "June 2024 - July 2024",
                description: "During my internship at ProCreator, I developed a custom WordPress plugin for ZIP processing and GCS URL generation. I co-founded an internal ML initiative, conducting weekly training and applied ML research for automation and analytics. Additionally, I created onboarding documentation and tutorials to streamline team processes and productivity.",
                skills: ["Machine Learning", "Web Development", "WordPress", "Plugin Development", "GCS", "Zoho Suite"],
            }
        ]
    },
    {
        company: "Bennett University Student Council",
        location: "Greater Noida, India",
        roles: [
            {
                title: "Vice President",
                period: "July 2025 - December 2025",
                description: "As Vice President, I oversaw the financial operations of the Bennett University Student Council, including budgeting, sponsorship management, and all the monetary transactions for the tenure of 2025-26.",
                skills: ["Sponsorship Management", "Financial Management", "Budget Management", "Event Management", "Stakeholder Management", "Sponsorship Marketing", "Team Management"],
            },
            {
                title: "Sub Head Sponsorships",
                period: "July 2024 - June 2025",
                description: "As Sub Head Sponsorships, I was responsible for raising sponsorships for the events of the Bennett University Student Council. I worked closely with a team of 90+ members to ensure that all the sponsorship activities were carried out smoothly and effectively.",
                skills: ["Sponsorship Management", "Event Management", "Stakeholder Management", "Sponsorship Marketing", "Team Management"],
            }
        ]
    },
    {
        company: "Association for Computing Machinery, Bennett University",
        location: "Greater Noida, India",
        roles: [
            {
                title: "Treasurer",
                period: "July 2024 - June 2025",
                description: "As Treasurer, I was responsible for managing the financial operations of the ACM, Bennett University. I worked closely with a team of 50+ members to ensure that all the financial activities were carried out smoothly and effectively.",
                skills: ["Financial Management", "Budget Management", "Event Management", "Stakeholder Management", "Sponsorship Marketing", "Team Management"],
            },
            {
                title: "Social Media Junior Core",
                period: "July 2023 - June 2024",
                description: "As Social Media Junior Core, I was responsible for managing the social media operations of the ACM, Bennett University. I worked closely with a team of 50+ members to ensure that all the social media activities were carried out smoothly and effectively.",
                skills: ["Social Media Management", "Content Creation", "Event Management", "Stakeholder Management", "Sponsorship Marketing", "Team Management"],
            }
        ]
    },
    {
        company: "Project Nirvi",
        location: "Greater Noida, India",
        roles: [
            {
                title: "Operations Head",
                period: "September 2024 - January 2025",
                description: "As Operations Head, I was responsible for managing the operations of the Enactus Project Nirvi. I worked closely with the team to ensure that all the logistics and operations were carried out smoothly and effectively.",
                skills: ["Operations Management", "Logistics Management", "Event Management", "Stakeholder Management", "Team Management"],
            },
            {
                title: "Marketing Team Member",
                period: "March 2024 - September 2024",
                description: "As Marketing Team Member, I was responsible for brainstorming new ideas for products and the marketing aspect of the Enactus Project Nirvi. I worked closely with the team to ensure that all the marketing activities were carried out smoothly and effectively.",
                skills: ["Marketing Management", "Event Management", "Stakeholder Management", "Team Management"],
            }
        ]
    },
    {
        company: "Enactus Bennett University",
        location: "Greater Noida, India",
        roles: [
            {
                title: "Project Management Team",
                period: "March 2024 - August 2024",
                description: "As Project Management Team, I was responsible for brainstorming new ideas for products and the marketing aspect of the all ongoing Enactus Projects. I worked closely with the team to ensure that all the marketing activities were carried out smoothly and effectively.",
                skills: ["Project Management", "Event Management", "Stakeholder Management", "Team Management"],
            }
        ]
    },
    {
        company: "Alexis - The Social Welfare Club",
        location: "Greater Noida, India",
        roles: [
            {
                title: "Head Sponsorships",
                period: "August 2024 - May 2025",
                description: "As Head Sponsorships, I was responsible for managing the financial operations of the Alexis - The Social Welfare Club. I worked closely with a team of 50+ members to ensure that all the financial activities were carried out smoothly and effectively.",
                skills: ["Financial Management", "Budget Management", "Event Management", "Stakeholder Management", "Team Management"],
            }
        ]
    },
    {
        company: "IEEE Bennett University",
        location: "Greater Noida, India",
        roles: [
            {
                title: "Junior Core Member - Technical",
                period: "September 2023 - June 2024",
                description: "As Junior Core Member - Technical, I was responsible for managing the technical operations of the IEEE Bennett University. I worked closely with a team of 50+ members to ensure that all the technical activities were carried out smoothly and effectively.",
                skills: ["Technical Management", "Event Management", "Stakeholder Management", "Team Management"],
            }
        ]
    }
];
