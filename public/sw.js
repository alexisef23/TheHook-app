const CACHE_NAME = 'thehook-cache-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/manifest.json',
  '/favicon.svg',
  '/icons.svg',
  // Se pueden agregar más assets estáticos aquí (CSS, JS)
];

// Evento de instalación: guarda en caché los assets iniciales
self.addEventListener('install', event => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

// Evento de activación: limpia cachés antiguos si existen
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            console.log('Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// Evento fetch: responde desde el caché o hace la petición a la red
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Devuelve el recurso del caché si existe
        if (response) {
          return response;
        }
        
        // Clona la petición porque el stream solo se puede consumir una vez
        const fetchRequest = event.request.clone();

        return fetch(fetchRequest).then(
          response => {
            // Verifica que la respuesta sea válida antes de cachearla
            if(!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }

            // Clona la respuesta porque el stream solo se puede consumir una vez
            const responseToCache = response.clone();

            caches.open(CACHE_NAME)
              .then(cache => {
                // Solo guardamos en caché peticiones GET válidas (evitar esquemas no soportados como chrome-extension)
                if (event.request.method === 'GET' && event.request.url.startsWith('http')) {
                  cache.put(event.request, responseToCache);
                }
              });

            return response;
          }
        ).catch(() => {
          // Fallback offline básico (puedes agregar una página offline.html personalizada)
          console.log('Error de red al intentar obtener:', event.request.url);
        });
      })
  );
});
