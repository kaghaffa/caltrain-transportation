define([
  'react',
  'react-router',
  'lodash'
], function(React, ReactRouter, _) {

  return React.createClass({

    propTypes: {
      stops: React.PropTypes.object.isRequired
    },

    getInitialState: function() {
      return {
        departureStation: null,
        arrivalStation: null
      };
    },

    _handleInputChange: function(key, e) {
      console.log(key, this.props.stops[e.target.value])
    },

    _onFormSubmit: function() {

    },

    render: function() {
      var stationOptions = _.toPairs(this.props.stops).map(function(stop, index) {
        return <option key={ index } value={ stop[0] }>{ stop[0] }</option>
      });

      return (
        <div className="stop-select-form-content col-md-10 col-md-offset-1 well">
          <form onSubmit={ this._onFormSubmit }>
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
          </form>
        </div>
      );
    }

  });
});
