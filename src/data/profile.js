/**
 * @typedef {Object} ProjectCategory
 * @property {'all' | 'ai' | 'systems' | 'research'} id
 * @property {string} label
 */

/**
 * @typedef {Object} MetricItem
 * @property {string} value
 * @property {string} label
 * @property {string} detail
 */

/**
 * @typedef {Object} ProjectItem
 * @property {string} id
 * @property {'ai' | 'systems' | 'research'} category
 * @property {string} title
 * @property {string} role
 * @property {string} summary
 * @property {string} impact
 * @property {readonly string[]} stack
 */

/**
 * @typedef {Object} ResearchItem
 * @property {string} id
 * @property {string} type
 * @property {string} status
 * @property {string} venue
 * @property {string} year
 * @property {string} title
 * @property {string} area
 * @property {string} summary
 */

/**
 * @typedef {Object} ExperienceItem
 * @property {string} id
 * @property {string} company
 * @property {string} role
 * @property {string} period
 * @property {string} location
 * @property {readonly string[]} highlights
 */

/**
 * @typedef {Object} EducationItem
 * @property {string} institution
 * @property {string} degree
 * @property {string} period
 */

/**
 * @typedef {Object} StackGroup
 * @property {string} label
 * @property {readonly string[]} items
 */

/**
 * @typedef {Object} LanguageItem
 * @property {string} name
 * @property {string} level
 */

/**
 * @typedef {Object} ProfileData
 * @property {string} name
 * @property {string} initials
 * @property {string} location
 * @property {string} email
 * @property {{ github: string, linkedin: string }} links
 * @property {string} headline
 * @property {string} summary
 * @property {readonly MetricItem[]} metrics
 * @property {readonly ProjectItem[]} projects
 * @property {readonly ResearchItem[]} research
 * @property {readonly ExperienceItem[]} experience
 * @property {readonly EducationItem[]} education
 * @property {readonly StackGroup[]} stack
 * @property {readonly LanguageItem[]} languages
 * @property {readonly string[]} honors
 * @property {readonly string[]} certifications
 */

/** @type {readonly ProjectCategory[]} */
export const PROJECT_CATEGORIES = Object.freeze([
  { id: 'all', label: 'All' },
  { id: 'ai', label: 'AI & Agents' },
  { id: 'systems', label: 'Systems & Web' },
  { id: 'research', label: 'Research' },
]);

