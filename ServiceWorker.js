const cacheName = "stVALVe-Aim-0.0.24";
const contentToCache = [
    "Build/92d2989954f394ef0758ef5acff5309e.loader.js",
    "Build/eda317947ebfec35b99dca41ca417ee6.framework.js.unityweb",
    "Build/fa6e4f88afe8133ceb76e170b0b2526a.data.unityweb",
    "Build/e44735aa3465124e17e6db4674cf7f92.wasm.unityweb",
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
