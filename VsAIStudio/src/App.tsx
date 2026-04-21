/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';
import { 
  Github, 
  Linkedin, 
  Mail, 
  Phone, 
  Download, 
  ExternalLink, 
  ChevronDown, 
  Code, 
  Database, 
  Brain, 
  BarChart3, 
  Globe,
  ArrowRight
} from 'lucide-react';

// --- Translations ---
const translations = {
  fr: {
    nav: {
      about: 'Profil',
      skills: 'Compétences',
      projects: 'Projets',
      experience: 'Expériences',
      education: 'Formation',
      contact: 'Contact',
    },
    hero: {
      badge: 'MSc AI Applied to Business',
      title: 'Kevin',
      subtitle: 'Data Analyst & AI Enthusiast — Python · SQL · Power BI · Dataiku · Tableau',
      btnProjects: 'Voir mes projets',
      btnCv: 'Télécharger mon CV',
    },
    about: {
      label: 'À propos',
      title: 'Qui suis-je ?',
      p1: 'Étudiant en <strong>MSc AI Applied to Business</strong> à l\'Eugenia School, je suis passionné par la data et l\'intelligence artificielle appliquées aux enjeux métiers.',
      p2: 'Mon parcours atypique — de la Finance à l\'IA — me permet d\'avoir une vision à la fois <strong>analytique et business</strong>. J\'aime transformer des données brutes en insights actionnables.',
      p3: 'Actuellement en alternance chez <strong>Estée Lauder Companies</strong>, je travaille sur le déploiement d\'outils IA (Microsoft Copilot) et l\'accompagnement des équipes dans leur adoption.',
      p4: 'Bilingue français/anglais, ayant vécu un an aux États-Unis, j\'évolue aisément dans des environnements internationaux.',
      stats: {
        projects: 'Projets réalisés',
        languages: 'Langues maîtrisées',
        experience: 'Années d\'expérience',
        tools: 'Outils data maîtrisés',
      }
    },
    skills: {
      label: 'Compétences',
      title: 'Mes <span>outils</span>',
      groups: {
        languages: 'Langages',
        data: 'Data & BI',
        ai: 'IA & ML',
        python: 'Python libs',
        tools: 'Outils & CRM',
        langs: 'Langues',
      },
      fr: 'Français — Natif',
      en: 'Anglais — Bilingue',
    },
    projects: {
      label: 'Portfolio',
      title: 'Mes <span>projets</span>',
      links: {
        presentation: 'Présentation',
        code: 'Code',
        dashboard: 'Dashboard',
      },
      items: [
        {
          id: 'marathon',
          title: 'Analyse — Marathon de Paris',
          desc: 'Web scraping automatisé des résultats du Marathon de Paris (2021–2025) depuis timeto.com. Collecte de +200 000 lignes de données, fusion multi-années et analyse des performances.',
          tags: ['Python', 'Pandas', 'Web Scraping', 'Data Analysis'],
          icon: '🏃',
          image: 'https://picsum.photos/seed/marathon/800/600',
          codeUrl: 'https://github.com/Assokev/Portfolio/tree/main/DataanalysePython',
          demoUrl: 'DataanalysePython/marathon-paris-analyse.pdf'
        },
        {
          id: 'rag',
          title: 'IA Fiscaliste — Chatbot RAG',
          desc: 'Assistant IA expert en droit fiscal français, basé sur le Livre des Procédures Fiscales (LPF édition 2026). Utilise un pipeline RAG pour répondre avec précision.',
          tags: ['Python', 'LangChain', 'OpenAI', 'FAISS', 'Streamlit'],
          icon: '⚖️',
          image: 'https://picsum.photos/seed/ai-bot/800/600',
          codeUrl: 'https://github.com/Assokev/Portfolio/tree/main/RAGpython'
        },
        {
          id: 'ecommerce',
          title: 'Dashboard E-commerce — Brésil',
          desc: 'Analyse complète des données e-commerce du dataset Olist (marché brésilien). Visualisation des tendances de ventes et performances logistiques via Tableau.',
          tags: ['Tableau', 'Data Viz', 'E-commerce', 'SQL'],
          icon: '🛒',
          image: 'https://picsum.photos/seed/ecommerce/800/600',
          codeUrl: 'https://github.com/Assokev/Portfolio/tree/main/Tableau',
          demoUrl: 'https://public.tableau.com/app/profile/kevin.assombi/viz/Ecommerce_bresil_17738436997980/Performancese-commerce-Brsil'
        },
        {
          id: 'dataiku',
          title: 'Dashboard Client — Cdiscount',
          desc: 'Dashboard analytique client pour Cdiscount développé avec Dataiku. Visualisation des segments clients, analyse RFM et suivi des KPIs de conversion.',
          tags: ['Dataiku', 'Chart.js', 'HTML/CSS', 'BI'],
          icon: '📊',
          image: 'https://picsum.photos/seed/dashboard/800/600',
          codeUrl: 'https://github.com/Assokev/Portfolio/tree/main/dataiku',
          demoUrl: 'dataiku/dashboard.html'
        }
      ]
    },
    experience: {
      label: 'Parcours',
      title: 'Expériences <span>professionnelles</span>',
      items: [
        {
          date: 'En cours',
          title: 'IT & AI Tools Support',
          company: 'Estée Lauder Companies',
          points: [
            'Déploiement d\'outils IA (Microsoft Copilot) et intégration dans les processus internes',
            'Support fonctionnel et accompagnement des équipes dans l\'usage des solutions IA',
            'Documentation, veille et sensibilisation à l\'IA via supports et formations'
          ]
        },
        {
          date: 'Oct. 2023 - Mars 2024',
          title: 'Assistant Comptable',
          company: 'Adhap Services',
          points: [
            'Enregistrement des opérations financières via logiciel comptable et Excel',
            'Préparation des déclarations fiscales (TVA, IS), rapprochements bancaires'
          ]
        },
        {
          date: 'Mars 2021 - Août 2021',
          title: 'Conseiller Service Client',
          company: 'Webhelp — FDJ Online',
          points: [
            'Gestion des demandes clients et résolution de problèmes (conformité)',
            'Analyse des réclamations récurrentes et propositions d\'amélioration'
          ]
        }
      ]
    },
    education: {
      label: 'Formation',
      title: 'Mon <span>parcours académique</span>',
      items: [
        {
          year: '2025 – 2027',
          title: 'MSc AI Applied to Business',
          school: 'Eugenia School',
          detail: 'Business analytics, Data visualization, CRM, Nocode, Marketing analytique'
        },
        {
          year: '2020 – 2023',
          title: 'Licence Économie & Gestion',
          school: 'Université Jules Verne, Amiens — Spécialité Banque & Finance',
          detail: 'Analyse financière, comptabilité, économie bancaire, gestion d\'entreprise'
        }
      ]
    },
    contact: {
      label: 'Contact',
      title: 'Travaillons <span>ensemble</span>',
      cv: 'Télécharger mon CV',
    },
    footer: 'Conçu & développé avec soin'
  },
  en: {
    nav: {
      about: 'Profile',
      skills: 'Skills',
      projects: 'Projects',
      experience: 'Experience',
      education: 'Education',
      contact: 'Contact',
    },
    hero: {
      badge: 'MSc AI Applied to Business',
      title: 'Kevin',
      subtitle: 'Data Analyst & AI Enthusiast — Python · SQL · Power BI · Dataiku · Tableau',
      btnProjects: 'View my projects',
      btnCv: 'Download my CV',
    },
    about: {
      label: 'About',
      title: 'Who am I?',
      p1: 'Student in <strong>MSc AI Applied to Business</strong> at Eugenia School, I am passionate about data and artificial intelligence applied to business challenges.',
      p2: 'My atypical background — from Finance to AI — allows me to have both an <strong>analytical and business</strong> perspective. I love turning raw data into actionable insights.',
      p3: 'Currently on a work-study program at <strong>Estée Lauder Companies</strong>, I work on deploying AI tools (Microsoft Copilot) and supporting teams in their adoption.',
      p4: 'Bilingual French/English, having lived a year in the United States, I thrive in international environments.',
      stats: {
        projects: 'Completed projects',
        languages: 'Languages',
        experience: 'Years of experience',
        tools: 'Data tools mastered',
      }
    },
    skills: {
      label: 'Skills',
      title: 'My <span>tools</span>',
      groups: {
        languages: 'Languages',
        data: 'Data & BI',
        ai: 'IA & ML',
        python: 'Python libs',
        tools: 'Tools & CRM',
        langs: 'Languages',
      },
      fr: 'French — Native',
      en: 'English — Bilingual',
    },
    projects: {
      label: 'Portfolio',
      title: 'My <span>projects</span>',
      links: {
        presentation: 'Presentation',
        code: 'Code',
        dashboard: 'Dashboard',
      },
      items: [
        {
          id: 'marathon',
          title: 'Analysis — Paris Marathon',
          desc: 'Automated web scraping of Paris Marathon results (2021–2025) from timeto.com. Collection of 200,000+ rows and performance analysis.',
          tags: ['Python', 'Pandas', 'Web Scraping', 'Data Analysis'],
          icon: '🏃',
          image: 'https://picsum.photos/seed/marathon/800/600',
          codeUrl: 'https://github.com/Assokev/Portfolio/tree/main/DataanalysePython',
          demoUrl: 'DataanalysePython/marathon-paris-analyse.pdf'
        },
        {
          id: 'rag',
          title: 'Tax AI — RAG Chatbot',
          desc: 'AI assistant expert in French tax law, based on the Book of Tax Procedures (LPF 2026 edition). Uses a RAG pipeline for accurate answers.',
          tags: ['Python', 'LangChain', 'OpenAI', 'FAISS', 'Streamlit'],
          icon: '⚖️',
          image: 'https://picsum.photos/seed/ai-bot/800/600',
          codeUrl: 'https://github.com/Assokev/Portfolio/tree/main/RAGpython'
        },
        {
          id: 'ecommerce',
          title: 'E-commerce Dashboard — Brazil',
          desc: 'Full analysis of e-commerce data from the Olist dataset (Brazilian market). Visualization of sales trends and logistics performance via Tableau.',
          tags: ['Tableau', 'Data Viz', 'E-commerce', 'SQL'],
          icon: '🛒',
          image: 'https://picsum.photos/seed/ecommerce/800/600',
          codeUrl: 'https://github.com/Assokev/Portfolio/tree/main/Tableau',
          demoUrl: 'https://public.tableau.com/app/profile/kevin.assombi/viz/Ecommerce_bresil_17738436997980/Performancese-commerce-Brsil'
        },
        {
          id: 'dataiku',
          title: 'Customer Dashboard — Cdiscount',
          desc: 'Customer analytics dashboard for Cdiscount built with Dataiku. Visualization of customer segments, RFM analysis and conversion KPI tracking.',
          tags: ['Dataiku', 'Chart.js', 'HTML/CSS', 'BI'],
          icon: '📊',
          image: 'https://picsum.photos/seed/dashboard/800/600',
          codeUrl: 'https://github.com/Assokev/Portfolio/tree/main/dataiku',
          demoUrl: 'dataiku/dashboard.html'
        }
      ]
    },
    experience: {
      label: 'Career',
      title: 'Professional <span>Experience</span>',
      items: [
        {
          date: 'Ongoing',
          title: 'IT & AI Tools Support',
          company: 'Estée Lauder Companies',
          points: [
            'Deployment of AI tools (Microsoft Copilot) and integration into internal processes',
            'Functional support and guidance for teams using AI and Microsoft 365 solutions',
            'Documentation, monitoring and AI awareness through internal training materials'
          ]
        },
        {
          date: 'Oct. 2023 - Mar. 2024',
          title: 'Accounting Assistant',
          company: 'Adhap Services',
          points: [
            'Recording financial transactions using accounting software and Excel',
            'Preparation of tax declarations (VAT, corporate tax), bank reconciliations'
          ]
        },
        {
          date: 'Mar. 2021 - Aug. 2021',
          title: 'Customer Service Advisor',
          company: 'Webhelp — FDJ Online',
          points: [
            'Handling customer requests and resolving issues in compliance with regulatory standards',
            'Analysis of recurring complaints and improvement proposals'
          ]
        }
      ]
    },
    education: {
      label: 'Education',
      title: 'My <span>academic background</span>',
      items: [
        {
          year: '2025 – 2027',
          title: 'MSc AI Applied to Business',
          school: 'Eugenia School',
          detail: 'Business analytics, Data visualization, CRM, No-code, Marketing analytics'
        },
        {
          year: '2020 – 2023',
          title: 'Bachelor in Economics & Management',
          school: 'Université Jules Verne, Amiens — Banking & Finance specialization',
          detail: 'Financial analysis, accounting, banking economics, business management'
        }
      ]
    },
    contact: {
      label: 'Contact',
      title: 'Let\'s work <span>together</span>',
      cv: 'Download my CV',
    },
    footer: 'Designed & built with care'
  }
};

