var CACHE_NAME = 'my-site-cache-v1';
var urlsToCache = [
  'https://andyjjrt.github.io/money/index.html',
  'https://andyjjrt.github.io/money/script.js',
  'book_icon6765.ico'
];

self.addEventListener('install', function(event) {
  // Perform install steps
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        // Cache hit - return response
        if (response) {
          return response;
        }
        return fetch(event.request);
      }
    )
  );
});

self.addEventListener('offline', () => {
  console.log("offline")
});
