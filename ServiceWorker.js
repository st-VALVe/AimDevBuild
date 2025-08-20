const cacheName = "stVALVe-Aim-0.0.24";
const contentToCache = [
    "Build/8303376bb36966a486b25dede7a85242.loader.js",
    "Build/ee61ee48659af63acec7f4b12d228b87.framework.js.unityweb",
    "Build/1d675b511a12ae70989c2b3764353de2.data.unityweb",
    "Build/ba76205969c5e586b87a6a972557c157.wasm.unityweb",
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
