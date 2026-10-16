import { useRef, useState } from 'react';
import { ArrowUpRight, Orbit, Radio, Send, UserRound } from 'lucide-react';

export function UniverseMap({ projects }) {
  const [selected, setSelected] = useState(0);
  const tabs = useRef([]);
  const destinations = [
    ...projects.map((project, index) => ({
      id: project.kind, title: project.title, subtitle: project.subtitle,
      description: project.description, image: project.image, alt: project.alt,
      href: project.link, external: true, action: 'View project', icon: index === 0 ? Radio : Orbit,
    })),
    { id: 'about', title: 'ABOUT ME', subtitle: 'The person behind the work', description: 'Visual identity, product design and creative development. A little logic, a lot of heart.', image: '/franxx/hiro-zero-two-key-visual.jpg', alt: 'Hiro and Zero Two in the official Darling in the Franxx key visual', href: '#profile', action: 'Read my story', icon: UserRound },
    { id: 'contact', title: 'LET’S TALK', subtitle: 'Your next idea starts here', description: 'Find me on X as @yrhiroo or Telegram as @yrhiro.', image: '/franxx/zero-two-space-v1.png', alt: 'Zero Two reaching out as she floats through space', href: '#contact', action: 'Contact me', icon: Send },
  ];
  const navigate = event => {
    let next;
    if (event.key === 'ArrowRight' || event.key === 'ArrowDown') next = (selected + 1) % destinations.length;
    else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') next = (selected - 1 + destinations.length) % destinations.length;
    else if (event.key === 'Home') next = 0;
    else if (event.key === 'End') next = destinations.length - 1;
    else return;
    event.preventDefault();
    setSelected(next);
    tabs.current[next].focus();
  };

  return <section className="universe section-shell" id="universe" aria-labelledby="universe-title" data-ambient>
    <div className="universe-heading reveal"><div><p className="section-index">EXPLORE THE PORTFOLIO</p><h2 id="universe-title">Everything<br />is connected<span>.</span></h2></div><p>Choose a destination.<br />Follow your curiosity.</p></div>
    <div className="universe-layout reveal">
      <div className="constellation" role="tablist" aria-label="Portfolio destinations" onKeyDown={navigate}>
        <svg className="constellation-drawing" viewBox="0 0 640 480" aria-hidden="true">
          <ellipse className="map-orbit map-orbit-one" cx="320" cy="240" rx="245" ry="155" transform="rotate(-15 320 240)" />
          <ellipse className="map-orbit map-orbit-two" cx="320" cy="240" rx="195" ry="193" transform="rotate(24 320 240)" />
          {['M115 134Q180 260 320 240', 'M480 96Q468 234 320 240', 'M512 346Q390 320 320 240', 'M128 374Q225 290 320 240'].map((path, index) => <path key={path} d={path} className={'map-connection' + (selected === index ? ' is-selected' : '')} />)}
          {Array.from({ length: 24 }, (_, i) => <circle key={i} cx={(i * 97 + 40) % 600 + 20} cy={(i * 59 + 18) % 420 + 30} r={i % 6 === 0 ? 1.6 : .7} fill="currentColor" opacity=".3" />)}
        </svg>
        <div className="constellation-core" aria-hidden="true"><svg viewBox="0 0 100 100"><path d="M0 0h27l23 34L73 0h27L65 50l35 50H73L50 66l-23 34H0l35-50Z" fill="currentColor" /></svg><span>CODE:016</span></div>
        {destinations.map((destination, index) => {
          const Icon = destination.icon;
          return <button key={destination.id} ref={element => { tabs.current[index] = element; }} id={'universe-tab-' + destination.id} className={'constellation-node node-' + index + (selected === index ? ' is-selected' : '')} role="tab" aria-selected={selected === index} aria-controls={'universe-panel-' + destination.id} tabIndex={selected === index ? 0 : -1} onClick={() => setSelected(index)} type="button"><span className="node-planet"><Icon size={24} strokeWidth={1.25} /></span><span className="node-caption"><small>0{index + 1}</small>{destination.title}</span></button>;
        })}
      </div>
      <div className="universe-panels">{destinations.map((destination, index) => <div key={destination.id} className={'universe-panel destination-' + destination.id} id={'universe-panel-' + destination.id} role="tabpanel" aria-labelledby={'universe-tab-' + destination.id} tabIndex={0} hidden={selected !== index}>
        <div className="destination-image"><img src={destination.image} alt={destination.alt} loading="lazy" /><span aria-hidden="true">0{index + 1}</span></div>
        <p className="destination-category">{destination.subtitle}</p><h3>{destination.title}</h3><p className="destination-description">{destination.description}</p>
        <a className="destination-link" href={destination.href} target={destination.external ? '_blank' : undefined} rel={destination.external ? 'noopener noreferrer' : undefined} data-magnetic>{destination.action}<ArrowUpRight size={18} /></a>
      </div>)}</div>
    </div>
  </section>;
}
