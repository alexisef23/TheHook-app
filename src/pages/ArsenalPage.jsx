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
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [expandedTips, setExpandedTips] = useState({});

  const toggleExpand = (id) => {
    setExpandedTips(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const categories = [...new Set(missions.map(m => m.categoria_tip))];

  const filteredMissions = missions.filter(m => {
    const matchesSearch = searchQuery === '' ||
      m.titulo.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.tip_ayuda.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === 'all' || m.categoria_tip === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="px-4 py-4 pb-24">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
        <h2 className="text-lg font-bold text-white mb-1">Arsenal de Tips</h2>
        <p className="text-xs mb-4" style={{ color: 'rgba(255,255,255,0.35)' }}>Tu guía táctica para cada situación</p>
      </motion.div>

      {/* Search */}
      <motion.div
        className="relative mb-5"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.05 }}
      >
        <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2" style={{ color: 'rgba(255,255,255,0.45)' }} />
        <input
          type="text"
          placeholder="Buscar tips..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-10.5 pr-4 py-2.5 rounded-xl text-sm text-white placeholder-white/30 border outline-none focus:border-[#00ff41]/40 focus:bg-white/5 transition-all shadow-[0_0_15px_rgba(0,0,0,0.2)]"
          style={{ background: 'rgba(255,255,255,0.04)', borderColor: 'rgba(255,255,255,0.08)' }}
        />
      </motion.div>

      {/* Category Filters */}
      <motion.div
        className="flex gap-2 mb-6 overflow-x-auto pb-2.5 scrollbar-hide -mx-4 px-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
      >
        <button
          onClick={() => setActiveCategory('all')}
          className="px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap border transition-all"
          style={{
            background: activeCategory === 'all' ? 'rgba(0,255,65,0.1)' : 'transparent',
            borderColor: activeCategory === 'all' ? 'rgba(0,255,65,0.3)' : 'rgba(255,255,255,0.08)',
            color: activeCategory === 'all' ? '#00ff41' : 'rgba(255,255,255,0.5)'
          }}
        >
          Todos
        </button>
        {categories.map(cat => {
          const color = categoryColors[cat] || '#00ff41';
          return (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className="px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap border transition-all"
              style={{
                background: activeCategory === cat ? `${color}15` : 'transparent',
                borderColor: activeCategory === cat ? `${color}40` : 'rgba(255,255,255,0.08)',
                color: activeCategory === cat ? color : 'rgba(255,255,255,0.5)'
              }}
            >
              {cat}
            </button>
          );
        })}
      </motion.div>

      {/* Tips Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <AnimatePresence mode="popLayout">
          {filteredMissions.map((mission, index) => {
            const Icon = categoryIcons[mission.categoria_tip] || Lightbulb;
            const color = categoryColors[mission.categoria_tip] || '#00ff41';
            const isExpanded = !!expandedTips[mission.id];
            return (
              <motion.div
                key={mission.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ delay: index * 0.03 }}
                onClick={() => toggleExpand(mission.id)}
                className="rounded-xl border p-4.5 cursor-pointer hover:border-white/10 transition-colors select-none group flex flex-col justify-between"
                style={{
                  background: isExpanded ? 'rgba(255,255,255,0.03)' : 'rgba(255,255,255,0.015)',
                  borderColor: isExpanded ? `${color}40` : 'rgba(255,255,255,0.05)',
                  boxShadow: isExpanded ? `0 0 20px ${color}05` : 'none'
                }}
              >
                <div>
                  <div className="flex items-start justify-between gap-2 mb-3.5">
                    <div className="flex items-center gap-3">
                      <div className="w-8.5 h-8.5 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: `${color}15` }}>
                        <Icon size={16} style={{ color }} />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="text-sm font-semibold text-white group-hover:text-[#00ff41] transition-colors">{mission.titulo}</h3>
                          {mission.es_jefe && <span className="text-[8px] font-bold px-1.5 py-0.5 rounded tracking-wide" style={{ background: 'rgba(255,215,0,0.15)', color: '#ffd700' }}>JEFE</span>}
                        </div>
                        <span className="text-[10px] font-medium tracking-wide" style={{ color }}>{mission.categoria_tip}</span>
                      </div>
                    </div>

                    <motion.div
                      animate={{ rotate: isExpanded ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                      className="p-1 rounded-full bg-white/5 opacity-55 group-hover:opacity-100 transition-opacity"
                    >
                      <ChevronDown size={14} className="text-white" />
                    </motion.div>
                  </div>

                  <motion.div
                    layout="position"
                    className="overflow-hidden"
                  >
                    <p
                      className={`text-xs leading-relaxed transition-all duration-300 ${
                        isExpanded ? 'text-white/80' : 'text-white/45 line-clamp-2'
                      }`}
                    >
                      {mission.tip_ayuda}
                    </p>
                  </motion.div>
                </div>

                <div className="mt-3.5 pt-2.5 border-t border-white/5 flex items-center justify-between">
                  <span className="text-[9px] text-white/25 font-mono">
                    {isExpanded ? 'Clic para cerrar' : 'Clic para abrir'}
                  </span>
                  <span
                    className="text-[10px] font-bold tracking-wide transition-all"
                    style={{ color: isExpanded ? '#ffffff' : color }}
                  >
                    {isExpanded ? 'Contraer ▲' : 'Ver Tip ▼'}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {filteredMissions.length === 0 && (
        <div className="text-center py-12">
          <Search size={32} style={{ color: 'rgba(255,255,255,0.1)' }} className="mx-auto mb-3" />
          <p className="text-sm" style={{ color: 'rgba(255,255,255,0.3)' }}>No se encontraron tips</p>
        </div>
      )}
    </div>
  );
}
