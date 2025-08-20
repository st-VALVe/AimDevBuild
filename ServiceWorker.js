const cacheName = "stVALVe-Aim-0.0.24";
const contentToCache = [
    "Build/d2329d7fbc9e4d82a5b3f6c4187d9066.loader.js",
    "Build/ee61ee48659af63acec7f4b12d228b87.framework.js.unityweb",
    "Build/61360741ad5e706226f2f1d764f2bacc.data.unityweb",
    "Build/227ba70f7c1bbd6e0c673a79d2fe7a1c.wasm.unityweb",
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
