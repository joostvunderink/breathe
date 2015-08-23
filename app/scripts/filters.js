'use strict';

angular.module('vb.filters', [])
.filter('capitalize', function() {
    return function(input) {
      if (!input || input.length === 0) {
        return input;
      }
      return input.charAt(0).toUpperCase() + input.substr(1).toLowerCase();
    }
});