/** @type {ProfileData} */
export const PROFILE = Object.freeze({
  name: 'Lucas Maciel',
  initials: 'LM',
  location: 'Recife, PE, Brazil',
  email: 'lucasmacieelsousa@gmail.com',
  links: Object.freeze({
    github: 'https://github.com/LucasMacieel',
    linkedin: 'https://www.linkedin.com/in/lucas-macieel',
  }),
  headline:
    'Full-Stack Engineer @ Projeto CIn/Motorola | Applied AI & ML Engineering | AI Agents | MSc Student in Computational Intelligence',
  summary:
    'Software engineer with 4+ years of industry experience building LLM applications, AI agents, semantic search systems, and cloud infrastructure. MSc student in Computer Science at Universidade de Pernambuco studying Tabular Foundation Models and algorithm selection. Published researcher at CISTI 2026 and ENIAC 2026.',
  metrics: Object.freeze([
    {
      value: '~93%',
      label: 'Goji.AI Total Blocking Time cut',
      detail: '1,380 ms to 100 ms via HTTP/2 proxy migration',
    },
    {
      value: '84.3k+',
      label: 'Jira LLM summarization requests',
      detail: '4.6k+ hrs saved across 400 monthly users',
    },
    {
      value: '27.5k+',
      label: 'AI Jira smart digests',
      detail: 'Delivered to 427 unique subscribers',
    },
    {
      value: '2',
      label: 'Peer-reviewed 2026 papers',
      detail: 'Accepted at CISTI and published at ENIAC',
    },
  ]),
  projects: Object.freeze([
    {
      id: 'enterprise-ai-agent',
      category: 'ai',
      title: 'Enterprise AI Agent',
      role: 'Projeto CIn/Motorola',
      summary:
        'Built an AI agent with Google ADK integrating BigQuery, Google Docs, and Google Sheets with OAuth access control, deployed to GCP Agent Engine and Gemini Enterprise.',
      impact: 'OAuth-scoped enterprise tool execution across Google Workspace and BigQuery.',
      stack: Object.freeze(['Google ADK', 'BigQuery', 'Google Docs & Sheets', 'OAuth', 'GCP Agent Engine', 'Gemini Enterprise']),
    },
    {
      id: 'antigravity-telemetry-plugin',
      category: 'systems',
      title: 'Antigravity Telemetry Plugin',
      role: 'Projeto CIn/Motorola',
      summary:
        'Built a telemetry plugin for Google Antigravity that captures usage of tools, MCP servers, skills, and sub-agents and streams events to BigQuery for adoption and license dashboards.',
      impact: 'Local JSONL spooling buffers failed BigQuery writes and syncs automatically on reconnect.',
      stack: Object.freeze(['BigQuery', 'JSONL Spooling', 'MCP', 'Telemetry']),
    },
    {
      id: 'goji-ai-platform',
      category: 'systems',
      title: 'Goji.AI Enterprise Platform',
      role: 'Projeto CIn/Motorola',
      summary:
        'Contributed to a centralized enterprise AI platform built with Next.js, Tailwind CSS, Supabase PostgreSQL, and Nginx, migrating the reverse proxy from HTTP/1.1 to HTTP/2.',
      impact: 'Cut Total Blocking Time from 1,380 ms to 100 ms, a ~93% reduction.',
      stack: Object.freeze(['Next.js', 'Tailwind CSS', 'Supabase', 'PostgreSQL', 'Nginx', 'HTTP/2']),
    },
    {
      id: 'jira-ai-summarization-digests',
      category: 'ai',
      title: 'Jira AI Summarization & Smart Digests',
      role: 'Projeto CIn/Motorola',
      summary:
        'Connected BigQuery and Vertex AI LLMs in Jira to power issue summarization and automated notification digests that retrieve, summarize, and surface relevant issue updates.',
      impact: '84.3k+ summarization requests saving 4.6k+ hrs for 400 monthly users, plus 27.5k+ digests to 427 subscribers.',
      stack: Object.freeze(['Vertex AI', 'BigQuery', 'Jira', 'LLMs']),
    },
    {
      id: 'semantic-test-case-recommender',
      category: 'ai',
      title: 'Semantic Test-Case Recommender',
      role: 'Projeto CIn/Motorola',
      summary:
        'Built a semantic recommendation system in Jira using vector embeddings and FAISS similarity search to match relevant test cases to test-plan context.',
      impact: 'Automates test-case discovery across Jira test plans using dense vector search.',
      stack: Object.freeze(['FAISS', 'Vector Embeddings', 'Jira']),
    },
    {
      id: 'icl-algorithm-selection',
      category: 'research',
      title: 'In-Context Learning for Per-Instance Algorithm Selection',
      role: 'MSc Research, UPE',
      summary:
        'Investigates Tabular Foundation Models and in-context learning to select optimization solvers from problem instance features and historical algorithm performance.',
      impact: 'Ongoing MSc research in Computational Intelligence at Universidade de Pernambuco.',
      stack: Object.freeze(['Tabular Foundation Models', 'In-Context Learning', 'Algorithm Selection']),
    },
  ]),
  research: Object.freeze([
    {
      id: 'msc-icl-algorithm-selection',
      type: 'MSc Research',
      status: 'Ongoing',
      venue: 'Universidade de Pernambuco',
      year: '2026 to 2028',
      title: 'In-Context Learning for Per-instance Algorithm Selection',
      area: 'Tabular Foundation Models',
      summary:
        'Applies in-context learning with Tabular Foundation Models to select solvers from problem instance features and historical algorithm performance.',
    },
    {
      id: 'cisti-2026-memetic-fairness',
      type: 'Paper',
      status: 'Accepted',
      venue: 'CISTI 2026',
      year: '2026',
      title: 'A Memetic Algorithm for User Fairness in Recommender Systems',
      area: 'Evolutionary Computation',
      summary:
        'Peer-reviewed evolutionary computation paper accepted at CISTI 2026 addressing user fairness in recommender systems.',
    },
    {
      id: 'eniac-2026-drowsiness-cv',
      type: 'Paper',
      status: 'Published',
      venue: 'ENIAC 2026',
      year: '2026',
      title: 'Driver Drowsiness Detection Using Computer Vision with Adaptive Methods on Android',
      area: 'Computer Vision',
      summary:
        'Published in ENIAC 2026 proceedings on adaptive computer vision methods for driver drowsiness detection on Android devices.',
    },
  ]),
  experience: Object.freeze([
    {
      id: 'cin-motorola-fullstack',
      company: 'Projeto CIn/Motorola',
      role: 'Full-Stack Engineer',
      period: 'Nov 2024 to Present',
      location: 'Recife, PE',
      highlights: Object.freeze([
        'Contributed to Goji.AI with Next.js, Tailwind CSS, Supabase PostgreSQL, and Nginx, cutting Total Blocking Time from 1,380 ms to 100 ms (~93%) via HTTP/2.',
        'Built Jira AI notification digests (27.5k+ digests to 427 subscribers) and contributed to Jira LLM summarization (84.3k+ requests, 400 monthly users, 4.6k+ hrs saved) with BigQuery and Vertex AI.',
        'Developed an AI agent with Google ADK for BigQuery, Google Docs, and Google Sheets with OAuth access control on GCP Agent Engine and Gemini Enterprise.',
        'Built an Antigravity telemetry plugin streaming tool, MCP server, skill, and sub-agent events to BigQuery with local JSONL spooling and auto-sync.',
        'Built a semantic test-case recommender in Jira using vector embeddings and FAISS similarity search.',
        'Maintained 30+ Java Jira plugins, cutting build time by ~41% on a critical plugin and optimizing concurrent processing for workloads above 5,000 executions.',
      ]),
    },
    {
      id: 'outlier-ai-trainer',
      company: 'Outlier',
      role: 'AI Training Specialist',
      period: 'Jun 2026 to Oct 2026',
      location: '',
      highlights: Object.freeze([
        'Evaluated AI-generated content and provided RLHF feedback across technical and general domains.',
        'Assessed response quality, factual accuracy, and reliability to improve large language model outputs.',
      ]),
    },
    {
      id: 'cin-motorola-qa',
      company: 'Projeto CIn/Motorola',
      role: 'QA Intern',
      period: 'May 2023 to Nov 2024',
      location: 'Recife, PE',
      highlights: Object.freeze([
        'Implemented 90+ automated UI tests using Selenium, JUnit, and Java plus 13 automated REST API tests in CI/CD pipelines.',
        'Configured Jenkins build and test jobs, tested REST APIs with Postman and JavaScript, and ran JMeter load tests on Motorola applications.',
      ]),
    },
    {
      id: 'it-power-rpa',
      company: 'IT POWER SOFTWARE',
      role: 'RPA Intern',
      period: 'Jun 2022 to Jan 2023',
      location: '',
      highlights: Object.freeze([
        'Built RPA and OCR PDF extraction scripts for major insurers including Porto Seguro, Allianz, Sul America, Zurich, Bradesco, Tokio Marine, Mapfre, and MetLife.',
        'Automated rule-based workflows in production, reducing manual errors and data processing time.',
      ]),
    },
  ]),
  education: Object.freeze([
    {
      institution: 'Universidade de Pernambuco',
      degree: 'MSc in Computer Science',
      period: 'Aug 2026 to Jan 2028',
    },
    {
      institution: 'Universidade de Pernambuco',
      degree: 'B.Eng. in Computer Engineering',
      period: 'Jan 2020 to Jul 2026',
    },
  ]),
  stack: Object.freeze([
    {
      label: 'AI & Machine Learning',
      items: Object.freeze([
        'LLMs',
        'Google ADK',
        'Vertex AI',
        'FAISS',
        'Vector Embeddings',
        'RLHF',
        'Tabular Foundation Models',
        'Evolutionary Computation',
        'Computer Vision',
      ]),
    },
    {
      label: 'Backend & Full-Stack',
      items: Object.freeze([
        'Python',
        'Node.js',
        'Java',
        'Next.js',
        'Tailwind CSS',
        'PostgreSQL (Supabase)',
        'REST APIs',
        'SSE',
        'JWT',
      ]),
    },
    {
      label: 'Cloud, Data & QA',
      items: Object.freeze([
        'GCP (BigQuery, Agent Engine)',
        'AWS',
        'Terraform',
        'Nginx',
        'GitHub Actions',
        'Jenkins',
        'Selenium',
        'JUnit',
        'JMeter',
      ]),
    },
  ]),
  languages: Object.freeze([
    { name: 'Portuguese', level: 'Native' },
    { name: 'English', level: 'Fluent, EF SET C2' },
    { name: 'Spanish', level: 'Intermediate' },
  ]),
  honors: Object.freeze(['Destaque do Ano (2x)']),
  certifications: Object.freeze([
    'EF SET English Certificate (C2 Proficient)',
    'Inteligencia Artificial (USP 90 anos)',
    'Workshop de Ciencia de Dados e Analytics',
    'Hackathon 2023',
    'Curso Completo de Linguagem C e C++',
  ]),
});
