import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldAlert, X, Send, MapPin } from 'lucide-react';
import { sosScenarios, SOS_PHONE } from '../../data/sosScenarios';
import { useGeolocation } from '../../hooks/useGeolocation';

export default function SOSButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [sending, setSending] = useState(null);
  const { getLocation, getGoogleMapsLink } = useGeolocation();

  const handleSOS = async (scenario) => {
    setSending(scenario.id);

    // Get location
    const coords = await getLocation();
    const locationLink = coords ? getGoogleMapsLink(coords) : 'Ubicación no disponible';

    // Build WhatsApp message
    const fullMessage = `${scenario.message}\n\n📍 Mi ubicación: ${coords ? locationLink : 'No pude obtener mi ubicación'}`;
    const encodedMessage = encodeURIComponent(fullMessage);
    const whatsappUrl = `https://wa.me/${SOS_PHONE}?text=${encodedMessage}`;

    // Open WhatsApp
    window.open(whatsappUrl, '_blank');

    setSending(null);
    setIsOpen(false);
  };

  return (
    <>
      {/* Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-45"
            style={{ background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* SOS Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed bottom-36 right-4 z-50 flex flex-col gap-2 items-end"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
          >
            <div className="rounded-2xl border overflow-hidden w-72" style={{ background: 'rgba(13,13,20,0.98)', borderColor: 'rgba(255,255,255,0.08)' }}>
              <div className="px-4 py-3 border-b" style={{ borderColor: 'rgba(255,255,255,0.05)' }}>
                <div className="flex items-center gap-2">
                  <ShieldAlert size={16} style={{ color: '#ff0040' }} />
                  <span className="text-xs font-bold tracking-wider text-white">SOPORTE TÁCTICO</span>
                </div>
                <p className="text-[10px] mt-1" style={{ color: 'rgba(255,255,255,0.35)' }}>Selecciona la situación</p>
              </div>

              {sosScenarios.map((scenario, index) => (
                <motion.button
                  key={scenario.id}
                  onClick={() => handleSOS(scenario)}
                  className="w-full flex items-center gap-3 px-4 py-3 border-b transition-colors"
                  style={{ borderColor: 'rgba(255,255,255,0.03)' }}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  whileTap={{ scale: 0.97 }}
                  disabled={sending === scenario.id}
                >
                  <span className="text-lg">{scenario.emoji}</span>
                  <div className="flex-1 text-left">
                    <p className="text-xs font-semibold text-white">{scenario.label}</p>
                    <p className="text-[10px]" style={{ color: 'rgba(255,255,255,0.35)' }}>{scenario.description}</p>
                  </div>
                  {sending === scenario.id ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                    >
                      <MapPin size={14} style={{ color: scenario.color }} />
                    </motion.div>
                  ) : (
                    <Send size={14} style={{ color: scenario.color }} />
                  )}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* FAB Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-20 right-4 z-50 w-14 h-14 rounded-full flex items-center justify-center shadow-2xl"
        style={{
          background: isOpen ? 'rgba(255,255,255,0.1)' : 'linear-gradient(135deg, #ff0040, #ff4400)',
          boxShadow: isOpen ? 'none' : '0 0 25px rgba(255,0,64,0.4)'
        }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        animate={!isOpen ? {
          boxShadow: [
            '0 0 15px rgba(255,0,64,0.3)',
            '0 0 30px rgba(255,0,64,0.5)',
            '0 0 15px rgba(255,0,64,0.3)'
          ]
        } : {}}
        transition={!isOpen ? { duration: 2, repeat: Infinity } : {}}
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}>
              <X size={22} className="text-white" />
            </motion.div>
          ) : (
            <motion.div key="sos" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }}>
              <ShieldAlert size={22} className="text-white" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
    </>
  );
}
