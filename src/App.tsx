import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useInView, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { ArrowDown, ArrowDownRight, ArrowUpRight, ArrowUp, Download, Menu, X } from 'lucide-react';
import { brandEmblem, education, profile, projects, skillGroups } from './content';
import BusinessPulseCaseStudy from './BusinessPulseCaseStudy';
import SalesAnalyticsCaseStudy from './SalesAnalyticsCaseStudy';

const links = [
  ['About', 'about'], ['Skills', 'skills'], ['Work', 'work'], ['Education', 'education'], ['Contact', 'contact'],
] as const;

function useActiveSection() {
  const [active, setActive] = useState('home');
  useEffect(() => {
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) setActive(entry.target.id);
    }), { rootMargin: '-40% 0px -50% 0px' });
    ['home', ...links.map(([, id]) => id)].forEach(id => {
      const el = document.getElementById(id); if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);
  return active;
}

function Navbar() {
  const [open, setOpen] = useState(false);
  const active = useActiveSection();
  const reduced = useReducedMotion();
  return <>
    <a href="#home" className="wordmark" aria-label="Mathew Babu, home"><img src={brandEmblem} alt="" aria-hidden="true"/></a>
    <div className="social-top"><a href={profile.github} target="_blank" rel="noopener noreferrer">GITHUB <ArrowUpRight size={12}/></a><a href={profile.linkedin} target="_blank" rel="noopener noreferrer">LINKEDIN <ArrowUpRight size={12}/></a></div>
    <nav className="side-nav" aria-label="Main navigation">{links.map(([label, id]) => <a key={id} className={active === id ? 'active' : ''} href={`#${id}`}><span>{label}</span><i/></a>)}</nav>
    <button className="menu-toggle" aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open} onClick={() => setOpen(!open)}>{open ? <X/> : <Menu/>}<span>Menu</span></button>
    <AnimatePresence>{open && <motion.nav className="mobile-menu" aria-label="Mobile navigation" initial={reduced ? false : { opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }} exit={reduced ? { opacity: 1, y: 0 } : { opacity: 0, y: -12 }} transition={{ duration: reduced ? 0 : .2 }}>
      {links.map(([label, id], i) => <a key={id} href={`#${id}`} onClick={() => setOpen(false)}><span>0{i + 1}</span>{label}<ArrowUpRight size={17}/></a>)}
      <div className="mobile-social"><a href={profile.github} target="_blank" rel="noopener noreferrer">GitHub ↗</a><a href={profile.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn ↗</a></div>
    </motion.nav>}</AnimatePresence>
  </>;
}

type RevealDirection = 'up' | 'left' | 'right';

function Reveal({ children, className = '', delay = 0, duration = .92, offset = 42, direction = 'up' }: { children: React.ReactNode; className?: string; delay?: number; duration?: number; offset?: number; direction?: RevealDirection }) {
  const reduced = useReducedMotion();
  const mobile = typeof window !== 'undefined' && window.matchMedia('(max-width: 760px)').matches;
  const observerAvailable = typeof window === 'undefined' || 'IntersectionObserver' in window;
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: false, amount: .18, margin: '0px 0px -8% 0px' });
  const visible = reduced || !observerAvailable || inView;
  const resolvedDirection = direction === 'right' && mobile ? 'up' : direction;
  const distance = mobile ? Math.min(offset, 32) : offset;
  const hidden = resolvedDirection === 'left' ? { opacity: .12, x: -distance, y: 0 } : resolvedDirection === 'right' ? { opacity: .12, x: distance, y: 0 } : { opacity: .12, x: 0, y: distance };
  return <motion.div ref={ref} className={className} initial={reduced || !observerAvailable ? false : 'hidden'} animate={visible ? 'visible' : 'hidden'} variants={{ hidden, visible: { opacity: 1, x: 0, y: 0 } }} transition={{ duration: reduced ? 0 : duration, delay: visible && !reduced ? delay : 0, ease: [.16, 1, .3, 1] }}>{children}</motion.div>;
}

function SectionHeading({ index, label, title, direction = 'up' }: { index: string; label: string; title: string; direction?: RevealDirection }) {
  return <Reveal className="section-head" direction={direction}><span className="section-index">{index} <i/></span><div><span className="eyebrow">{label}</span><h2>{title}</h2></div></Reveal>;
}