// --- Components ---

const SectionHeading = ({ label, title, light = false }: { label: string, title: string, light?: boolean }) => (
  <div className="mb-12">
    <motion.p 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={`text-xs font-bold tracking-[0.2em] uppercase mb-2 ${light ? 'text-blue-300' : 'text-blue-600'}`}
    >
      {label}
    </motion.p>
    <motion.h2 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.1 }}
      className={`text-3xl md:text-4xl font-bold ${light ? 'text-white' : 'text-slate-900'}`}
      dangerouslySetInnerHTML={{ __html: title }}
    />
  </div>
);

const ProjectCard = ({ project, t }: any) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    whileHover={{ y: -10 }}
    className="group relative bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col h-full cursor-pointer"
    onClick={() => window.open(project.demoUrl || project.codeUrl, '_blank')}
  >
    {/* Image Container */}
    <div className="relative h-56 overflow-hidden">
      <motion.img 
        src={project.image} 
        alt={project.title}
        referrerPolicy="no-referrer"
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
        <div className="flex gap-3">
          {project.codeUrl && (
            <a 
              href={project.codeUrl} 
              target="_blank" 
              onClick={(e) => e.stopPropagation()}
              className="p-2 bg-white/20 backdrop-blur-md rounded-full text-white hover:bg-white/40 transition-colors"
              title={t.projects.links.code}
            >
              <Github size={18} />
            </a>
          )}
          {project.demoUrl && (
            <a 
              href={project.demoUrl} 
              target="_blank" 
              onClick={(e) => e.stopPropagation()}
              className="p-2 bg-white/20 backdrop-blur-md rounded-full text-white hover:bg-white/40 transition-colors"
              title={t.projects.links.dashboard || t.projects.links.presentation}
            >
              <ExternalLink size={18} />
            </a>
          )}
        </div>
      </div>
      <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xl shadow-sm">
        {project.icon}
      </div>
    </div>

    {/* Content */}
    <div className="p-6 flex flex-col flex-grow">
      <div className="flex justify-between items-start mb-3">
        <h3 className="text-xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors">{project.title}</h3>
      </div>
      <p className="text-slate-600 text-sm mb-6 line-clamp-3 leading-relaxed">
        {project.desc}
      </p>
      
      <div className="mt-auto flex flex-wrap gap-2">
        {project.tags.map((tag: string) => (
          <span key={tag} className="text-[10px] font-bold uppercase tracking-wider px-2 py-1 bg-slate-100 text-slate-500 rounded-md border border-slate-200">
            {tag}
          </span>
        ))}
      </div>
    </div>
  </motion.div>
);

