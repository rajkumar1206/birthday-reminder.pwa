const staticCache = 'static-v4';
const assets = [
    '/',
    '/index.html',
    '/edit.html',
    '/js/addProfile.js',
    '/js/app.js',
    '/js/connect.js',
    '/js/main.js',
    '/js/materialize.min.js',
    'https://fonts.googleapis.com/css?family=Lobster&display=swap',
    '/js/remider.js',
    '/js/userProfile.js',
    '/images/img-192x192.png',
    '/fonts/Lobster-Regular.ttf',
    '/css/materialize.css',
    '/css/style.css',
    '/css/userProfile.css',
    '/manifest.json',
    'https://fonts.googleapis.com/icon?family=Material+Icons',
    'https://fonts.gstatic.com/s/materialicons/v50/flUhRq6tzZclQEJ-Vdg-IuiaDsNcIhQ8tQ.woff2'
];

self.addEventListener('install', e => {
    console.log("Installed ...");
    e.waitUntil(
        caches.open(staticCache).then(cache => {
            console.log('caching...');
            cache.addAll(assets);
        })
    );
});

self.addEventListener('activate', evt => {
    console.log("Activated ...");
    evt.waitUntil(
      caches.keys().then(keys => {
        return Promise.all(keys
          .filter(key => key !== staticCache)
          .map(key => caches.delete(key))
        );
      })
    );
  });

self.addEventListener('fetch', e => {
    e.respondWith(
        caches.match(e.request).then(cache => {
            return cache || fetch(e.request.url);
        })
    )
})
