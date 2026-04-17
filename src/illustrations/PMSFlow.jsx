import { motion } from 'framer-motion';

const draw = (delay = 0) => ({
  hidden: { pathLength: 0, opacity: 0 },
  visible: {
    pathLength: 1,
    opacity: 1,
    transition: { pathLength: { duration: 1.2, delay, ease: "easeInOut" }, opacity: { duration: 0.3, delay } }
  }
});

export const PMSFlow = ({ isActive = false, className = "" }) => (
  <svg viewBox="0 0 280 280" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <motion.g initial="hidden" animate={isActive ? "visible" : "hidden"}>
      {/* Monitor/Dashboard */}
      <motion.rect x="60" y="30" width="160" height="110" rx="8" variants={draw(0)} />
      <motion.line x1="60" y1="55" x2="220" y2="55" variants={draw(0.1)} strokeOpacity="0.3" />
      {/* Dashboard content lines */}
      <motion.line x1="75" y1="75" x2="130" y2="75" variants={draw(0.2)} strokeOpacity="0.4" />
      <motion.line x1="75" y1="90" x2="110" y2="90" variants={draw(0.25)} strokeOpacity="0.3" />
      <motion.line x1="75" y1="105" x2="145" y2="105" variants={draw(0.3)} strokeOpacity="0.2" />
      {/* Status indicator */}
      <motion.circle cx="200" cy="75" r="5" variants={draw(0.3)} stroke="#B8956A" />
      {/* Monitor stand */}
      <motion.line x1="140" y1="140" x2="140" y2="160" variants={draw(0.1)} />
      <motion.line x1="115" y1="160" x2="165" y2="160" variants={draw(0.1)} />

      {/* Arrow down */}
      <motion.path d="M 140 170 L 140 200" variants={draw(0.4)} stroke="#B8956A" strokeDasharray="4 4" />
      <motion.path d="M 133 193 L 140 200 L 147 193" variants={draw(0.5)} stroke="#B8956A" />

      {/* Envelope */}
      <motion.rect x="105" y="210" width="70" height="50" rx="4" variants={draw(0.6)} />
      <motion.path d="M 105 210 L 140 240 L 175 210" variants={draw(0.7)} />

      {/* Small pass icon emerging from envelope */}
      <motion.rect x="125" y="225" width="30" height="20" rx="3" variants={draw(0.8)} stroke="#B8956A" strokeOpacity="0.6" />
    </motion.g>
  </svg>
);
