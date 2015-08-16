'use strict';

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'breathe' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'breathe.services' is found in services.js
// 'breathe.controllers' is found in controllers.js
angular.module('breathe', ['ionic', 'ui.bootstrap', 
  'breathe.controllers', 'breathe.services', 'breathe.filters', 'breathe.localstorage',
  'angular-svg-round-progress', 'ngCordova', 'pascalprecht.translate'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleLightContent();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider, $translateProvider) {

  $translateProvider.translations('en', {
    'in': 'breathe in',
    'out': 'breathe out',
    'hold': 'hold your breath'
  });
  $translateProvider.preferredLanguage('en');
  $translateProvider.useSanitizeValueStrategy('sanitize');

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  // setup an abstract state for the tabs directive
  .state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'templates/tabs.html'
  })

  // Each tab has its own nav history stack:

  .state('tab.breathe', {
    url: '/breathe',
    views: {
      'tab-breathe': {
        templateUrl: 'templates/tab-breathe.html',
        controller: 'BreatheCtrl'
      }
    }
  })

  .state('tab.settings', {
    url: '/settings',
    views: {
      'tab-settings': {
        templateUrl: 'templates/tab-settings.html',
        controller: 'SettingsCtrl'
      }
    }
  })

  .state('tab.info', {
    url: '/info',
    views: {
      'tab-info': {
        templateUrl: 'templates/tab-info.html',
        controller: 'InfoController'
      }
    }
  });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/tab/breathe');

});
