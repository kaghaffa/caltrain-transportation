define([
  'react',
  'react-router',
], function(React, ReactRouter) {

  return React.createClass({

    render: function() {
      return (
        <div className="stop-select-form-header">
          <h3>Select stops</h3>
        </div>
      );
    }

  });
});