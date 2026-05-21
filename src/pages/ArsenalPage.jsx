import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Eye, MessageSquare, Users, Lightbulb, ChevronDown } from 'lucide-react';

const categoryIcons = {
  'Lenguaje Corporal': Eye,
  'Conversación': MessageSquare,
  'Lectura Social': Users
};

const categoryColors = {
  'Lenguaje Corporal': '#00d4ff',
  'Conversación': '#00ff41',
  'Lectura Social': '#ff8c00'
};

export default function ArsenalPage({ missions = [] }) {
  const [expandedTips, setExpandedTips] = useState({});
  const [searchQuery, setSearchQuery] = useState('');

  const toggleExpand = (id) => {
    setExpandedTips(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const filteredMissions = missions.filter(mission => 
    (mission.titulo?.toLowerCase() || '').includes(searchQuery.toLowerCase()) ||
    (mission.categoria_tip?.toLowerCase() || '').includes(searchQuery.toLowerCase())
  );

  return (
    <div className="px-3.5 sm:px-5 py-5 pb-28">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mb-5">
        <h2 className="text-xl font-bold text-white tracking-wider">🎯 Arsenal de Tips</h2>
        <p className="text-xs mt-1" style={{ color: 'rgba(255,255,255,0.45)' }}>Tu guía táctica para cada situación</p>
      </motion.div>

      {/* Search */}
      <motion.div
        className="relative mb-6 group"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.05 }}
      >
        <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40 pointer-events-none group-focus-within:text-[#00ff41] transition-colors" />
        <input
          type="text"
          placeholder="Buscar tips..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-12 pr-4 py-3 rounded-xl text-sm text-white placeholder-white/25 border outline-none bg-[#12121c] border-white/10 focus:border-[#00ff41]/40 focus:bg-[#151522] focus:shadow-[0_0_20px_rgba(0,255,65,0.08)] transition-all"
        />
      </motion.div>

      {/* Tips List */}
      <div className="mt-6 flex flex-col gap-3">
        <AnimatePresence mode="popLayout">
          {filteredMissions.map((mission, index) => {
            const Icon = categoryIcons[mission.categoria_tip] || Lightbulb;
            const color = categoryColors[mission.categoria_tip] || '#00ff41';
            const isExpanded = !!expandedTips[mission.id];
            return (
              <motion.div
                key={mission.id}
                layout
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ delay: index * 0.02 }}
                onClick={() => toggleExpand(mission.id)}
                className="rounded-lg border p-4 cursor-pointer hover:border-white/30 transition-all select-none group"
                style={{
                  background: isExpanded ? 'rgba(255,255,255,0.08)' : 'rgba(255,255,255,0.04)',
                  borderColor: isExpanded ? `${color}60` : 'rgba(255,255,255,0.1)',
                  boxShadow: isExpanded ? `0 0 25px ${color}15` : 'none'
                }}
              >
                <div className="flex items-center gap-3 justify-between">
                  <div className="flex items-center gap-3.5 flex-1">
                    <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: `${color}20` }}>
                      <Icon size={16} style={{ color }} />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h3 className="text-sm font-bold text-white group-hover:text-[#00ff41] transition-colors">{mission.titulo}</h3>
                        {mission.es_jefe && <span className="text-[8px] font-bold px-1.5 py-0.5 rounded-full tracking-widest" style={{ background: 'rgba(255,215,0,0.2)', color: '#ffd700' }}>👑</span>}
                      </div>
                    </div>
                  </div>

                  <motion.div
                    animate={{ rotate: isExpanded ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                    className="p-1.5 rounded-full bg-white/8 opacity-60 group-hover:opacity-100 transition-opacity flex-shrink-0"
                  >
                    <ChevronDown size={14} className="text-white" />
                  </motion.div>
                </div>

                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <div className="pt-3 mt-3 border-t border-white/10">
                        <p className="text-xs leading-relaxed text-white/75 mb-2">
                          {mission.tip_ayuda}
                        </p>
                        <div className="flex items-center justify-between pt-2">
                          <span className="text-[10px] font-mono text-white/40">{mission.categoria_tip}</span>
                          <span className="text-xs font-bold" style={{ color }}>✓ Tip</span>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {missions.length === 0 && (
        <div className="text-center py-12 mt-6">
          <Lightbulb size={40} style={{ color: 'rgba(255,255,255,0.08)' }} className="mx-auto mb-4" />
          <p className="text-sm" style={{ color: 'rgba(255,255,255,0.4)' }}>No hay tips disponibles</p>
        </div>
      )}
    </div>
  );
}
