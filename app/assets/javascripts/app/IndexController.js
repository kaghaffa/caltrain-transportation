define([
  // 'idb'
], function() {
  'use strict';

  function openDatabase() {
    if (!navigator.serviceWorker) {
      return Promise.resolve();
    }

    // return idb.open('public-transport', 1, function(upgradeDb) {
    //   upgradeDb.createObjectStore('stops', {
    //     keyPath: 'id'
    //   })
    // });
  }

  console.log("GETS HERE")
  return {

    init: function() {
      this._dbPromise = openDatabase();
      this._registerServiceWorker();
      this._showCachedStops();
    },

    _registerServiceWorker: function() {
      if (!navigator.serviceWorker) return;

      navigator.serviceWorker.register('/sw.js').then(function(worker) {});
    },

    _showCachedStops: function() {

    }
  }

});
