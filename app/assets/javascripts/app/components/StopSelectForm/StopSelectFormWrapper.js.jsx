define([
  'react',
  'react-router',
  'lodash',
  'app/actions/stopActions',
  'app/stores/stopStore',
  'app/components/StopSelectForm/StopSelectFormHeader',
  'app/components/StopSelectForm/StopSelectFormContent',
  'app/components/shared/Loading'
], function(React, ReactRouter, _, StopActions, StopStore, StopSelectFormHeader,
  StopSelectFormContent, Loading) {

  return React.createClass({

    getInitialState: function() {
      return {
        stops: StopStore.getStops()
      };
    },

    componentDidMount: function() {
      StopActions.getStops();
      StopStore.addChangeListener(this._onStopsChange);
    },

    componentWillUnmount: function() {
      StopStore.addChangeListener(this._onStopsChange);
    },

    _onStopsChange: function() {
      this.setState({
        stops: StopStore.getStops()
      });
    },

    render: function() {
      if (_.isEmpty(this.state.stops)) {
        return (
          <Loading />
        );
      }

      return (
        <div className="stop-select-form-wrapper">
          <StopSelectFormHeader />
          <StopSelectFormContent stops={ this.state.stops } />
        </div>
      );
    }

  });
});