export default function App() {
  const [lang, setLang] = useState<'fr' | 'en'>('fr');
  const t = translations[lang];
  const [isScrolled, setIsScrolled] = useState(false);
  const { scrollYProgress } = useScroll();
  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 selection:bg-blue-100 selection:text-blue-900">
      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white/80 backdrop-blur-lg shadow-sm py-3' : 'bg-transparent py-6'}`}>
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-xl font-black tracking-tighter text-slate-900"
          >
            KA<span className="text-blue-600">.</span>
          </motion.div>
          
          <div className="hidden md:flex items-center gap-8">
            {Object.entries(t.nav).map(([key, label]) => (
              <a 
                key={key} 
                href={`#${key}`} 
                className="text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors"
              >
                {label}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <div className="flex bg-slate-100 p-1 rounded-full border border-slate-200">
              <button 
                onClick={() => setLang('fr')}
                className={`px-3 py-1 rounded-full text-xs font-bold transition-all ${lang === 'fr' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}
              >
                FR
              </button>
              <button 
                onClick={() => setLang('en')}
                className={`px-3 py-1 rounded-full text-xs font-bold transition-all ${lang === 'en' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}
              >
                EN
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
        <motion.div 
          style={{ y: backgroundY }}
          className="absolute inset-0 z-0"
        >
          <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-blue-100/50 rounded-full blur-[120px]" />
          <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-50/50 rounded-full blur-[100px]" />
        </motion.div>

        <div className="max-w-7xl mx-auto px-6 relative z-10 w-full grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <motion.span 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-block px-4 py-1.5 bg-blue-50 text-blue-600 rounded-full text-xs font-bold tracking-wider uppercase mb-6 border border-blue-100"
            >
              {t.hero.badge}
            </motion.span>
            <h1 className="text-6xl md:text-8xl font-black tracking-tighter text-slate-900 mb-6 leading-[0.9]">
              {t.hero.title} <br />
              <span className="text-blue-600">Assombi</span>
            </h1>
            <p className="text-lg md:text-xl text-slate-600 mb-10 max-w-lg leading-relaxed font-medium">
              {t.hero.subtitle}
            </p>
            <div className="flex flex-wrap gap-4">
              <motion.a 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href="#projects" 
                className="px-8 py-4 bg-slate-900 text-white rounded-2xl font-bold flex items-center gap-2 shadow-lg shadow-slate-200 hover:bg-blue-600 transition-colors"
              >
                {t.hero.btnProjects} <ArrowRight size={18} />
              </motion.a>
              <motion.a 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href="CV_etu2026.pdf" 
                download
                className="px-8 py-4 bg-white text-slate-900 border border-slate-200 rounded-2xl font-bold flex items-center gap-2 hover:border-slate-400 transition-colors"
              >
                <Download size={18} /> {t.hero.btnCv}
              </motion.a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="relative"
          >
            <div className="relative z-10 w-full aspect-square max-w-[500px] mx-auto rounded-[40px] overflow-hidden border-8 border-white shadow-2xl">
              <img 
                src="P1011101.JPG" 
                alt="Kevin Assombi" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-blue-600 rounded-3xl -z-0 rotate-12" />
            <div className="absolute -top-6 -left-6 w-24 h-24 bg-slate-200 rounded-full -z-0" />
          </motion.div>
        </div>

        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-slate-400"
        >
          <ChevronDown size={32} />
        </motion.div>
      </section>

      {/* Projects Section - MOVED HERE AS REQUESTED */}
      <section id="projects" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeading label={t.projects.label} title={t.projects.title} />
          <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
            {t.projects.items.map((project: any) => (
              <ProjectCard key={project.id} project={project} t={t} />
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeading label={t.about.label} title={t.about.title} />
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <div className="space-y-6 text-lg text-slate-600 leading-relaxed">
              <p dangerouslySetInnerHTML={{ __html: t.about.p1 }} />
              <p dangerouslySetInnerHTML={{ __html: t.about.p2 }} />
              <p dangerouslySetInnerHTML={{ __html: t.about.p3 }} />
              <p>{t.about.p4}</p>
            </div>
            <div className="grid grid-cols-2 gap-6">
              {[
                { label: t.about.stats.projects, value: '4' },
                { label: t.about.stats.languages, value: '2' },
                { label: t.about.stats.experience, value: '3+' },
                { label: t.about.stats.tools, value: '5' },
              ].map((stat, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="p-8 bg-white rounded-3xl border border-slate-200 text-center shadow-sm"
                >
                  <div className="text-4xl font-black text-blue-600 mb-2">{stat.value}</div>
                  <div className="text-xs font-bold text-slate-400 uppercase tracking-widest">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-24 bg-slate-900 text-white overflow-hidden relative">
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:40px_40px]" />
        </div>
        
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <SectionHeading label={t.skills.label} title={t.skills.title} light />
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {Object.entries(t.skills.groups).map(([key, label], i) => (
              <motion.div 
                key={key}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="p-6 bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 hover:border-blue-500/50 transition-colors"
              >
                <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-400 mb-4">{label}</h4>
                <div className="flex flex-wrap gap-2">
                  {key === 'langs' ? (
                    <>
                      <span className="text-xs font-medium text-slate-300">{t.skills.fr}</span>
                      <span className="text-xs font-medium text-slate-300">{t.skills.en}</span>
                    </>
                  ) : (
                    // This is a simplification, in a real app you'd map the actual skills
                    <div className="space-y-1">
                      {key === 'languages' && ['Python', 'SQL'].map(s => <div key={s} className="text-xs text-slate-300">{s}</div>)}
                      {key === 'data' && ['Power BI', 'Tableau', 'Dataiku'].map(s => <div key={s} className="text-xs text-slate-300">{s}</div>)}
                      {key === 'ai' && ['LangChain', 'OpenAI', 'RAG'].map(s => <div key={s} className="text-xs text-slate-300">{s}</div>)}
                      {key === 'python' && ['Pandas', 'Streamlit', 'Requests'].map(s => <div key={s} className="text-xs text-slate-300">{s}</div>)}
                      {key === 'tools' && ['Microsoft 365', 'Copilot', 'Airtable'].map(s => <div key={s} className="text-xs text-slate-300">{s}</div>)}
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeading label={t.experience.label} title={t.experience.title} />
          <div className="space-y-12">
            {t.experience.items.map((exp: any, i: number) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="grid md:grid-cols-[200px_1fr] gap-8 relative"
              >
                <div className="text-sm font-bold text-slate-400 pt-1">{exp.date}</div>
                <div className="relative pl-8 border-l-2 border-slate-200">
                  <div className="absolute left-[-9px] top-1.5 w-4 h-4 rounded-full bg-blue-600 border-4 border-slate-50" />
                  <h3 className="text-xl font-bold text-slate-900 mb-1">{exp.title}</h3>
                  <div className="text-blue-600 font-bold text-sm mb-4 uppercase tracking-wider">{exp.company}</div>
                  <ul className="space-y-3">
                    {exp.points.map((point: string, j: number) => (
                      <li key={j} className="text-slate-600 text-sm flex gap-3">
                        <span className="text-blue-600 mt-1">•</span>
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Education Section */}
      <section id="education" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeading label={t.education.label} title={t.education.title} />
          <div className="grid md:grid-cols-2 gap-8">
            {t.education.items.map((edu: any, i: number) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="p-8 bg-slate-50 rounded-3xl border border-slate-200 hover:border-blue-500 transition-colors"
              >
                <div className="text-xs font-black text-blue-600 uppercase tracking-widest mb-4">{edu.year}</div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">{edu.title}</h3>
                <div className="text-slate-500 font-medium mb-4">{edu.school}</div>
                <p className="text-slate-400 text-sm italic">{edu.detail}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <SectionHeading label={t.contact.label} title={t.contact.title} light />
          <div className="flex flex-wrap justify-center gap-6 mt-12">
            {[
              { icon: <Mail size={20} />, label: 'assombik@gmail.com', href: 'mailto:assombik@gmail.com' },
              { icon: <Github size={20} />, label: 'github.com/Assokev', href: 'https://github.com/Assokev' },
              { icon: <Linkedin size={20} />, label: 'linkedin.com/in/kevin-assombi', href: 'https://www.linkedin.com/in/kevin-assombi' },
              { icon: <Phone size={20} />, label: '06.63.20.94.61', href: 'tel:+33663209461' },
            ].map((item, i) => (
              <motion.a 
                key={i}
                whileHover={{ y: -5, backgroundColor: 'rgba(255,255,255,0.1)' }}
                href={item.href}
                target="_blank"
                className="flex items-center gap-3 px-6 py-4 bg-white/5 border border-white/10 rounded-2xl text-sm font-medium transition-colors"
              >
                {item.icon} {item.label}
              </motion.a>
            ))}
          </div>
          <div className="mt-12">
            <motion.a 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="CV_etu2026.pdf" 
              download
              className="inline-flex items-center gap-2 px-10 py-5 bg-blue-600 text-white rounded-2xl font-bold shadow-xl shadow-blue-900/20"
            >
              <Download size={20} /> {t.contact.cv}
            </motion.a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-slate-800 bg-slate-900 text-center text-slate-500 text-xs font-medium uppercase tracking-[0.2em]">
        <div className="max-w-7xl mx-auto px-6">
          © 2026 Kevin Assombi — {t.footer}
        </div>
      </footer>
    </div>
  );
}
