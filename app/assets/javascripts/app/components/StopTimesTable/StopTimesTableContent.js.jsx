define([
  'react',
  'react-router',
  'app/utils/utils'
], function(React, ReactRouter, Utils) {

  return React.createClass({

    propTypes: {
      stopTimes: React.PropTypes.array.isRequired
    },

    render: function() {
      console.log(this.props.stopTimes)
      var stopTimeCards = this.props.stopTimes.map(function(stopTime) {
        return(
          <div className="col-md-3">
            <div className="stop-time-card panel panel-body">
              <p>Departs: { stopTime.departing_time }</p>
              <p>Arrives: { stopTime.arriving_time }</p>
              <p>Total Time: { Utils.convertSecondsToReadable(stopTime.trip_time) }</p>
            </div>
          </div>
        );
      });

      return (
        <div className="stop-times-table-content row">
          { stopTimeCards }
        </div>
      );
    }

  });
});