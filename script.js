var app = angular.module("yokeApp", ["ngRoute", "firebase"]);

app.config(function($routeProvider) {
  $routeProvider.when("/", {
    templateUrl: "templates/home.html"
  })
  $routeProvider.when("/login", {
    controller: "LoginCtrl",
    templateUrl: "templates/login.html"
  })
  $routeProvider.when("/message", {
    templateUrl: "templates/message.html"
  })
});

app.controller("LoginCtrl", function($scope, $location, $firebaseAuth, $firebaseArray, $firebaseObject, $timeout) {
  
  var auth = $firebaseAuth();
  var ref = firebase.database().ref();
  auth.$onAuthStateChanged(function(firebaseUser) {
    if (firebaseUser) {
      var users = $firebaseObject(ref.child("users"));
      users[firebaseUser.uid] = {
        uid: firebaseUser.uid,
        name: firebaseUser.displayName
      }
      users.$save();
      $scope.firebaseUser = firebaseUser;
      $location.path("/");

    } else {
      $location.path("/login");
    }
  });
  $scope.signIn = function() {
    $scope.message = "";
    $scope.error = "";
    auth.$signInWithPopup("facebook")
    .catch(function(error) {
      $scope.error = error;
    });
  }

});

app.controller("HomeCtrl", function($scope, $http, $location, $firebaseAuth) {
  //home page angular here
  var auth = $firebaseAuth();
  auth.$onAuthStateChanged(function(firebaseUser) {
    if (firebaseUser) {
      $scope.firebaseUser = firebaseUser;
      
    } else {
      
      $location.path("/login");
    }
  });
  $scope.logout = function() {
    auth.$signOut();
    $location.path("/login");
  }
});



app.controller("MessageCtrl", function($scope, $http, $route) {
 //Message page angular here
    $scope.success = true; 
 $scope.clickCount = 0;
 $scope.counter = function () {
   $scope.clickCount = $scope.clickCount + 1;
 if ($scope.clickCount >= 100) {
  $scope.success = false;
 }
 }
});