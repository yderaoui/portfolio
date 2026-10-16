import { useEffect, useRef } from 'react';
import { Sparkles } from 'lucide-react';

const skills = ['INTERFACE', 'REACT', 'MOTION', 'IDENTITY', 'WEBGL', 'STORY'];

export function AboutSection({ motion }) {
  const section = useRef(null);

  useEffect(() => {
    const element = section.current;
    let visible = false;
    let frame = 0;
    const update = () => {
      frame = 0;
      if (!visible || !motion || document.hidden) return;
      const bounds = element.getBoundingClientRect();
      const offset = Math.max(-14, Math.min(14, (innerHeight / 2 - bounds.top - bounds.height / 2) * .035));
      element.style.setProperty('--profile-scroll', offset + 'px');
    };
    const scroll = () => { if (visible && motion && !frame) frame = requestAnimationFrame(update); };
    const visibility = () => { element.dataset.inView = String(visible && !document.hidden); scroll(); };
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      visibility();
    }, { threshold: .05 });
    observer.observe(element);
    if (motion) addEventListener('scroll', scroll, { passive: true });
    document.addEventListener('visibilitychange', visibility);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
      removeEventListener('scroll', scroll);
      document.removeEventListener('visibilitychange', visibility);
    };
  }, [motion]);

  const tilt = event => {
    if (!motion || event.pointerType === 'touch') return;
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width - .5;
    const y = (event.clientY - bounds.top) / bounds.height - .5;
    event.currentTarget.style.setProperty('--portrait-rotate-x', -y * 6 + 'deg');
    event.currentTarget.style.setProperty('--portrait-rotate-y', x * 6 + 'deg');
    event.currentTarget.style.setProperty('--portrait-pan-x', -x * 7 + 'px');
    event.currentTarget.style.setProperty('--portrait-pan-y', -y * 7 + 'px');
  };
  const reset = event => {
    ['--portrait-rotate-x', '--portrait-rotate-y'].forEach(name => event.currentTarget.style.setProperty(name, '0deg'));
    ['--portrait-pan-x', '--portrait-pan-y'].forEach(name => event.currentTarget.style.setProperty(name, '0px'));
  };

  return <section className="profile section-shell" id="profile" aria-labelledby="profile-title" ref={section} data-ambient>
    <p className="section-index">02 / ABOUT ME</p>
    <div className="profile-grid reveal">
      <div className="profile-visual" onPointerMove={tilt} onPointerLeave={reset}>
        <div className="profile-orbit" aria-hidden="true"><i /></div>
        <div className="profile-petals" aria-hidden="true">{[0, 1, 2, 3].map(index => <svg key={index} viewBox="0 0 20 32" style={{ '--petal-index': index }}><path d="M10 0C29 15 15 27 3 32 7 19-7 13 10 0Z" fill="currentColor" /></svg>)}<Sparkles className="profile-sparkle" /></div>
        <div className="profile-portrait"><img src="/franxx/hiro-zero-two-key-visual.jpg" alt="Official Darling in the Franxx key visual of Hiro and Zero Two" loading="lazy" /><div><span>HIRO + ZERO TWO</span><span>016 + 002</span></div></div>
      </div>
      <div className="profile-copy reveal">
        <h2 id="profile-title" aria-label="More than a number."><span className="profile-title-line" aria-hidden="true"><span>More than</span></span><span className="profile-title-line" aria-hidden="true"><span>a number<span className="profile-period">.</span></span></span></h2>
        <p className="profile-lead"><span>A little logic.</span><span>A lot of <span className="profile-heart">heart.</span></span></p>
        <p className="profile-description">I work across visual identity, product design and creative development. Keeping every layer connected means nothing gets lost between the idea and the final experience.</p>
        <div className="skills">{skills.map((skill, index) => <span key={skill} style={{ '--skill-index': index }}>{skill}</span>)}</div>
        <div className="definition"><span>APOKATASTASIS <small>/ NOUN, GREEK</small></span><p>Restoration — the process of rebuilding yourself and returning stronger after everything has fallen apart.</p></div>
      </div>
    </div>
  </section>;
}
