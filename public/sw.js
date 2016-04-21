var staticCacheName = 'public-transport-v1';
var allCaches = [staticCacheName];

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(staticCacheName).then(function(cache) {
      return cache.addAll([
        'assets/application.js',
        'assets/application.self.css?body=1',
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
          !allCaches.include(cacheName);
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
    if (requestUrl.pathname.startsWith('/api/')) {
      caches.open(staticCacheName).then(function(cache) {
        cache.match(request.url).then(function(response) {
          if (response) return response;

          console.log("FETCHING")
          return fetch(request).then(function(networkResponse) {
            cache.put(request.url, networkResponse.clone());
            return networkResponse;
          });
        });
      });
    }
  }

  event.respondWith(caches.match(event.request).then(function (response) {
    console.log(event.request, response)
    return response || fetch(event.request);
  }));
});

// self.addEventListener('fetch', function(event) {
//   var requestUrl = new URL(event.request.url);

//   if (requestUrl.origin === location.origin) {
//     if (requestUrl.pathname === '/') {
//       event.respondWith(caches.match('/skeleton'));
//       return;
//     }
//     if (requestUrl.pathname.startsWith('/photos/')) {
//       event.respondWith(servePhoto(event.request));
//       return;
//     }
//     // TODO: respond to avatar urls by responding with
//     // the return value of serveAvatar(event.request)
//     if (requestUrl.pathname.startsWith('/avatars/')) {
//       event.respondWith(serveAvatar(event.request));
//       return;
//     }
//   }

//   event.respondWith(
//     caches.match(event.request).then(function(response) {
//       return response || fetch(event.request);
//     })
//   );
// });

// self.addEventListener('fetch', function (event) {
//   var requestUrl = new URL(event.request.url);

//   if (requestUrl.origin === location.origin) {
//     if (requestUrl.pathname === '/') {
//       event.respondWith(caches.match('/skeleton'));
//       return;
//     }
//     if (requestUrl.pathname.startsWith('/photos/')) {
//       event.respondWith(servePhoto(event.request));
//       return;
//     }
//     // TODO: respond to avatar urls by responding with
//     // the return value of serveAvatar(event.request)
//     if (requestUrl.pathname.startsWith('/avatars/')) {
//       event.respondWith(serveAvatar(event.request));
//       return;
//     }
//   }

//   event.respondWith(caches.match(event.request).then(function (response) {
//     return response || fetch(event.request);
//   }));
// });


// self.addEventListener('fetch', function(event) {
//   var requestUrl = new URL(event.request.url);

//   if (requestUrl.origin === location.origin) {
//     if (/\.js$/.test(event.request.url)) {
//       console.log('FETCH')
//       _static(event);
//     }

//     if (requestUrl.pathname.startsWith('/api/')) {
//       _app(event);
//     }
//   }
// });

// self.addEventListener('activate', function() {
//   console.log('ACTIVATE')
//   caches.open(cacheKey).then(function(cache) {
//     cache.keys().then(function(requests) {
//       requests.forEach(function(request) {
//         cache.delete(request);
//       });
//     });
//   });
// });

// function _static(event) {
//   event.respondWith(
//     fetch(event.request.url)
//   );
// }

// function _app(event) {
//   event.respondWith(
//     caches.match(event.request).then(function(page) {
//       return page || _route(event);
//     })
//   );
// }

// function _route(event) {
//   return fetch(event.request.url).then(function(response) {
//     _store(event.request.url, response)
//     return response;
//   });
// }

// function _path(url) {
//   return Url.parse(url).path;
// }

// function _render(Handler) {
//   var handler = React.createFactory(Handler);
//   return React.renderToString(handler());
// }

// function _store(request, response) {
//   return caches.open(cacheKey).then(function(cache) {
//     return cache.put(request, response.clone());
//   });
// }