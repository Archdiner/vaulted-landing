import { useState, useEffect } from 'react';

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToCTA = () => {
    document.getElementById('cta-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${
      scrolled
        ? 'bg-white/90 backdrop-blur-xl border-b border-black/5 py-4 shadow-sm'
        : 'bg-transparent border-transparent py-7'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-8 flex justify-between items-center">
        <div className="flex items-center">
          <div className="w-10 h-10 rounded-xl overflow-hidden shadow-sm">
            <img src="/icon.jpg" alt="Vaulted" className="w-full h-full object-cover" />
          </div>
        </div>
        <button
          onClick={scrollToCTA}
          className="px-6 py-2.5 rounded-full text-xs font-bold tracking-widest uppercase bg-[#111] text-white hover:bg-[#C08B3A] transition-all duration-300"
        >
          Book Demo
        </button>
      </div>
    </nav>
  );
};
