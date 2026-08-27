// Service Worker para cache offline - CyberAware
const CACHE_NAME = 'cyberaware-v1';
const STATIC_CACHE = 'cyberaware-static-v1';

// Recursos para cache imediato (instala offline)
const PRECACHE_URLS = [
  '/',
  '/apos_login.html',
  '/manifest.json'
];

// Instalar: cachear recursos estáticos
self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        return cache.addAll(PRECACHE_URLS);
      })
      .then(function() {
        return self.skipWaiting();
      })
  );
});

// Ativar: limpar caches antigos
self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.filter(function(name) {
          return name !== CACHE_NAME && name !== STATIC_CACHE;
        }).map(function(name) {
          return caches.delete(name);
        })
      );
    }).then(function() {
      return self.clients.claim();
    })
  );
});

// Fetch: cache-first para recursos estáticos, network-first para API
self.addEventListener('fetch', function(event) {
  var url = new URL(event.request.url);
  
  // Ignorar requisições de API - sempre ir à rede
  if (url.pathname.startsWith('/api/')) {
    return;
  }
  
  // Para navegação (HTML): network-first com fallback para cache
  if (event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request)
        .then(function(response) {
          // Cachear a versão mais recente
          var clone = response.clone();
          caches.open(CACHE_NAME).then(function(cache) {
            cache.put(event.request, clone);
          });
          return response;
        })
        .catch(function() {
          // Offline: servir do cache
          return caches.match(event.request).then(function(cached) {
            return cached || caches.match('/apos_login.html');
          });
        })
    );
    return;
  }
  
  // Para outros recursos: cache-first
  event.respondWith(
    caches.match(event.request).then(function(cached) {
      if (cached) {
        return cached;
      }
      return fetch(event.request).then(function(response) {
        // Cachear recursos novos
        if (response.status === 200) {
          var clone = response.clone();
          caches.open(CACHE_NAME).then(function(cache) {
            cache.put(event.request, clone);
          });
        }
        return response;
      });
    })
  );
});
