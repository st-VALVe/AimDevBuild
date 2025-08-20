const cacheName = "stVALVe-Aim-0.0.31";
const contentToCache = [
    "Build/8aed6607de7c7b2be89dd3679c6a36e6.loader.js",
    "Build/e65ebcf3b174cd8d6c2bd219d0ff30c5.framework.js.unityweb",
    "Build/d49e3c42f1c54f53c10cf50b1d38a243.data.unityweb",
    "Build/cbe3661c3b0ba3d17490b7f458991a52.wasm.unityweb",
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
