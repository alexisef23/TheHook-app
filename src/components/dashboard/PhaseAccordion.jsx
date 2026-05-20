import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Flame, Snowflake, Zap } from 'lucide-react';
import MissionCard from './MissionCard';
import ProgressRing from './ProgressRing';

const phaseIcons = {
  1: Snowflake,
  2: Flame,
  3: Zap
};

const phaseColors = {
  1: '#00d4ff',
  2: '#ff8c00',
  3: '#ff0040'
};

export default function PhaseAccordion({ phase, missions, phaseProgress, isMissionCompleted, onMissionClick }) {
  const [isOpen, setIsOpen] = useState(phase.id === 1);
  const Icon = phaseIcons[phase.id] || Zap;
  const color = phaseColors[phase.id];
  const allCompleted = phaseProgress.completed === phaseProgress.total;

  return (
    <motion.div
      className="rounded-2xl border overflow-hidden"
      style={{
        background: 'rgba(255,255,255,0.02)',
        borderColor: allCompleted ? 'rgba(0,255,65,0.2)' : 'rgba(255,255,255,0.05)'
      }}
      layout
    >
      {/* Accordion Header */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center gap-3 p-4 transition-colors"
        whileTap={{ scale: 0.99 }}
      >
        <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: `${color}15` }}>
          <Icon size={20} style={{ color }} />
        </div>

        <div className="flex-1 text-left">
          <div className="flex items-center gap-2">
            <h2 className="text-sm font-bold text-white">Fase {phase.id}</h2>
            <span className="text-[10px] font-medium px-2 py-0.5 rounded-full" style={{ background: `${color}15`, color }}>{phase.subtitulo}</span>
          </div>
          <p className="text-xs mt-0.5" style={{ color: 'rgba(255,255,255,0.35)' }}>{phase.nombre}</p>
        </div>

        <ProgressRing completed={phaseProgress.completed} total={phaseProgress.total} />

        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <ChevronDown size={18} style={{ color: 'rgba(255,255,255,0.3)' }} />
        </motion.div>
      </motion.button>

      {/* Missions List */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div className="px-4 pb-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {missions.map((mission, index) => (
                <motion.div
                  key={mission.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <MissionCard
                    mission={mission}
                    isCompleted={isMissionCompleted(mission.id)}
                    onClick={onMissionClick}
                    isLocked={false}
                  />
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
