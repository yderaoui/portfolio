import { useId } from 'react';
import { Sparkles } from 'lucide-react';

function InkPortal({ className }) {
  return <div className={'ink-portal ' + className} aria-hidden="true"><svg className="portal-stars" viewBox="0 0 300 300">{Array.from({ length: 42 }, (_, i) => <circle key={i} cx={(i * 71 + 17) % 300} cy={(i * 113 + 31) % 300} r={i % 7 === 0 ? 1.4 : .65} fill="currentColor" />)}<path d="M212 53v16m-8-8h16M64 213v10m-5-5h10" stroke="currentColor" strokeWidth="1" /></svg></div>;
}

export function Saturn() {
  const id = useId().replace(/:/g, '');
  return <svg viewBox="0 0 320 220" className="manga-saturn" aria-hidden="true">
    <defs><pattern id={id + '-saturn-hatching'} width="5" height="5" patternUnits="userSpaceOnUse" patternTransform="rotate(-20)"><path d="M0 0v5" stroke="#161616" strokeWidth=".65" /></pattern><clipPath id={id + '-saturn-clip'}><circle cx="160" cy="106" r="63" /></clipPath></defs>
    <g transform="rotate(-23 160 106)" stroke="#171717" strokeWidth="2.1" fill="var(--page)">
      <ellipse cx="160" cy="106" rx="145" ry="38" /><ellipse cx="160" cy="106" rx="134" ry="30" fill="none" /><ellipse cx="160" cy="106" rx="120" ry="22" fill="none" />
      <circle cx="160" cy="106" r="63" /><circle cx="160" cy="106" r="63" fill={'url(#' + id + '-saturn-hatching)'} stroke="none" />
      <g clipPath={'url(#' + id + '-saturn-clip)'} fill="none" strokeWidth="2.5">{Array.from({ length: 12 }, (_, i) => <path key={i} d={'M87 ' + (52 + i * 10) + ' Q145 ' + (26 + i * 10) + ' 234 ' + (65 + i * 10)} />)}</g>
      <path d="M15 106a145 38 0 0 0 290 0l-12 0a133 30 0 0 1-266 0Z" />
      <path d="M35 112a125 24 0 0 0 250 0M46 122q111 39 228-1" fill="none" strokeWidth="1.1" />
    </g>
  </svg>;
}

function Moon() {
  return <svg viewBox="0 0 200 200" className="manga-moon" aria-hidden="true"><defs><clipPath id="moon-clip"><circle cx="100" cy="100" r="85" /></clipPath><pattern id="moon-hatching" width="4" height="4" patternUnits="userSpaceOnUse" patternTransform="rotate(35)"><path d="M0 0v4" stroke="#171717" strokeWidth=".5" /></pattern></defs><circle cx="100" cy="100" r="85" fill="var(--page)" stroke="#171717" strokeWidth="2.4" /><g clipPath="url(#moon-clip)"><path d="M110 8q115 75-3 190h100V0Z" fill="url(#moon-hatching)" />{Array.from({ length: 33 }, (_, i) => <g key={i} transform={'translate(' + ((i * 47 + 34) % 174 + 13) + ' ' + ((i * 67 + 12) % 174 + 13) + ')'}><ellipse rx={3 + i % 8} ry={2 + i % 6} fill={i % 4 === 0 ? '#171717' : 'none'} stroke="#171717" strokeWidth="1" /><path d={'M-' + (4 + i % 8) + ' 1q4 9 ' + (9 + i % 8) + ' 1'} fill="none" stroke="#171717" strokeWidth=".65" /></g>)}</g></svg>;
}

export function MangaScene() {
  return <div className="hero-collage"><div className="scene-parallax">
    <InkPortal className="portal-left" /><InkPortal className="portal-saturn" /><InkPortal className="portal-moon" /><InkPortal className="portal-pilot" /><InkPortal className="portal-transition" />
    <div className="saturn-sticker"><Saturn /><span>somewhere beyond ordinary.</span></div>
    <div className="moon-sticker"><Moon /></div>
    <figure className="hiro-sticker"><img src="/franxx/hiro.png" alt="Hiro drifting beside a star-filled portal" width="290" height="660" /><figcaption>HIRO / 016</figcaption></figure>
    <figure className="zero-two-sticker"><img src="/franxx/zero-two-space-v1.png" alt="Manga illustration of Zero Two floating in space, with flowing pink hair and a white and red pilot suit" width="1024" height="1536" fetchPriority="high" /><figcaption>ZERO TWO / 002</figcaption></figure>
    <div className="mecha-sticker"><img src="/franxx/strelizia.png" alt="Strelizia floating through the illustrated universe" width="750" height="850" /></div>
    <Sparkles className="collage-sparkle sparkle-one" aria-hidden="true" /><Sparkles className="collage-sparkle sparkle-two" aria-hidden="true" />
    <span className="collage-japanese" lang="ja">ダーリン・イン・ザ・フランキス</span><div className="orbit-doodle" aria-hidden="true"><i /></div>
  </div></div>;
}
