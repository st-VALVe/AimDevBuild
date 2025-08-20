const cacheName = "stVALVe-Aim-0.0.24";
const contentToCache = [
    "Build/69bef21f302c3703497876158e993b94.loader.js",
    "Build/ee61ee48659af63acec7f4b12d228b87.framework.js.unityweb",
    "Build/2e89b88ad358e93aacbec83934bc4834.data.unityweb",
    "Build/1bfeaa375ad6c40416fc34f05e08eba9.wasm.unityweb",
    "TemplateData/style.css"

];

self.addEventListener('install', function (e) {
    console.log('[Service Worker] Install');
    
    e.waitUntil((async function () {
      const cache = await caches.open(cacheName);
      console.log('[Service Worker] Caching all: app shell and content');
      await cache.addAll(contentToCache);
    })());
});

self.addEventListener('fetch', function (e) {
    e.respondWith((async function () {
      let response = await caches.match(e.request);
      console.log(`[Service Worker] Fetching resource: ${e.request.url}`);
      if (response) { return response; }

      response = await fetch(e.request);
      const cache = await caches.open(cacheName);
      console.log(`[Service Worker] Caching new resource: ${e.request.url}`);
      cache.put(e.request, response.clone());
      return response;
    })());
});
