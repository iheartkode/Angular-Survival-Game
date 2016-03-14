angular.module("App", [])
.controller("AppCtrl", function($scope, $interval, $timeout) {
  
  $scope.inventory = [
    {
      name: "Fish",
      inventory: [],
    },
    {
      name: "Nuts & Berries",
      amount: 0
    }
  ];
  
  $scope.forageMessage = '';
  $scope.fishMessage = '';
  $scope.message = '';
  $scope.started = false;
  $scope.camped = true;
  $scope.alive = true;
  $scope.player = {
    hunger: 100,
    energy: 100
  };
  
  $scope.fish = [
    {
      name: "Bluegill",
      food: 1
    },
    {
      name: "Perch",
      food: 2
    },
    {
      name: "Rainbow Trout",
      food: 3
    },
    {
      name: "Bass",
      food: 5
    },
    {
      name: "Carp",
      food: 8
    },
    {
      name: "Catfish",
      food: 12
    },
    {
      name: "Salmon",
      food: 12
    },
    {
      name: "Smelt",
      food: 13
    },
    {
      name: "Eel",
      food: 13
    },
    {
      name: "Old Boot",
      food: 0
    },
    {
      name: "Dead Fish",
      food: -5
    },
    {
      name: "Old Man Spectacles",
      food: 0
    }
  ];

  var hungerDecrement = function() {
    $interval(function() {
      if ($scope.player.hunger > 0) {
        $scope.player.hunger -= 1;
      } else if ($scope.player.hunger <= 0 && $scope.camped == false) {
        $scope.message = "You have perished from lack of sustenance!";
        $scope.alive = false;
      }
    }, 10000);
  };
  
  $scope.startGame = function(e) {
    hungerDecrement();
    $scope.started = true;
  };

  $scope.forage = function() {
    var randomAmount = Math.floor(Math.random() * 10);
    if($scope.player.energy <= 5) {
      $scope.message = "You have no energy";
    } else if ($scope.player.energy > 5) {
      $scope.message = "Foraging wild nuts & berries...";
      $timeout(function() {
        $scope.inventory[1].amount += randomAmount;
        $scope.player.energy -= 5;
        $scope.message = "You foraged " + randomAmount + " nuts and berrries.";
      }, 3000);
    }
  };
  
  $scope.fishing = function() {
    var randomFish = $scope.fish[Math.floor(Math.random() * $scope.fish.length)];
    if($scope.player.energy <= 10) {
      $scope.message = "You have no energy";
    }else if($scope.player.energy > 10) {
      $scope.message = "Gone Fishing...";
      $timeout(function() {
        $scope.player.energy -= 10;
        $scope.inventory[0].inventory.push(randomFish);
        $scope.message = "You caught a " + randomFish.name + "!";
      }, 5000);
    }
  };
  
  $scope.eatFish = function(fish) {
    if($scope.player.hunger < 100 && fish.food + $scope.player.hunger < 100) {
      $scope.player.hunger += fish.food;
      $scope.player.energy += fish.food;
      $scope.inventory[0].inventory.splice($scope.inventory[0].inventory.indexOf(fish), 1);
      $scope.message = "You devour the " + fish.name;
    } else {
      $scope.message = "You're not hungry";
    }
  };
  
  $scope.eatBerries = function() {
    if($scope.inventory[1].amount > 0) {
      $scope.player.energy += 1;
      $scope.inventory[1].amount -= 1;
      $scope.message = "You enjoy nuts and berries fresh from the forest.";
    } else {
      $scope.message = "You have no more nuts or berries. Go foraging!";
    } 
  };
  
  $scope.camp = function() {
    $scope.camped = false;
    $scope.message = "You've camped and are now fully restored...  Can only be used once every ten minutes.";
    $scope.player.energy = 100;
    $scope.player.hunger = 100;
    $timeout(function() {
      $scope.camped = true;
      $scope.message = "";
    }, 1800000);
  };
});