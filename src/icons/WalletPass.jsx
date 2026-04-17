export const WalletPass = ({ className = "" }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
    {/* Phone outline */}
    <rect x="5" y="2" width="14" height="20" rx="3" />
    {/* Card inside phone */}
    <rect x="7" y="7" width="10" height="7" rx="1.5" />
    {/* Card detail lines */}
    <path d="M9 9.5h4" opacity="0.5" />
    <path d="M9 11.5h2" opacity="0.3" />
    {/* Home indicator */}
    <path d="M10 19h4" opacity="0.3" />
  </svg>
);
