const CACHE_NAME = "test-static-v1"
const CACHE_URLS = [
  'index.html',
  'css/styles.css',
  'js/main.js',
  'img/photo.jpg',
  "/"
]

self.addEventListener('fetch', function(event) {
  console.log("Service worker fetch", { event });
  event.respondWith(
    caches.open(CACHE_NAME).match(event.request).then(function(response) {
      return response || fetch(event.request);
    }),
  );
});

self.addEventListener('install', function(event) {
  console.log("Service worker installed");
  event.waitUntil(
    caches.open('test-static-v1').then(function(cache) {
      return cache.addAll(CACHE_URLS);
    }),
  );
});

