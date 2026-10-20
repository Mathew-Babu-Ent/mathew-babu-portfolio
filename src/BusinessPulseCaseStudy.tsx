import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import { useLayoutEffect } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { brandEmblem, businessPulseCaseStudy as study } from './content';

type BusinessPulseCaseStudyProps = {
  onBackToWork: (event: React.MouseEvent<HTMLAnchorElement>) => void;
};

export default function BusinessPulseCaseStudy({ onBackToWork }: BusinessPulseCaseStudyProps) {
  const reduced = useReducedMotion();
  useLayoutEffect(() => {
    const root = document.documentElement;
    const previousScrollBehavior = root.style.scrollBehavior;
    root.style.scrollBehavior = 'auto';
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
    root.style.scrollBehavior = previousScrollBehavior;
  }, []);
  const observerAvailable = typeof window === 'undefined' || 'IntersectionObserver' in window;
  const viewportWidth = typeof window !== 'undefined' ? window.innerWidth : 1440;
  const headlineDelay = .45;
  const headlineMotion = (delay: number) => ({
    initial: reduced ? false as const : { x: -viewportWidth },
    animate: { x: 0 },
    transition: { duration: reduced ? 0 : 1.65, delay: reduced ? 0 : headlineDelay + delay, ease: [.16, 1, .3, 1] as const },
  });
  const enter = (y: number, delay: number, duration: number) => ({
    initial: reduced ? false as const : { opacity: 0, y },
    animate: { opacity: 1, y: 0 },
    transition: { duration: reduced ? 0 : duration, delay: reduced ? 0 : delay, ease: [.16, 1, .3, 1] as const },
  });
  const enterTo = { opacity: 1, y: 0 };
  const revealInitial = reduced || !observerAvailable ? false : { opacity: 0, y: 34 };
  const revealTransition = { duration: reduced ? 0 : .72, ease: [.16, 1, .3, 1] as const };
  const revealViewport = { once: true, amount: .08, margin: '0px 0px -5% 0px' } as const;

  return <main
    className="case-study"
    id="businesspulse-case-study"
  >
    <header className="case-topbar">
      <a href="#work" className="case-back" onClick={onBackToWork}><ArrowLeft size={16}/> Back to selected work</a>
      <a href="#work" className="case-brand" onClick={onBackToWork} aria-label="Return to Mathew Babu portfolio">
        <img src={brandEmblem} alt="" aria-hidden="true"/>
      </a>
      <span className="case-top-label">MATHEW BABU <i/> PROJECT 01</span>
    </header>

    <section className="case-hero" aria-labelledby="case-title">
      <motion.p className="eyebrow case-hero-kicker" {...enter(7, 1.95, .5)}>{study.kicker}</motion.p>
      <h1 id="case-title">
        <span className="case-title-line-window"><motion.span className="case-title-line" {...headlineMotion(0)}>BUSINESS</motion.span></span>
        <span className="case-title-line-window case-title-line-second"><motion.span className="case-title-line" {...headlineMotion(.3)}>PULSE<span className="case-period">.</span></motion.span></span>
      </h1>
      <div className="case-hero-bottom">
        <motion.p className="case-intro-entrance" {...enter(9, 2.18, .65)}>{study.overview}</motion.p>
        <motion.div className="case-actions case-actions-entrance" {...enter(9, 2.47, .55)}>
          <a className="button button-light" href={study.demo} target="_blank" rel="noopener noreferrer">Live demo <ArrowUpRight size={16}/></a>
          <a className="case-source-link" href={study.repo} target="_blank" rel="noopener noreferrer">Source code <ArrowUpRight size={15}/></a>
        </motion.div>
      </div>
      <div className="case-hero-foot"><span>REACT · TYPESCRIPT · FASTAPI</span><span>SALES ANALYSIS / DATA WORKFLOW</span></div>
    </section>

    <motion.section className="case-section case-overview" aria-labelledby="case-overview-title" initial={revealInitial} whileInView={enterTo} viewport={revealViewport} transition={revealTransition}>
      <div className="case-section-label"><span>01</span><i/> PROJECT BRIEF</div>
      <div className="case-overview-copy">
        <h2 id="case-overview-title">From sales rows<br/>to a clearer picture.</h2>
        <div>
          <p className="case-lead">{study.objective}</p>
          <p>BusinessPulse pairs an interactive dashboard with a small analysis API. The sample workspace is available without signing in; uploading a dataset and viewing saved history requires the configured account.</p>
        </div>
      </div>
    </motion.section>

    <motion.section className="case-section case-workflow" aria-labelledby="case-workflow-title" initial={revealInitial} whileInView={enterTo} viewport={revealViewport} transition={revealTransition}>
      <div className="case-section-label"><span>02</span><i/> HOW IT WORKS</div>
      <div className="case-section-main">
        <h2 id="case-workflow-title">A considered<br/>data workflow.</h2>
        <ol className="case-workflow-list">
          {study.workflow.map((step) => <li key={step.number}>
            <span className="case-step-no">{step.number}</span>
            <div><h3>{step.title}</h3><p>{step.detail}</p></div>
            <ArrowUpRight size={17} aria-hidden="true"/>
          </li>)}
        </ol>
      </div>
    </motion.section>

    <motion.section className="case-section case-details" aria-labelledby="case-details-title" initial={revealInitial} whileInView={enterTo} viewport={revealViewport} transition={revealTransition}>
      <div className="case-section-label"><span>03</span><i/> IMPLEMENTATION</div>
      <div className="case-section-main">
        <h2 id="case-details-title">The details<br/>behind the view.</h2>
        <div className="case-highlight-grid">
          {study.highlights.map((item, index) => <article className="case-highlight" key={item.title}>
            <span>0{index + 1} / TECHNICAL NOTE</span><h3>{item.title}</h3><p>{item.detail}</p>
          </article>)}
        </div>
        <div className="case-implementation">
          <h3>Implementation notes</h3>
          <ul>{study.implementation.map((item) => <li key={item}>{item}</li>)}</ul>
        </div>
        <div className="case-contribution">
          <div><span>MY DEVELOPMENT FOCUS</span><p>{study.contribution}</p></div>
          <div><span>CHALLENGE &amp; RESPONSE</span><p>{study.challenge}</p></div>
        </div>
        <div className="case-stack">
          <h3>Technology</h3>
          <dl>{study.stack.map((item) => <div key={item.group}><dt>{item.group}</dt><dd>{item.tools}</dd></div>)}</dl>
        </div>
      </div>
    </motion.section>

    <motion.section className="case-section case-reflection" aria-labelledby="case-reflection-title" initial={revealInitial} whileInView={enterTo} viewport={revealViewport} transition={revealTransition}>
      <div className="case-section-label"><span>04</span><i/> REFLECTION</div>
      <div className="case-section-main">
        <h2 id="case-reflection-title">What I<br/>took from it.</h2>
        <div className="case-reflection-copy"><p className="case-lead">{study.learning}</p><p>{study.limitations}</p></div>
      </div>
    </motion.section>

    <motion.footer className="case-footer" initial={revealInitial} whileInView={enterTo} viewport={revealViewport} transition={revealTransition}>
      <a href="#work" className="case-back" onClick={onBackToWork}><ArrowLeft size={16}/> Back to selected work</a>
      <div className="case-actions">
        <a className="case-source-link" href={study.repo} target="_blank" rel="noopener noreferrer">GitHub <ArrowUpRight size={15}/></a>
        <a className="button button-light" href={study.demo} target="_blank" rel="noopener noreferrer">Open live demo <ArrowUpRight size={16}/></a>
      </div>
    </motion.footer>
  </main>;
}
