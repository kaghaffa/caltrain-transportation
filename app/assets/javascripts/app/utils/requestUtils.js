define([], function() {
  return {

    createQueryParams: function(query) {
      var params = Object.keys(query)
       .map(function(key) {
          return encodeURIComponent(key) + "=" + encodeURIComponent(query[key])
        })
       .join("&")
       .replace(/%20/g, "+");

      return params;
    }

  }
});