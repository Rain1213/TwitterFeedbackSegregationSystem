const cacheName = 'v1';
console.log('called');
const cacheAssets = [
    'index.html',
    './src/assets/Profile/Ali.jpg',
    './src/assets/Profile/Vaspar.jpg',
    './src/assets/Profile/Nikunj.jpg',
    './src/assets/Profile/Vidit.jpg',
    './src/assets/Profile/Rishabh.jpg',
    './src/assets/Profile/profile-bg.jpg',
]

self.addEventListener('install', (event) => {
    // console.log('Service Worker: Installed');
    event.waitUntil(
        caches.open(cacheName)
        .then(cache => {
            cache.addAll(cacheAssets);
        }).then(() => self.skipWaiting())
    );
});

self.addEventListener('activate', (event) => {
    // console.log('Service Worker: Activated');
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.filter(cache => {
                    if(cache !== cacheName) {
                        return caches.delete(cache);
                    } 
                })
            )
        })
    );
});

self.addEventListener('fetch', (event) => {
    console.log(event.request);
    event.respondWith(
      caches.open(cacheName).then(cache => {
        cache.match(event.request).then((response) => {
            console.log(response);
            return response || fetch(event.request);
          })
      })
    );
  });