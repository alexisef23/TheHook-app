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
          className="relative w-full max-w-md rounded-2xl border border-white/10 overflow-hidden z-10"
          style={{ background: '#0d0d14', maxHeight: '85vh' }}
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
        >
          <div className="p-5 sm:p-6 overflow-y-auto max-h-[85vh] scrollbar-hide">
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                {mission.es_jefe ? (
                  <motion.div
                    className="w-12 h-12 rounded-xl flex items-center justify-center"
                    style={{ background: 'rgba(255,215,0,0.15)' }}
                    animate={{ boxShadow: ['0 0 0px rgba(255,215,0,0)', '0 0 20px rgba(255,215,0,0.3)', '0 0 0px rgba(255,215,0,0)'] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <Crown size={24} style={{ color: '#ffd700' }} />
                  </motion.div>
                ) : (
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ background: 'rgba(0,212,255,0.1)' }}>
                    <span className="text-lg font-mono font-bold" style={{ color: '#00d4ff' }}>#{mission.orden}</span>
                  </div>
                )}
                <div>
                  {mission.es_jefe && (
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded mb-1 inline-block" style={{ background: 'rgba(255,215,0,0.15)', color: '#ffd700' }}>MISIÓN DE JEFE</span>
                  )}
                  <h2 className="text-lg font-bold text-white">{mission.titulo}</h2>
                </div>
              </div>
              <button onClick={onClose} className="p-2 rounded-full" style={{ background: 'rgba(255,255,255,0.05)' }}>
                <X size={18} style={{ color: 'rgba(255,255,255,0.5)' }} />
              </button>
            </div>

            {/* XP Badge */}
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full mb-4" style={{ background: mission.es_jefe ? 'rgba(255,215,0,0.1)' : 'rgba(0,255,65,0.1)' }}>
              <Sparkles size={14} style={{ color: mission.es_jefe ? '#ffd700' : '#00ff41' }} />
              <span className="text-sm font-mono font-bold" style={{ color: mission.es_jefe ? '#ffd700' : '#00ff41' }}>+{mission.xp} XP</span>
            </div>

            {/* Description */}
            <p className="text-sm leading-relaxed mb-5" style={{ color: 'rgba(255,255,255,0.7)' }}>
              {mission.descripcion}
            </p>

            {/* Tip Section */}
            <div className="rounded-xl border mb-6" style={{ background: 'rgba(255,255,255,0.02)', borderColor: 'rgba(255,255,255,0.05)' }}>
              <button
                onClick={() => setShowTip(!showTip)}
                className="w-full flex items-center gap-3 p-3.5"
              >
                <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'rgba(255,215,0,0.1)' }}>
                  <Lightbulb size={16} style={{ color: '#ffd700' }} />
                </div>
                <span className="text-sm font-medium text-white flex-1 text-left">Tip de Apoyo</span>
                <motion.span
                  animate={{ rotate: showTip ? 180 : 0 }}
                  className="text-xs" style={{ color: 'rgba(255,255,255,0.3)' }}
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
                    <p className="px-3.5 pb-3.5 text-xs leading-relaxed" style={{ color: 'rgba(255,255,255,0.55)' }}>
                      {mission.tip_ayuda}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Complete Button */}
            {justCompleted ? (
              <motion.div
                className="w-full py-3.5 rounded-xl flex items-center justify-center gap-2"
                style={{ background: 'rgba(0,255,65,0.15)' }}
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
              >
                <CheckCircle2 size={20} style={{ color: '#00ff41' }} />
                <span className="font-bold" style={{ color: '#00ff41' }}>¡Misión Completada!</span>
              </motion.div>
            ) : isCompleted ? (
              <div className="w-full py-3.5 rounded-xl flex items-center justify-center gap-2" style={{ background: 'rgba(0,255,65,0.08)' }}>
                <CheckCircle2 size={20} style={{ color: '#00ff41' }} />
                <span className="font-medium" style={{ color: 'rgba(0,255,65,0.7)' }}>Completada</span>
              </div>
            ) : (
              <motion.button
                onClick={handleComplete}
                className="w-full py-3.5 rounded-xl font-bold text-black text-sm"
                style={{ background: 'linear-gradient(135deg, #00ff41, #00d4ff)' }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
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
