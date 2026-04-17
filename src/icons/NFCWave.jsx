export const NFCWave = ({ className = "" }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
    {/* Center point */}
    <circle cx="6" cy="12" r="1" fill="currentColor" />
    {/* Wave arcs */}
    <path d="M10 8a6 6 0 0 1 0 8" />
    <path d="M14 5a10 10 0 0 1 0 14" />
    <path d="M18 2a14 14 0 0 1 0 20" />
  </svg>
);
