define([
  'react',
  'react-router',
], function(React, ReactRouter) {

  return React.createClass({

    render: function() {
      return (
        <div className="spinner">
          <div className="cube1"></div>
          <div className="cube2"></div>
          <div className="cube3"></div>
        </div>
      );
    }

  });
});