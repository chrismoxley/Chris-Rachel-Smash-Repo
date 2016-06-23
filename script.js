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
      // var users = $firebaseObject(ref.child("users"));
      // users.$loaded()then(function){
      //   users.user = firebaseUser.uid;
      // });
      var user = $firebaseObject(ref.child("users").child(firebaseUser.uid));
      user.$loaded().then(function() {
        user.uid = firebaseUser.uid;
        user.name = firebaseUser.displayName;
        user.$save();
      });
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
  var ref = firebase.database().ref();
  $scope.users = $firebaseObject(firebase.database().ref().child("users"))
  $scope.users.$loaded().then(function(){
    $scope.friends = [];
    angular.forEach($scope.users, function(value, key) {
     $scope.friends.push(value);
     console.log($scope.friends)
    });
  });
  auth.$onAuthStateChanged(function(firebaseUser) {
    if (firebaseUser) {
      var user = $firebaseObject(ref.child("users").child(firebaseUser.uid));
      user.$loaded().then(function() {
        user.uid = firebaseUser.uid;
        user.name = firebaseUser.displayName;
        user.$save();
      });
      $scope.firebaseUser = firebaseUser;
      $location.path("/");

    } else {
      $location.path("/login");
    }
  });
//       $scope.send(){
//       $scope.messages = $firebaseArray(ref.child("users").child(firebaseUser.uid).child("messages"));
//       messages.$loaded().then(function() {
//         //figure out how to add message to array
//     });
// }
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
$scope.timer = true;
});
