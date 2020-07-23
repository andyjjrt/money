'use strict';

// CODELAB: Update cache names any time any of the cached files change.
const CACHE_NAME = 'static-cache-v1';

const FILES_TO_CACHE = [
  'https://andyjjrt.github.io/money/offline.html',
  "https://raw.githubusercontent.com/andyjjrt/money/master/t1.png",
  "https://raw.githubusercontent.com/andyjjrt/money/master/t2.png",
  "https://raw.githubusercontent.com/andyjjrt/money/master/t3.png",
  "https://raw.githubusercontent.com/andyjjrt/money/master/t4.png",
  "https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css"
];

self.addEventListener('install', (evt) => {
  console.log('[ServiceWorker] Install');
  evt.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('[ServiceWorker] Pre-caching offline page');
      return cache.addAll(FILES_TO_CACHE);
    })
  );
  self.skipWaiting();
});

self.addEventListener('activate', (evt) => {
  console.log('[ServiceWorker] Activate');
  evt.waitUntil(
    caches.keys().then((keyList) => {
      return Promise.all(keyList.map((key) => {
        if (key !== CACHE_NAME) {
          console.log('[ServiceWorker] Removing old cache', key);
          return caches.delete(key);
        }
      }));
    })
  );
  self.clients.claim();
});

self.addEventListener('fetch', (evt) => {
  console.log('[ServiceWorker] Fetch', evt.request.url);
  // CODELAB: Add fetch event handler here.
if (evt.request.mode !== 'navigate') {
  // Not a page navigation, bail.
  return;
}
evt.respondWith(
    fetch(evt.request)
        .catch(() => {
          return caches.open(CACHE_NAME)
              .then((cache) => {
                return cache.match('offline.html');
              });
        })
  );
});
