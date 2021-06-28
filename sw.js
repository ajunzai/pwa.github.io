const VERSION = 0
const CACHE_NAME = 'cache_v' + VERSION
const CACHE_URLS = [
    '/',
    'index.html',
    'main.css',
]
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => cache.addAll(CACHE_URLS))
            .then(() => self.skipWaiting())
    )
})

self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request)
            .then(resp => {
                return resp || fetch(evnet.request).then(response => {
                    caches.open(CACHE_NAME).then(cache => {
                        cache.put(event.request, response.clone())
                    })
                    return response
                })
            })
    )
})

self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then(keys => {
            return Promise.all(keys.forEach(key => {
                if (CACHE_NAME !=key) {
                    caches.delete(key)
                }
            }))
        }).then(() => self.clients.claim())
    )
})