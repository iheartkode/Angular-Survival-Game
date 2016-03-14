angular.module("App", [])
.controller("StatsCtrl", function($scope, $interval) {
  $scope.inventory = [
    {
      name: "Fish",
      amount: 0
    },
    {
      name: "Nuts & Berries",
      amount: 0
    },
    {
      name: "Canteen",
      amount: 0
    }
  ];
  $scope.started = false;
  $scope.player = {
    food: 100,
    water: 100,
    energy: 100
  };

  var foodDecrement = function() {
    $interval(function() {
      if ($scope.player.food > 5) {
        $scope.player.food -= 0.5;
        $scope.player.water -= 1;
      } else if ($scope.player.energy > 0) {
       $scope.player.energy = Math.floor($scope.player.energy *= 0.7);
       console.log($scope.player.energy);
      }
    }, 30000);
  };
  
  $scope.startGame = function(e) {
    foodDecrement();
    $scope.started = true;
  };
})
.controller("ForageCtrl", function($scope) {
  $scope.forage = function() {
    $scope.inventory[1].amount += 1;
    console.log($scope.inventory[1].amount);
  };
});