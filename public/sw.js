// importScripts('serviceworker-cache-polyfill.js');
// importScripts('build.js');

var cacheKey = 'pages';
var options = {
  headers: {
    'Content-Type': 'text/html'
  }
};

self.addEventListener('fetch', function(event) {
  var requestUrl = new URL(event.request.url);

  if (requestUrl.origin === location.origin) {
    if (/\.js$/.test(event.request.url)) {
      console.log('FETCH')
      _static(event);
    }

    if (requestUrl.pathname.startsWith('/api/')) {
      _app(event);
    }
  }
});

self.addEventListener('activate', function() {
  console.log('ACTIVATE')
  caches.open(cacheKey).then(function(cache) {
    cache.keys().then(function(requests) {
      requests.forEach(function(request) {
        cache.delete(request);
      });
    });
  });
});

function _static(event) {
  event.respondWith(
    fetch(event.request.url)
  );
}

function _app(event) {
  event.respondWith(
    caches.match(event.request).then(function(page) {
      return page || _route(event);
    })
  );
}

function _route(event) {
  return fetch(event.request.url).then(function(response) {
    _store(event.request.url, response)
    return response;
  });
}

function _path(url) {
  return Url.parse(url).path;
}

function _render(Handler) {
  var handler = React.createFactory(Handler);
  return React.renderToString(handler());
}

function _store(request, response) {
  return caches.open(cacheKey).then(function(cache) {
    return cache.put(request, response.clone());
  });
}