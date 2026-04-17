export const DetailPill = ({ text, className = "" }) => (
  <div className={`px-4 py-2 border border-black/5 rounded-full text-[9px] uppercase tracking-[0.25em] font-bold inline-flex items-center gap-2 bg-white/40 backdrop-blur-md ${className}`}>
    <div className="w-1.5 h-1.5 bg-black/20 rounded-full animate-pulse"></div>
    {text}
  </div>
);
