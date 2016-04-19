define([
  'event-emitter',
  'lodash',
  'app/dispatcher/AppDispatcher',
  'app/constants/stopConstants'
], function(EventEmitter, _, Dispatcher, StopConstants) {

  'use strict';

  var _stops = {};
  var _stopTimes = [];

  function _setStops(stops) {
    _stops = stops
  }

  function _setStopTimes(stopTimes) {
    _stopTimes = stopTimes
  }

  var StopStore = _.extend({}, EventEmitter.prototype, {
    emitChange: function() {
      this.emit('change');
    },

    addChangeListener: function(callback) {
      this.on('change', callback);
    },

    removeChangeListener: function(callback) {
      this.removeListener('change', callback);
    },

    getStopTimes: function() {
      return _stopTimes;
    },

    getStops: function() {
      return _stops;
    },

    dispatcherIndex: Dispatcher.register(function(payload) {
      var action = payload.action;

      switch (action.type) {
        case StopConstants.GET_STOPS_SUCCESS:
          _setStops(action.response);
          StopStore.emitChange();
          break;
        case StopConstants.GET_STOP_TIMES_SUCCESS:
          _setStopTimes(action.response.trips);
          StopStore.emitChange();
          break;
      }

      return true;
    })
  });

  return StopStore;
});