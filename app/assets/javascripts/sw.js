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