export const Footer = () => (
  <footer style={{ backgroundColor: '#111111', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-12 sm:py-16">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-10">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl overflow-hidden shadow-sm">
            <img src="/icon.jpg" alt="Vaulted" className="w-full h-full object-cover" />
          </div>
          <div>
            <span className="text-white font-semibold tracking-tight">Vaulted</span>
            <p className="text-xs mt-0.5" style={{ color: 'rgba(255,255,255,0.2)' }}>High-fidelity access for high-caliber properties</p>
          </div>
        </div>
        <div className="flex items-center gap-10 text-xs uppercase tracking-[0.15em] font-semibold" style={{ color: 'rgba(255,255,255,0.2)' }}>
          <a href="mailto:hello@vaulted.so" className="hover:text-white transition-colors">Contact</a>
          <a href="#" className="hover:text-white transition-colors">LinkedIn</a>
        </div>
      </div>
      <div className="mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4" style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}>
        <span className="text-xs uppercase tracking-widest" style={{ color: 'rgba(255,255,255,0.15)' }}>© 2026 Vaulted Technologies Inc.</span>
        <span className="text-xs uppercase tracking-widest" style={{ color: 'rgba(255,255,255,0.15)' }}>Ithaca · New York City</span>
      </div>
    </div>
  </footer>
);
