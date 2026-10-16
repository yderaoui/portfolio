import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { Sparkles } from 'lucide-react';
import { Saturn } from './MangaScene';

export function HeaderUniverse({ motion }) {
  const [wish, setWish] = useState(null);
  const timer = useRef(null);
  const sequence = useRef(0);
  useEffect(() => () => clearTimeout(timer.current), []);

  const makeWish = event => {
    const bounds = event.currentTarget.getBoundingClientRect();
    sequence.current += 1;
    setWish({ id: sequence.current, x: bounds.left + bounds.width / 2, y: bounds.top + bounds.height / 2 });
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setWish(null), 2600);
  };

  return <div className="header-universe" data-ambient>
    <div className="header-avatar avatar-hiro" aria-hidden="true"><img src="/franxx/hiro.png" alt="" /><span>016</span></div>
    <svg className="header-flight-path" viewBox="0 0 620 82" preserveAspectRatio="none" aria-hidden="true"><path d="M8 45C87-8 144 95 241 39S411 3 488 41 569 65 612 24" /><path className="header-path-accent" d="M8 45C87-8 144 95 241 39S411 3 488 41 569 65 612 24" /><circle cx="119" cy="39" r="3" /><circle cx="452" cy="27" r="2" /><path className="header-tiny-stars" d="M181 13v10m-5-5h10M516 57v8m-4-4h8M321 63v9m-4-5h8" /></svg>
    <button className={'wish-button' + (wish ? ' wish-sent' : '')} type="button" onClick={makeWish} aria-label="Make a wish — send a shooting star"><Saturn /><span>{wish ? 'WISH SENT' : 'MAKE A WISH'}</span></button>
    <img className="header-mini-franxx" src="/franxx/strelizia.png" width="750" height="850" alt="" aria-hidden="true" />
    <div className="header-avatar avatar-zero" aria-hidden="true"><img src="/franxx/zero-two.png" alt="" /><span>002</span></div>
    <span className="sr-only" role="status">{wish ? motion ? 'A shooting star is crossing your universe.' : 'Wish sent.' : ''}</span>
    {wish && motion && createPortal(<div className="wish-sky" aria-hidden="true" key={wish.id}>
      {Array.from({ length: 7 }, (_, index) => {
        const dx = (index - 3) * innerWidth * .12;
        const dy = innerHeight * (.38 + index % 3 * .16);
        return <span className="wish-comet" key={index} style={{ '--wish-x': wish.x + 'px', '--wish-y': wish.y + 'px', '--wish-dx': dx + 'px', '--wish-dy': dy + 'px', '--wish-angle': Math.atan2(dy, dx) + 'rad', '--wish-delay': index * .055 + 's' }}><Sparkles size={index % 2 === 0 ? 22 : 15} strokeWidth={1.2} /></span>;
      })}
    </div>, document.body)}
  </div>;
}
