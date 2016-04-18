define([
	'react',
	'react-router',
	'app/components/shared/Header',
	'app/components/StopSelectForm/StopSelectFormWrapper',
	'app/components/StopTimesTable/StopTimesTableWrapper'
], function(React, ReactRouter, Header, StopSelectFormWrapper, StopTimesTableWrapper) {
	'use strict';

  var RouteHandler = ReactRouter.RouteHandler;

	return React.createClass({
		//<RouteHandler { ...this.props } />

	  render: function() {
	    return (
	    	<div className="main">
	    		<Header />
					<div id="main-wrapper">
						<div className="container">
							<StopSelectFormWrapper />
							<StopTimesTableWrapper />
						</div>
					</div>
	    	</div>
	    );
	  }

	});
});