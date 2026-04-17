import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const draw = (delay = 0) => ({
  hidden: { pathLength: 0, opacity: 0 },
  visible: {
    pathLength: 1,
    opacity: 1,
    transition: { pathLength: { duration: 1.5, delay, ease: "easeInOut" }, opacity: { duration: 0.3, delay } }
  }
});

export const DoorLockBlueprint = ({ className = "", animate = true }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const shouldAnimate = animate && isInView;

  return (
    <svg ref={ref} viewBox="0 0 400 400" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <motion.g initial={animate ? "hidden" : "visible"} animate={shouldAnimate ? "visible" : undefined}>
        {/* Outer lock housing */}
        <motion.rect x="120" y="80" width="160" height="240" rx="20" variants={draw(0)} />

        {/* Lock cylinder - concentric circles */}
        <motion.circle cx="200" cy="180" r="50" variants={draw(0.2)} />
        <motion.circle cx="200" cy="180" r="35" variants={draw(0.3)} />
        <motion.circle cx="200" cy="180" r="8" variants={draw(0.4)} fill="currentColor" fillOpacity="0.1" />

        {/* Keyhole slot */}
        <motion.path d="M 200 172 L 200 210" variants={draw(0.5)} strokeWidth="2" />

        {/* Bolt */}
        <motion.rect x="280" y="165" width="80" height="30" rx="4" variants={draw(0.6)} />

        {/* Bolt detail lines */}
        <motion.line x1="300" y1="172" x2="300" y2="188" variants={draw(0.7)} strokeOpacity="0.3" />
        <motion.line x1="320" y1="172" x2="320" y2="188" variants={draw(0.7)} strokeOpacity="0.3" />
        <motion.line x1="340" y1="172" x2="340" y2="188" variants={draw(0.7)} strokeOpacity="0.3" />

        {/* NFC field lines (dotted arcs) */}
        <motion.path d="M 60 140 Q 40 180 60 220" variants={draw(0.8)} strokeDasharray="4 4" strokeOpacity="0.4" />
        <motion.path d="M 40 130 Q 15 180 40 230" variants={draw(0.9)} strokeDasharray="4 4" strokeOpacity="0.3" />
        <motion.path d="M 20 120 Q -10 180 20 240" variants={draw(1.0)} strokeDasharray="4 4" strokeOpacity="0.2" />

        {/* Mounting plate screws */}
        <motion.circle cx="155" cy="110" r="4" variants={draw(0.3)} strokeOpacity="0.3" />
        <motion.circle cx="245" cy="110" r="4" variants={draw(0.3)} strokeOpacity="0.3" />
        <motion.circle cx="155" cy="290" r="4" variants={draw(0.3)} strokeOpacity="0.3" />
        <motion.circle cx="245" cy="290" r="4" variants={draw(0.3)} strokeOpacity="0.3" />

        {/* Dimension lines */}
        <motion.line x1="120" y1="340" x2="280" y2="340" variants={draw(0.5)} strokeOpacity="0.15" strokeDasharray="2 6" />
        <motion.line x1="100" y1="80" x2="100" y2="320" variants={draw(0.5)} strokeOpacity="0.15" strokeDasharray="2 6" />
      </motion.g>
    </svg>
  );
};
