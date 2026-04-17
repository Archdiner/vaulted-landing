import { motion } from 'framer-motion';
import { NFCWave } from '../../icons';

export const PassPreview = ({ passType = "room-key" }) => {
  const isRoomKey = passType === "room-key";

  return (
    <motion.div
      whileHover={{ rotateY: 5, rotateX: -3 }}
      transition={{ type: "spring", stiffness: 200, damping: 20 }}
      className="w-[320px] md:w-[380px] aspect-[1.6/1] rounded-[1.5rem] bg-[#1A1A1A] p-8 relative overflow-hidden shadow-2xl shadow-black/30"
      style={{ transformStyle: "preserve-3d", perspective: "1000px" }}
    >
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/[0.06] to-transparent rounded-[1.5rem]"></div>

      {/* Logo */}
      <div className="relative z-10 flex items-center gap-2 mb-6">
        <div className="w-3 h-3 bg-[#B8956A] rounded-full"></div>
        <span className="text-white/80 text-[10px] font-bold uppercase tracking-[0.3em]">Vaulted</span>
      </div>

      {/* Primary field */}
      <div className="relative z-10 mb-4">
        <div className="text-white/30 text-[8px] uppercase tracking-[0.3em] font-bold mb-1">
          {isRoomKey ? "Room" : "Program"}
        </div>
        <div className="text-white text-3xl font-medium tracking-tight">
          {isRoomKey ? "Suite 407" : "Vaulted Pilot"}
        </div>
      </div>

      {/* Secondary fields */}
      <div className="relative z-10 flex gap-8">
        <div>
          <div className="text-white/30 text-[7px] uppercase tracking-[0.3em] font-bold mb-0.5">
            {isRoomKey ? "Property" : "Status"}
          </div>
          <div className="text-white/70 text-xs font-medium">
            {isRoomKey ? "The Vaulted" : "VIP Access"}
          </div>
        </div>
        <div>
          <div className="text-white/30 text-[7px] uppercase tracking-[0.3em] font-bold mb-0.5">
            {isRoomKey ? "Check-in" : "Cohort"}
          </div>
          <div className="text-white/70 text-xs font-medium">
            {isRoomKey ? "Jul 15" : "July 2026"}
          </div>
        </div>
        {isRoomKey && (
          <div>
            <div className="text-white/30 text-[7px] uppercase tracking-[0.3em] font-bold mb-0.5">Check-out</div>
            <div className="text-white/70 text-xs font-medium">Jul 18</div>
          </div>
        )}
      </div>

      {/* NFC icon */}
      <div className="absolute top-7 right-7 z-10">
        <NFCWave className="w-6 h-6 text-[#B8956A]/50" />
      </div>

      {/* Subtle texture lines */}
      <div className="absolute bottom-0 right-0 w-1/2 h-1/2 opacity-[0.03]">
        <svg viewBox="0 0 200 200" fill="none" stroke="white" strokeWidth="0.5">
          {Array.from({ length: 20 }, (_, i) => (
            <line key={i} x1={0} y1={i * 10} x2={200} y2={i * 10} />
          ))}
        </svg>
      </div>
    </motion.div>
  );
};
