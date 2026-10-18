import { useRef, useState } from 'react';
import { ArrowUpRight, Gamepad2, Orbit, Radio, Send, Unplug, UserRound } from 'lucide-react';

export function UniverseMap({ projects }) {
  const [selected, setSelected] = useState(0);
  const tabs = useRef([]);
  const destinations = [
    ...projects.map((project, index) => ({
      id: project.kind, title: project.title, subtitle: project.subtitle,
      description: project.description, image: project.image, alt: project.alt,
      href: project.link, external: true, action: 'View project', icon: [Radio, Orbit, Gamepad2, Unplug][index] || Orbit,
    })),
    { id: 'about', title: 'ABOUT ME', subtitle: 'The person behind the work', description: 'Visual identity, product design and creative development. A little logic, a lot of heart.', image: '/franxx/hiro-zero-two-key-visual.jpg', alt: 'Hiro and Zero Two in the official Darling in the Franxx key visual', href: '#profile', action: 'Read my story', icon: UserRound },
    { id: 'contact', title: 'LET’S TALK', subtitle: 'Your next idea starts here', description: 'Find me on X as @yrhiroo or Telegram as @yrhiro.', image: '/franxx/zero-two-space-v1.png', alt: 'Zero Two reaching out as she floats through space', href: '#contact', action: 'Contact me', icon: Send },
  ];
  const points = destinations.map((_, index) => {
    const angle = -Math.PI * 5 / 6 + index * Math.PI * 2 / destinations.length;
    return { x: 50 + Math.cos(angle) * 36, y: 50 + Math.sin(angle) * 35 };
  });
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
        <svg className="constellation-drawing" viewBox="0 0 640 480" preserveAspectRatio="none" aria-hidden="true">
          <ellipse className="map-orbit map-orbit-one" cx="320" cy="240" rx="245" ry="155" transform="rotate(-15 320 240)" />
          <ellipse className="map-orbit map-orbit-two" cx="320" cy="240" rx="195" ry="193" transform="rotate(24 320 240)" />
          {points.map((point, index) => <path key={destinations[index].id} d={`M${point.x * 6.4} ${point.y * 4.8}Q${point.x * 3.2 + 160} 240 320 240`} className={'map-connection' + (selected === index ? ' is-selected' : '')} />)}
          {Array.from({ length: 24 }, (_, i) => <circle key={i} cx={(i * 97 + 40) % 600 + 20} cy={(i * 59 + 18) % 420 + 30} r={i % 6 === 0 ? 1.6 : .7} fill="currentColor" opacity=".3" />)}
        </svg>
        <div className="constellation-core" aria-hidden="true"><svg viewBox="0 0 100 100"><path d="M0 0h27l23 34L73 0h27L65 50l35 50H73L50 66l-23 34H0l35-50Z" fill="currentColor" /></svg><span>CODE:016</span></div>
        {destinations.map((destination, index) => {
          const Icon = destination.icon;
          return <button key={destination.id} ref={element => { tabs.current[index] = element; }} id={'universe-tab-' + destination.id} className={'constellation-node node-' + index + (selected === index ? ' is-selected' : '')} style={{ '--node-x': points[index].x + '%', '--node-y': points[index].y + '%' }} role="tab" aria-selected={selected === index} aria-controls={'universe-panel-' + destination.id} tabIndex={selected === index ? 0 : -1} onClick={() => setSelected(index)} type="button"><span className="node-planet"><Icon size={24} strokeWidth={1.25} /></span><span className="node-caption"><small>0{index + 1}</small>{destination.title}</span></button>;
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