function AboutVisual() {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const observerAvailable = typeof window === 'undefined' || 'IntersectionObserver' in window;
  const inView = useInView(ref, { once: false, amount: .3, margin: '0px 0px -8% 0px' });
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const emblemY = useTransform(scrollYProgress, [0, 1], [16, -16]);
  const visible = reduced || !observerAvailable || inView;
  return <div className="about-emblem-wrap" ref={ref}><motion.img className="about-emblem" src={brandEmblem} alt="Mathew Babu's metallic MB emblem with cyan highlights" style={{ y: reduced ? 0 : emblemY }} initial={reduced || !observerAvailable ? false : 'hidden'} animate={visible ? 'visible' : 'hidden'} variants={{ hidden: { opacity: .12, scale: .92 }, visible: { opacity: 1, scale: 1 } }} transition={{ duration: reduced ? 0 : 1.15, delay: visible && !reduced ? .12 : 0, ease: [.16, 1, .3, 1] }}/></div>;
}

function Hero() {
  const reduced = useReducedMotion();
  const viewportWidth = typeof window !== 'undefined' ? window.innerWidth : 1440;
  const lineOffset = -viewportWidth;
  const headlineDelay = .45;
  const lineMotion = (delay: number) => ({
    initial: reduced ? false as const : { x: lineOffset },
    animate: { x: 0 },
    transition: { duration: reduced ? 0 : 1.65, delay: reduced ? 0 : headlineDelay + delay, ease: [.16, 1, .3, 1] as const },
  });
  return <section className="hero" id="home">
    <div className="hero-photo">
      <motion.img
        src={profile.heroImage}
        alt="Mathew looking out over a city at sunset beside his laptop"
        initial={reduced ? false : { scale: 1.08, y: 10, opacity: 0 }}
        animate={{ scale: 1.025, y: 0, opacity: 1 }}
        transition={{ duration: reduced ? 0 : 1.9, ease: [.16, 1, .3, 1] }}
      />
    </div>
    <div className="hero-copy">
      <motion.p className="eyebrow hero-eyebrow" initial={reduced ? false : { opacity: 0, y: 7 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: reduced ? 0 : 1.95, duration: reduced ? 0 : .5, ease: [.16, 1, .3, 1] }}>COMPUTER SCIENCE <b>·</b> DATA <b>·</b> DEVELOPMENT</motion.p>
      <h1 className="hero-name"><span className="hero-line-window"><motion.span className="hero-line" {...lineMotion(0)}>MATHEW</motion.span></span><span className="hero-line-window"><motion.span className="hero-line" {...lineMotion(.3)}>BABU<span className="name-period">.</span></motion.span></span></h1>
      <div className="hero-bottom">
        <motion.p initial={reduced ? false : { opacity: 0, y: 9 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: reduced ? 0 : 2.18, duration: reduced ? 0 : .65, ease: [.16, 1, .3, 1] }}>Computer Science graduate drawn to thoughtful software, useful data, and ideas made tangible.</motion.p>
        <div className="hero-actions"><motion.a className="button button-light" href="#work" initial={reduced ? false : { opacity: 0, y: 9 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: reduced ? 0 : 2.47, duration: reduced ? 0 : .55, ease: [.16, 1, .3, 1] }}>Explore my work <ArrowDownRight size={16}/></motion.a><motion.a className="text-link" href="#about" initial={reduced ? false : { opacity: 0, y: 9 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: reduced ? 0 : 2.58, duration: reduced ? 0 : .55, ease: [.16, 1, .3, 1] }}>About me <ArrowDownRight size={15}/></motion.a><motion.a className="text-link cv-link" href="/Mathew-Babu-CV.pdf" download initial={reduced ? false : { opacity: 0, y: 9 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: reduced ? 0 : 2.7, duration: reduced ? 0 : .55, ease: [.16, 1, .3, 1] }}>Download CV <Download size={15}/></motion.a></div>
      </div>
    </div>
    <div className="hero-side-note">INDEPENDENT THINKING<br/>BUILT WITH INTENTION</div>
    <motion.a className="scroll-cue" href="#about" initial={reduced ? false : { opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: reduced ? 0 : 2.72, duration: reduced ? 0 : .32, ease: [.16, 1, .3, 1] }}><span>SCROLL TO DISCOVER</span><motion.i animate={reduced ? {} : { y: [0, 7, 0] }} transition={{ repeat: Infinity, duration: 1.7, ease: 'easeInOut' }}><ArrowDown size={14}/></motion.i></motion.a>
    <span className="hero-count">01 <i/> 05</span>
  </section>;
}

