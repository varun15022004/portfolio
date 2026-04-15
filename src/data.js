export const personalInfo = {
  name: "Varun Saini",
  title: "Full Stack Developer & AI/ML Engineer",
  email: "vsaini50_be23@thapar.edu",
  altEmail: "varunsaini.applicant@gmail.com",
  phone: "+91 93504 43021",
  github: "https://github.com/varun15022004",
  linkedin: "https://linkedin.com/in/varun-saini",
  location: "Ambala, Haryana, India",
  summary: "Done B.Tech from Thapar Institute of Engineering & Technology. Experienced in building scalable Full Stack applications and AI/ML solutions. Passionate about GenAI, Distributed Systems, and DevOps.",
  availability: "Available for immediate joining"
};

export const education = [
  {
    institution: "Thapar Institute of Engineering & Technology",
    degree: "B.Tech in Computer Engineering",
    duration: "2023 - 2026",
    score: "7 CGPA"
  },
  {
    institution: "Government Polytechnic, Ambala City",
    degree: "Diploma in Computer Engineering",
    duration: "2020 - 2023",
    score: "70%"
  },
  {
    institution: "Mind Tree School, Ambala",
    degree: "Class X (CBSE)",
    duration: "2020",
    score: "82%"
  }
];

export const experience = [
  {
    company: "Wepro Solutions",
    role: "Full Stack Developer Intern",
    duration: "Oct 2025 - Dec 2025",
    description: "Built MERN stack features for a platform serving 10,000+ monthly active users. Optimized MongoDB queries reducing response time by 25%. Implemented real-time messaging with WebSockets and JWT-based authentication.",
    skills: ["React", "Node.js", "MongoDB", "WebSockets", "JWT"]
  },
  {
    company: "Bharat Skillz (StoreCook)",
    role: "Machine Learning Intern",
    duration: "Sept 2025 - Oct 2025",
    description: "Hands-on experience in building ML models, data preprocessing, and evaluation. Collaborated on real-world tasks using supervised learning and data analysis.",
    skills: ["Python", "Scikit-learn", "Data Preprocessing"]
  },
  {
    company: "Infutrix Technologies Pvt. Ltd",
    role: "Machine Learning Intern",
    duration: "June 2025 - July 2025",
    description: "Built and optimized recommendation models for eco-friendly products for 100k+ records. Developed CNN-based vision system to classify microplastics from microscopic images with 15% accuracy improvement.",
    skills: ["Deep Learning", "CNN", "Computer Vision", "Recommendation Systems"]
  },
  {
    company: "UPLYX Solutions (Waistra)",
    role: "Cloud Computing Intern",
    duration: "May 2025 - July 2025",
    description: "Gained experience in cloud fundamentals, deployment models, and infrastructure management. Worked on virtualization and scalability concepts.",
    skills: ["AWS", "Cloud Fundamentals", "System Infrastructure"]
  }
];

