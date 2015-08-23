angular.module('vb.controllers')
.controller('SettingsCtrl', function($scope, Settings, $localstorage) {
  $scope.settings = {
    vibrate        : Settings.get('vibrate'),
    base           : Settings.get('base'),
    numRounds  : Settings.get('numRounds'),
    smoothAnimation: Settings.get('smoothAnimation'),
  };

  $scope.minRounds = 4;
  $scope.maxRounds = 100;
  $scope.minBaseTime = 3;
  $scope.maxBaseTime = 30;

  function save() {
    Settings.set('vibrate',         $scope.settings.vibrate);
    Settings.set('base',            $scope.settings.base);
    Settings.set('numRounds',       $scope.settings.numRounds);
    Settings.set('smoothAnimation', $scope.settings.smoothAnimation);
  }

  $scope.save = save;

  $scope.modifyNumRounds = function(amount) {
    $scope.settings.numRounds += amount;
    if ($scope.settings.numRounds > $scope.maxRounds) {
      $scope.settings.numRounds = $scope.maxRounds;
    }
    if ($scope.settings.numRounds < $scope.minRounds) {
      $scope.settings.numRounds = $scope.minRounds;
    }
    save();
  }

  $scope.modifyBaseTime = function(amount) {
    $scope.settings.base += amount;
    if ($scope.settings.base > $scope.maxBaseTime) {
      $scope.settings.base = $scope.maxBaseTime;
    }
    if ($scope.settings.base < $scope.minBaseTime) {
      $scope.settings.base = $scope.minBaseTime;
    }
    save();
  }
})
