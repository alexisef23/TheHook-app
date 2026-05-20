import { motion } from 'framer-motion';
import { Trophy, Zap, Target, RotateCcw, Flame } from 'lucide-react';
import ProgressRing from '../components/dashboard/ProgressRing';
import { phases } from '../data/missions';

export default function ProfilePage({
  missions = [],
  getTotalXP,
  getMaxXP,
  getPhaseProgress,
  isMissionCompleted,
  resetProgress,
}) {
  const totalXP = getTotalXP();
  const maxXP = getMaxXP();
  const level = Math.floor(totalXP / 200) + 1;
  const completedCount = missions.filter((m) => isMissionCompleted(m.id)).length;
  const bossesCompleted = missions.filter((m) => m.es_jefe && isMissionCompleted(m.id)).length;
  const totalBosses = missions.filter((m) => m.es_jefe).length;

  const stats = [
    { label: 'Nivel', value: level, icon: Zap, color: '#00ff41' },
    { label: 'XP Total', value: totalXP, icon: Trophy, color: '#ffd700' },
    { label: 'Misiones', value: `${completedCount}/${missions.length}`, icon: Target, color: '#00d4ff' },
    { label: 'Jefes', value: `${bossesCompleted}/${totalBosses}`, icon: Flame, color: '#ff8c00' },
  ];

  return (
    <div className="px-4 py-4 pb-24">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
        <h2 className="text-lg font-bold text-white mb-1">Tu Perfil</h2>
        <p className="text-xs mb-5" style={{ color: 'rgba(255,255,255,0.35)' }}>
          Tu progreso en la conquista social
        </p>
      </motion.div>

      {/* Level / User Card with Profile Picture */}
      {/* Grid container for responsive desktop view */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Avatar + Stats + Reset */}
        <div className="lg:col-span-7 flex flex-col gap-4">
          {/* Level / User Card with Profile Picture */}
          <motion.div
            className="rounded-2xl p-5 border relative overflow-hidden"
            style={{
              background: 'linear-gradient(135deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.01) 100%)',
              borderColor: 'rgba(255,255,255,0.07)',
              boxShadow: '0 8px 32px rgba(0,0,0,0.3)'
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
          >
            <div
              className="absolute top-0 right-0 w-32 h-32 rounded-full"
              style={{
                background: 'radial-gradient(circle, rgba(0,255,65,0.06), transparent 70%)',
                transform: 'translate(20%, -20%)',
              }}
            />
            <div className="flex items-center gap-4 relative z-10">
              {/* Avatar Container with Glowing Neon Green Border */}
              <div className="relative flex-shrink-0">
                <div
                  className="w-20 h-20 rounded-full overflow-hidden p-0.5 border flex items-center justify-center bg-[#0d0d14]"
                  style={{
                    borderColor: '#00ff41',
                    boxShadow: '0 0 20px rgba(0, 255, 65, 0.35)',
                  }}
                >
                  <div className="w-full h-full rounded-full overflow-hidden border border-white/10 bg-[#12121c]">
                    <img
                      src="/canek_profile.jpg"
                      alt="Canek Profile"
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.style.display = 'none';
                      }}
                    />
                  </div>
                </div>
                {/* Level Badge Bubble */}
                <div
                  className="absolute -bottom-0.5 -right-0.5 w-6.5 h-6.5 rounded-full flex items-center justify-center text-[10px] font-mono font-bold text-black border shadow-lg"
                  style={{
                    background: 'linear-gradient(135deg, #00ff41, #00d4ff)',
                    borderColor: '#0a0a0f',
                  }}
                >
                  {level}
                </div>
              </div>

              <div className="flex-1">
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00ff41] animate-pulse" />
                  <p className="text-[8px] font-bold tracking-widest font-mono text-[#00ff41] uppercase">
                    AGENTE DE CAMPO ACTIVO
                  </p>
                </div>
                <p className="text-2xl font-black text-white tracking-wide mt-0.5 shadow-sm">Canek</p>
                <p className="text-xs font-medium text-white/55 mt-0.5">
                  {level <= 2
                    ? 'Novato Social'
                    : level <= 5
                    ? 'Conector'
                    : level <= 8
                    ? 'Influencer Social'
                    : 'Maestro Social'}
                </p>

                <div className="w-full h-1.5 rounded-full mt-4" style={{ background: 'rgba(255,255,255,0.06)' }}>
                  <motion.div
                    className="h-full rounded-full shadow-[0_0_10px_rgba(0,255,65,0.3)]"
                    style={{ background: 'linear-gradient(90deg, #00ff41, #00d4ff)' }}
                    initial={{ width: 0 }}
                    animate={{ width: `${(totalXP / maxXP) * 100}%` }}
                    transition={{ duration: 1, delay: 0.3 }}
                  />
                </div>
                <p className="text-[9px] mt-1.5 font-mono text-white/35 font-bold">
                  {totalXP} / {maxXP} XP
                </p>
              </div>
            </div>
          </motion.div>

          {/* Stats Grid - 4 Columns on md/sm */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={stat.label}
                  className="rounded-2xl p-4 border relative overflow-hidden transition-all group"
                  style={{
                    background: 'linear-gradient(135deg, rgba(255,255,255,0.02) 0%, rgba(255,255,255,0.005) 100%)',
                    borderColor: 'rgba(255,255,255,0.05)',
                  }}
                  whileHover={{ scale: 1.02, borderColor: 'rgba(255,255,255,0.1)' }}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + index * 0.05 }}
                >
                  <div className="flex items-center gap-2 mb-2 relative z-10">
                    <Icon size={14} style={{ color: stat.color }} />
                    <span className="text-[9px] font-bold tracking-wider font-mono text-white/40">
                      {stat.label.toUpperCase()}
                    </span>
                  </div>
                  <p className="text-2xl font-mono font-black text-white relative z-10">{stat.value}</p>
                </motion.div>
              );
            })}
          </div>

          {/* Reset Button */}
          <motion.button
            onClick={() => {
              if (
                window.confirm(
                  '¿Seguro que quieres reiniciar todo tu progreso (incluidas tus misiones personalizadas)? Esta acción no se puede deshacer.'
                )
              ) {
                resetProgress();
              }
            }}
            className="w-full py-3 rounded-xl text-xs font-medium flex items-center justify-center gap-2 border border-red-500/10 hover:border-red-500/35 hover:bg-red-500/5 transition-all text-red-500/60 hover:text-red-500 cursor-pointer"
            whileTap={{ scale: 0.98 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <RotateCcw size={14} />
            Reiniciar Progreso
          </motion.button>
        </div>

        {/* Right Column: Phase Progress */}
        <div className="lg:col-span-5">
          <motion.div
            className="rounded-2xl border p-5 h-full"
            style={{ background: 'rgba(255,255,255,0.02)', borderColor: 'rgba(255,255,255,0.05)' }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h3 className="text-sm font-bold text-white mb-4">Progreso por Fase</h3>
            <div className="flex flex-col gap-4">
              {phases.map((phase) => {
                const prog = getPhaseProgress(phase.id);
                return (
                  <div key={phase.id} className="flex items-center gap-4 p-2.5 rounded-xl border border-white/0 hover:border-white/5 hover:bg-white/[0.01] transition-all">
                    <ProgressRing completed={prog.completed} total={prog.total} size={40} strokeWidth={3} />
                    <div className="flex-1">
                      <p className="text-xs font-semibold text-white">
                        Fase {phase.id}: {phase.nombre}
                      </p>
                      <p className="text-[10px]" style={{ color: 'rgba(255,255,255,0.35)' }}>
                        {phase.subtitulo}
                      </p>
                    </div>
                    <span
                      className="text-xs font-mono font-bold"
                      style={{ color: prog.completed === prog.total ? '#00ff41' : 'rgba(255,255,255,0.3)' }}
                    >
                      {prog.completed === prog.total ? '✓' : `${prog.completed}/${prog.total}`}
                    </span>
                  </div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
