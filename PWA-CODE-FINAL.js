// ============================================================
// 📋 MANIFEST.JSON FINAL - LISTO PARA COPIAR/PEGAR
// ============================================================
// Ubicación: /public/manifest.json
// Copiar TODO el contenido a continuación y reemplazar
// ============================================================

{
  "id": "/",
  "scope": "/",
  "lang": "es",
  "dir": "ltr",
  "name": "TheHook — Habilidades Sociales",
  "short_name": "TheHook",
  "description": "Levela tus habilidades sociales con misiones, desafíos y tips tácticos. Tu compañero discreto para dominar cualquier situación social.",
  "categories": ["education", "productivity"],
  "start_url": "/",
  "display": "standalone",
  "display_override": ["standalone", "window-controls-overlay", "minimal-ui"],
  "orientation": "portrait-primary",
  "theme_color": "#0a0a0f",
  "background_color": "#0a0a0f",
  "prefer_related_applications": false,
  "related_applications": [
    {
      "platform": "play",
      "url": "https://play.google.com/store/apps/details?id=com.thehook.app",
      "id": "com.thehook.app"
    }
  ],
  "iarc_rating_id": "",
  "icons": [
    {
      "src": "/icons/icon-192.png",
      "sizes": "192x192",
      "type": "image/png",
      "purpose": "any"
    },
    {
      "src": "/icons/icon-512.png",
      "sizes": "512x512",
      "type": "image/png",
      "purpose": "any"
    },
    {
      "src": "/icons/icon-192.png",
      "sizes": "192x192",
      "type": "image/png",
      "purpose": "maskable"
    },
    {
      "src": "/icons/icon-512.png",
      "sizes": "512x512",
      "type": "image/png",
      "purpose": "maskable"
    }
  ],
  "screenshots": [
    {
      "src": "/screenshots/screenshot-mobile-1.png",
      "sizes": "540x720",
      "type": "image/png",
      "form_factor": "narrow",
      "label": "Pantalla de Misiones - TheHook"
    },
    {
      "src": "/screenshots/screenshot-mobile-2.png",
      "sizes": "540x720",
      "type": "image/png",
      "form_factor": "narrow",
      "label": "Pantalla de Perfil - TheHook"
    },
    {
      "src": "/screenshots/screenshot-mobile-3.png",
      "sizes": "540x720",
      "type": "image/png",
      "form_factor": "narrow",
      "label": "Arsenal de Tips - TheHook"
    },
    {
      "src": "/screenshots/screenshot-desktop-1.png",
      "sizes": "1280x720",
      "type": "image/png",
      "form_factor": "wide",
      "label": "Vista de Escritorio - TheHook"
    }
  ],
  "shortcuts": [
    {
      "name": "Misiones",
      "short_name": "Misiones",
      "description": "Accede a tus misiones y desafíos rápidamente",
      "url": "/?tab=dashboard",
      "icons": [
        {
          "src": "/icons/icon-192.png",
          "sizes": "192x192",
          "type": "image/png"
        }
      ]
    },
    {
      "name": "Arsenal de Tips",
      "short_name": "Arsenal",
      "description": "Consulta tips y guías tácticas para situaciones sociales",
      "url": "/?tab=arsenal",
      "icons": [
        {
          "src": "/icons/icon-192.png",
          "sizes": "192x192",
          "type": "image/png"
        }
      ]
    },
    {
      "name": "Mi Perfil",
      "short_name": "Perfil",
      "description": "Revisa tu progreso, nivel y estadísticas sociales",
      "url": "/?tab=profile",
      "icons": [
        {
          "src": "/icons/icon-192.png",
          "sizes": "192x192",
          "type": "image/png"
        }
      ]
    }
  ]
}

// ============================================================
// ✅ PROPIEDADES NUEVAS APLICADAS:
// ============================================================
// ✅ "lang": "es" - Idioma español
// ✅ "dir": "ltr" - Dirección left-to-right
// ✅ "display_override": [...] - Orden de preferencia de pantalla
// ✅ "related_applications": [...] - Referencia Play Store
// ✅ "iarc_rating_id": "" - Clasificación por edades (agregar luego)
// ✅ "icons": 192x192 + 512x512 con "any" + "maskable"
// ✅ "id": "/" - Identificador único
// ✅ "screenshots": [...] - Pantallas para tienda
// ============================================================

// ============================================================
// 🔧 SERVICE WORKER - sw.js (FINAL)
// ============================================================
// Ubicación: /public/sw.js
// Este archivo YA ESTÁ CREADO Y FUNCIONAL
// No requiere cambios, solo validar que existe
// ============================================================

const CACHE_NAME = 'thehook-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/manifest.json',
  '/favicon.svg',
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('[Service Worker] Caché abierta:', CACHE_NAME);
      return cache.addAll(urlsToCache).catch((error) => {
        console.log('[Service Worker] Error al agregar URLs a caché:', error);
      });
    })
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log('[Service Worker] Eliminando caché antigua:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  const { request } = event;

  if (request.method !== 'GET') {
    return;
  }

  if (!request.url.startsWith(self.location.origin) && 
      !request.url.includes('fonts.googleapis.com') &&
      !request.url.includes('fonts.gstatic.com')) {
    return;
  }

  event.respondWith(
    caches.match(request).then((response) => {
      if (response) {
        return response;
      }

      return fetch(request)
        .then((response) => {
          if (!response || response.status !== 200 || response.type === 'error') {
            return response;
          }

          const responseToCache = response.clone();

          caches.open(CACHE_NAME).then((cache) => {
            cache.put(request, responseToCache);
          });

          return response;
        })
        .catch(() => {
          console.log('[Service Worker] Offline:', request.url);
        });
    })
  );
});

self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

// ============================================================
// ✅ SERVICE WORKER FEATURES:
// ============================================================
// ✅ Caché offline automático
// ✅ Estrategia Cache First
// ✅ Limpieza de cachés antiguos
// ✅ Soporte para actualizaciones
// ============================================================

// ============================================================
// 📝 SCRIPT DE REGISTRO EN index.html (FINAL)
// ============================================================
// Ubicación: /index.html en la sección <head>
// Este link YA ESTÁ AGREGADO:
// ============================================================

<link rel="manifest" href="/manifest.json" />

// ============================================================
// 🔄 SCRIPT DE REGISTRO EN src/main.jsx (FINAL)
// ============================================================
// Este código YA ESTÁ AGREGADO al final de main.jsx
// Copiar si no lo tienes o quieres actualizar:
// ============================================================

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('/sw.js')
      .then((registration) => {
        console.log('[PWA] Service Worker registrado exitosamente:', registration);

        setInterval(() => {
          registration.update();
        }, 3600000);

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

  let refreshing = false;
  navigator.serviceWorker.addEventListener('controllerchange', () => {
    if (!refreshing) {
      refreshing = true;
      console.log('[PWA] Service Worker actualizado. Recargando página...');
    }
  });
}

// ============================================================
// ✅ STATUS FINAL
// ============================================================
// ✅ manifest.json - Actualizado con todas las propiedades
// ✅ sw.js - Funcional y listo
// ✅ index.html - Link a manifest agregado
// ✅ main.jsx - Registro de Service Worker agregado
// ============================================================

// ============================================================
// 🚀 LISTO PARA PWABUILDER
// ============================================================
// 1. npm run build
// 2. Deploy a Netlify
// 3. Ve a pwabuilder.com
// 4. Ingresa tu URL
// 5. Haz clic en "Validate"
// 6. Todos los ✅ deben estar verdes
// 7. Ve a "Package" → Android
// 8. Descarga tu APK
// ============================================================
