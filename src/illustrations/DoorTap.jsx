import { motion } from 'framer-motion';

const draw = (delay = 0) => ({
  hidden: { pathLength: 0, opacity: 0 },
  visible: {
    pathLength: 1,
    opacity: 1,
    transition: { pathLength: { duration: 1.2, delay, ease: "easeInOut" }, opacity: { duration: 0.3, delay } }
  }
});

const pulse = (delay = 0) => ({
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: [0, 0.6, 0],
    scale: [0.8, 1.2, 1.4],
    transition: { duration: 2, delay, repeat: Infinity, repeatDelay: 1 }
  }
});

export const DoorTap = ({ isActive = false, className = "" }) => (
  <svg viewBox="0 0 280 280" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <motion.g initial="hidden" animate={isActive ? "visible" : "hidden"}>
      {/* Door frame */}
      <motion.path d="M 170 30 L 170 250" variants={draw(0)} />
      <motion.path d="M 170 30 L 260 30 L 260 250 L 170 250" variants={draw(0.1)} />

      {/* Door panel detail */}
      <motion.rect x="185" y="50" width="55" height="80" rx="3" variants={draw(0.2)} strokeOpacity="0.2" />
      <motion.rect x="185" y="150" width="55" height="70" rx="3" variants={draw(0.2)} strokeOpacity="0.2" />

      {/* Lock reader on door */}
      <motion.rect x="178" y="130" width="20" height="35" rx="4" variants={draw(0.3)} stroke="#B8956A" />
      <motion.circle cx="188" cy="142" r="3" variants={draw(0.4)} stroke="#B8956A" />

      {/* Phone approaching */}
      <motion.rect x="40" y="110" width="55" height="100" rx="10" variants={draw(0.3)} />
      {/* Phone screen */}
      <motion.rect x="46" y="118" width="43" height="80" rx="3" variants={draw(0.35)} strokeOpacity="0.2" />
      {/* Card on phone screen */}
      <motion.rect x="52" y="140" width="31" height="20" rx="3" variants={draw(0.5)} stroke="#B8956A" strokeOpacity="0.5" />

      {/* NFC waves between phone and lock */}
      <motion.path d="M 100 150 Q 110 140 100 130" variants={draw(0.6)} stroke="#B8956A" strokeOpacity="0.6" />
      <motion.path d="M 110 155 Q 125 140 110 125" variants={draw(0.7)} stroke="#B8956A" strokeOpacity="0.4" />
      <motion.path d="M 120 160 Q 140 140 120 120" variants={draw(0.8)} stroke="#B8956A" strokeOpacity="0.2" />

      {/* Animated pulse rings (repeating) */}
      <motion.circle cx="140" cy="142" r="8" variants={pulse(1.0)} stroke="#B8956A" strokeOpacity="0.5" />
      <motion.circle cx="140" cy="142" r="15" variants={pulse(1.3)} stroke="#B8956A" strokeOpacity="0.3" />

      {/* Bolt retracting (unlocked state) */}
      <motion.rect x="172" y="145" width="12" height="8" rx="1" variants={draw(0.9)} stroke="#B8956A" fill="#B8956A" fillOpacity="0.1" />

      {/* Floor line */}
      <motion.line x1="150" y1="250" x2="270" y2="250" variants={draw(0.1)} strokeOpacity="0.3" />
    </motion.g>
  </svg>
);
