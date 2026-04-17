import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const draw = (delay = 0) => ({
  hidden: { pathLength: 0, opacity: 0 },
  visible: {
    pathLength: 1,
    opacity: 1,
    transition: { pathLength: { duration: 2, delay, ease: "easeInOut" }, opacity: { duration: 0.3, delay } }
  }
});

export const HotelFacade = ({ className = "" }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <svg ref={ref} viewBox="0 0 800 500" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <motion.g initial="hidden" animate={isInView ? "visible" : "hidden"}>
        {/* Ground line */}
        <motion.line x1="0" y1="480" x2="800" y2="480" variants={draw(0)} />

        {/* Left column */}
        <motion.rect x="180" y="120" width="30" height="360" rx="2" variants={draw(0.2)} />
        {/* Right column */}
        <motion.rect x="590" y="120" width="30" height="360" rx="2" variants={draw(0.2)} />

        {/* Arch */}
        <motion.path d="M 210 200 Q 400 20 590 200" variants={draw(0.4)} />

        {/* Left door */}
        <motion.rect x="260" y="240" width="120" height="240" rx="4" variants={draw(0.6)} />
        {/* Right door */}
        <motion.rect x="420" y="240" width="120" height="240" rx="4" variants={draw(0.6)} />

        {/* Door handles */}
        <motion.circle cx="370" cy="370" r="4" variants={draw(0.8)} />
        <motion.circle cx="430" cy="370" r="4" variants={draw(0.8)} />

        {/* Door panels */}
        <motion.rect x="280" y="260" width="80" height="100" rx="2" variants={draw(0.9)} strokeOpacity="0.3" />
        <motion.rect x="440" y="260" width="80" height="100" rx="2" variants={draw(0.9)} strokeOpacity="0.3" />
        <motion.rect x="280" y="380" width="80" height="80" rx="2" variants={draw(1.0)} strokeOpacity="0.3" />
        <motion.rect x="440" y="380" width="80" height="80" rx="2" variants={draw(1.0)} strokeOpacity="0.3" />

        {/* Transom window above doors */}
        <motion.path d="M 260 240 Q 400 160 540 240" variants={draw(0.7)} strokeOpacity="0.5" />

        {/* Keystone */}
        <motion.path d="M 390 105 L 400 90 L 410 105" variants={draw(0.5)} />

        {/* Decorative base */}
        <motion.line x1="160" y1="480" x2="640" y2="480" variants={draw(0.1)} strokeWidth="3" />

        {/* Steps */}
        <motion.line x1="220" y1="495" x2="580" y2="495" variants={draw(0.15)} strokeOpacity="0.5" />
      </motion.g>
    </svg>
  );
};
