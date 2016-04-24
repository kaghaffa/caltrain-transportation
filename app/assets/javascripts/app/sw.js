var staticCacheName = 'public-transport-v3';
var allCaches = [staticCacheName];

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(staticCacheName).then(function(cache) {
      return cache.addAll([
        'https://fonts.gstatic.com/s/lato/v11/22JRxvfANxSmnAhzbFH8PgLUuEpTyoUstqEm5AMlJo4.woff2',
        'https://fonts.gstatic.com/s/lato/v11/MDadn8DQ_3oT6kvnUq_2r_esZW2xOQ-xsNqO47m55DA.woff2',
        'https://fonts.gstatic.com/s/lato/v11/MgNNr5y1C_tIEuLEmicLmwLUuEpTyoUstqEm5AMlJo4.woff2'
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
  console.log("FETCH")
  var request = event.request;
  var requestUrl = new URL(request.url);
  console.log(requestUrl)

  if (requestUrl.origin === location.origin) {
    if (requestUrl.pathname.startsWith('/assets/')) {
      return caches.open(staticCacheName).then(function(cache) {
        return cache.match(requestUrl).then(function(response) {
          if (response) return response;

          return fetch(request).then(function(networkResponse) {
            cache.put(requesetUrl, networkResponse.clone());
            return networkResponse;
          });
        });
      });
    }
  }

  event.respondWith(caches.match(event.request).then(function (response) {
    return response || fetch(event.request);
  }));
});
