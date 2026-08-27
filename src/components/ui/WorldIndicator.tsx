import React from 'react';
import { useLocation } from 'react-router-dom';

const routeWorld = (pathname: string) => {
  if (pathname === '/') return { index: '00', name: 'ORION', meta: 'ENTRY SPACE', accent: '#7dd3fc' };
  if (pathname.includes('chainsaw') || pathname.includes('makima') || pathname.includes('denji') || pathname.includes('power') || pathname.includes('aki')) return { index: '01', name: 'CHAINSAW', meta: 'MANGA / RED', accent: '#b91c1c' };
  if (pathname.includes('dc') || pathname.includes('batman') || pathname.includes('joker') || pathname.includes('superman') || pathname.includes('flash') || pathname.includes('green-lantern') || pathname.includes('krypto')) return { index: '02', name: 'DC', meta: 'GRAPHITE / LIGHT', accent: '#64748b' };
  if (pathname.includes('death-note') || pathname.includes('light-yagami') || pathname.includes('ryuk') || pathname.includes('el') || pathname.includes('misa')) return { index: '03', name: 'DEATH NOTE', meta: 'FEATHER / PAPER', accent: '#991b1b' };
  if (pathname.includes('one-piece') || pathname.includes('zoro') || pathname.includes('luffy') || pathname.includes('sanji')) return { index: '04', name: 'ONE PIECE', meta: 'AMBER / STEEL', accent: '#16a34a' };
  if (pathname.includes('wizarding') || pathname.includes('harry-potter') || pathname.includes('voldemort') || pathname.includes('dumbledore') || pathname.includes('hermione') || pathname.includes('ron') || pathname.includes('hagrid')) return { index: '05', name: 'WIZARDING', meta: 'SMOKE / STONE', accent: '#22c55e' };
  if (pathname.includes('marvel') || pathname.includes('deadpool')) return { index: '06', name: 'MARVEL', meta: 'RED / IMPACT', accent: '#ef4444' };
  if (pathname.includes('studio')) return { index: '10', name: 'STUDIO', meta: 'PRINT / FINISH', accent: '#7dd3fc' };
  if (pathname.includes('custom')) return { index: '11', name: 'CREATE', meta: 'YOUR FIGURE', accent: '#f0abfc' };
  return { index: '12', name: 'ORION', meta: 'EXHIBITION', accent: '#7dd3fc' };
};

export const WorldIndicator: React.FC = () => {
  const location = useLocation();
  const world = routeWorld(location.pathname);

  return (
    <aside className="world-indicator" style={{ '--world-accent': world.accent } as React.CSSProperties} aria-label={`Current world ${world.name}`}>
      <span>{world.index}</span>
      <strong>{world.name}</strong>
      <em>{world.meta}</em>
    </aside>
  );
};
