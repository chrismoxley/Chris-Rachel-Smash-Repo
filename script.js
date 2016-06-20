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
  console.log(users)
  var auth = $firebaseAuth();
  var ref = firebase.database().ref().child("users");
  var users = {};
  auth.$onAuthStateChanged(function(firebaseUser) {
    if (firebaseUser) {
      $scope.firebaseUser = firebaseUser;
      $location.path("/");
        console.log(firebaseUser)
        console.log(firebaseUser.uid)
        console.log(firebaseUser.displayName)
    users = {
      uid: firebaseUser.uid,
      name: firebaseUser.displayName
    }

    console.log(users)
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
 if ($scope.clickCount >= 5) {
  $scope.success = false;
 }
 }
});