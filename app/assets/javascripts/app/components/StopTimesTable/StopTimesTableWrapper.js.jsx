define([
  'react',
  'react-router',
  'app/stores/stopStore',
  'app/components/StopTimesTable/StopTimesTableHeader',
  'app/components/StopTimesTable/StopTimesTableContent',
], function(React, ReactRouter, StopStore, StopTimesTableHeader,
  StopTimesTableContent) {

  return React.createClass({

    getInitialState: function() {
      return {
        stopTimes: StopStore.getStopTimes()
      };
    },

    componentDidMount: function() {
      StopStore.addChangeListener(this._onStopChange)
    },

    componentWillUnmount: function() {
      StopStore.removeChangeListener(this._onStopChange)
    },

    _onStopChange: function() {
      this.setState({
        stopTimes: StopStore.getStopTimes()
      });
    },

    render: function() {
      return (
        <div className="stop-select-form-wrapper">
          <StopTimesTableHeader />
          <StopTimesTableContent stopTimes={ this.state.stopTimes } />
        </div>
      );
    }

  });
});