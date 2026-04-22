import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Nfc, ArrowRight } from 'lucide-react';

const AMBER = '#C08B3A';
const AMBER_RGBA = (o) => `rgba(192, 139, 58, ${o})`;

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
};

// Extracted sub-component so useTransform isn't called inside a .map() (hooks rules violation)
const ChaoticCard = ({ card, scrollYProgress }) => {
  const x = useTransform(scrollYProgress, [0.1, 0.3], [card.startX, '0vw']);
  const y = useTransform(scrollYProgress, [0.1, 0.3], [card.startY, '0vh']);
  const rotate = useTransform(scrollYProgress, [0.1, 0.3], [card.rotation, card.rotation - 180]);
  const opacity = useTransform(scrollYProgress, [0.26, 0.32], [1, 0]);
  
  return (
    <motion.div
      style={{ x, y, rotate, opacity }}
      className="absolute w-32 h-20 bg-white rounded-lg border border-black/8 shadow-[0_4px_20px_rgba(0,0,0,0.12)] flex flex-col justify-between p-3"
    >
      <div className="w-4 h-4 rounded-full" style={{ backgroundColor: AMBER, opacity: 0.7 }} />
      <div className="space-y-1">
        <div className="h-1.5 w-full bg-black/10 rounded" />
        <div className="h-1.5 w-2/3 bg-black/6 rounded" />
      </div>
    </motion.div>
  );
};

/* ============================================================
   SHARED UI PIECES (used by both mobile & desktop)
   ============================================================ */

/* ============================================================
   SCATTER CARD — breaks into fragments when it leaves viewport
   ============================================================ */
const ScatterCard = ({ onScatter }) => {
  const cardRef = useRef(null);
  const [scattered, setScattered] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!visible) return;
    const el = cardRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting && visible) {
          setScattered(true);
          setTimeout(() => onScatter && onScatter(), 600);
        }
      },
      { threshold: 0 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [visible]);

  const scatterDirs = [
    { x: -180, y: -120, rotate: -25 },
    { x: 200, y: -80, rotate: 35 },
    { x: -220, y: 100, rotate: 15 },
    { x: 160, y: 140, rotate: -40 },
  ];

  const pieces = [
    { id: 'header', className: 'absolute top-0 left-0 right-0 px-6 pt-6 pb-4 flex justify-between items-start z-10' },
    { id: 'body', className: 'absolute top-[22%] left-0 right-0 px-6 z-10' },
    { id: 'nfc', className: 'absolute bottom-10 w-full flex justify-center z-10' },
    { id: 'label', className: 'absolute bottom-4 w-full text-center z-10' },
  ];

  if (!visible) return <div ref={cardRef} className="w-[min(320px,88vw)] h-[min(500px,78vh)] shrink-0" />;
  if (scattered) return null;

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, scale: 0.85 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="w-[min(320px,88vw)] h-[min(500px,78vh)] bg-gradient-to-br from-[#1C1C1E] to-[#2C2C2E] text-white rounded-[2.5rem] shadow-[0_40px_80px_rgba(0,0,0,0.2),0_0_0_0.5px_rgba(0,0,0,0.1)] overflow-hidden relative"
    >
      {pieces.map((piece, i) => (
        <motion.div
          key={piece.id}
          className={piece.className}
          animate={{
            opacity: scattered ? 0 : 1,
            x: scattered ? scatterDirs[i].x : 0,
            y: scattered ? scatterDirs[i].y : 0,
            rotate: scattered ? scatterDirs[i].rotate : 0,
            scale: scattered ? 0.2 : 1,
          }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
        >
          {piece.id === 'header' && (
            <div className="flex justify-between items-start">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-[10px] overflow-hidden bg-white flex items-center justify-center p-1">
                  <img src="/logo.png" alt="Vaulted" className="w-full h-full object-contain" />
                </div>
                <div>
                  <p className="text-[11px] font-semibold tracking-wide text-white/90">VAULTED</p>
                  <p className="text-[11px] text-white/50">Hotel Key</p>
                </div>
              </div>
              <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
                <span className="text-lg leading-none font-bold text-white/60">···</span>
              </div>
            </div>
          )}
          {piece.id === 'body' && (
            <div className="space-y-6">
              <div>
                <p className="text-[11px] text-white/50 uppercase font-semibold mb-1 tracking-wider">GUEST NAME</p>
                <p className="text-2xl font-medium">Asad Rizvi</p>
              </div>
              <div className="flex justify-between items-end border-b border-white/10 pb-6">
                <div>
                  <p className="text-[11px] text-white/50 uppercase font-semibold mb-1 tracking-wider">ROOM</p>
                  <p className="text-5xl font-light font-serif" style={{ color: AMBER }}>667</p>
                </div>
                <div>
                  <p className="text-[11px] text-white/50 uppercase font-semibold text-right mb-1 tracking-wider">DATES</p>
                  <p className="text-lg font-medium">Oct 12 – 15</p>
                </div>
              </div>
            </div>
          )}
          {piece.id === 'nfc' && (
            <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center border border-white/20 relative">
              <Nfc className="w-8 h-8 text-white/90" />
              <motion.div
                animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="absolute inset-0 rounded-full border"
                style={{ borderColor: `${AMBER}99` }}
              />
            </div>
          )}
          {piece.id === 'label' && (
            <p className="text-[10px] text-white/40 font-medium tracking-wide">Hold Near Reader</p>
          )}
        </motion.div>
      ))}
    </motion.div>
  );
};

