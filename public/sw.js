var staticCacheName = 'public-transport-v1';
var allCaches = [staticCacheName];

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(staticCacheName).then(function(cache) {
      return cache.addAll([
        'https://fonts.gstatic.com/s/lato/v11/22JRxvfANxSmnAhzbFH8PgLUuEpTyoUstqEm5AMlJo4.woff2',
        'https://fonts.gstatic.com/s/lato/v11/MDadn8DQ_3oT6kvnUq_2r_esZW2xOQ-xsNqO47m55DA.woff2',
        'https://fonts.gstatic.com/s/lato/v11/MgNNr5y1C_tIEuLEmicLmwLUuEpTyoUstqEm5AMlJo4.woff2',
        '/',
        '/offline.html',
        '/sw.js'
      ]);
    })
  );
});

self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      cacheNames.filter(function(cacheName) {
        return cacheName.startsWith('public-transport-') &&
          !allCaches.includes(cacheName);
      }).map(function(cacheName) {
        return caches.delete(cacheName);
      });
    })
  );
});

self.addEventListener('fetch', function(event) {
  var request = event.request;
  var requestUrl = new URL(request.url);

  if (requestUrl.origin === location.origin) {
    if (requestUrl.pathname === '/' || requestUrl.pathname.startsWith('/assets/')) {
      event.respondWith(caches.open(staticCacheName).then(function(cache) {
        return cache.match(requestUrl).then(function(response) {
          if (response) { return response; }

          return fetch(request).then(function(networkResponse) {
            if (networkResponse.status < 400) {

              cache.put(requestUrl, networkResponse.clone());
            }
            return networkResponse;
          }).catch(function(error) {
            return caches.match('offline.html');
          });
        });
      }));

      return;
    }
  }

  event.respondWith(caches.match(event.request).then(function (response) {
    return response || fetch(event.request);
  }));
});
