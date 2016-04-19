define([
  'app/constants/stopConstants',
  'app/dispatcher/AppDispatcher',
  'app/utils/requestUtils'
], function(StopConstants, Dispatcher, RequestUtils) {

  'use strict' ;

  return {
    getStops: function() {
      fetch('/api/v1/stops')
        .then(function(response) {
          if (response.status >= 200 && response.status < 300) {

            response.json().then(function(res) {
              Dispatcher.handleServerAction({
                type: StopConstants.GET_STOPS_SUCCESS,
                response: res
              });
            });
          } else {
            Dispatcher.handleServerAction({
              type: StopConstants.GET_STOPS_FAILURE
            });
          }
        })
        .catch(function(error) {
          console.log('request failed', error);

          Dispatcher.handleServerAction({
            type: StopConstants.GET_STOPS_FAILURE,
            response: error
          });
        })
    },

    getStopTimes: function(departingStopId, arrivingStopId, scheduleName) {
      var params = RequestUtils.createQueryParams({
        schedule_name: scheduleName,
        arriving_stop_id: arrivingStopId
      });

      fetch('/api/v1/stops/' + departingStopId + '/stop_times?' + params)
        .then(function(response) {
          if (response.status >= 200 && response.status < 300) {

            response.json().then(function(res) {
              Dispatcher.handleServerAction({
                type: StopConstants.GET_STOP_TIMES_SUCCESS,
                response: res
              });
            });
          } else {

            Dispatcher.handleServerAction({
              type: StopConstants.GET_STOP_TIMES_FAILURE
            });
          }
        })
        .catch(function(error) {
          console.log('request failed', error);

          Dispatcher.handleServerAction({
            type: StopConstants.GET_STOP_TIMES_FAILURE,
            response: error
          });
        })
    }
  };
});