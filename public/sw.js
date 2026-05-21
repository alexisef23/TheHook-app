const CACHE_NAME = 'thehook-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/manifest.json',
  '/favicon.svg',
];

// Instalar el Service Worker
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

// Activar el Service Worker y limpiar cachés antiguos
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

// Estrategia: Cache First, falling back to Network
self.addEventListener('fetch', (event) => {
  const { request } = event;

  // Ignorar solicitudes que no sean GET
  if (request.method !== 'GET') {
    return;
  }

  // Ignorar solicitudes a dominios externos (excepto APIs necesarias)
  if (!request.url.startsWith(self.location.origin) && 
      !request.url.includes('fonts.googleapis.com') &&
      !request.url.includes('fonts.gstatic.com')) {
    return;
  }

  event.respondWith(
    caches.match(request).then((response) => {
      // Si está en caché, devolverlo
      if (response) {
        return response;
      }

      // Si no está en caché, hacer fetch de la red
      return fetch(request)
        .then((response) => {
          // No cachear respuestas no válidas
          if (!response || response.status !== 200 || response.type === 'error') {
            return response;
          }

          // Clonar la respuesta
          const responseToCache = response.clone();

          // Cachear la respuesta
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(request, responseToCache);
          });

          return response;
        })
        .catch(() => {
          // Si no hay conexión y no está en caché, devolver página offline
          console.log('[Service Worker] Offline:', request.url);
          
          // Puedes devolver una página offline personalizada aquí
          // return caches.match('/offline.html');
        });
    })
  );
});

// Manejar mensajes desde el cliente
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});
