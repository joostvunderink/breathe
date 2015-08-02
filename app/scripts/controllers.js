'use strict';

angular.module('breathe.controllers', [])

.controller('BreatheCtrl', ['$scope', '$interval', 'Settings', '$cordovaVibration', '$localstorage',
function($scope, $interval, Settings, $cordovaVibration, $localstorage) {
  var delta = 40;

  var lastTick;
  var intervalId;

  var iho = new ihoExercise();
  function setInitialDs() {
    $scope.ds = {
      current: 0,
      max: 100,
      numIterations: Settings.get('numIterations')
    }; 
  }
  setInitialDs();
  $scope.running = false;
  $scope.paused  = false;

  function vibrate(action) {
    if (Settings.get('vibrate')) {
      // TODO: Figure out why $cordovaVibration.vibrate(100) leads to an
      // 'undefined' error somewhere in the cordova library.
      console.log('vibrate');
      navigator.vibrate(Settings.get('vibrations')[action]);
    }
  }

  function updateDisplay() {
    $scope.ds = iho.getDisplayStatus();
  }

  function update() {
    var currentAction = $scope.ds.action;
    var now = new Date().getTime();

    var diff = now - lastTick;
    lastTick = now;

    iho.update(diff);
    updateDisplay();
    var newAction = $scope.ds.action;
    if (newAction !== currentAction) {
      vibrate(newAction);
    }
  }


  function start() {
    var action = iho.getDisplayStatus().action;
    vibrate(action);
    $scope.currentAction = action;
    iho.setSetting('base', Settings.get('base') * 1000);
    iho.setSetting('numIterations', Settings.get('numIterations'));
    lastTick = new Date().getTime();
    $scope.running = true;
    $scope.paused = false;
    intervalId = $interval(update, delta);
  }

  $scope.start = start;

  function pause() {
    $interval.cancel(intervalId);
    update();
    $scope.paused = true;
  }

  $scope.pause = pause;

  function resume() {
    lastTick = new Date().getTime();
    intervalId = $interval(update, delta);
    $scope.paused = false;
  }

  $scope.resume = resume;

  function stop() {
    iho.reset();
    $interval.cancel(intervalId);
    $scope.paused = false;
    $scope.running = false;
    $scope.pausedAfter = 0;
    setInitialDs();
  }

  $scope.stop = stop;
}])
.controller('SettingsCtrl', function($scope, Settings) {
  $scope.settings = {
    vibrate: Settings.get('vibrate'),
    base: Settings.get('base'),
    numIterations: Settings.get('numIterations')
  };

  $scope.baseOptions = range(4, 20);
  $scope.numIterationsOptions = range(5, 20);

  function save() {
    Settings.set('vibrate', $scope.settings.vibrate);
    Settings.set('base', $scope.settings.base);
    Settings.set('numIterations', $scope.settings.numIterations);
  }

  $scope.save = save;
})
.factory('$localstorage', ['$window', function($window) {
  return {
    set: function(key, value) {
      $window.localStorage[key] = value;
    },
    get: function(key, defaultValue) {
      return $window.localStorage[key] || defaultValue;
    },
    setObject: function(key, value) {
      $window.localStorage[key] = JSON.stringify(value);
    },
    getObject: function(key) {
      return JSON.parse($window.localStorage[key] || '{}');
    }
  }
}]);;

function range(start, end) {
    var foo = [];
    for (var i = start; i <= end; i++) {
        foo.push(i);
    }
    return foo;
}
