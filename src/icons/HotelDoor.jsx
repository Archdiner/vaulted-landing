export const HotelDoor = ({ className = "" }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
    {/* Door frame */}
    <path d="M4 22V4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v18" />
    {/* Door panel (slightly ajar) */}
    <path d="M8 22V5h8v17" />
    {/* Door handle */}
    <circle cx="14.5" cy="13" r="0.75" fill="currentColor" />
    {/* Floor line */}
    <path d="M2 22h20" />
  </svg>
);
