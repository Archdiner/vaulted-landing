import { motion } from 'framer-motion';

const draw = (delay = 0) => ({
  hidden: { pathLength: 0, opacity: 0 },
  visible: {
    pathLength: 1,
    opacity: 1,
    transition: { pathLength: { duration: 1.2, delay, ease: "easeInOut" }, opacity: { duration: 0.3, delay } }
  }
});

const slideIn = (delay = 0) => ({
  hidden: { y: -30, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }
  }
});

export const PassDelivery = ({ isActive = false, className = "" }) => (
  <svg viewBox="0 0 280 280" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <motion.g initial="hidden" animate={isActive ? "visible" : "hidden"}>
      {/* Phone body */}
      <motion.rect x="85" y="30" width="110" height="200" rx="16" variants={draw(0)} />

      {/* Screen area */}
      <motion.rect x="93" y="45" width="94" height="170" rx="4" variants={draw(0.1)} strokeOpacity="0.2" />

      {/* Notch */}
      <motion.rect x="120" y="33" width="40" height="6" rx="3" variants={draw(0.15)} strokeOpacity="0.3" />

      {/* Wallet card sliding in */}
      <motion.g variants={slideIn(0.5)}>
        <motion.rect x="103" y="80" width="74" height="48" rx="6" variants={draw(0.4)} stroke="#B8956A" />
        {/* Card content */}
        <motion.line x1="113" y1="93" x2="145" y2="93" variants={draw(0.6)} stroke="#B8956A" strokeOpacity="0.5" />
        <motion.line x1="113" y1="103" x2="130" y2="103" variants={draw(0.65)} stroke="#B8956A" strokeOpacity="0.3" />
        {/* NFC icon on card */}
        <motion.path d="M 160 100 Q 165 96 160 92" variants={draw(0.7)} stroke="#B8956A" strokeOpacity="0.4" />
        <motion.path d="M 163 102 Q 170 96 163 90" variants={draw(0.75)} stroke="#B8956A" strokeOpacity="0.3" />
      </motion.g>

      {/* "Add to Wallet" button */}
      <motion.rect x="108" y="145" width="64" height="22" rx="11" variants={draw(0.8)} stroke="#B8956A" />
      <motion.line x1="122" y1="156" x2="158" y2="156" variants={draw(0.9)} stroke="#B8956A" strokeOpacity="0.4" />

      {/* Checkmark */}
      <motion.path d="M 132 180 L 137 185 L 148 174" variants={draw(1.0)} stroke="#B8956A" strokeWidth="2" />

      {/* Home indicator */}
      <motion.line x1="125" y1="222" x2="155" y2="222" variants={draw(0.2)} strokeOpacity="0.2" />
    </motion.g>
  </svg>
);
