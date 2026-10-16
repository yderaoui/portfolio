import { useEffect } from 'react';

export function useSiteMotion(root, motion) {
  useEffect(() => {
    const element = root.current;
    const revealObserver = new IntersectionObserver(entries => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        entry.target.classList.add('is-visible');
        revealObserver.unobserve(entry.target);
      }
    }, { threshold: .08 });
    element.querySelectorAll('.reveal').forEach(node => revealObserver.observe(node));

    const ambientObserver = new IntersectionObserver(entries => {
      for (const entry of entries) entry.target.dataset.ambientActive = String(entry.isIntersecting);
    });
    element.querySelectorAll('[data-ambient]').forEach(node => {
      node.dataset.ambientActive = 'false';
      ambientObserver.observe(node);
    });
    const visibility = () => { element.dataset.pageVisible = String(!document.hidden); };
    visibility();
    document.addEventListener('visibilitychange', visibility);

    let frame = 0;
    let latest = null;
    let previous = null;
    const reset = node => {
      if (!node) return;
      node.style.setProperty('--pull-x', '0px');
      node.style.setProperty('--pull-y', '0px');
    };
    const update = () => {
      frame = 0;
      const target = latest?.target instanceof Element ? latest.target.closest('[data-magnetic]') : null;
      if (previous !== target) reset(previous);
      previous = target;
      if (!target) return;
      const bounds = target.getBoundingClientRect();
      const x = Math.max(-4, Math.min(4, (latest.clientX - bounds.left - bounds.width / 2) * .12));
      const y = Math.max(-4, Math.min(4, (latest.clientY - bounds.top - bounds.height / 2) * .12));
      target.style.setProperty('--pull-x', x + 'px');
      target.style.setProperty('--pull-y', y + 'px');
    };
    const point = event => {
      if (event.pointerType === 'touch' || !matchMedia('(hover: hover)').matches) return;
      latest = event;
      if (!frame) frame = requestAnimationFrame(update);
    };
    const leave = () => { cancelAnimationFrame(frame); frame = 0; reset(previous); previous = null; };
    if (motion) {
      element.addEventListener('pointermove', point, { passive: true });
      element.addEventListener('pointerleave', leave);
    }
    return () => {
      revealObserver.disconnect();
      ambientObserver.disconnect();
      document.removeEventListener('visibilitychange', visibility);
      element.removeEventListener('pointermove', point);
      element.removeEventListener('pointerleave', leave);
      leave();
    };
  }, [root, motion]);
}
