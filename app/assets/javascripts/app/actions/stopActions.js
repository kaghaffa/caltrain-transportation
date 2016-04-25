define([
  'app/constants/stopConstants',
  'app/dispatcher/AppDispatcher',
  'app/utils/requestUtils',
  'app/utils/idbUtils'
], function(StopConstants, Dispatcher, RequestUtils, idbUtils) {

  'use strict' ;

  return {
    getStops: function() {
      var requestUrl = "/api/v1/stops";

      // Fetch from IDB first to see if it exists
      idbUtils.find(requestUrl).then(function(dbResult) {
        if (dbResult) {
          Dispatcher.handleServerAction({
            type: StopConstants.GET_STOPS_SUCCESS, response: dbResult
          });

          return;
        }

        fetch(requestUrl).then(function(response) {
          if (response.status >= 200 && response.status < 300) {

            response.json().then(function(res) {
              // Store in IDB
              idbUtils.store(requestUrl, res)

              Dispatcher.handleServerAction({
                type: StopConstants.GET_STOPS_SUCCESS, response: res
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
            type: StopConstants.GET_STOPS_FAILURE, response: error
          });
        });

      });
    },

    getStopTimes: function(departingStopId, arrivingStopId, scheduleName) {
      var params = RequestUtils.createQueryParams({
        schedule_name: scheduleName,
        arriving_stop_id: arrivingStopId
      });
      var requestUrl = '/api/v1/stops/' + departingStopId + '/stop_times?' + params;

      // Fetch from IDB first to see if it exists
      idbUtils.find(requestUrl).then(function(dbResult) {
        if (dbResult) {
          Dispatcher.handleServerAction({
            type: StopConstants.GET_STOP_TIMES_SUCCESS, response: dbResult
          });

          return;
        }

        fetch(requestUrl).then(function(response) {
          if (response.status >= 200 && response.status < 300) {

            response.json().then(function(res) {
              // Store in IDB
              idbUtils.store(requestUrl, res)

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
      });
    }
  };
});