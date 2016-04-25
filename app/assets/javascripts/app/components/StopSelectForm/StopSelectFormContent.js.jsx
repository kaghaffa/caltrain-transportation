define([
  'react',
  'react-router',
  'lodash',
  'app/actions/stopActions',
], function(React, ReactRouter, _, StopActions) {

  return React.createClass({

    propTypes: {
      stops: React.PropTypes.array.isRequired,
      stopNames: React.PropTypes.array.isRequired
    },

    getInitialState: function() {
      return {
        departureStation: null,
        arrivalStation: null
      };
    },

    _handleInputChange: function(key, e) {
      var nextState = _.cloneDeep(this.state);
      nextState[key] = e.target.value;
      this.setState(nextState);
    },

    _stopDirection: function(departingStop, arrivingStop) {
      var departingStopIndex = this.props.stopNames.indexOf(departingStop);
      var arrivingStopIndex = this.props.stopNames.indexOf(arrivingStop);
      if (departingStopIndex < arrivingStopIndex) {
        return "SB";
      } else if (departingStopIndex > arrivingStopIndex) {
        return "NB";
      }
    },

    _stopIdOf: function(stopName, stopDirection) {
      var stop = this.props.stops.find(function(el) { return el[0] == stopName; } )
      return stop[1][stopDirection]
    },

    _onFormSubmit: function(e) {
      e.preventDefault();
      if (this.state.departureStation === this.state.arrivalStation) return;

      var stopDirection = this._stopDirection(this.state.departureStation, this.state.arrivalStation);
      var departingStopId = this._stopIdOf(this.state.departureStation, stopDirection)
      var arrivingStopId = this._stopIdOf(this.state.arrivalStation, stopDirection)

      StopActions.getStopTimes(departingStopId, arrivingStopId, 'weekday');
    },

    render: function() {
      var stationOptions = this.props.stops.map(function(stop, index) {
        return <option key={ index } value={ stop[0] }>{ stop[0] }</option>
      });

      return (
        <div className="stop-select-form-content col-md-10 col-md-offset-1">
          <form className="well">
            <div className="row">
              <div className="col-md-6 form-group">
                <label htmlFor="departureStation">Departing</label>
                <select
                  onChange={ this._handleInputChange.bind(this, 'departureStation') }
                  value={ this.state.departureStation }
                  className="form-control"
                  required >
                  <option disabled selected>Select Departing Station</option>
                  { stationOptions }
                </select>
              </div>

              <div className="col-md-6 form-group">
                <label htmlFor="arrivalStation">Arriving</label>
                <select
                  onChange={ this._handleInputChange.bind(this, 'arrivalStation') }
                  value={ this.state.arrivalStation }
                  className="form-control"
                  required >
                  <option disabled selected>Select Arrival Station</option>
                  { stationOptions }
                </select>
              </div>
            </div>

            <div className="row">
              <div className="col-md-12">
                <button
                  type="submit"
                  onClick={ this._onFormSubmit }
                  className="btn btn-success pull-right">
                  Search
                </button>
              </div>
            </div>
          </form>
        </div>
      );
    }

  });
});
