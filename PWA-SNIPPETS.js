// ============================================================
// 🔧 SNIPPETS LISTOS PARA COPIAR EN TU PROYECTO
// ============================================================

// ============================================================
// 1. REGISTRAR SERVICE WORKER EN main.jsx o main.ts
// ============================================================
// Copiar TODO este bloque y pegarlo al final de src/main.jsx

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('/sw.js')
      .then((registration) => {
        console.log('[PWA] Service Worker registrado exitosamente:', registration);

        // Verificar actualizaciones cada hora
        setInterval(() => {
          registration.update();
        }, 3600000);

        // Escuchar actualizaciones disponibles
        registration.addEventListener('updatefound', () => {
          const newWorker = registration.installing;

          newWorker.addEventListener('statechange', () => {
            if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
              console.log('[PWA] Nueva versión disponible. Recarga la página para actualizar.');
              
              window.dispatchEvent(
                new CustomEvent('sw-update-available', {
                  detail: { registration }
                })
              );
            }
          });
        });
      })
      .catch((error) => {
        console.error('[PWA] Error registrando Service Worker:', error);
      });
  });

  // Escuchar cambios de controlador
  let refreshing = false;
  navigator.serviceWorker.addEventListener('controllerchange', () => {
    if (!refreshing) {
      refreshing = true;
      console.log('[PWA] Service Worker actualizado. Recargando página...');
      // Descomenta para recargar automáticamente:
      // window.location.reload();
    }
  });
}

// ============================================================
// 2. LINK EN index.html (HEAD)
// ============================================================
// Copiar esta línea en la sección <head> de index.html

<link rel="manifest" href="/manifest.json" />

// ============================================================
// 3. HOOK REACT PARA DETECTAR ACTUALIZACIONES (Opcional)
// ============================================================
// Crear archivo: src/hooks/usePWAUpdates.ts

import { useEffect } from 'react';

export const usePWAUpdates = () => {
  useEffect(() => {
    window.addEventListener('sw-update-available', (event: any) => {
      const registration = event.detail.registration;
      
      // Mostrar notificación al usuario
      const isReady = window.confirm(
        'Una nueva versión está disponible. ¿Deseas actualizar?'
      );

      if (isReady) {
        const newWorker = registration.waiting;
        
        if (newWorker) {
          newWorker.postMessage({ type: 'SKIP_WAITING' });
          window.location.reload();
        }
      }
    });
  }, []);
};

// Uso en tu App.jsx:
// import { usePWAUpdates } from './hooks/usePWAUpdates';
// export default function App() {
//   usePWAUpdates();
//   return <div>Tu app aquí</div>;
// }

// ============================================================
// 4. CONFIGURACIÓN EN vite.config.js (PWA Plugin)
// ============================================================
// Si quieres usar VitePWA (automático), instala:
// npm install -D vite-plugin-pwa

// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'
// import { VitePWA } from 'vite-plugin-pwa'

// export default defineConfig({
//   plugins: [
//     react(),
//     VitePWA({
//       manifest: {
//         name: 'TheHook',
//         short_name: 'TheHook',
//         description: 'Gamificación de Habilidades Sociales',
//         theme_color: '#0a0a0f',
//         icons: [
//           {
//             src: '/icons/icon-192.png',
//             sizes: '192x192',
//             type: 'image/png'
//           },
//           {
//             src: '/icons/icon-512.png',
//             sizes: '512x512',
//             type: 'image/png'
//           }
//         ]
//       }
//     })
//   ]
// })

// ============================================================
// 5. COMPONENTE PARA NOTIFICACIÓN DE ACTUALIZACIÓN (React)
// ============================================================
// Crear archivo: src/components/PWAUpdatePrompt.jsx

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { RefreshCw, X } from 'lucide-react';

export default function PWAUpdatePrompt() {
  const [showPrompt, setShowPrompt] = useState(false);
  const [registration, setRegistration] = useState(null);

  useEffect(() => {
    const handleUpdateAvailable = (event) => {
      setRegistration(event.detail.registration);
      setShowPrompt(true);
    };

    window.addEventListener('sw-update-available', handleUpdateAvailable);
    return () => window.removeEventListener('sw-update-available', handleUpdateAvailable);
  }, []);

  const handleUpdate = () => {
    if (registration?.waiting) {
      registration.waiting.postMessage({ type: 'SKIP_WAITING' });
      window.location.reload();
    }
  };

  if (!showPrompt) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className="fixed bottom-4 right-4 z-50 max-w-sm"
    >
      <div
        className="rounded-lg p-4 border flex items-center gap-4"
        style={{
          background: 'rgba(0,255,65,0.1)',
          borderColor: 'rgba(0,255,65,0.4)',
          boxShadow: '0 0 20px rgba(0,255,65,0.15)'
        }}
      >
        <RefreshCw size={20} style={{ color: '#00ff41' }} />
        
        <div className="flex-1">
          <p className="text-sm font-bold text-white">
            Nueva versión disponible
          </p>
          <p className="text-xs text-white/60 mt-1">
            Actualiza para obtener las últimas mejoras
          </p>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => setShowPrompt(false)}
            className="p-1.5 rounded-lg hover:bg-white/10 transition-colors"
          >
            <X size={16} style={{ color: 'rgba(255,255,255,0.5)' }} />
          </button>
          
          <button
            onClick={handleUpdate}
            className="px-3 py-1.5 rounded-lg text-xs font-bold text-black"
            style={{ background: '#00ff41' }}
          >
            Actualizar
          </button>
        </div>
      </div>
    </motion.div>
  );
}

// Uso en App.jsx:
// import PWAUpdatePrompt from './components/PWAUpdatePrompt';
// export default function App() {
//   return (
//     <>
//       <PWAUpdatePrompt />
//       {/* Tu contenido aquí */}
//     </>
//   );
// }

// ============================================================
// 6. COMANDO PARA TESTEAR PWA LOCALMENTE
// ============================================================
// Terminal:
// npm run build
// npx http-server dist/

// Luego abre: http://localhost:8080
// Verás que la app es instalable y funciona offline

// ============================================================
// 7. CHECKLIST PARA PWABUILDER
// ============================================================
// Al validar en PWABuilder.com, estos items deben estar ✅:
// 
// ✅ Manifest válido con todos los campos
// ✅ Iconos 192x192 y 512x512
// ✅ id: "/" en manifest
// ✅ Service Worker respondiendo correctamente
// ✅ HTTPS (Netlify lo proporciona automáticamente)
// ✅ Display mode "standalone"
// ✅ Screenshots incluidas (opcional pero recomendado)
// ✅ Metadata completa

// ============================================================
