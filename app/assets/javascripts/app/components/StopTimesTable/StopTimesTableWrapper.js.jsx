define([
  'react',
  'react-router',
  'app/components/StopTimesTable/StopTimesTableHeader',
  'app/components/StopTimesTable/StopTimesTableContent',
], function(React, ReactRouter, StopTimesTableHeader, StopTimesTableContent) {

  return React.createClass({

    render: function() {
      return (
        <div className="stop-select-form-wrapper">
          <StopTimesTableHeader />
          <StopTimesTableContent />
        </div>
      );
    }

  });
});