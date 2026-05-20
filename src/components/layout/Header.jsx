import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Zap, Trophy, Target, BookOpen, User } from 'lucide-react';

const tabs = [
  { id: 'missions', label: 'Misiones', icon: Target },
  { id: 'arsenal', label: 'Arsenal', icon: BookOpen },
  { id: 'profile', label: 'Perfil', icon: User },
];

export default function Header({ totalXP, maxXP, activeTab, onTabChange }) {
  const progress = maxXP > 0 ? (totalXP / maxXP) * 100 : 0;
  const level = Math.floor(totalXP / 200) + 1;

  return (
    <header className="sticky top-0 z-40 border-b border-white/5" style={{ background: 'rgba(10,10,15,0.92)', backdropFilter: 'blur(25px)' }}>
      <div className="max-w-5xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between gap-4">
          {/* Logo & Level */}
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2.5 cursor-pointer select-none" onClick={() => onTabChange('missions')}>
              <div className="w-8.5 h-8.5 rounded-lg flex items-center justify-center shadow-[0_0_12px_rgba(0,255,65,0.2)] bg-[#12121c] border border-[#00ff41]/30">
                <Zap size={16} className="text-[#00ff41]" />
              </div>
              <div>
                <h1 className="text-xs font-black text-white tracking-widest font-mono">THE<span className="text-[#00ff41]">HOOK</span></h1>
                <p className="text-[9px] tracking-widest font-mono text-[#00ff41]">LEVEL {level}</p>
              </div>
            </div>

            {/* Desktop Navigation Tabs */}
            <nav className="hidden md:flex items-center gap-1 bg-[#12121c]/50 border border-white/5 p-1 rounded-xl">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => onTabChange(tab.id)}
                    className={`flex items-center gap-2 px-4 py-1.5 rounded-lg text-xs font-mono tracking-wider transition-all duration-300 relative cursor-pointer select-none ${
                      isActive 
                        ? 'text-[#00ff41] font-bold' 
                        : 'text-white/40 hover:text-white/80'
                    }`}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="activeHeaderTab"
                        className="absolute inset-0 bg-[#00ff41]/10 border border-[#00ff41]/25 rounded-lg shadow-[0_0_10px_rgba(0,255,65,0.05)]"
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    )}
                    <Icon size={13} className="relative z-10" />
                    <span className="relative z-10">{tab.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>

          {/* User Badge / XP / Avatar */}
          <div className="flex items-center gap-3">
            <div className="flex flex-col items-end gap-1">
              <div className="flex items-center gap-1.5 bg-white/[0.02] border border-white/5 py-1 px-2.5 rounded-full select-none">
                <Trophy size={11} style={{ color: '#ffd700' }} className="flex-shrink-0" />
                <span className="text-[11px] font-mono font-bold text-[#00ff41]">{totalXP}</span>
                <span className="text-[9px] text-white/30 font-mono hidden sm:inline">/ {maxXP} XP</span>
                <span className="text-[9px] text-white/30 font-mono sm:hidden">XP</span>
              </div>
            </div>

            {/* Micro Profile Button in Header */}
            <motion.div
              whileTap={{ scale: 0.95 }}
              onClick={() => onTabChange('profile')}
              className={`w-9 h-9 rounded-full overflow-hidden p-0.5 border cursor-pointer flex-shrink-0 transition-all select-none ${
                activeTab === 'profile'
                  ? 'border-[#00ff41] shadow-[0_0_10px_rgba(0,255,65,0.3)]'
                  : 'border-white/10 hover:border-white/30'
              }`}
            >
              <div className="w-full h-full rounded-full overflow-hidden bg-[#12121c]">
                <img
                  src="/canek_profile.jpg"
                  alt="Canek"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.style.display = 'none';
                  }}
                />
              </div>
            </motion.div>
          </div>
        </div>
      </div>
      {/* Bottom Header Progress Accent */}
      <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-white/5 overflow-hidden">
        <motion.div
          className="h-full shadow-[0_0_8px_rgba(0,255,65,0.4)]"
          style={{ background: 'linear-gradient(90deg, #00ff41, #00d4ff)' }}
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        />
      </div>
    </header>
  );
}
