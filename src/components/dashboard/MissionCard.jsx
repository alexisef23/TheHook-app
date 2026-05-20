import { motion } from 'framer-motion';
import { CheckCircle2, Lock, Crown, ChevronRight } from 'lucide-react';

export default function MissionCard({ mission, isCompleted, onClick, isLocked }) {
  const isBoss = mission.es_jefe;

  return (
    <motion.button
      onClick={() => !isLocked && onClick(mission)}
      className="w-full text-left rounded-xl p-3.5 border transition-all relative overflow-hidden group"
      style={{
        background: isCompleted
          ? 'rgba(0,255,65,0.05)'
          : isBoss
            ? 'rgba(255,215,0,0.03)'
            : 'rgba(255,255,255,0.02)',
        borderColor: isCompleted
          ? 'rgba(0,255,65,0.2)'
          : isBoss
            ? 'rgba(255,215,0,0.15)'
            : 'rgba(255,255,255,0.05)',
        opacity: isLocked ? 0.4 : 1,
        cursor: isLocked ? 'not-allowed' : 'pointer'
      }}
      whileHover={!isLocked ? { scale: 1.01 } : {}}
      whileTap={!isLocked ? { scale: 0.98 } : {}}
      layout
    >
      {/* Boss glow effect */}
      {isBoss && !isCompleted && (
        <motion.div
          className="absolute inset-0 rounded-xl"
          style={{
            background: 'linear-gradient(135deg, rgba(255,215,0,0.05), transparent)',
            boxShadow: '0 0 30px rgba(255,215,0,0.05)'
          }}
          animate={{ opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 3, repeat: Infinity }}
        />
      )}

      <div className="flex items-center gap-3 relative z-10">
        {/* Status Icon */}
        <div className="flex-shrink-0">
          {isCompleted ? (
            <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ background: 'rgba(0,255,65,0.15)' }}>
              <CheckCircle2 size={18} style={{ color: '#00ff41' }} />
            </div>
          ) : isLocked ? (
            <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ background: 'rgba(255,255,255,0.05)' }}>
              <Lock size={18} style={{ color: 'rgba(255,255,255,0.2)' }} />
            </div>
          ) : isBoss ? (
            <motion.div
              className="w-9 h-9 rounded-lg flex items-center justify-center"
              style={{ background: 'rgba(255,215,0,0.15)' }}
              animate={{ boxShadow: ['0 0 0px rgba(255,215,0,0)', '0 0 15px rgba(255,215,0,0.3)', '0 0 0px rgba(255,215,0,0)'] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Crown size={18} style={{ color: '#ffd700' }} />
            </motion.div>
          ) : (
            <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ background: 'rgba(0,212,255,0.1)' }}>
              <span className="text-xs font-mono font-bold" style={{ color: '#00d4ff' }}>#{mission.orden}</span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            {isBoss && <span className="text-[10px] font-bold px-1.5 py-0.5 rounded" style={{ background: 'rgba(255,215,0,0.15)', color: '#ffd700' }}>JEFE</span>}
            <h3 className="text-sm font-semibold text-white truncate">{mission.titulo}</h3>
          </div>
          <p className="text-xs mt-0.5 line-clamp-1" style={{ color: 'rgba(255,255,255,0.4)' }}>{mission.descripcion}</p>
        </div>

        {/* XP + Arrow */}
        <div className="flex items-center gap-1.5 flex-shrink-0">
          <span className="text-xs font-mono font-bold" style={{ color: isBoss ? '#ffd700' : '#00ff41' }}>+{mission.xp}</span>
          <ChevronRight size={14} style={{ color: 'rgba(255,255,255,0.2)' }} />
        </div>
      </div>
    </motion.button>
  );
}