function AboutSection() {
  return <section className="section about-section" id="about"><SectionHeading index="01" label="A LITTLE ABOUT ME" title="Curiosity, made practical." direction="left" />
    <div className="about-grid"><div className="about-emblem-reveal"><AboutVisual/></div><div className="about-copy"><Reveal className="about-copy-item" delay={.12} duration={.9} offset={40} direction="right"><p className="serif-intro">I’m a Computer Science graduate interested in how thoughtful technology can make everyday work clearer and more useful.</p></Reveal><Reveal className="about-copy-item" delay={.25} duration={.88} offset={34} direction="right"><p>My interests span software development, data analytics, and building digital products that turn a good idea into something people can use. I enjoy moving between the details of implementation and the bigger picture of the problem.</p></Reveal><Reveal className="about-copy-item" delay={.38} duration={.82} offset={28} direction="right"><a className="text-link lavender-link" href="#contact">Let’s connect <ArrowDownRight size={15}/></a></Reveal></div></div>
  </section>;
}

function SkillsSection() {
  return <section className="section skills-section" id="skills"><SectionHeading index="02" label="THE TOOLKIT" title="Good tools. Clear thinking." />
    <div className="skills-list">{skillGroups.map((group, i) => <Reveal key={group.name} className="skill-row" delay={i * .14} duration={.82} offset={34}><span className="skill-number">0{i + 1}</span><h3>{group.name}</h3><p>{group.items.map((item, j) => <span key={item}>{item}{j < group.items.length - 1 && <b> / </b>}</span>)}</p><ArrowDownRight className="skill-arrow" size={18}/></Reveal>)}</div>
    <Reveal className="skills-footnote"><span>*</span> A working list, always open to what’s next.</Reveal>
  </section>;
}

function BusinessPulsePreview() {
  return <div className="preview-art pulse dashboard-art">
    <div className="dash-topbar"><strong>bp<span>.</span></strong><span>BusinessPulse / Overview</span><small>VISUAL CONCEPT · NOT LIVE DATA</small></div>
    <div className="dash-body"><aside className="dash-rail"><i/><i/><i/><i/><i/></aside><div className="dash-main">
      <div className="dash-heading"><div><small>BUSINESS OVERVIEW</small><h4>Performance at a glance</h4></div><span className="dash-filter">All activity <b>⌄</b></span></div>
      <div className="dash-kpis">{['Revenue', 'Profit', 'Orders', 'Avg. order'].map(label => <div className="dash-kpi" key={label}><small>{label}</small><strong>—</strong><i/></div>)}</div>
      <div className="pulse-panels"><div className="pulse-chart-panel"><div className="panel-heading"><strong>Revenue &amp; profit</strong><span>Illustrative trend</span></div><svg viewBox="0 0 460 130" preserveAspectRatio="none" aria-hidden="true"><path className="chart-gridline" d="M0 24H460M0 58H460M0 92H460M0 126H460"/><path className="pulse-area" d="M0 99C35 95 40 78 75 82S115 56 150 68 192 84 230 59 280 70 315 43 365 65 400 30 435 42 460 19V130H0Z"/><path className="pulse-line" d="M0 99C35 95 40 78 75 82S115 56 150 68 192 84 230 59 280 70 315 43 365 65 400 30 435 42 460 19"/><path className="profit-line" d="M0 113C35 108 40 99 75 102S115 87 150 94 192 106 230 84 280 96 315 76 365 88 400 67 435 76 460 58"/></svg><div className="chart-legend"><span>Revenue</span><span>Profit</span></div></div><div className="pulse-summary"><small>AT A GLANCE</small><div className="summary-ring"><i/></div><span>Illustrative overview</span><div className="summary-lines"><i/><i/><i/></div></div></div>
    </div></div>
  </div>;
}

