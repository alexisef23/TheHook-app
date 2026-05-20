import { motion } from 'framer-motion';
import { Target, BookOpen, User } from 'lucide-react';

const tabs = [
  { id: 'missions', label: 'Misiones', icon: Target },
  { id: 'arsenal', label: 'Arsenal', icon: BookOpen },
  { id: 'profile', label: 'Perfil', icon: User },
];

export default function BottomNav({ activeTab, onTabChange }) {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 border-t border-white/5" style={{ background: 'rgba(10,10,15,0.96)', backdropFilter: 'blur(25px)' }}>
      <div className="max-w-lg mx-auto flex justify-around items-center pt-2.5 pb-4.5 md:pb-2.5 px-4">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <motion.button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className="flex flex-col items-center gap-0.5 py-1 px-3 rounded-xl transition-colors relative"
              whileTap={{ scale: 0.9 }}
            >
              {isActive && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute inset-0 rounded-xl"
                  style={{ background: 'rgba(0,255,65,0.1)' }}
                  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                />
              )}
              <Icon size={20} style={{ color: isActive ? '#00ff41' : 'rgba(255,255,255,0.3)' }} />
              <span className="text-[10px] font-medium tracking-wide" style={{ color: isActive ? '#00ff41' : 'rgba(255,255,255,0.3)' }}>
                {tab.label}
              </span>
            </motion.button>
          );
        })}
      </div>
    </nav>
  );
}
