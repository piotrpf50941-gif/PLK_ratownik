const CACHE = 'ratownik-plk-20260401-night-fix-v7';
const ASSETS = [
  './','./index.html','./style.css','./app.js','./config.js','./manifest.webmanifest','./assets/logo_plk.jpg','./assets/logo_plk.png','./assets/icon.png','./assets/audio/metronome_rko.wav',
  './assets/topics/sec01.jpg','./assets/topics/sec02.jpg','./assets/topics/sec03.jpg','./assets/topics/sec04.jpg','./assets/topics/sec05.jpg',
  './assets/topics/sec06.jpg','./assets/topics/sec07.jpg','./assets/topics/sec08.jpg','./assets/topics/sec09.jpg','./assets/topics/sec10.jpg','./assets/topics/sec11.jpg'
];
self.addEventListener('install', event => {
  event.waitUntil(caches.open(CACHE).then(cache => cache.addAll(ASSETS)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(key => key !== CACHE).map(key => caches.delete(key))))
      .then(() => self.clients.claim())
  );
});
self.addEventListener('message', event => {
  if(event.data && event.data.type === 'SKIP_WAITING'){
    self.skipWaiting();
  }
});
self.addEventListener('fetch', event => {
  if(event.request.method !== 'GET') return;
  const url = new URL(event.request.url);
  const isAppShell = url.origin === location.origin;
  if(isAppShell){
    event.respondWith(
      fetch(event.request)
        .then(response => {
          const copy = response.clone();
          caches.open(CACHE).then(cache => cache.put(event.request, copy));
          return response;
        })
        .catch(() => caches.match(event.request).then(resp => resp || caches.match('./index.html')))
    );
    return;
  }
  event.respondWith(caches.match(event.request).then(resp => resp || fetch(event.request).catch(() => caches.match('./index.html'))));
});


self.addEventListener('notificationclick', event => {
  event.notification.close();
  event.waitUntil(
    self.clients.matchAll({ type:'window', includeUncontrolled:true }).then(clients => {
      for (const client of clients) {
        if ('focus' in client) return client.focus();
      }
      if (self.clients.openWindow) return self.clients.openWindow('./');
    })
  );
});
