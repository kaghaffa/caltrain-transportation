import idb from 'idb';



function openDatabase() {
  // If the browser doesn't support service worker,
  // we don't care about having a database
  if (!navigator.serviceWorker) {
    return Promise.resolve();
  }

  return idb.open('wittr', 1, function(upgradeDb) {
    var store = upgradeDb.createObjectStore('wittrs', {
      keyPath: 'id'
    });
    store.createIndex('by-date', 'time');
  });
}

if (navigator.serviceWorker) {
  navigator.serviceWorker.register('/sw.js', {
    scope: './'
  }).then(function(worker) {
    console.log('Yey!', worker);
    document.querySelector('p').removeAttribute('hidden');
  }).catch(function(error) {
    console.log('Boo!', error);
  });
}


