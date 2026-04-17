export const LockMechanism = ({ className = "" }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
    {/* Lock body */}
    <rect x="3" y="11" width="18" height="11" rx="3" />
    {/* Shackle */}
    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    {/* Keyhole - circle + slot */}
    <circle cx="12" cy="16" r="1.5" />
    <path d="M12 17.5v2" />
  </svg>
);
