import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const AMBER = '#C08B3A';

export const CTASection = () => {
  const [step, setStep] = useState(1);
  const [status, setStatus] = useState('idle');
  
  const [formData, setFormData] = useState({
    email: '',
    propertyName: '',
    roomCount: '<50',
    pms: 'Opera',
    locks: 'Assa Abloy'
  });

  const handleChange = (e) => setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleNextStep = (e) => {
    e.preventDefault();
    if (!formData.email) return;
    setStep(2);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.propertyName) return;
    setStatus('loading');
    
    // Local dev mock check
    if (import.meta.env.DEV) {
      await new Promise(r => setTimeout(r, 800));
      setStatus('success');
      setStep(3);
      return;
    }

    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (!res.ok) throw new Error('Failed to subscribe');
      setStatus('success');
      setStep(3);
    } catch (err) {
      console.error(err);
      setStatus('error');
    }
  };

  return (
    <section id="cta-section" className="relative overflow-hidden min-h-[600px] flex items-center justify-center" style={{ backgroundColor: '#111111' }}>
      {/* Subtle ambient */}
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full blur-[140px] pointer-events-none" style={{ backgroundColor: `${AMBER}18` }} />
      <div className="absolute top-0 left-0 w-[400px] h-[400px] rounded-full blur-[140px] pointer-events-none" style={{ backgroundColor: `${AMBER}0D` }} />

      <div className="relative z-10 w-full max-w-5xl mx-auto px-4 sm:px-8 py-20 sm:py-40 text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
          className="flex flex-col items-center"
        >
          <div className="inline-flex items-center gap-4 mb-12">
            <div className="w-12 h-[1px]" style={{ backgroundColor: AMBER }} />
            <span className="text-[10px] uppercase tracking-[0.4em] font-bold" style={{ color: AMBER }}>2026 Pilot Cohort</span>
            <div className="w-12 h-[1px]" style={{ backgroundColor: AMBER }} />
          </div>

          <h2 className="text-4xl sm:text-6xl md:text-8xl lg:text-[7rem] font-medium tracking-tighter leading-[0.9] mb-8" style={{ color: '#FFFFFF' }}>
            12 properties.<br />
            <span className="font-serif italic" style={{ color: 'rgba(255,255,255,0.35)' }}>July 2026.</span>
          </h2>

          <p className="text-xl max-w-xl mx-auto mb-16 font-light leading-relaxed" style={{ color: 'rgba(255,255,255,0.55)' }}>
            We're running a tight pilot cohort this summer. No setup fee. White-glove onboarding. Live in under a week — or we refund you.
          </p>

          <div className="w-full max-w-lg mx-auto relative min-h-[140px]">
            <AnimatePresence mode="wait">
              {step === 1 && (
                <motion.form 
                  key="step1"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  onSubmit={handleNextStep} 
                  className="flex flex-col sm:flex-row gap-3 w-full"
                >
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="gm@yourproperty.com"
                    required
                    className="flex-1 text-white text-sm px-6 py-4 rounded-full focus:outline-none transition-colors w-full"
                    style={{
                      backgroundColor: 'rgba(255,255,255,0.06)',
                      border: '1px solid rgba(255,255,255,0.12)',
                    }}
                  />
                  <button
                    type="submit"
                    className="flex items-center justify-center gap-2 px-8 py-4 rounded-full text-xs uppercase tracking-widest font-bold transition-all duration-300 w-full sm:w-auto whitespace-nowrap"
                    style={{ backgroundColor: AMBER, color: '#000' }}
                    onMouseEnter={e => e.currentTarget.style.backgroundColor = '#fff'}
                    onMouseLeave={e => e.currentTarget.style.backgroundColor = AMBER}
                  >
                    Next →
                  </button>
                </motion.form>
              )}

              {step === 2 && (
                <motion.form 
                  key="step2"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  onSubmit={handleSubmit} 
                  className="w-full bg-white/5 border border-white/10 rounded-3xl p-6 text-left"
                >
                  <div className="space-y-4 mb-6">
                    <div>
                      <label className="block text-[10px] uppercase tracking-widest text-white/50 mb-1.5 ml-2">Property Name</label>
                      <input
                        type="text"
                        name="propertyName"
                        value={formData.propertyName}
                        onChange={handleChange}
                        placeholder="The Grand Hotel"
                        required
                        className="w-full text-white text-sm px-4 py-3 rounded-xl focus:outline-none bg-white/5 border border-white/10"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[10px] uppercase tracking-widest text-white/50 mb-1.5 ml-2">Room Count</label>
                        <select name="roomCount" value={formData.roomCount} onChange={handleChange} className="w-full text-white text-sm px-4 py-3 rounded-xl focus:outline-none bg-white/5 border border-white/10 appearance-none">
                          <option className="text-black" value="<50">&lt; 50</option>
                          <option className="text-black" value="50-150">50 - 150</option>
                          <option className="text-black" value="150-300">150 - 300</option>
                          <option className="text-black" value="300+">300+</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-[10px] uppercase tracking-widest text-white/50 mb-1.5 ml-2">Current PMS</label>
                        <select name="pms" value={formData.pms} onChange={handleChange} className="w-full text-white text-sm px-4 py-3 rounded-xl focus:outline-none bg-white/5 border border-white/10 appearance-none">
                          <option className="text-black" value="Opera">Opera</option>
                          <option className="text-black" value="Mews">Mews</option>
                          <option className="text-black" value="Cloudbeds">Cloudbeds</option>
                          <option className="text-black" value="Other">Other</option>
                        </select>
                      </div>
                    </div>
                    <div>
                      <label className="block text-[10px] uppercase tracking-widest text-white/50 mb-1.5 ml-2">Current Locks</label>
                      <select name="locks" value={formData.locks} onChange={handleChange} className="w-full text-white text-sm px-4 py-3 rounded-xl focus:outline-none bg-white/5 border border-white/10 appearance-none">
                        <option className="text-black" value="Assa Abloy">Assa Abloy</option>
                        <option className="text-black" value="Dormakaba">Dormakaba</option>
                        <option className="text-black" value="Salto">Salto</option>
                        <option className="text-black" value="Other">Other</option>
                      </select>
                    </div>
                  </div>
                  
                  {status === 'error' && <p className="text-red-400 text-xs text-center mb-4">Something went wrong. Please try again.</p>}
                  
                  <div className="flex gap-3">
                    <button type="button" onClick={() => setStep(1)} className="px-6 py-3 rounded-full text-xs uppercase tracking-widest font-bold text-white/70 hover:bg-white/5 transition-colors">
                      Back
                    </button>
                    <button
                      type="submit"
                      disabled={status === 'loading'}
                      className="flex-1 flex items-center justify-center gap-2 px-8 py-3 rounded-full text-xs uppercase tracking-widest font-bold transition-all duration-300 disabled:opacity-50"
                      style={{ backgroundColor: AMBER, color: '#000' }}
                    >
                      {status === 'loading' ? 'Sending...' : 'Apply for Pilot'}
                    </button>
                  </div>
                </motion.form>
              )}

              {step === 3 && (
                <motion.div
                  key="step3"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="inline-flex flex-col items-center gap-3 w-full"
                >
                  <div className="w-16 h-16 rounded-full flex items-center justify-center mb-2" style={{ backgroundColor: `${AMBER}30`, border: `1px solid ${AMBER}50` }}>
                    <span className="text-2xl text-white">✓</span>
                  </div>
                  <p className="text-white text-lg font-medium">Application received.</p>
                  <p className="text-sm" style={{ color: 'rgba(255,255,255,0.4)' }}>We'll be in touch within 48 hours.</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <p className="text-xs mt-12 uppercase tracking-widest" style={{ color: 'rgba(255,255,255,0.18)' }}>
            12 spots · July 2026 · No setup fee
          </p>
        </motion.div>
      </div>
    </section>
  );
};
