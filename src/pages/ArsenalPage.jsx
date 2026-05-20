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
    <div className="px-3.5 sm:px-5 py-5 pb-28">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
        <h2 className="text-xl font-bold text-white tracking-wider">🎯 Arsenal de Tips</h2>
        <p className="text-xs mt-1" style={{ color: 'rgba(255,255,255,0.45)' }}>Tu guía táctica para cada situación</p>
      </motion.div>

      {/* Search */}
      <motion.div
        className="relative mb-6 mt-5"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.05 }}
      >
        <Search size={20} className="absolute left-3.5 top-1/2 -translate-y-1/2" style={{ color: 'rgba(255,255,255,0.55)' }} />
        <input
          type="text"
          placeholder="Buscar tips..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-12 pr-4.5 py-3 rounded-xl text-sm text-white placeholder-white/35 border outline-none focus:border-[#00ff41]/50 focus:bg-white/6 transition-all shadow-[0_0_20px_rgba(0,0,0,0.3)]"
          style={{ background: 'rgba(255,255,255,0.06)', borderColor: 'rgba(255,255,255,0.12)' }}
        />
      </motion.div>

      {/* Category Filters */}
      <motion.div
        className="flex gap-2.5 mb-8 overflow-x-auto pb-3 scrollbar-hide -mx-3.5 sm:-mx-5 px-3.5 sm:px-5"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
      >
        <button
          onClick={() => setActiveCategory('all')}
          className="px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap border transition-all tracking-wide"
          style={{
            background: activeCategory === 'all' ? 'rgba(0,255,65,0.15)' : 'transparent',
            borderColor: activeCategory === 'all' ? 'rgba(0,255,65,0.4)' : 'rgba(255,255,255,0.1)',
            color: activeCategory === 'all' ? '#00ff41' : 'rgba(255,255,255,0.6)',
            boxShadow: activeCategory === 'all' ? '0 0 15px rgba(0,255,65,0.1)' : 'none'
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
              className="px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap border transition-all tracking-wide"
              style={{
                background: activeCategory === cat ? `${color}18` : 'transparent',
                borderColor: activeCategory === cat ? `${color}40` : 'rgba(255,255,255,0.1)',
                color: activeCategory === cat ? color : 'rgba(255,255,255,0.6)',
                boxShadow: activeCategory === cat ? `0 0 15px ${color}15` : 'none'
              }}
            >
              {cat}
            </button>
          );
        })}
      </motion.div>

      {/* Tips Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        <AnimatePresence mode="popLayout">
          {filteredMissions.map((mission, index) => {
            const Icon = categoryIcons[mission.categoria_tip] || Lightbulb;
            const color = categoryColors[mission.categoria_tip] || '#00ff41';
            const isExpanded = !!expandedTips[mission.id];
            return (
              <motion.div
                key={mission.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ delay: index * 0.03 }}
                onClick={() => toggleExpand(mission.id)}
                className="rounded-xl border p-5 cursor-pointer hover:border-white/20 transition-all select-none group flex flex-col justify-between"
                style={{
                  background: isExpanded ? 'rgba(255,255,255,0.06)' : 'rgba(255,255,255,0.03)',
                  borderColor: isExpanded ? `${color}50` : 'rgba(255,255,255,0.08)',
                  boxShadow: isExpanded ? `0 0 30px ${color}12` : 'none'
                }}
              >
                <div>
                  <div className="flex items-start justify-between gap-3 mb-4">
                    <div className="flex items-center gap-3.5">
                      <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: `${color}20` }}>
                        <Icon size={18} style={{ color }} />
                      </div>
                      <div>
                        <div className="flex items-center gap-2.5">
                          <h3 className="text-sm font-bold text-white group-hover:text-[#00ff41] transition-colors">{mission.titulo}</h3>
                          {mission.es_jefe && <span className="text-[8px] font-bold px-2 py-0.5 rounded-full tracking-widest" style={{ background: 'rgba(255,215,0,0.2)', color: '#ffd700' }}>👑 JEFE</span>}
                        </div>
                        <span className="text-[11px] font-bold tracking-wide mt-1 block" style={{ color }}>{mission.categoria_tip}</span>
                      </div>
                    </div>

                    <motion.div
                      animate={{ rotate: isExpanded ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                      className="p-1.5 rounded-full bg-white/8 opacity-60 group-hover:opacity-100 transition-opacity"
                    >
                      <ChevronDown size={16} className="text-white" />
                    </motion.div>
                  </div>

                  <motion.div
                    layout="position"
                    className="overflow-hidden"
                  >
                    <p
                      className={`text-xs leading-relaxed transition-all duration-300 ${
                        isExpanded ? 'text-white/85' : 'text-white/55 line-clamp-2'
                      }`}
                    >
                      {mission.tip_ayuda}
                    </p>
                  </motion.div>
                </div>

                <div className="mt-4 pt-3.5 border-t border-white/8 flex items-center justify-between">
                  <span className="text-[9px] text-white/30 font-mono">
                    {isExpanded ? 'Clic para cerrar' : 'Clic para ver más'}
                  </span>
                  <span
                    className="text-[11px] font-bold tracking-wide transition-all"
                    style={{ color: isExpanded ? '#ffffff' : color }}
                  >
                    {isExpanded ? '▲ Menos' : '▼ Más'}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {filteredMissions.length === 0 && (
        <div className="text-center py-16">
          <Search size={40} style={{ color: 'rgba(255,255,255,0.08)' }} className="mx-auto mb-4" />
          <p className="text-sm" style={{ color: 'rgba(255,255,255,0.4)' }}>No se encontraron tips</p>
        </div>
      )}
    </div>
  );
}