function SalesAnalyticsPreview() {
  return <div className="preview-art sales dashboard-art">
    <div className="dash-topbar sales-topbar"><strong>SALES <i>/</i> ANALYTICS</strong><span>Dashboard</span><small>VISUAL CONCEPT · NOT LIVE DATA</small></div>
    <div className="sales-dash-body"><div className="sales-dash-heading"><div><small>SALES WORKSPACE</small><h4>Sales overview</h4></div><span className="dash-filter">Sample view <b>⌄</b></span></div>
      <div className="sales-kpis">{['Net sales', 'Orders', 'Avg. order'].map(label => <div className="sales-kpi" key={label}><small>{label}</small><strong>—</strong><i/></div>)}</div>
      <div className="sales-panels"><div className="sales-bars-panel"><div className="panel-heading"><strong>Sales by region</strong><span>Illustrative categories</span></div><div className="region-bars">{['North', 'South', 'East', 'West'].map((region, i) => <div className="region-row" key={region}><span>{region}</span><i><b style={{ width: `${[72, 55, 83, 64][i]}%` }}/></i></div>)}</div></div><div className="sales-trend-panel"><div className="panel-heading"><strong>Sales trend</strong><span>Visual demo</span></div><svg viewBox="0 0 220 110" preserveAspectRatio="none" aria-hidden="true"><path className="sales-gridline" d="M0 18H220M0 46H220M0 74H220M0 102H220"/><path className="sales-area" d="M0 82C20 75 25 57 47 63S73 79 96 50 123 61 142 38 164 48 181 27 202 33 220 14V110H0Z"/><path className="sales-line" d="M0 82C20 75 25 57 47 63S73 79 96 50 123 61 142 38 164 48 181 27 202 33 220 14"/></svg><div className="sales-axis"><span>START</span><span>END</span></div></div></div>
    </div>
  </div>;
}

function ProjectCard({ project, index }: { project: typeof projects[number]; index: number }) {
  return <div className={`project-card project-${project.tone}`}>
    <Reveal className="project-preview-reveal" delay={index * .12} duration={1.02} offset={48}>
    <a className="project-visual" href={project.demo} target="_blank" rel="noopener noreferrer" aria-label={`Open ${project.title} live demo`}>
      {project.image ? <img src={project.image} alt={`${project.title} project preview`} /> : project.tone === 'pulse' ? <BusinessPulsePreview/> : <SalesAnalyticsPreview/>}
      <span className="visual-cta">LIVE DEMO <ArrowUpRight size={14}/></span>
    </a>
    </Reveal>
    <div className="project-info"><Reveal className="project-title-reveal" delay={index * .1 + .08} duration={.88} offset={34}><div className="project-title-line"><span className="project-no">{project.number}</span><div><span className="eyebrow">{project.category}</span><h3>{project.title}</h3></div><div className="project-actions"><a className="project-link" href={project.demo} target="_blank" rel="noopener noreferrer">Live demo <ArrowUpRight size={16}/></a><a className="project-link project-source-link" href={project.repo} target="_blank" rel="noopener noreferrer">GitHub <ArrowUpRight size={16}/></a>{project.caseStudy && <a className="project-link project-case-link" href={project.caseStudyHref}>View Case Study <ArrowUpRight size={16}/></a>}</div></div></Reveal>
      <Reveal className="project-meta-reveal" delay={index * .1 + .22} duration={.86} offset={28}><div className="project-meta"><p>{project.description}</p><div className="tech-list">{project.technologies.map(tech => <span key={tech}>{tech}</span>)}</div></div></Reveal>
    </div>
  </div>;
}

function ProjectsSection() {
  return <section className="section work-section" id="work"><SectionHeading index="03" label="SELECTED WORK" title="Ideas, in the real world." /><Reveal className="work-intro"><p>A few explorations across data and development. Each one starts with a question worth answering.</p><span>2024 — 2025</span></Reveal><div className="projects-list">{projects.map((project, i) => <ProjectCard key={project.number} project={project} index={i}/>)}</div></section>;
}

