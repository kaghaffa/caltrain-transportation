define([], function() {
  'use strict';

  return {

    init: function() {
      if (!this._initialized) {
        this._registerServiceWorker();
        this._initialized = true;
      }
    },

    _registerServiceWorker: function() {
      if (!navigator.serviceWorker) return;

      navigator.serviceWorker.register('assets/app/sw.js').then(function(worker) {});
    }
  }
});