const PassCard = () => (
  <div className="w-[min(320px,88vw)] h-[min(500px,78vh)] bg-gradient-to-br from-[#1C1C1E] to-[#2C2C2E] text-white rounded-[2.5rem] shadow-[0_40px_80px_rgba(0,0,0,0.2),0_0_0_0.5px_rgba(0,0,0,0.1)] overflow-hidden relative">
    <div className="px-6 pt-6 pb-4 flex justify-between items-start">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-[10px] overflow-hidden bg-white flex items-center justify-center p-1">
          <img src="/logo.png" alt="Vaulted" className="w-full h-full object-contain" />
        </div>
        <div>
          <p className="text-[11px] font-semibold tracking-wide text-white/90">VAULTED</p>
          <p className="text-[11px] text-white/50">Hotel Key</p>
        </div>
      </div>
      <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
        <span className="text-lg leading-none font-bold text-white/60">···</span>
      </div>
    </div>
    <div className="px-6 mt-4 space-y-6">
      <div>
        <p className="text-[11px] text-white/50 uppercase font-semibold mb-1 tracking-wider">GUEST NAME</p>
        <p className="text-2xl font-medium">Asad Rizvi</p>
      </div>
      <div className="flex justify-between items-end border-b border-white/10 pb-6">
        <div>
          <p className="text-[11px] text-white/50 uppercase font-semibold mb-1 tracking-wider">ROOM</p>
          <p className="text-5xl font-light font-serif" style={{ color: AMBER }}>667</p>
        </div>
        <div>
          <p className="text-[11px] text-white/50 uppercase font-semibold text-right mb-1 tracking-wider">DATES</p>
          <p className="text-lg font-medium">Oct 12 – 15</p>
        </div>
      </div>
    </div>
    <div className="absolute bottom-10 w-full flex justify-center">
      <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center border border-white/20 relative">
        <Nfc className="w-8 h-8 text-white/90" />
        <motion.div
          animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="absolute inset-0 rounded-full border"
          style={{ borderColor: `${AMBER}99` }}
        />
      </div>
    </div>
    <div className="absolute bottom-4 w-full text-center">
      <p className="text-[10px] text-white/40 font-medium tracking-wide">Hold Near Reader</p>
    </div>
  </div>
);