function EducationSection() {
  return <section className="section education-section" id="education"><SectionHeading index="04" label="THE FOUNDATION" title="Built on a solid base." /><Reveal className="education-entry" duration={.78} offset={18}><div className="edu-marker"><i/><span>EDUCATION</span></div><div className="edu-content"><span className="eyebrow">{education.dates}</span><h3>{education.degree}</h3><p>{education.institution}</p><small>{education.detail}</small></div><span className="edu-side">01 / 01</span></Reveal><Reveal className="education-caption" delay={.13} duration={.74} offset={16}><span>LEARNED TO ASK BETTER QUESTIONS.</span><span>STILL LEARNING.</span></Reveal></section>;
}

function ContactSection() {
  const reduced = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] });
  const orbitRotation = useTransform(scrollYProgress, [0, 1], [-10, 10]);
  return <section className="contact-section" id="contact" ref={sectionRef}><motion.div className="contact-orbit" aria-hidden="true" style={{ rotate: reduced ? 0 : orbitRotation }} initial={reduced ? false : { opacity: .35, scale: .96 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: false, amount: .1, margin: '0px 0px -8% 0px' }} transition={{ duration: reduced ? 0 : .9, ease: [.16, 1, .3, 1] }}><i/><i/><i/></motion.div><div className="contact-content"><Reveal className="contact-intro-reveal" delay={0} offset={34}><span className="eyebrow">05 — YOUR TURN</span></Reveal><Reveal className="contact-lead-reveal" delay={.1} offset={34}><p className="contact-serif">Have a question,<br/>a project, or just</p></Reveal><Reveal className="contact-title-reveal" delay={.2} offset={46}><h2>GOOD IDEAS?</h2></Reveal><Reveal className="contact-email-reveal" delay={.34} offset={32}><a className="contact-email" href={`mailto:${profile.email}`} aria-label={`Email Mathew at ${profile.email}`}>{profile.email} <ArrowUpRight size={20}/></a></Reveal><Reveal className="contact-links-reveal" delay={.46} offset={28}><div className="contact-links"><a href={profile.github} target="_blank" rel="noopener noreferrer">GITHUB <ArrowUpRight size={13}/></a><a href={profile.linkedin} target="_blank" rel="noopener noreferrer">LINKEDIN <ArrowUpRight size={13}/></a></div></Reveal></div><Footer/></section>;
}

function Footer() {
  return <footer className="footer"><a href="#home" className="back-top">BACK TO TOP <ArrowUp size={13}/></a><span>© {new Date().getFullYear()} MATHEW BABU</span><div className="footer-brand"><img src={brandEmblem} alt="" aria-hidden="true"/><span>DESIGNED WITH INTENTION.</span></div></footer>;
}

export default function App() {
  const routeForHash = (hash: string): 'businesspulse' | 'sales' | null => hash === '#businesspulse-case-study' ? 'businesspulse' : hash === '#sales-analytics-case-study' ? 'sales' : null;
  const [activeCaseStudy, setActiveCaseStudy] = useState(() => routeForHash(window.location.hash));
  useEffect(() => {
    const syncRoute = () => {
      const route = routeForHash(window.location.hash);
      if (!route) window.history.scrollRestoration = 'auto';
      setActiveCaseStudy(route);
    };
    window.addEventListener('hashchange', syncRoute);
    window.addEventListener('popstate', syncRoute);
    return () => {
      window.removeEventListener('hashchange', syncRoute);
      window.removeEventListener('popstate', syncRoute);
    };
  }, []);

  function returnToWork(event: React.MouseEvent<HTMLAnchorElement>) {
    event.preventDefault();
    window.history.scrollRestoration = 'auto';
    window.history.pushState(null, '', '#work');
    setActiveCaseStudy(null);
    window.requestAnimationFrame(() => window.requestAnimationFrame(() => {
      document.getElementById('work')?.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
    }));
  }

  if (activeCaseStudy === 'businesspulse') return <BusinessPulseCaseStudy onBackToWork={returnToWork}/>;
  if (activeCaseStudy === 'sales') return <SalesAnalyticsCaseStudy onBackToWork={returnToWork}/>;
  return <><Navbar/><main><Hero/><AboutSection/><SkillsSection/><ProjectsSection/><EducationSection/><ContactSection/></main></>;
}
