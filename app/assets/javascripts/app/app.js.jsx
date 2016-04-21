require([
	'react',
	'react-router-shim',
	'react-router',
  'app/IndexController',
  'app/components/AppWrapper'
], function(React, ReactRouterShim, ReactRouter, IndexController, AppWrapper) {
	'use strict';

  var Route           = ReactRouter.Route;
  var HistoryLocation = ReactRouter.HistoryLocation;

  var routes = (
  	<Route name="app" path="/" handler={ AppWrapper }>
    </Route>
  );

  IndexController.init();

  ReactRouter.run(routes, HistoryLocation, function(Handler, state) {
    var params = state.params;
  	React.render(<Handler params={ params } />, document.body);
  });
});