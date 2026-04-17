export const TapGesture = ({ className = "" }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
    {/* Hand with pointing finger */}
    <path d="M12 2v6" />
    <path d="M12 8a2 2 0 0 1 2 2v6a4 4 0 0 1-4 4h-1a4 4 0 0 1-4-4v-3a2 2 0 0 1 4 0" />
    <path d="M14 10a2 2 0 0 1 4 0v2" />
    <path d="M18 12a2 2 0 0 1 2 2v0" />
    {/* NFC waves from fingertip */}
    <path d="M12 2c-1.5 0-2.5-1-2.5-1" opacity="0.4" />
    <path d="M12 2c1.5 0 2.5-1 2.5-1" opacity="0.4" />
  </svg>
);
