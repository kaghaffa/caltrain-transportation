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
      var stopTimeCards = this.props.stopTimes.map(function(stopTime) {
        return(
          <div className="col-md-4 col-sm-6">
            <div className="stop-time-card panel panel-body">
              <p>Departs: { stopTime.departing_time }</p>
              <p>Arrives: { stopTime.arriving_time }</p>
              <p>Total Time: { Utils.convertSecondsToReadable(stopTime.trip_time) }</p>
            </div>
          </div>
        );
      });


      var resultsSummary = null;
      if (stopTimeCards.length) {
        resultsSummary = (
          <h4>{ this.props.stopTimes.length } trains found</h4>
        );
      }

      return (
        <div className="stop-times-table-content">
          <div className="row">
            <div className="col-md-12">
              { resultsSummary }
            </div>
          </div>

          <div className="row">
            <div className="col-md-12">
              { stopTimeCards }
            </div>
          </div>
        </div>
      );
    }

  });
});