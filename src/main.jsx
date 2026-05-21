import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

// ========== Registro del Service Worker para PWA ==========
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
              // Una nueva versión está disponible
              console.log('[PWA] Nueva versión disponible. Recarga la página para actualizar.');
              
              // Mostrar notificación al usuario (opcional)
              // Aquí puedes disparar un evento o mostrar un toast
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

  // Escuchar cambios de controlador (para recargar la app cuando hay actualización)
  let refreshing = false;
  navigator.serviceWorker.addEventListener('controllerchange', () => {
    if (!refreshing) {
      refreshing = true;
      console.log('[PWA] Service Worker actualizado. Recargando página...');
      // Descomenta la siguiente línea si quieres recargar automáticamente
      // window.location.reload();
    }
  });
}
// ============================================================

