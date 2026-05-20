import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Crown, Lightbulb, CheckCircle2, Sparkles } from 'lucide-react';

export default function MissionModal({ mission, isCompleted, onComplete, onClose }) {
  const [showTip, setShowTip] = useState(false);
  const [justCompleted, setJustCompleted] = useState(false);

  if (!mission) return null;

  const handleComplete = () => {
    setJustCompleted(true);
    onComplete(mission.id);
    if (navigator.vibrate) navigator.vibrate([100, 50, 200]);
    setTimeout(() => onClose(), 1500);
  };

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        {/* Backdrop */}
        <motion.div
          className="absolute inset-0"
          style={{ background: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(10px)' }}
          onClick={onClose}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        />

        {/* Modal */}
        <motion.div
          className="relative w-full max-w-md rounded-2xl border border-white/10 overflow-hidden z-10 mx-4 sm:mx-0"
          style={{ background: '#0d0d14', maxHeight: '85vh' }}
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
        >
          <div className="p-5 sm:p-6 overflow-y-auto max-h-[85vh] scrollbar-hide">
            {/* Header */}
            <div className="flex items-start justify-between mb-6">
              <div className="flex items-center gap-4">
                {mission.es_jefe ? (
                  <motion.div
                    className="w-14 h-14 rounded-xl flex items-center justify-center"
                    style={{ background: 'rgba(255,215,0,0.18)' }}
                    animate={{ boxShadow: ['0 0 0px rgba(255,215,0,0)', '0 0 25px rgba(255,215,0,0.4)', '0 0 0px rgba(255,215,0,0)'] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <Crown size={28} style={{ color: '#ffd700' }} />
                  </motion.div>
                ) : (
                  <div className="w-14 h-14 rounded-xl flex items-center justify-center" style={{ background: 'rgba(0,212,255,0.15)' }}>
                    <span className="text-2xl font-mono font-bold" style={{ color: '#00d4ff' }}>#{mission.orden}</span>
                  </div>
                )}
                <div>
                  {mission.es_jefe && (
                    <span className="text-[11px] font-bold px-2.5 py-1 rounded-full mb-2 inline-block tracking-wide" style={{ background: 'rgba(255,215,0,0.2)', color: '#ffd700' }}>👑 MISIÓN DE JEFE</span>
                  )}
                  <h2 className="text-xl font-bold text-white">{mission.titulo}</h2>
                </div>
              </div>
              <motion.button
                onClick={onClose}
                className="p-2.5 rounded-full"
                style={{ background: 'rgba(255,255,255,0.08)' }}
                whileHover={{ background: 'rgba(255,255,255,0.12)' }}
              >
                <X size={20} style={{ color: 'rgba(255,255,255,0.6)' }} />
              </motion.button>
            </div>

            {/* XP Badge */}
            <motion.div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6"
              style={{ background: mission.es_jefe ? 'rgba(255,215,0,0.15)' : 'rgba(0,255,65,0.15)' }}
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Sparkles size={16} style={{ color: mission.es_jefe ? '#ffd700' : '#00ff41' }} />
              <span className="text-sm font-bold" style={{ color: mission.es_jefe ? '#ffd700' : '#00ff41' }}>+{mission.xp} XP</span>
            </motion.div>

            {/* Description */}
            <p className="text-sm leading-relaxed mb-6" style={{ color: 'rgba(255,255,255,0.75)' }}>
              {mission.descripcion}
            </p>

            {/* Tip Section */}
            <div className="rounded-xl border mb-6 overflow-hidden" style={{ background: 'rgba(255,255,255,0.03)', borderColor: 'rgba(255,255,255,0.08)' }}>
              <button
                onClick={() => setShowTip(!showTip)}
                className="w-full flex items-center gap-3.5 p-4"
              >
                <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(255,215,0,0.15)' }}>
                  <Lightbulb size={18} style={{ color: '#ffd700' }} />
                </div>
                <span className="text-sm font-bold text-white flex-1 text-left">Tip de Apoyo</span>
                <motion.span
                  animate={{ rotate: showTip ? 180 : 0 }}
                  className="text-xs" style={{ color: 'rgba(255,255,255,0.4)' }}
                >
                  ▼
                </motion.span>
              </button>
              <AnimatePresence>
                {showTip && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="overflow-hidden"
                  >
                    <p className="px-4 pb-4 text-xs leading-relaxed" style={{ color: 'rgba(255,255,255,0.65)' }}>
                      {mission.tip_ayuda}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Complete Button */}
            {justCompleted ? (
              <motion.div
                className="w-full py-4 rounded-xl flex items-center justify-center gap-2"
                style={{ background: 'rgba(0,255,65,0.18)' }}
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
              >
                <CheckCircle2 size={22} style={{ color: '#00ff41' }} />
                <span className="font-bold text-sm" style={{ color: '#00ff41' }}>¡Misión Completada!</span>
              </motion.div>
            ) : isCompleted ? (
              <div className="w-full py-4 rounded-xl flex items-center justify-center gap-2" style={{ background: 'rgba(0,255,65,0.12)' }}>
                <CheckCircle2 size={22} style={{ color: '#00ff41' }} />
                <span className="font-semibold text-sm" style={{ color: 'rgba(0,255,65,0.8)' }}>Completada</span>
              </div>
            ) : (
              <motion.button
                onClick={handleComplete}
                className="w-full py-4 rounded-xl font-bold text-black text-base"
                style={{ background: 'linear-gradient(135deg, #00ff41, #00d4ff)' }}
                whileHover={{ scale: 1.03, boxShadow: '0 10px 30px rgba(0,255,65,0.2)' }}
                whileTap={{ scale: 0.96 }}
              >
                Completar Misión
              </motion.button>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
