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
      var user = $firebaseObject(ref.child("users").child(firebaseUser.uid));
      user.$loaded().then(function() {
        console.log("did things");
        user.uid = firebaseUser.uid;
        user.name = firebaseUser.displayName;
        user.$save();
      });

      // ref.child("users").child(uid).child(messages);

      

      
      
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

app.controller("HomeCtrl", function($scope, $http, $location, $firebaseAuth, $firebaseArray, $firebaseObject) {
  //home page angular here
  var auth = $firebaseAuth();

  auth.$onAuthStateChanged(function(firebaseUser) {
    if (firebaseUser) {
      $scope.firebaseUser = firebaseUser;
      
    } else {
      
      $location.path("/login");
    }
  });

  var ref = firebase.database().ref();
  $scope.users = $firebaseObject(ref.child("users"));


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
