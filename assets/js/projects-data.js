/**
 * Portfolio Data: Project Highlights & Personal Projects
 * Ankit Baghel | Associate Project Manager | PMO Analyst
 */

var portfolioData = window.portfolioData = {
  projects: [
    {
      id: "barista-ai-chatbot",
      title: "Barista AI Chatbot",
      category: "ai",
      isPersonal: false,
      subtitle: "Machine learning ticket classification & service desk interaction deflection.",
      image: "assets/images/project-devflow.jpg",
      tags: ["Conversational AI", "Machine Learning", "ServiceNow", "ITSM", "Ticket Deflection"],
      metrics: [
        { label: "L0 Deflection", value: "52–65%" },
        { label: "Interaction Deflection", value: "22% (+1.8%)" },
        { label: "Backlog Reduction", value: "21–30%" }
      ],
      description: "Collaborated with the AI development team to enhance machine learning models for automated ticket classification and service desk interaction deflection. Implemented an agent performance framework with 25+ parameters to assess productivity, identify improvement areas, and support data-driven decisions.",
      challenge: "High volumes of repetitive L0 tickets burdening service desk analysts and impacting overall SLA response times across enterprise accounts.",
      solution: "Enhanced ML classification models to identify ticket intent, route tickets automatically, provide self-service deflection, and sustain 52–65% L0 ticket deflection across 11 months.",
      features: [
        "Collaborated with AI dev team to enhance ML models for ticket classification",
        "Achieved 52–65% L0 ticket deflection sustained over 11 months",
        "Improved overall interaction deflection to 22% (+1.8%)",
        "Contributed to 8+ percentage point SLA improvement and 21–30% backlog drop",
        "Developed agent performance framework incorporating 25+ parameters"
      ],
      liveUrl: "#experience",
      githubUrl: "https://github.com/Ankitsing78"
    },
    {
      id: "aws-bcp-automation",
      title: "AWS-Based BCP Automation",
      category: "governance",
      isPersonal: false,
      subtitle: "End-to-end automated orchestration platform for Business Continuity Plan operations.",
      image: "assets/images/project-fintech.jpg",
      tags: ["AWS", "BCP", "Cloud Orchestration", "CMMI Audits", "ITIL", "Operational Resilience"],
      metrics: [
        { label: "Clients Closed", value: "5+ International" },
        { label: "Audit Compliance", value: "100% CMMI" },
        { label: "Operations", value: "Automated AWS" }
      ],
      description: "Managed end-to-end BCP operations and partnered with stakeholders to transition manual workflows to an AWS-based automated orchestration platform, improving efficiency, governance, and operational resilience. Successfully closed Business Continuity Plans for more than 5 international clients with strong delivery compliance for CMMI & BCP audits.",
      challenge: "Legacy manual BCP checklists were prone to delays, communication gaps, and high preparation overhead during quarterly audits.",
      solution: "Partnered with technical and business stakeholders to transition manual disaster recovery and continuity procedures into an automated AWS orchestration platform with continuous audit trails.",
      features: [
        "Managed end-to-end Business Continuity Plan (BCP) operations",
        "Transitioned manual workflows to AWS-based automated orchestration platform",
        "Closed Business Continuity Plans for more than 5 international clients",
        "Demonstrated strong delivery compliance for CMMI and BCP audits",
        "Significantly improved governance, efficiency, and operational resilience"
      ],
      liveUrl: "#experience",
      githubUrl: "https://github.com/Ankitsing78"
    },
    {
      id: "idars-reporting-platform",
      title: "IDARS Reporting Platform",
      category: "automation",
      isPersonal: false,
      subtitle: "Fully automated, no-human-touch ServiceNow reporting pipeline and Power BI data models.",
      image: "assets/images/project-saas.jpg",
      tags: ["Power BI", "ServiceNow", "Power Query", "DAX", "Advanced Excel", "Reporting Automation"],
      metrics: [
        { label: "Effort Saved", value: "10–20 hrs/wk" },
        { label: "Human Touch", value: "0 (Fully Automated)" },
        { label: "Refresh", value: "End-to-End Auto" }
      ],
      description: "Architected a fully automated, no-human-touch ServiceNow reporting system that auto-fetches operational and financial data into Power BI and Excel models, auto-refreshes end-to-end, and delivers automated scheduled reports to stakeholders. Eliminates 10–20 hours of manual operational effort each week.",
      challenge: "Repetitive manual extraction of infrastructure datasets into spreadsheets requiring 10–20 hours of manual collation each week and delaying executive decision-making.",
      solution: "Architected end-to-end automated pipelines auto-fetching operational and financial datasets into Power BI and Excel models with automated data refresh and scheduled email dispatch.",
      features: [
        "Built fully automated, no-human-touch ServiceNow reporting system",
        "Auto-fetches operational and financial datasets directly into Power BI",
        "Auto-refreshes end-to-end and delivers scheduled reports to stakeholders",
        "Saves 10–20 hours of manual operational effort every week",
        "Provides real-time executive visibility into infrastructure performance"
      ],
      liveUrl: "#experience",
      githubUrl: "https://github.com/Ankitsing78"
    },
    {
      id: "tractech-spares",
      title: "Tractech Spares (tractechspares.com)",
      category: "personal",
      isPersonal: true,
      badge: "Personal Project",
      subtitle: "E-commerce catalog platform for machinery & tractor spare parts, built end-to-end with AI tooling for acquaintances.",
      image: "assets/images/project-ecommerce.jpg",
      tags: ["Personal Project", "AI Tooling", "E-Commerce", "Tractor Parts", "Web Platform"],
      metrics: [
        { label: "Project Type", value: "Personal / Hobby" },
        { label: "Build Method", value: "AI Tooling" },
        { label: "Live Domain", value: "tractechspares.com" }
      ],
      description: "A live personal showcase project built end-to-end using AI tooling for acquaintances. Implemented an e-commerce catalog platform featuring category filtering, detailed spare parts listings, search capabilities, and inquiry workflows for agricultural tractor and machinery replacement parts.",
      challenge: "Developing and deploying a responsive, searchable spare parts catalog end-to-end with high turnaround speed and zero full-time engineering overhead.",
      solution: "Utilized modern AI developer workflows to design, code, and deploy the entire responsive platform and domain configurations as a live personal hobby showcase for acquaintances.",
      features: [
        "Built end-to-end using AI developer tools for acquaintances",
        "E-commerce catalog for agricultural tractor and machinery spare parts",
        "Clean, responsive product browsing and category search",
        "Direct inquiry workflow and domain deployment at tractechspares.com"
      ],
      liveUrl: "https://tractechspares.com",
      githubUrl: "https://tractechspares.com"
    },
    {
      id: "policies-xray",
      title: "PoliciesXray (policiesxray.com)",
      category: "personal",
      isPersonal: true,
      badge: "Personal Project",
      subtitle: "Policy comparison and document insights platform, built end-to-end with AI tooling for acquaintances.",
      image: "assets/images/blog-microservices.jpg",
      tags: ["Personal Project", "AI Tooling", "Document Insights", "Policy Review", "Web Platform"],
      metrics: [
        { label: "Project Type", value: "Personal / Hobby" },
        { label: "Build Method", value: "AI Tooling" },
        { label: "Live Domain", value: "policiesxray.com" }
      ],
      description: "A live personal showcase project created end-to-end with AI tooling for acquaintances. Designed to help users parse, compare, and extract insights from complex policy and insurance documents through intuitive visual clause breakdown and structured comparisons.",
      challenge: "Simplifying dense, convoluted policy documentation and legal clauses into digestible comparative insights for end users without manual document parsing.",
      solution: "Leveraged modern AI development acceleration to design, implement, and deploy an intuitive document comparison interface from scratch as a personal hobby project for acquaintances.",
      features: [
        "Built end-to-end using AI developer tools for acquaintances",
        "Visual policy comparison interface and clause breakdown",
        "Structured document insight cards for complex policy clauses",
        "Direct live deployment accessible at policiesxray.com"
      ],
      liveUrl: "https://policiesxray.com",
      githubUrl: "https://policiesxray.com"
    }
  ]
};
