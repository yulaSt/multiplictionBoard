const StaticFiles = ['board.js', 'board-style.css', 'guess-component.js'
    , 'index.html', 'index.js', 'fontawesome/all.css', 'webfonts/fa-solid-900.woff2'
, 'recorder.js'];
const CACHE_NAME = 'multipliction';

function fetchAndCache(request, cachedResponse) {
    return fetch(request)
        .then((response) => {
            // Check if we received a valid response
            if (!response.ok) {
                console.error('response', response);
                //     throw Error(response.statusText);
            }
            return caches.open(CACHE_NAME)
                .then((cache) => {
                    if (request.method === 'post') {
                        return response;
                    }
                    cache.put(request, response.clone());
                    return response;
                });
        })
        .catch(function (error) {
            return cachedResponse;
            // You could return a custom offline 404 page here
        });
}

self.addEventListener('fetch', function (event) {
    self.clientId = event.clientId;
    event.respondWith(
        caches.match(event.request)
            .then(function (response) {
                return fetchAndCache(event.request, response);
            })
    );
});

addEventListener('install', async evt => {
    evt.waitUntil(
        caches.open(CACHE_NAME).then(cacheOpen => {
            return cacheOpen.addAll(StaticFiles);
        })
    )
})
