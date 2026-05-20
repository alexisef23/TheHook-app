import { motion } from 'framer-motion';
import { CheckCircle2, Lock, Crown, ChevronRight } from 'lucide-react';

export default function MissionCard({ mission, isCompleted, onClick, isLocked }) {
  const isBoss = mission.es_jefe;

  return (
    <motion.button
      onClick={() => !isLocked && onClick(mission)}
      className="w-full text-left rounded-xl p-4 border transition-all relative overflow-hidden group"
      style={{
        background: isCompleted
          ? 'rgba(0,255,65,0.08)'
          : isBoss
            ? 'rgba(255,215,0,0.08)'
            : 'rgba(255,255,255,0.04)',
        borderColor: isCompleted
          ? 'rgba(0,255,65,0.35)'
          : isBoss
            ? 'rgba(255,215,0,0.25)'
            : 'rgba(255,255,255,0.12)',
        opacity: isLocked ? 0.5 : 1,
        cursor: isLocked ? 'not-allowed' : 'pointer',
        boxShadow: isCompleted
          ? '0 0 20px rgba(0,255,65,0.08)'
          : isBoss
            ? '0 0 20px rgba(255,215,0,0.06)'
            : 'none'
      }}
      whileHover={!isLocked ? { scale: 1.02, borderColor: isCompleted ? 'rgba(0,255,65,0.5)' : 'rgba(255,255,255,0.2)' } : {}}
      whileTap={!isLocked ? { scale: 0.97 } : {}}
      layout
    >
      {/* Boss glow effect */}
      {isBoss && !isCompleted && (
        <motion.div
          className="absolute inset-0 rounded-xl"
          style={{
            background: 'linear-gradient(135deg, rgba(255,215,0,0.1), transparent)',
            boxShadow: '0 0 40px rgba(255,215,0,0.1)'
          }}
          animate={{ opacity: [0.4, 0.7, 0.4] }}
          transition={{ duration: 3, repeat: Infinity }}
        />
      )}

      <div className="flex items-center gap-3.5 relative z-10">
        {/* Status Icon */}
        <div className="flex-shrink-0">
          {isCompleted ? (
            <motion.div
              className="w-10 h-10 rounded-lg flex items-center justify-center"
              style={{ background: 'rgba(0,255,65,0.2)' }}
              animate={{ boxShadow: ['0 0 0px rgba(0,255,65,0)', '0 0 12px rgba(0,255,65,0.2)', '0 0 0px rgba(0,255,65,0)'] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <CheckCircle2 size={20} style={{ color: '#00ff41' }} />
            </motion.div>
          ) : isLocked ? (
            <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: 'rgba(255,255,255,0.08)' }}>
              <Lock size={19} style={{ color: 'rgba(255,255,255,0.25)' }} />
            </div>
          ) : isBoss ? (
            <motion.div
              className="w-10 h-10 rounded-lg flex items-center justify-center"
              style={{ background: 'rgba(255,215,0,0.2)' }}
              animate={{ boxShadow: ['0 0 0px rgba(255,215,0,0)', '0 0 18px rgba(255,215,0,0.4)', '0 0 0px rgba(255,215,0,0)'] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Crown size={20} style={{ color: '#ffd700' }} />
            </motion.div>
          ) : (
            <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: 'rgba(0,212,255,0.15)' }}>
              <span className="text-xs font-mono font-bold" style={{ color: '#00d4ff' }}>#{mission.orden}</span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2.5">
            {isBoss && <span className="text-[9px] font-bold px-2 py-0.5 rounded-full" style={{ background: 'rgba(255,215,0,0.2)', color: '#ffd700' }}>👑 JEFE</span>}
            <h3 className="text-sm font-bold text-white truncate">{mission.titulo}</h3>
          </div>
          <p className="text-xs mt-1 line-clamp-1" style={{ color: 'rgba(255,255,255,0.5)' }}>{mission.descripcion}</p>
        </div>

        {/* XP + Arrow */}
        <div className="flex items-center gap-2 flex-shrink-0">
          <div className="text-right">
            <span className="text-xs font-mono font-bold block" style={{ color: isBoss ? '#ffd700' : '#00ff41' }}>+{mission.xp}</span>
            <span className="text-[9px]" style={{ color: 'rgba(255,255,255,0.25)' }}>XP</span>
          </div>
          <motion.div
            animate={{ x: [0, 3, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <ChevronRight size={16} style={{ color: 'rgba(255,255,255,0.3)' }} />
          </motion.div>
        </div>
      </div>
    </motion.button>
  );
}
