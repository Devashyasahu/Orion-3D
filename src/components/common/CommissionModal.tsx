import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { CheckCircle2, X } from 'lucide-react';
import { useCursor } from '../../context/CursorContext';

interface CommissionModalProps {
  isOpen: boolean;
  onClose: () => void;
  characterName?: string;
}

export const CommissionModal: React.FC<CommissionModalProps> = ({
  isOpen,
  onClose,
  characterName,
}) => {
  const { setCursor, resetCursor } = useCursor();
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    notes: characterName ? `Inquiry for ${characterName} collectible.` : '',
  });

  useEffect(() => {
    if (isOpen && characterName) {
      setFormData((current) => ({
        ...current,
        notes: `Inquiry for ${characterName} collectible.`,
      }));
    }
  }, [characterName, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 2500);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-[#030305]/90 backdrop-blur-2xl"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-xl bg-[#0a0a0f] border border-amber-300/25 rounded-2xl p-8 md:p-12 z-10 shadow-[0_0_80px_rgba(245,158,11,0.12)]"
          >
            <button
              onClick={onClose}
              onMouseEnter={() => setCursor('CLOSE', 'hover')}
              onMouseLeave={resetCursor}
              className="absolute top-6 right-6 text-white/50 hover:text-white transition-colors"
            >
              <X size={22} />
            </button>

            {submitted ? (
              <div className="py-12 text-center space-y-4">
                <CheckCircle2 size={48} className="mx-auto text-amber-300 animate-bounce" />
                <h3 className="text-2xl font-syne font-bold text-white tracking-tight">
                  REQUEST PREPARED
                </h3>
                <p className="text-xs font-space text-white/60 leading-relaxed">
                  Checkout and backend submission are not connected yet. This prepares a collection inquiry for studio follow-up.
                </p>
              </div>
            ) : (
              <div className="space-y-6">
                <div>
                  <span className="text-[10px] font-space tracking-[0.3em] text-amber-300 uppercase font-semibold">
                    ORION PRIVATE COMMISSIONS
                  </span>
                  <h3 className="text-2xl md:text-3xl font-syne font-bold text-white tracking-tight mt-1">
                    {characterName ? `COMMISSION ${characterName.toUpperCase()}` : 'CREATE YOUR PHYSICAL SCULPTURE'}
                  </h3>
                  <p className="text-xs font-space text-white/60 leading-relaxed mt-2">
                    We do not mass-produce. Every piece is prepared as a hand-finished collector inquiry.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4 pt-2">
                  <div>
                    <label className="block text-[10px] font-space tracking-[0.2em] text-white/50 uppercase mb-2">
                      YOUR NAME / COLLECTOR HANDLE
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Alex Mercer"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-[#111118] border border-white/10 rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:border-amber-300/80 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-space tracking-[0.2em] text-white/50 uppercase mb-2">
                      EMAIL ADDRESS
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="alex@domain.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-[#111118] border border-white/10 rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:border-amber-300/80 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-space tracking-[0.2em] text-white/50 uppercase mb-2">
                      CUSTOM SCULPTING SPECIFICATIONS / NOTES
                    </label>
                    <textarea
                      rows={3}
                      value={formData.notes}
                      onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                      placeholder="Desired size, custom pose, paint finish preferences..."
                      className="w-full bg-[#111118] border border-white/10 rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:border-amber-300/80 transition-colors resize-none"
                    />
                  </div>

                  <div className="pt-4">
                    <button
                      type="submit"
                      onMouseEnter={() => setCursor('PREPARE', 'hover')}
                      onMouseLeave={resetCursor}
                      className="w-full group relative overflow-hidden py-4 px-6 rounded-lg bg-gradient-to-r from-violet-600/25 to-amber-500/25 border border-amber-300/40 text-amber-100 text-xs font-space tracking-[0.25em] font-semibold uppercase hover:border-amber-200 transition-all duration-300 flex items-center justify-center space-x-2"
                    >
                      <span>PREPARE COLLECTION INQUIRY</span>
                      <span className="transform group-hover:translate-x-1.5 transition-transform">-&gt;</span>
                    </button>
                  </div>
                </form>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
