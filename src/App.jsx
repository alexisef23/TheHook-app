import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Header from './components/layout/Header';
import BottomNav from './components/layout/BottomNav';
import SOSButton from './components/sos/SOSButton';
import DashboardPage from './pages/DashboardPage';
import ArsenalPage from './pages/ArsenalPage';
import ProfilePage from './pages/ProfilePage';
import { useProgress } from './hooks/useProgress';

const pageVariants = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -10 },
};

export default function App() {
  const [activeTab, setActiveTab] = useState('missions');
  const {
    allMissions,
    completeMission,
    addCustomMission,
    isMissionCompleted,
    getTotalXP,
    getMaxXP,
    getPhaseProgress,
    resetProgress,
  } = useProgress();

  const totalXP = getTotalXP();
  const maxXP = getMaxXP();

  return (
    <div className="min-h-screen bg-[#050508] flex flex-col font-sans antialiased text-white relative overflow-x-hidden select-none pb-24 md:pb-8">
      {/* Premium ambient glows spanning the entire web page */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] aspect-square rounded-full bg-neon-green/3 blur-[160px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] aspect-square rounded-full bg-neon-cyan/3 blur-[160px] pointer-events-none" />
      
      {/* Traditional top navigation header with integrated menu */}
      <Header
        totalXP={totalXP}
        maxXP={maxXP}
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />

      {/* Main Responsive Content Container */}
      <main className="flex-1 w-full max-w-5xl mx-auto px-4 py-6 md:py-8 z-10">
        <AnimatePresence mode="wait">
          {activeTab === 'missions' && (
            <motion.div key="missions" {...pageVariants} transition={{ duration: 0.2 }}>
              <DashboardPage
                missions={allMissions}
                isMissionCompleted={isMissionCompleted}
                completeMission={completeMission}
                addCustomMission={addCustomMission}
                getPhaseProgress={getPhaseProgress}
              />
            </motion.div>
          )}
          {activeTab === 'arsenal' && (
            <motion.div key="arsenal" {...pageVariants} transition={{ duration: 0.2 }}>
              <ArsenalPage missions={allMissions} />
            </motion.div>
          )}
          {activeTab === 'profile' && (
            <motion.div key="profile" {...pageVariants} transition={{ duration: 0.2 }}>
              <ProfilePage
                missions={allMissions}
                getTotalXP={getTotalXP}
                getMaxXP={getMaxXP}
                getPhaseProgress={getPhaseProgress}
                isMissionCompleted={isMissionCompleted}
                resetProgress={resetProgress}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Tactical Support floating emergency button */}
      <SOSButton />

      {/* Navigation bar for mobile viewports only */}
      <div className="md:hidden">
        <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />
      </div>
    </div>
  );
}
