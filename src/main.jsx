import React, { useEffect, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { ArrowDownRight, ArrowUpRight, ArrowUp, Menu, X, Orbit } from 'lucide-react';
import { SpaceScene } from './SpaceScene';
import { MangaScene } from './MangaScene';
import { AboutSection } from './AboutSection';
import { UniverseMap } from './UniverseMap';
import { HeaderUniverse } from './HeaderUniverse';
import { useSiteMotion } from './useSiteMotion';
import './style.css';
import './manga.css';
import './refinements.css';

const projects = [
  {
    no: '01', title: 'SABR', subtitle: 'Automated trading terminal', kind: 'sabr',
    image: '/sabr-preview.png', alt: 'SABR website with trading charts and automated strategy tools',
    domain: 'SABR-NU.VERCEL.APP', poster: 'SABR', category: 'TRADING TERMINAL',
    link: 'https://sabr-nu.vercel.app/welcome',
    description: 'Build, backtest and run automated strategies across crypto, forex, commodities, indices and stocks — with evidence-based AI that runs real backtests instead of guessing.',
    tags: ['FASTAPI', 'REACT + TS', 'BINANCE / MT5', 'CLAUDE API', 'WEBSOCKETS'],
  },
  {
    no: '02', title: 'PUMPKART RACING', subtitle: 'Browser racing experience', kind: 'pumpkart',
    image: '/pumpkart-racing.png', alt: 'PumpKart Racing website with its custom racing karts and race controls',
    domain: 'PUMPKART.RACING', poster: 'PUMPKART', category: 'RACING',
    link: 'https://www.pumpkart.racing/#/race',
    description: 'Custom karts, practice laps and races against real players. A racing experience built for the browser.',
    tags: ['RACING', 'MULTIPLAYER', 'WEB GAME'],
  },
  {
    no: '03', title: 'SOAP UNIVERSE', subtitle: 'Interactive world and arcade', kind: 'soap',
    image: '/soap-preview.png', alt: 'SOAP Universe website with a blue-clad ape, neon arcade visuals and Escape the Timeline game',
    domain: 'SOAP-ESCAPE-THE-TIMELINE.VERCEL.APP', poster: 'SOAP', category: 'ARCADE / INTERACTIVE WORLD',
    link: 'https://soap-escape-the-timeline.vercel.app/',
    description: 'A playful universe built around a happy ape and a chaotic timeline. Explore the character, discover the story and play Escape the Timeline in the browser.',
    tags: ['ARCADE', 'WEB GAME', 'WORLD-BUILDING'],
  },
  {
    no: '04', title: '$OFFLINE', subtitle: 'An experiment in disconnection', kind: 'offline',
    image: '/offline-preview.png', alt: '$OFFLINE website with lime-green typography and NULL, a mysterious pixel creature',
    domain: 'TINYBLOOM33.CHATGPT.SITE', poster: '$OFFLINE', category: 'INTERACTIVE EXPERIMENT',
    link: 'https://offline-null-experiment.tinybloom33.chatgpt.site/',
    description: 'Prepare the experience, disconnect and meet NULL. A strange little world of hidden places, puzzles and conversation that stays with you offline.',
    tags: ['OFFLINE EXPERIENCE', 'INTERACTIVE STORY', 'PUZZLES'],
  },
];

function FranxxMark({ className = '' }) {
  return <svg className={className} viewBox="0 0 100 100" fill="currentColor" aria-hidden="true"><path d="M0 0h27l23 34L73 0h27L65 50l35 50H73L50 66l-23 34H0l35-50Z" /></svg>;
}

function ProjectCard({ project, motion }) {
  const tilt = event => {
    if (!motion || event.pointerType === 'touch') return;
    const rect = event.currentTarget.getBoundingClientRect();
    event.currentTarget.style.setProperty('--tilt-x', ((event.clientY - rect.top) / rect.height - .5) * -7 + 'deg');
    event.currentTarget.style.setProperty('--tilt-y', ((event.clientX - rect.left) / rect.width - .5) * 7 + 'deg');
  };
  const reset = event => {
    event.currentTarget.style.setProperty('--tilt-x', '0deg');
    event.currentTarget.style.setProperty('--tilt-y', '0deg');
  };
  return (
    <article className={'file has-preview reveal ' + project.kind} onPointerMove={tilt} onPointerLeave={reset} data-ambient>
      <div className="filetop"><span><b>{project.no}</b> / SELECTED WORK</span><span className="project-status">LIVE PROJECT</span></div>
      <div className="fileart">
        <span className="preview-domain">{project.domain}</span>
        <span className="preview-index" aria-hidden="true">{project.no}</span>
        <div className="project-preview">
          <div className="preview-bar" aria-hidden="true"><i /><i /><i /></div>
          <img src={project.image} alt={project.alt} loading="lazy" width="1440" height="1000" />
        </div>
        <div className="project-poster-title" aria-hidden="true">{project.poster}<span>{project.category}</span></div>
        <a className="project-arrow" href={project.link} target="_blank" rel="noopener noreferrer" aria-label={'Open ' + project.title + ' in a new tab'} data-magnetic><ArrowUpRight /></a>
      </div>
      <div className="filecopy">
        <div className="project-heading"><h3><a href={project.link} target="_blank" rel="noopener noreferrer">{project.title}</a></h3><ArrowUpRight aria-hidden="true" /></div>
        <p className="project-subtitle">{project.subtitle}</p>
        <p className="description">{project.description}</p>
        <div className="skills">{project.tags.map(tag => <span key={tag}>{tag}</span>)}</div>
      </div>
    </article>
  );
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(() => matchMedia('(prefers-reduced-motion: reduce)').matches);
  const [warp, setWarp] = useState(false);
  const [progress, setProgress] = useState(0);
  const [activeSection, setActiveSection] = useState('top');
  const motion = !reducedMotion;
  const hero = useRef(null);
  const experience = useRef(null);
  const warpTimers = useRef([]);
  useSiteMotion(experience, motion);

  useEffect(() => {
    const preference = matchMedia('(prefers-reduced-motion: reduce)');
    const change = () => setReducedMotion(preference.matches);
    preference.addEventListener('change', change);
    return () => preference.removeEventListener('change', change);
  }, []);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const distance = document.documentElement.scrollHeight - innerHeight;
      const value = distance > 0 ? Math.min(100, Math.max(0, scrollY / distance * 100)) : 0;
      setProgress(Math.round(value));
      experience.current.style.setProperty('--journey', value / 100);
      experience.current.style.setProperty('--scroll-shift', Math.min(scrollY * .16, 150) + 'px');
      experience.current.style.setProperty('--hero-progress', Math.min(1, scrollY / hero.current.offsetHeight));
      let current = 'top';
      for (const id of ['archive', 'profile', 'contact']) {
        if (document.getElementById(id).getBoundingClientRect().top < innerHeight * .45) current = id;
      }
      setActiveSection(current);
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(update); };
    update();
    addEventListener('scroll', schedule, { passive: true });
    addEventListener('resize', schedule);
    return () => { cancelAnimationFrame(frame); removeEventListener('scroll', schedule); removeEventListener('resize', schedule); };
  }, []);

  useEffect(() => () => warpTimers.current.forEach(clearTimeout), []);

  useEffect(() => {
    if (!motion) {
      setWarp(false);
      warpTimers.current.forEach(clearTimeout);
    }
  }, [motion]);

  const enterWork = () => {
    if (warp) return;
    const scroll = () => document.getElementById('archive').scrollIntoView({ behavior: motion ? 'smooth' : 'instant' });
    if (!motion) { scroll(); return; }
    setWarp(true);
    warpTimers.current.forEach(clearTimeout);
    warpTimers.current = [setTimeout(scroll, 650), setTimeout(() => setWarp(false), 1900)];
  };

  useEffect(() => {
    if (!motion || !matchMedia('(pointer: fine)').matches) return;
    const element = hero.current;
    const move = event => {
      const rect = element.getBoundingClientRect();
      element.style.setProperty('--mx', ((event.clientX - rect.left) / rect.width - .5) * 12 + 'px');
      element.style.setProperty('--my', ((event.clientY - rect.top) / rect.height - .5) * 8 + 'px');
    };
    const reset = () => { element.style.setProperty('--mx', '0px'); element.style.setProperty('--my', '0px'); };
    element.addEventListener('pointermove', move);
    element.addEventListener('pointerleave', reset);
    return () => { element.removeEventListener('pointermove', move); element.removeEventListener('pointerleave', reset); };
  }, [motion]);

  useEffect(() => {
    if (!menuOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const close = event => { if (event.key === 'Escape') setMenuOpen(false); };
    addEventListener('keydown', close);
    return () => { document.body.style.overflow = previous; removeEventListener('keydown', close); };
  }, [menuOpen]);

  const links = <><a href="#archive" onClick={() => setMenuOpen(false)} aria-current={activeSection === 'archive' ? 'location' : undefined} data-magnetic>MY WORK</a><a href="#profile" onClick={() => setMenuOpen(false)} aria-current={activeSection === 'profile' ? 'location' : undefined} data-magnetic>ABOUT ME</a><a href="#contact" onClick={() => setMenuOpen(false)} aria-current={activeSection === 'contact' ? 'location' : undefined} data-magnetic>CONTACT <ArrowUpRight size={14} /></a></>;

  return (
    <div className={'experience ' + (motion ? 'motion-enabled' : 'motion-paused') + (warp ? ' is-warping' : '') + (menuOpen ? ' menu-is-open' : '')} ref={experience}>
      <div className="paper-texture" aria-hidden="true" />
      <SpaceScene motion={motion} warp={warp && motion} />
      <span className="sr-only" role="status">{warp ? 'Entering My Work' : ''}</span>
      <a className="skip-link" href="#archive">Skip to my work</a>
      <header className="site-header">
        <a className="brand" href="#top" aria-label="Hiro, Code 016 — home"><FranxxMark /><span>HIRO<small>CODE:016</small></span></a>
        <HeaderUniverse motion={motion} />
        <nav className="desktop-navigation" aria-label="Main navigation">{links}</nav>
        <button className="menu-button" onClick={() => setMenuOpen(!menuOpen)} aria-label={menuOpen ? 'Close menu' : 'Open menu'} aria-expanded={menuOpen} aria-controls="mobile-navigation">{menuOpen ? <X /> : <Menu />}</button>
      </header>
      <nav id="mobile-navigation" className="mobile-navigation" aria-label="Mobile navigation" hidden={!menuOpen}>{links}<span>HIRO / CODE:016</span></nav>

      <main id="top">
        <section className="hero" ref={hero} aria-labelledby="hero-title" data-ambient>
          <div className="hero-copy">
            <p className="eyebrow"><span /> THE UNIVERSE OF HIRO / CODE:016</p>
            <h1 id="hero-title">EXPLORE<span>MY UNIVERSE.</span></h1>
            <p className="hero-description">Creative developer. Anime soul.</p>
            <p className="hero-detail">I build digital experiences where logic meets emotion. Interfaces, identities, and ideas made real.</p>
            <button className="primary-link" onClick={enterWork} disabled={warp} data-magnetic>EXPLORE MY WORK <ArrowDownRight size={20} /></button>
            <a className="hero-scenic-link" href="#universe"><Orbit size={15} strokeWidth={1.3} /> EXPLORE THE CONSTELLATION <ArrowUpRight size={13} /></a>
          </div>
          <MangaScene />
          <div className="hero-bottom"><span>CODE:016 / PERSONAL PORTFOLIO</span><span>DESIGN WITH FEELING. BUILD WITH PURPOSE.</span><a href="#archive">SCROLL TO EXPLORE <ArrowDownRight size={16} /></a></div>
        </section>

        <div className="series-band" aria-label="Theme: Darling in the Franxx" data-ambient><div className="series-track">{[0, 1].map(copy => <div className="series-copy" key={copy} aria-hidden={copy === 1 ? true : undefined}><span>DARLING <small>in the</small> FRANXX</span><FranxxMark /><span lang="ja">ダーリン・イン・ザ・フランキス</span><FranxxMark /><span>016 + 002</span><FranxxMark /></div>)}</div></div>

        <section className="archive section-shell" id="archive" aria-labelledby="work-title">
          <div className="section-heading reveal"><p className="section-index">01 / SELECTED PROJECTS</p><h2 id="work-title">My work<span>.</span></h2><p>Different worlds.<br />The same attention to every detail.</p></div>
          <div className="project-grid">{projects.map(project => <ProjectCard project={project} motion={motion} key={project.no} />)}</div>
        </section>

        <UniverseMap projects={projects} />

        <section className="inspiration section-shell" aria-labelledby="inspiration-title">
          <div className="inspiration-heading reveal"><p className="section-index">THE VISUAL INSPIRATION</p><h2 id="inspiration-title">Two pilots. One connection.</h2><a href="https://darli-fra.jp/character/" target="_blank" rel="noopener noreferrer">MEET THE CHARACTERS <ArrowUpRight size={16} /></a></div>
          <div className="character-grid">
            <figure className="character-panel hiro-panel reveal" data-ambient><span className="character-panel-code" aria-hidden="true">016</span><img src="/franxx/hiro.png" alt="Official Hiro character illustration" loading="lazy" width="290" height="660" /><figcaption><b>HIRO</b><span>CODE:016 / STAMEN</span></figcaption></figure>
            <figure className="character-panel strelizia-panel reveal" data-ambient><FranxxMark className="mecha-cross" /><img src="/franxx/strelizia.png" alt="Strelizia, the Franxx piloted by Hiro and Zero Two" loading="lazy" width="750" height="850" /><figcaption><b>STRELIZIA</b><span>HIRO + ZERO TWO</span></figcaption></figure>
            <figure className="character-panel zero-panel reveal" data-ambient><span className="character-panel-code" aria-hidden="true">002</span><img src="/franxx/zero-two.png" alt="Official Zero Two character illustration" loading="lazy" width="290" height="660" /><figcaption><b>ZERO TWO</b><span>CODE:002 / PISTIL</span></figcaption></figure>
          </div>
        </section>

        <AboutSection motion={motion} />

        <section className="contact section-shell" id="contact" aria-labelledby="contact-title" data-ambient>
          <div className="contact-orbit" aria-hidden="true" />
          <div className="contact-top reveal"><p className="section-index">03 / LET’S WORK TOGETHER</p><FranxxMark /></div>
          <h2 className="reveal" id="contact-title">LET’S<br />SYNCHRONIZE<span>.</span></h2>
          <a className="contact-link reveal" href="https://x.com/yrhiroo" target="_blank" rel="noopener noreferrer" aria-label="Contact @yrhiroo on X" data-magnetic><span className="contact-identity"><span className="contact-platform">X</span><span className="contact-handle">@yrhiroo</span></span><ArrowUpRight aria-hidden="true" /></a>
          <a className="contact-link reveal" href="https://t.me/yrhiro" target="_blank" rel="noopener noreferrer" aria-label="Contact @yrhiro on Telegram" data-magnetic><span className="contact-identity"><span className="contact-platform">TELEGRAM</span><span className="contact-handle">@yrhiro</span></span><ArrowUpRight aria-hidden="true" /></a>
          <div className="contact-bottom"><span>CREATIVE DEVELOPMENT & DESIGN</span><span>AVAILABLE WORLDWIDE</span><span>016 + YOUR NEXT IDEA</span></div>
        </section>
      </main>
      <footer data-ambient><div><span>© 2026 CODE:016 — PERSONAL FAN-INSPIRED PORTFOLIO</span><a href="https://darli-fra.jp/" target="_blank" rel="noopener noreferrer">CHARACTER ART © DARLING IN THE FRANXX COMMITTEE <ArrowUpRight size={12} /></a></div><a className="back-top" href="#top" data-magnetic>BACK TO TOP <ArrowUp size={16} /></a></footer>
      <div className="flight-dock"><a className="dock-home" href="#top" aria-label="Back to top" data-magnetic><FranxxMark /></a><nav aria-label="Section navigation"><a href="#archive" aria-current={activeSection === 'archive' ? 'location' : undefined}>01 <span>WORK</span></a><a href="#profile" aria-current={activeSection === 'profile' ? 'location' : undefined}>02 <span>ABOUT</span></a><a href="#contact" aria-current={activeSection === 'contact' ? 'location' : undefined}>03 <span>CONTACT</span></a></nav><div className="journey-progress" role="progressbar" aria-label="Page scroll progress" aria-valuemin={0} aria-valuemax={100} aria-valuenow={progress}><span>{String(progress).padStart(2, '0')}%</span><i /></div></div>
    </div>
  );
}

createRoot(document.getElementById('root')).render(<App />);
