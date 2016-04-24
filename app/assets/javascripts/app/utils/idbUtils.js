define([
  'idb'
], function(idb) {

  function openDatabase() {
    if (!navigator.serviceWorker) {
      return Promise.resolve();
    }

    return idb.open('public-transport', 1, function(upgradeDb) {
      switch(upgradeDb.oldVersion) {
        case 0:
          upgradeDb.createObjectStore('public-transport-store', {
            autoIncrement: false
          });
      }
    });
  }

  return {

    dbPromise: function() {
      return this._dbPromise || (this._dbPromise = openDatabase());
    },

    test: function() {
      this.dbPromise();
    },

    find: function(key) {
      return this.dbPromise().then(function(db) {
        if (!db) return;

        var tx = db.transaction('public-transport-store');
        var store = tx.objectStore('public-transport-store');
        return store.get(key);
      });
    },

    store: function(key, value) {
      this.dbPromise().then(function(db) {
        console.log("DB: ", db)
        if (!db) return;

        console.log("STORING", key, value)
        var tx = db.transaction('public-transport-store', 'readwrite');
        var store = tx.objectStore('public-transport-store');
        store.put(value, key)
      });
    }
  }
});