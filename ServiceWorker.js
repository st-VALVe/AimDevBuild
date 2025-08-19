const cacheName = "stVALVe-Aim-0.0.24";
const contentToCache = [
    "Build/8a98f8efd7af39d5b98c54b20c4ced55.loader.js",
    "Build/119f5359cf681653b655cbdc45e7e492.framework.js.unityweb",
    "Build/b14583e51567dd4603a8a8f761380ce2.data.unityweb",
    "Build/7564bf884d31f4714865d837ecc7778e.wasm.unityweb",
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