const OverviewSteps = () => (
  <>
    <h3 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-medium tracking-tighter mb-8 lg:mb-12 text-[#111] leading-[1.1]">
      No card.<br/>
      <span className="font-serif italic" style={{ color: AMBER }}>No queue.</span>
    </h3>
    <div className="space-y-8">
      {[
        { num: "01", title: "Works on your existing locks.", desc: "ASSA ABLOY, Salto, Dormakaba — if you have smart locks, you're already compatible. Zero cap-ex." },
        { num: "02", title: "Guests walk straight to their room.", desc: "Key sent to Apple Wallet before check-in. Your front desk handles the guests who actually need it." },
        { num: "03", title: "Keys that can't be copied.", desc: "256-bit encrypted. Tied to the guest's device. Revoke any key in seconds." },
      ].map(({ num, title, desc }) => (
        <div key={num} className="flex gap-5 sm:gap-8 items-start">
          <span className="shrink-0 font-serif italic leading-none text-4xl sm:text-5xl" style={{ color: AMBER }}>
            {num}
          </span>
          <div>
            <h4 className="text-xl sm:text-2xl font-medium text-[#111] mb-2">{title}</h4>
            <p className="text-[#111]/50 text-sm sm:text-base leading-relaxed font-light">{desc}</p>
          </div>
        </div>
      ))}
    </div>
  </>
);

const WorkflowCards = () => (
  <div className="max-w-6xl w-full px-4 sm:px-8 flex flex-col items-center text-center">
    <h2 className="text-3xl sm:text-5xl md:text-7xl font-medium tracking-tighter mb-4 md:mb-6 text-[#111]">
      Live in <span className="font-serif italic" style={{ color: AMBER }}>under a week.</span>
    </h2>
    <p className="text-base sm:text-xl text-[#111]/40 max-w-2xl mb-10 md:mb-20 font-light">
      Connect your PMS. We handle the rest. No downtime, no new hardware, no IT project.
    </p>

    <div className="flex flex-col md:flex-row items-center justify-center w-full gap-4 md:gap-8">
      <div className="w-full max-w-[280px] bg-white rounded-[2rem] p-6 sm:p-8 border border-black/6 shadow-sm">
        <p className="text-xs uppercase tracking-widest text-black/30 font-bold mb-4">Your PMS</p>
        <h3 className="text-2xl font-medium text-[#111] mb-2">Reservation Event</h3>
        <p className="text-sm text-[#111]/40">Oracle OPERA, Mews, Cloudbeds</p>
      </div>

      <ArrowRight className="w-8 h-8 text-black/15 rotate-90 md:rotate-0" />

      <div className="w-full max-w-[320px] rounded-[2rem] p-6 sm:p-8 relative shadow-[0_0_60px_rgba(192,139,58,0.3)]" style={{ backgroundColor: AMBER }}>
        <div className="absolute -top-4 -right-4 w-12 h-12 rounded-full overflow-hidden shadow-md bg-white flex items-center justify-center p-1.5">
          <img src="/logo.png" alt="Vaulted" className="w-full h-full object-contain" />
        </div>
        <p className="text-xs uppercase tracking-widest text-black/50 font-bold mb-4">Vaulted</p>
        <h3 className="text-2xl font-medium text-black mb-2">Issues the key.</h3>
        <p className="text-sm text-black/60">Check-in triggers a cryptographically signed key, sent directly to the guest's Apple Wallet.</p>
      </div>

      <ArrowRight className="w-8 h-8 text-black/15 rotate-90 md:rotate-0" />

      <div className="w-full max-w-[280px] bg-white rounded-[2rem] p-6 sm:p-8 border border-black/6 shadow-sm">
        <p className="text-xs uppercase tracking-widest text-black/30 font-bold mb-4">Your Locks</p>
        <h3 className="text-2xl font-medium text-[#111] mb-2">Door unlocks.</h3>
        <p className="text-sm text-[#111]/40">ASSA ABLOY, Salto, Dormakaba</p>
      </div>
    </div>
  </div>
);

const DashboardSection = ({ activeTab, setActiveTab }) => {
  const days = ["M", "T", "W", "T", "F", "S", "S"];
  const times = ["6A", "9A", "12P", "3P", "6P", "9P"];
  const heatmapData = [
    [0.8, 0.9, 0.4, 0.3, 0.7, 0.8],
    [0.7, 0.8, 0.3, 0.2, 0.6, 0.7],
    [0.9, 0.7, 0.5, 0.4, 0.8, 0.9],
    [0.6, 0.8, 0.4, 0.3, 0.7, 0.6],
    [0.7, 0.6, 0.5, 0.6, 0.9, 0.5],
    [0.3, 0.5, 0.8, 0.9, 0.6, 0.4],
    [0.2, 0.4, 0.7, 0.8, 0.5, 0.3],
  ];

  return (
    <>
      <div className="max-w-[1400px] w-full px-4 md:px-8 mb-4 md:mb-6">
        <p className="font-bold tracking-[0.2em] uppercase text-xs mb-2" style={{ color: AMBER }}>Behavioral Engine</p>
        <h2 className="text-2xl md:text-4xl lg:text-5xl font-medium tracking-tighter text-[#111]">Data your PMS never tracked.</h2>
      </div>

      <div className="w-full max-w-[1400px] px-4 md:px-8">
        <div className="w-full bg-white rounded-2xl md:rounded-[2rem] border border-black/5 shadow-[0_4px_40px_rgba(0,0,0,0.08)] p-4 md:p-8">

          {/* Tabs */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-6 md:mb-8 pb-4 md:pb-6 border-b border-black/5">
            <div className="flex gap-1 bg-black/4 rounded-full p-1">
              {[{ id: 'flow', label: 'Guest Flow' }, { id: 'facility', label: 'Facility Usage' }].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-3 sm:px-5 py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-200 ${
                    activeTab === tab.id
                      ? 'bg-white text-[#111] shadow-sm'
                      : 'text-[#111]/40 hover:text-[#111]/70'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
            <div className="px-3 py-1.5 rounded-full bg-black/4 border border-black/5">
              <span className="text-xs text-[#111]/40 font-medium">Last 7 Days</span>
            </div>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-4 md:gap-5">

            {/* Metric 1 */}
            <div className="lg:col-span-4 bg-[#F7F5F2] rounded-2xl p-4 md:p-6 border border-black/4">
              <p className="text-[10px] uppercase tracking-[0.3em] font-bold text-[#111]/30 mb-3 md:mb-5">Peak Room Return</p>
              <p className="text-4xl md:text-6xl font-light text-[#111] mb-1">11<span style={{ color: AMBER }}>:</span>45</p>
              <p className="text-xl md:text-2xl font-light text-[#111]/25 mb-3 md:mb-4">PM</p>
              <p className="text-xs text-[#111]/40 leading-relaxed">Your night staff is stretched thin. Now you know exactly why — and when.</p>
            </div>

            {/* Metric 2 */}
            <div className="lg:col-span-4 bg-[#F7F5F2] rounded-2xl p-4 md:p-6 border border-black/4">
              <p className="text-[10px] uppercase tracking-[0.3em] font-bold text-[#111]/30 mb-3 md:mb-5">Peak Gym Access</p>
              <p className="text-4xl md:text-6xl font-light text-[#111] mb-1">7<span style={{ color: AMBER }}>:</span>00</p>
              <p className="text-xl md:text-2xl font-light text-[#111]/25 mb-3 md:mb-4">AM</p>
              <p className="text-xs text-[#111]/40 leading-relaxed">Towels stocked before your guests arrive. Staffing planned to the hour, not the shift.</p>
            </div>

            {/* Metric 3 — amber hero */}
            <div className="lg:col-span-4 rounded-2xl p-4 md:p-6 relative overflow-hidden" style={{ backgroundColor: AMBER }}>
              <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent" />
              <p className="text-[10px] uppercase tracking-[0.3em] font-bold text-black/50 mb-3 md:mb-5">This Month</p>
              <p className="text-4xl md:text-6xl font-light text-black mb-1">8,492</p>
              <p className="text-xl md:text-2xl font-light text-black/40 mb-3 md:mb-4">entries</p>
              <p className="text-xs text-black/60 leading-relaxed">Every door access logged and timestamped. Your audit trail, always ready.</p>
            </div>

            {/* SVG Line Graph */}
            <div className="lg:col-span-8 bg-[#F7F5F2] rounded-2xl p-4 md:p-6 border border-black/4">
              <div className="mb-3 md:mb-5 flex flex-col sm:flex-row justify-between sm:items-center gap-1">
                <h3 className="text-xs sm:text-sm font-semibold text-[#111] uppercase tracking-wider">Room Access Frequency (24h)</h3>
                <span className="text-[10px] sm:text-xs text-[#111]/30">11PM spike — night audit understaffed</span>
              </div>
              <div className="h-44 w-full relative">
                <div className="absolute left-0 top-0 h-full flex flex-col justify-between text-[10px] text-[#111]/20 pb-6">
                  <span>400</span><span>300</span><span>200</span><span>100</span><span>0</span>
                </div>
                <div className="ml-8 h-full relative">
                  <div className="absolute inset-0 flex flex-col justify-between pb-6">
                    {[...Array(4)].map((_, i) => <div key={i} className="w-full border-t border-black/[0.04]"></div>)}
                    <div className="w-full border-t border-black/10"></div>
                  </div>
                  <svg className="absolute inset-0 h-[calc(100%-24px)] w-full" preserveAspectRatio="none" viewBox="0 0 1000 100">
                    <defs>
                      <linearGradient id="lineGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor={AMBER} stopOpacity="0.3"/>
                        <stop offset="100%" stopColor={AMBER} stopOpacity="0"/>
                      </linearGradient>
                    </defs>
                    <path d="M0,90 Q100,90 150,70 T300,20 T400,60 T600,80 T800,60 T900,10 T1000,40" fill="none" stroke={AMBER} strokeWidth="2.5" />
                    <path d="M0,90 Q100,90 150,70 T300,20 T400,60 T600,80 T800,60 T900,10 T1000,40 L1000,100 L0,100 Z" fill="url(#lineGrad)" />
                  </svg>
                  <div className="absolute bottom-0 w-full flex justify-between text-[10px] text-[#111]/30 px-2">
                    <span>12 AM</span><span>4 AM</span><span>8 AM</span><span>12 PM</span><span>4 PM</span><span>8 PM</span><span>12 AM</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Heatmap — hidden on mobile */}
            <div className="hidden md:block lg:col-span-4 bg-[#F7F5F2] rounded-2xl p-6 border border-black/4">
              <h3 className="text-sm font-semibold text-[#111] uppercase tracking-wider mb-5">Gym Access Heatmap</h3>
              <div className="flex gap-2 h-44">
                <div className="flex flex-col justify-between text-[10px] text-[#111]/30 h-[calc(100%-20px)] py-1">
                  {days.map((d, i) => <span key={i}>{d}</span>)}
                </div>
                <div className="flex-1 flex flex-col gap-1">
                  {heatmapData.map((row, i) => (
                    <div key={i} className="flex-1 flex gap-1">
                      {row.map((val, j) => (
                        <div key={j} className="flex-1 rounded-sm" style={{ backgroundColor: AMBER_RGBA(val * 0.8) }}></div>
                      ))}
                    </div>
                  ))}
                  <div className="flex justify-between text-[9px] text-[#111]/30 mt-1">
                    {times.map((t, i) => <span key={i}>{t}</span>)}
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </>
  );
};

/* ============================================================
   MOBILE CHAOS CARDS — small cards swarm in for "6 billion" stage
   ============================================================ */
const MobileChaoticCard = ({ card, delay }) => {
  const ref = useRef(null);
  const [style, setStyle] = useState({ opacity: 0, x: 0, y: 0, rotate: 0 });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStyle({
            opacity: 1,
            x: 0,
            y: 0,
            rotate: 0,
            transition: { duration: 0.4, delay, ease: [0.16, 1, 0.3, 1] },
          });
        }
      },
      { threshold: 0.3 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [delay]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: card.startX, y: card.startY, rotate: card.rotation }}
      animate={style}
      className="absolute w-24 h-14 sm:w-28 sm:h-16 bg-white rounded-lg border border-black/8 shadow-[0_4px_20px_rgba(0,0,0,0.12)] flex flex-col justify-between p-2 sm:p-3"
    >
      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: AMBER, opacity: 0.7 }} />
      <div className="space-y-1">
        <div className="h-1 w-full bg-black/10 rounded" />
        <div className="h-1 w-2/3 bg-black/6 rounded" />
      </div>
    </motion.div>
  );
};

