const filesToCache = [
  "https://andyjjrt.github.io/money",
  "https://andyjjrt.github.io/money/script.js".
  "https://raw.githubusercontent.com/andyjjrt/money/master/book_icon6765.ico".
  "https://andyjjrt.github.io/money/manifest.json"
];

const cacheName = "static-online v1.5.1.16";
const newName = "static-offline";

// activate
self.addEventListener("activate", event => {
  console.log("[ServiceWorker]SW updated/installed,now waiting...");
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      var promiseArr = cacheNames.map(function(item) {
        if (item !== cacheName) {
          // Delete that cached file
          return caches.delete(item);
          console.log("[ServiceWorker] Removing old cache", item);
        }
      });
      return Promise.all(promiseArr);
    })
  ); // end e.waitUntil
});

self.addEventListener("install", event => {
  console.log("[ServiceWorker] SW updating/installing");
  self.skipWaiting();
  event.waitUntil(
    caches.open(cacheName).then(cache => {
      return cache.addAll(filesToCache);
    })
  );
});

// fetch
self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(function(response) {
      return (
        response ||
        fetch(event.request).then(res =>
          // 存 caches 之前，要先打開 caches.open(dataCacheName)
          caches.open(cacheName).then(function(cache) {
            // cache.put(key, value)
            // 下一次 caches.match 會對應到 event.request
            cache.put(event.request, res.clone());
            return res;
          })
        )
      );
    })
  );
});
