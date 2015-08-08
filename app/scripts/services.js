'use strict';

angular.module('breathe.services', [])

.factory('Settings', ['$localstorage', function($localstorage) {
  function getInitialValue(settingName) {
    var defaults = {
      vibrate      : true,
      base         : 5,
      numIterations: 10,
      introSeen    : false,
      smoothAnimation: true,
    };

    var value = $localstorage.get(settingName);
    if (value) {
      return value;
    }

    return defaults[settingName];
  }

  var settings = {
    vibrate      : getInitialValue('vibrate') === 'true',
    base         : parseInt(getInitialValue('base')),
    numIterations: parseInt(getInitialValue('numIterations')),
    introSeen    : getInitialValue('introSeen') === 'true',
    smoothAnimation: getInitialValue('smoothAnimation') === 'true',
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
      $localstorage.set(name, value);
      return value;
    }
  };
}]);
