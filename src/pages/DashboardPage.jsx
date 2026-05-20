import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, X, Award, Map, Bookmark } from 'lucide-react';
import PhaseAccordion from '../components/dashboard/PhaseAccordion';
import MissionModal from '../components/mission/MissionModal';
import { phases } from '../data/missions';

export default function DashboardPage({
  missions = [],
  isMissionCompleted,
  completeMission,
  addCustomMission,
  getPhaseProgress,
}) {
  const [selectedMission, setSelectedMission] = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // Form states
  const [customTitle, setCustomTitle] = useState('');
  const [customDesc, setCustomDesc] = useState('');
  const [customPhase, setCustomPhase] = useState('1');
  const [customXP, setCustomXP] = useState('50');

  const handleSubmitCustom = (e) => {
    e.preventDefault();
    if (!customTitle || !customDesc) return;

    addCustomMission(customTitle, customDesc, customPhase, customXP);

    // Reset and close
    setCustomTitle('');
    setCustomDesc('');
    setCustomPhase('1');
    setCustomXP('50');
    setIsAddModalOpen(false);
  };

  return (
    <div className="px-4 py-4 pb-24">
      {/* Header and Add Action */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-5 flex items-center justify-between"
      >
        <div>
          <h2 className="text-lg font-bold text-white tracking-wide">Misiones</h2>
          <p className="text-xs" style={{ color: 'rgba(255,255,255,0.35)' }}>
            Supera desafíos para subir tu rango social
          </p>
        </div>
        <motion.button
          onClick={() => setIsAddModalOpen(true)}
          className="p-2.5 rounded-xl border flex items-center justify-center gap-1.5 transition-all text-xs font-semibold text-white cursor-pointer"
          style={{
            background: 'rgba(0, 255, 65, 0.08)',
            borderColor: 'rgba(0, 255, 65, 0.3)',
            boxShadow: '0 0 15px rgba(0, 255, 65, 0.05)',
          }}
          whileHover={{ scale: 1.05, boxShadow: '0 0 20px rgba(0,255,65,0.15)' }}
          whileTap={{ scale: 0.95 }}
        >
          <Plus size={16} style={{ color: '#00ff41' }} />
          <span>Misión +</span>
        </motion.button>
      </motion.div>

      {/* Accordeons of phases */}
      <div className="flex flex-col gap-4 md:gap-6">
        {phases.map((phase, index) => (
          <motion.div
            key={phase.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <PhaseAccordion
              phase={phase}
              missions={missions.filter((m) => m.fase === phase.id)}
              phaseProgress={getPhaseProgress(phase.id)}
              isMissionCompleted={isMissionCompleted}
              onMissionClick={setSelectedMission}
            />
          </motion.div>
        ))}
      </div>

      {/* Mission Detail Modal */}
      {selectedMission && (
        <MissionModal
          mission={selectedMission}
          isCompleted={isMissionCompleted(selectedMission.id)}
          onComplete={completeMission}
          onClose={() => setSelectedMission(null)}
        />
      )}

      {/* Add Custom Mission Modal Overlay */}
      <AnimatePresence>
        {isAddModalOpen && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Backdrop bounded inside mobile container if active */}
            <div
              className="absolute inset-0 bg-black/85 backdrop-blur-md"
              onClick={() => setIsAddModalOpen(false)}
            />

            {/* Modal Dialog */}
            <motion.div
              className="relative w-full max-w-md rounded-2xl border p-5 sm:p-6 overflow-y-auto max-h-[90vh] z-10 scrollbar-hide"
              style={{
                background: '#0d0d14',
                borderColor: 'rgba(255,255,255,0.08)',
                boxShadow: '0 10px 40px rgba(0,0,0,0.8), 0 0 2px rgba(255,255,255,0.05)',
              }}
              initial={{ scale: 0.9, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 15 }}
            >
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-2">
                  <Award size={16} className="text-[#00ff41] flex-shrink-0" />
                  <h3 className="text-xs sm:text-sm font-bold text-white tracking-wider font-mono">
                    NUEVA MISIÓN PERSONALIZADA
                  </h3>
                </div>
                <button
                  onClick={() => setIsAddModalOpen(false)}
                  className="p-1.5 rounded-full cursor-pointer hover:bg-white/10 transition-colors"
                  style={{ background: 'rgba(255,255,255,0.05)' }}
                >
                  <X size={14} style={{ color: 'rgba(255,255,255,0.4)' }} />
                </button>
              </div>

              <form onSubmit={handleSubmitCustom} className="flex flex-col gap-4">
                <div>
                  <label className="text-[10px] font-semibold text-white/50 tracking-wider mb-1 block">
                    TÍTULO DEL DESAFÍO
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Ej. Saludar de mano con firmeza"
                    value={customTitle}
                    onChange={(e) => setCustomTitle(e.target.value)}
                    className="w-full py-2.5 px-3 rounded-xl text-xs text-white bg-[#12121c] border border-white/10 outline-none focus:border-[#00ff41]/40 focus:bg-[#151522] transition-all placeholder-white/20"
                  />
                </div>

                <div>
                  <label className="text-[10px] font-semibold text-white/50 tracking-wider mb-1 block">
                    DESCRIPCIÓN DE LA ACCIÓN
                  </label>
                  <textarea
                    required
                    rows="3"
                    placeholder="Ej. Mantén el agarre seguro durante 2 segundos y haz un cumplido sobre su energía o vibra."
                    value={customDesc}
                    onChange={(e) => setCustomDesc(e.target.value)}
                    className="w-full py-2.5 px-3 rounded-xl text-xs text-white bg-[#12121c] border border-white/10 outline-none focus:border-[#00ff41]/40 focus:bg-[#151522] transition-all placeholder-white/20 resize-none leading-relaxed"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div>
                    <label className="text-[10px] font-semibold text-white/50 tracking-wider mb-1 block">
                      FASE SOCIAL
                    </label>
                    <select
                      value={customPhase}
                      onChange={(e) => setCustomPhase(e.target.value)}
                      className="w-full py-2.5 px-3 rounded-xl text-xs text-white bg-[#12121c] border border-white/10 outline-none focus:border-[#00ff41]/40 focus:bg-[#151522] transition-all cursor-pointer"
                      style={{ colorScheme: 'dark' }}
                    >
                      <option value="1" className="bg-[#12121c] text-white">Fase 1: Rompehielos</option>
                      <option value="2" className="bg-[#12121c] text-white">Fase 2: Conexión</option>
                      <option value="3" className="bg-[#12121c] text-white">Fase 3: Dominio</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-[10px] font-semibold text-white/50 tracking-wider mb-1 block">
                      XP RECOMPENSA
                    </label>
                    <input
                      type="number"
                      required
                      min="10"
                      max="500"
                      value={customXP}
                      onChange={(e) => setCustomXP(e.target.value)}
                      className="w-full py-2.5 px-3 rounded-xl text-xs text-white bg-[#12121c] border border-white/10 outline-none focus:border-[#00ff41]/40 focus:bg-[#151522] transition-all"
                    />
                  </div>
                </div>

                <motion.button
                  type="submit"
                  className="w-full py-3 rounded-xl font-bold text-black text-xs mt-2 cursor-pointer flex items-center justify-center gap-1.5 shadow-lg"
                  style={{
                    background: 'linear-gradient(135deg, #00ff41, #00d4ff)',
                    boxShadow: '0 4px 15px rgba(0, 255, 65, 0.2)',
                  }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Plus size={14} className="stroke-[3]" />
                  Registrar y Completar
                </motion.button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
