angular.module('breathe.controllers')
.controller('StatsController', function($scope, Settings) {
  var achievements = [
    {
      name: 'First Breath',
      description: 'Completed the exercise once',
      requirement: function(stats) {
        return stats.numExercises >= 1;
      },
    },
    {
      name: 'Third Breath',
      description: 'Completed the exercise three times',
      requirement: function(stats) {
        return stats.numExercises >= 3;
      },
    },
    {
      name: 'Seven times',
      description: 'Completed the exercise seven times',
      requirement: function(stats) {
        return stats.numExercises >= 7;
      },
    },
    {
      name: 'Thirty times',
      description: 'Completed the exercise thirty times',
      requirement: function(stats) {
        return stats.numExercises >= 30;
      },
    },
    {
      name: 'Three in a Row',
      description: 'Completed the exercise in three consecutive days',
      requirement: function(stats) {
        return stats.consecutiveDays >= 3;
      },
    },
    {
      name: 'One week in a Row',
      description: 'Completed the exercise in seven consecutive days',
      requirement: function(stats) {
        return stats.consecutiveDays >= 7;
      },
    },

  ]


  $scope.stats = {
    numExercises: 17,
    consecutiveDays: 5
  };

  var achievementData = [];
  var row = [];
  achievements.forEach(function(a) {
    var data = {
      name       : a.name,
      description: a.description,
      completed  : false
    };
    if (a.requirement($scope.stats)) {
      data.completed = true;
    }
    data.cssClass = data.completed ? 'completed' : 'incomplete';
    
    row.push(data);
    if (row.length === 3) {
      achievementData.push(row);
      row = [];
    }
  });

  if (row.length > 0) {
    achievementData.push(row);
  }
  $scope.achievements = achievementData;
});