const MobileChaosSection = () => {
  const sectionRef = useRef(null);
  const [visible, setVisible] = useState(false);

  const chaoticCards = Array.from({ length: 40 }).map((_, i) => ({
    id: i,
    startX: (Math.random() > 0.5 ? 1 : -1) * (Math.random() * 200 + 80) + "vw",
    startY: (Math.random() > 0.5 ? 1 : -1) * (Math.random() * 150 + 60) + "vh",
    rotation: Math.random() * 360,
  }));

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div ref={sectionRef} className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#F7F5F2]">
      {/* Cards */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        {chaoticCards.map((card, i) => (
          <MobileChaoticCard key={card.id} card={card} delay={i * 0.015} />
        ))}
      </div>
      {/* Text */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: visible ? 1 : 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
        className="relative z-10 text-center px-8"
      >
        <h2 className="text-3xl sm:text-5xl font-medium tracking-tighter text-[#111] mb-4">
          6 billion cards printed.<br/>
          <span className="italic font-serif" style={{ color: AMBER }}>A third never come back.</span>
        </h2>
        <p className="text-base sm:text-lg text-[#111]/50 font-light max-w-2xl mx-auto">
          $300M+ in annual replacement costs — absorbed as plastic waste, staff overhead, and guest friction.
        </p>
      </motion.div>
    </div>
  );
};

/* ============================================================
   MOBILE: Simple vertical scroll with fade-in sections
   ============================================================ */
const MobileScrollytelling = () => {
  const containerRef = useRef(null);
  const [activeTab, setActiveTab] = useState('flow');

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const introOpacity = useTransform(scrollYProgress, [0, 0.1, 0.15, 0.18], [1, 1, 0, 0]);
  const introY = useTransform(scrollYProgress, [0, 0.18], [0, -30]);
  const introScale = useTransform(scrollYProgress, [0, 0.18], [1, 0.95]);
  const introDisplay = useTransform(scrollYProgress, (p) => (p > 0.19 ? "none" : "block"));

  const cardsScale = useTransform(scrollYProgress, [0.12, 0.25, 0.35], [3, 1, 0.9]);
  const cardsOpacity = useTransform(scrollYProgress, [0.12, 0.18, 0.32, 0.38], [0, 1, 1, 0]);

  const passScale = useTransform(scrollYProgress, [0.3, 0.4, 0.55, 0.65], [0.7, 1, 1, 0.8]);
  const passOpacity = useTransform(scrollYProgress, [0.3, 0.4, 0.55, 0.6], [0, 1, 1, 0]);
  const passY = useTransform(scrollYProgress, [0.45, 0.5], ["0%", "-10%"]);

  const meetVaultedTextOpacity = useTransform(scrollYProgress, [0.38, 0.45, 0.48, 0.52], [0, 1, 1, 0]);
  const meetVaultedTextY = useTransform(scrollYProgress, [0.38, 0.45], [30, 0]);

  const overviewOpacity = useTransform(scrollYProgress, [0.48, 0.52, 0.65, 0.68], [0, 1, 1, 0]);
  const overviewY = useTransform(scrollYProgress, [0.48, 0.52], [40, 0]);

  const workflowOpacity = useTransform(scrollYProgress, [0.65, 0.7, 0.82, 0.85], [0, 1, 1, 0]);
  const workflowY = useTransform(scrollYProgress, [0.65, 0.7], [60, 0]);

  const dashboardOpacity = useTransform(scrollYProgress, [0.82, 0.88, 1], [0, 1, 1]);
  const dashboardScale = useTransform(scrollYProgress, [0.82, 0.9], [0.95, 1]);
  const dashboardY = useTransform(scrollYProgress, [0.82, 0.9], [40, 0]);

  const chaoticCards = Array.from({ length: 25 }).map((_, i) => ({
    id: i,
    startX: (Math.random() > 0.5 ? 1 : -1) * (Math.random() * 150 + 50) + "vw",
    startY: (Math.random() > 0.5 ? 1 : -1) * (Math.random() * 100 + 40) + "vh",
    rotation: Math.random() * 360,
  }));

  return (
    <div ref={containerRef} className="h-[600vh] relative bg-[#F7F5F2]">
      <div className="sticky top-0 h-[100svh] w-full overflow-hidden flex items-center justify-center">

        {/* STAGE 1: Hero */}
        <motion.div style={{ opacity: introOpacity, y: introY, scale: introScale, display: introDisplay }} className="absolute z-10 text-center px-4 w-full">
          <h1 className="text-[4.5rem] sm:text-[7rem] font-serif italic tracking-tight leading-none text-[#111] mb-6 select-none relative inline-block">
            Vaulted
            <svg className="absolute -bottom-4 sm:-bottom-6 left-0 w-full h-6 sm:h-8 text-[#C08B3A] opacity-80" viewBox="0 0 200 20" preserveAspectRatio="none" fill="none">
              <path d="M5,15 Q50,0 100,10 T195,5" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
            </svg>
          </h1>
          <p className="text-base sm:text-xl text-[#111]/45 font-light tracking-wide max-w-sm mx-auto">
            Your guests' room key, in their pocket, before they land.
          </p>
        </motion.div>

        {/* STAGE 2: Chaos cards */}
        <motion.div
          style={{ scale: cardsScale, opacity: cardsOpacity }}
          className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none bg-[#F7F5F2]"
        >
          {chaoticCards.map((card) => (
            <ChaoticCard key={card.id} card={card} scrollYProgress={scrollYProgress} />
          ))}
          <motion.div style={{ opacity: cardsOpacity }} className="absolute text-center z-10 pointer-events-none w-full px-6">
            <h2 className="text-3xl sm:text-5xl font-medium tracking-tighter text-[#111] mb-4">
              6 billion cards printed.<br/>
              <span className="italic font-serif" style={{ color: AMBER }}>A third never come back.</span>
            </h2>
            <p className="text-base sm:text-lg text-[#111]/50 font-light max-w-md mx-auto">
              $300M+ in annual replacement costs — absorbed as plastic waste, staff overhead, and guest friction.
            </p>
          </motion.div>
        </motion.div>

        {/* STAGE 3: Pass card */}
        <motion.div style={{ scale: passScale, opacity: passOpacity, y: passY }} className="absolute z-20 flex flex-col items-center px-4">
          <div className="scale-90 origin-center sm:scale-100">
            <PassCard />
          </div>
          <motion.div style={{ opacity: meetVaultedTextOpacity, y: meetVaultedTextY }} className="absolute -bottom-20 w-full text-center">
            <h3 className="text-3xl sm:text-5xl font-medium tracking-tight text-[#111]">Meet Vaulted.</h3>
          </motion.div>
        </motion.div>

        {/* STAGE 4: Overview */}
        <motion.div style={{ opacity: overviewOpacity, y: overviewY }} className="absolute z-20 px-6 max-w-sm w-full">
          <OverviewSteps />
        </motion.div>

        {/* STAGE 5: Workflow */}
        <motion.div style={{ opacity: workflowOpacity, y: workflowY }} className="absolute inset-0 z-30 flex items-center justify-center bg-[#F7F5F2] overflow-y-auto">
          <div className="py-8">
            <WorkflowCards />
          </div>
        </motion.div>

        {/* STAGE 6: Dashboard */}
        <motion.div style={{ opacity: dashboardOpacity, y: dashboardY, scale: dashboardScale }} className="absolute inset-0 z-40 bg-[#F7F5F2] flex flex-col pt-16 pb-8 items-center overflow-y-auto w-full">
          <DashboardSection activeTab={activeTab} setActiveTab={setActiveTab} />
        </motion.div>

      </div>
    </div>
  );
};

/* ============================================================
   DESKTOP: Original sticky scroll-driven experience
   ============================================================ */
const DesktopScrollytelling = () => {
  const containerRef = useRef(null);
  const [activeTab, setActiveTab] = useState('flow');

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const introOpacity = useTransform(scrollYProgress, [0, 0.08, 0.12, 0.15], [1, 1, 0, 0]);
  const introY = useTransform(scrollYProgress, [0, 0.15], [0, -50]);
  const introScale = useTransform(scrollYProgress, [0, 0.15], [1, 0.95]);
  const introDisplay = useTransform(scrollYProgress, (p) => (p > 0.16 ? "none" : "block"));

  const cardsScale = useTransform(scrollYProgress, [0.1, 0.2, 0.3], [5, 1, 0.9]);
  const cardsOpacity = useTransform(scrollYProgress, [0.1, 0.15, 0.28, 0.35], [0, 1, 1, 0]);

  const passScale = useTransform(scrollYProgress, [0.25, 0.35, 0.55, 0.65], [0.5, 1, 1, 0.8]);
  const passOpacity = useTransform(scrollYProgress, [0.28, 0.35, 0.55, 0.6], [0, 1, 1, 0]);
  const passX = useTransform(scrollYProgress, [0.4, 0.48], ["0%", "25vw"]);

  const meetVaultedTextOpacity = useTransform(scrollYProgress, [0.32, 0.38, 0.42, 0.45], [0, 1, 1, 0]);
  const meetVaultedTextY = useTransform(scrollYProgress, [0.32, 0.38], [50, 0]);

  const overviewOpacity = useTransform(scrollYProgress, [0.45, 0.48, 0.55, 0.58], [0, 1, 1, 0]);
  const overviewX = useTransform(scrollYProgress, [0.45, 0.48], ["-50px", "0px"]);

  const workflowOpacity = useTransform(scrollYProgress, [0.6, 0.64, 0.72, 0.76], [0, 1, 1, 0]);
  const workflowY = useTransform(scrollYProgress, [0.6, 0.64], [100, 0]);

  const dashboardOpacity = useTransform(scrollYProgress, [0.75, 0.82, 1], [0, 1, 1]);
  const dashboardScale = useTransform(scrollYProgress, [0.75, 0.85], [0.95, 1]);
  const dashboardY = useTransform(scrollYProgress, [0.75, 0.85], [50, 0]);

  const chaoticCards = Array.from({ length: 60 }).map((_, i) => ({
    id: i,
    startX: (Math.random() > 0.5 ? 1 : -1) * (Math.random() * 200 + 100) + "vw",
    startY: (Math.random() > 0.5 ? 1 : -1) * (Math.random() * 200 + 100) + "vh",
    rotation: Math.random() * 360,
  }));

  return (
    <div ref={containerRef} className="h-[800vh] relative bg-[#F7F5F2]">
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">

        {/* STAGE 1: Hero */}
        <motion.div style={{ opacity: introOpacity, y: introY, scale: introScale, display: introDisplay }} className="absolute z-10 text-center px-6 w-full max-w-6xl">
          <h1 className="text-[10rem] lg:text-[14rem] font-serif italic tracking-tight leading-none text-[#111] mb-10 select-none relative inline-block">
            Vaulted
            <svg className="absolute -bottom-6 left-0 w-full h-12 text-[#C08B3A] opacity-80" viewBox="0 0 200 20" preserveAspectRatio="none" fill="none">
              <path d="M5,15 Q50,0 100,10 T195,5" stroke="currentColor" strokeWidth="5" strokeLinecap="round" />
            </svg>
          </h1>
          <p className="text-xl md:text-2xl text-[#111]/45 font-light tracking-wide max-w-lg mx-auto">
            Your guests' room key, in their pocket, before they land.
          </p>
        </motion.div>

        {/* STAGE 2: Chaos cards */}
        <motion.div
          style={{ scale: cardsScale, opacity: cardsOpacity }}
          className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none bg-[#F7F5F2]"
        >
          {chaoticCards.map((card) => (
            <ChaoticCard key={card.id} card={card} scrollYProgress={scrollYProgress} />
          ))}
          <motion.div style={{ opacity: cardsOpacity }} className="absolute text-center z-10 pointer-events-none w-full px-8">
            <h2 className="text-5xl md:text-7xl font-medium tracking-tighter text-[#111] mb-6">
              6 billion cards printed.<br/>
              <span className="italic font-serif" style={{ color: AMBER }}>A third never come back.</span>
            </h2>
            <p className="text-xl text-[#111]/50 font-light max-w-2xl mx-auto px-4">
              $300M+ in annual replacement costs — absorbed as plastic waste, staff overhead, and guest friction.
            </p>
          </motion.div>
        </motion.div>

        {/* STAGE 3: Pass card */}
        <motion.div style={{ scale: passScale, opacity: passOpacity, x: passX }} className="absolute z-20 flex flex-col items-center px-4">
          <PassCard />
          <motion.div style={{ opacity: meetVaultedTextOpacity, y: meetVaultedTextY }} className="absolute -bottom-28 w-[500px] text-center">
            <h3 className="text-5xl font-medium tracking-tight text-[#111]">Meet Vaulted.</h3>
          </motion.div>
        </motion.div>

        {/* STAGE 4: Overview */}
        <motion.div style={{ opacity: overviewOpacity, x: overviewX }} className="absolute z-20 left-[15%] max-w-lg">
          <OverviewSteps />
        </motion.div>

        {/* STAGE 5: Workflow */}
        <motion.div style={{ opacity: workflowOpacity, y: workflowY }} className="absolute inset-0 z-30 flex items-center justify-center bg-[#F7F5F2]">
          <WorkflowCards />
        </motion.div>

        {/* STAGE 6: Dashboard */}
        <motion.div style={{ opacity: dashboardOpacity, y: dashboardY, scale: dashboardScale }} className="absolute inset-0 z-40 bg-[#F7F5F2] flex flex-col pt-24 pb-12 items-center overflow-hidden">
          <DashboardSection activeTab={activeTab} setActiveTab={setActiveTab} />
        </motion.div>

      </div>
    </div>
  );
};

/* ============================================================
   MAIN EXPORT — switches layout based on screen width
   ============================================================ */
export const Scrollytelling = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    setMounted(true);
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  if (!mounted) return null;

  return isMobile ? <MobileScrollytelling /> : <DesktopScrollytelling />;
};