export const projects = [
  {
    title: "Aero-Trade: Stock Trading Platform",
    category: "Full Stack",
    tech: ["React", "Redux", "Node.js", "Express", "MongoDB"],
    description: "A comprehensive full-stack stock trading platform inspired by Zerodha. Features real-time stock tracking, portfolio management, and secure trade execution with a high-performance UI.",
    details: "Built with a focus on low-latency data updates and a highly responsive trading experience.",
    image: "/projects/aero-trade.png",
    liveLink: "https://lnkd.in/gScFhqfr",
    githubLink: "https://lnkd.in/gGMeuqqZ"
  },
  {
    title: "AI-Powered Furniture Platform",
    category: "AI / E-commerce",
    tech: ["React", "FastAPI", "Sentence-Transformers", "Vector Search", "OpenAI"],
    description: "Modern furniture shopping platform with AI-powered semantic search, smart recommendations based on similarity, and auto-generated AI product descriptions.",
    details: "Combines an elegant shop interface with advanced ML models to make product discovery intuitive and faster.",
    image: "/projects/furniture-ai.png",
    liveLink: "https://lnkd.in/giT8M4Zp",
    githubLink: "https://lnkd.in/gaFzYJWS"
  },
  {
    title: "Multi-Source EQL Data Pipeline",
    category: "Data Engineering",
    tech: ["Python", "Streamlit", "SQL", "MongoDB", "Pandas"],
    description: "Automated ETL pipeline integrating CSV, SQL, and MongoDB. Features interactive KPI tracking and trend analysis dashboard for actionable insights.",
    details: "Designed for seamless multi-source data ingestion and automated transformation workflows.",
    image: "/projects/data-pipeline.png",
    liveLink: "https://enterprise-eql-pipeline-cj9vfpvpqsahq7yktgngtq.streamlit.app/"
  },
  {
    title: "Sales Performance & Forecasting",
    category: "Data Science",
    tech: ["Python", "Pandas", "JavaScript", "Chart.js", "Streamlit"],
    description: "Interactive dashboard providing automated data processing and predictive forecasting models for accurate sales trend analysis and KPI monitoring.",
    details: "Delivers deep insights into performance metrics through dynamic visualizations and automated report generation.",
    image: "/projects/sales-dashboard.png",
    liveLink: "https://automl-dashboard-hzpzznzqfjwsnbnqd2iaut.streamlit.app/"
  },
  {
    title: "AI Product Recommendation & Analytics",
    category: "AI / Analytics",
    tech: ["Python", "FastAPI", "Pandas", "Recharts", "Scikit-learn"],
    description: "Advanced analytics system using K-Means clustering and EDA on 300+ furniture products to analyze pricing, material trends, and brand positioning.",
    details: "Visualizes complex data patterns like price distribution and provides smart product recommendations with high precision.",
    image: "/projects/ai-analytics.png"
  },
  {
    title: "Enterprise RAG Chatbot",
    category: "AI / GenAI",
    tech: ["LangChain", "OpenAI", "Java", "Python", "ChromaDB"],
    description: "Production-grade RAG pipeline for document ingestion and vector retrieval. Integrated with Java REST APIs. Reduced hallucinations by 40%.",
    details: "Used OpenAI embeddings and Chroma vector store for intelligent context retrieval."
  },
  {
    title: "Large-Scale Customer Segmentation",
    category: "Data Science",
    tech: ["PySpark", "AWS EMR", "SQL", "Tableau"],
    description: "Processed 10M+ customer records for data cleaning and engineering. Implemented K-Means reducing churn risk by 12%.",
    details: "Built Tableau dashboards for interactive segment visualization and business reporting."
  },
  {
    title: "End-to-End CI/CD Pipeline",
    category: "DevOps",
    tech: ["Jenkins", "Docker", "Kubernetes", "Maven", "Git"],
    description: "Automated pipeline reducing deployment time from 2 hours to 15 minutes. Integrated rolling updates for zero-downtime deployment.",
    details: "Used Docker for containerization and K8s for orchestration and health checks."
  },
  {
    title: "Predictive Maintenance System",
    category: "AI/ML",
    tech: ["Python", "Scikit-learn", "GCP Vertex AI", "SQL"],
    description: "Analyzed 50GB+ sensor data to predict equipment failures. Achieved 89% precision with Random Forest and XGBoost.",
    details: "Deployed on Google Cloud Vertex AI with automated retraining pipelines."
  },
  {
    title: "Real-Time Anomaly Detection",
    category: "Data Engineering",
    tech: ["Kafka", "PySpark", "MLflow", "Spotfire"],
    description: "Streaming pipeline using isolation forests. Reduced false alerts by 35% through statistical threshold tuning.",
    details: "Visualized real-time metrics and tracked experiments using MLflow."
  }
];

export const skillCategories = [
  {
    name: "Development",
    skills: ["React", "Node.js", "Express", "MongoDB", "Java", "Spring Boot", "FastAPI"]
  },
  {
    name: "AI & Data Science",
    skills: ["Python", "PySpark", "Scikit-learn", "Pandas", "Deep Learning", "LangChain", "LLMs"]
  },
  {
    name: "Cloud & DevOps",
    skills: ["AWS", "GCP", "Docker", "Kubernetes", "Jenkins", "Terraform", "Ansible"]
  },
  {
    name: "Tools & Analytics",
    skills: ["SQL", "Tableau", "Power BI", "Git", "Kafka", "ELK Stack", "Prometheus"]
  }
];
