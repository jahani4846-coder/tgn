const CACHE = "overtime-v1";

self.addEventListener("install", e=>{
  e.waitUntil(
    caches.open(CACHE).then(c=>{
      return c.addAll([
        "./",
        "./index.html",
        "./app.js",
        "./manifest.json",
        "./icon.png"
      ]);
    })
  );
});

self.addEventListener("fetch", e=>{
  e.respondWith(
    caches.match(e.request).then(r => r || fetch(e.request))
  );
});
