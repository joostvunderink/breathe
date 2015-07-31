'use strict';

angular.module('starter.services', [])

.factory('Settings', function() {
  var settings = {
    vibrate: true,
    base: 5,
    numIterations: 10,
    vibrations: {
      in: [500],
      hold: [100, 100, 100, 100, 100],
      out: [250, 250, 250]
    }
  };

  return {
    get: function(name) {
      return settings[name];
    },
    set: function(name, value) {
      settings[name] = value;
      return value;
    }
  };
});

