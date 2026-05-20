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
        borderColor: allCompleted ? 'rgba(0,255,65,0.3)' : 'rgba(255,255,255,0.1)',
        boxShadow: allCompleted ? '0 0 25px rgba(0,255,65,0.1)' : 'none'
      }}
      layout
    >
      {/* Accordion Header */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center gap-4 px-5 py-4.5 transition-colors"
        whileTap={{ scale: 0.99 }}
      >
        <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: `${color}18` }}>
          <Icon size={22} style={{ color }} />
        </div>

        <div className="flex-1 text-left">
          <div className="flex items-center gap-2.5">
            <h2 className="text-base font-bold text-white">Fase {phase.id}</h2>
            <span className="text-[11px] font-bold px-2.5 py-1 rounded-full tracking-wide" style={{ background: `${color}18`, color }}>{phase.subtitulo}</span>
          </div>
          <p className="text-xs mt-1.5" style={{ color: 'rgba(255,255,255,0.45)' }}>{phase.nombre}</p>
        </div>

        <ProgressRing completed={phaseProgress.completed} total={phaseProgress.total} />

        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <ChevronDown size={20} style={{ color: 'rgba(255,255,255,0.4)' }} />
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
            <div className="px-5 pb-6 pt-2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4.5">
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
