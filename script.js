var app = angular.module("yokeApp", ["ngRoute"]);

app.config(function($routeProvider) {
  $routeProvider.when("/", {
    templateUrl: "templates/home.html"
  })
  $routeProvider.when("/message", {
    templateUrl: "templates/message.html"
  })
});

app.controller("HomeCtrl", function($scope, $http, $route) {
  //home page angular here
	});


app.controller("MessageCtrl", function($scope, $http, $route) {
  
  //Message page angular here
	});


// FIREBASE CONFIG:
// var app = angular.module("slapApp", ["firebase"]);
// app.controller("slapCtrl", function($scope, $firebaseObject) {
//   var ref = firebase.database().ref();
//   // download the data into a local object
//   $scope.data = $firebaseObject(ref);
//   // putting a console.log here won't work, see below
// });
// var app = angular.module("slapApp", ["firebase"]);
// app.controller("slapCtrl", function($scope, $firebaseObject) {
//   var ref = firebase.database().ref().child("data");
//   // download the data into a local object
//   var syncObject = $firebaseObject(ref);
//   // synchronize the object with a three-way data binding
//   // click on `index.html` above to see it used in the DOM!
//   syncObject.$bindTo($scope, "data");
// });

