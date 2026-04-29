// Kill-Switch: löscht alle Caches und deregistriert sich selbst
self.addEventListener('install', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.map(k => caches.delete(k)))
    ).then(() => self.skipWaiting())
  );
});
self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.map(k => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});
// Kein Caching — alles direkt vom Netz
self.addEventListener('fetch', e => {
  e.respondWith(fetch(e.request));
});
