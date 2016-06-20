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

app.controller("LoginCtrl", function($scope, $location, $firebaseAuth) {
  var auth = $firebaseAuth();

  auth.$onAuthStateChanged(function(firebaseUser) {

    if (firebaseUser) {
          console.log(firebaseUser);
      $location.path("/");
    }
  });

  $scope.signIn = function() {
    $scope.message = "";
    $scope.error = "";
    auth.$signInWithPopup("facebook")
      .then(function(result) {
        console.log(result);
      })
      .catch(function(error) {
        $scope.error = error;
        console.log(error);
      });
  }

});

app.controller("HomeCtrl", function($scope, $http, $route) {
  //home page angular here
    $scope.logout = function() {
    auth.$signOut();
    $location.path("/login");
  }
	});


app.controller("MessageCtrl", function($scope, $http, $route) {
  //Message page angular here
	});

