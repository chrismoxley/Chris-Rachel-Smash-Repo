var app = angular.module("yokeApp", ["ngRoute", "firebase"]);

app.config(function($routeProvider) {
  $routeProvider.when("/", {
    templateUrl: "templates/home.html",
    controller: "HomeCtrl"
  })
  $routeProvider.when("/login", {
    controller: "LoginCtrl",
    templateUrl: "templates/login.html"
  })
  $routeProvider.when("/message", {
    controller: "MessageCtrl",
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
      var user = $firebaseObject(ref.child("users").child(firebaseUser.displayName));
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
  // $scope.users = $firebaseObject(firebase.database().ref().child("users"))
  $scope.users = $firebaseObject(firebase.database().ref().child("users"))
  $scope.users.$loaded().then(function(){
    $scope.friends = [];
    angular.forEach($scope.users, function(value, key) {
     $scope.friends.push(value.name);
   });
  });
  auth.$onAuthStateChanged(function(firebaseUser) {
    if (firebaseUser) {
      var user = $firebaseObject(ref.child("users").child(firebaseUser.displayName));
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
  $scope.send = function() {
    $scope.users.$loaded().then(function(){
      $scope.msgs = $firebaseArray(ref.child("users").child($scope.sentMsg.receiver).child("messages"));
      $scope.msgs.$add({ text: $scope.sentMsg.text, name: $scope.sentMsg.receiver });
      $scope.users.$loaded().then(function(){
        $scope.myMessages = [];
        angular.forEach($scope.users.messages, function(value, key) {
         $scope.myMessages.push(value.text);
       });
      });
    });
  }
  // var firstCh = function () {
  //       $scope.clickCount = 0;
  //       $scope.counter = function () {
  //        $scope.clickCount = $scope.clickCount + 1;
  //        if ($scope.clickCount >= 5) {
  //          $scope.success = false;
  //        }
  //      }
  //    }
  // var secondCh = function () {

  // };
  // $scope.challenges = {
  //   ClickChallenge: firstCh,
  //   challenge2: 
  // }
    $scope.logout = function() {
      auth.$signOut();
      $location.path("/login");
    }
});



app.controller("MessageCtrl", function($scope, $http, $location, $firebaseAuth, $firebaseArray, $firebaseObject) {
 //Message page angular here
 var auth = $firebaseAuth();
 var ref = firebase.database().ref();
 $scope.users = $firebaseObject(firebase.database().ref().child("users"))
 if (document.URL.indexOf("http://localhost:8000/#/message") >= 0) { 
  auth.$onAuthStateChanged(function(firebaseUser) { 
    {if (firebaseUser) {
      $scope.myMessages = $firebaseObject(ref.child("users").child(firebaseUser.displayName).child("messages"));
      var user = $firebaseObject(ref.child("users").child(firebaseUser.displayName));
      $scope.myMessages.$loaded().then(function() {
        // $scope.myMsg = $scope.myMessages.$value.name
        $scope.mine = [];
        angular.forEach($scope.myMessages, function(value, key) {
         $scope.mine.unshift(value.text);
       });
        $scope.success = true; 
        $scope.clickCount = 0;
        $scope.counter = function () {
         $scope.clickCount = $scope.clickCount + 1;
         if ($scope.clickCount >= 5) {
           $scope.success = false;
         }
       }
     });
    } else {
      $location.path("/login");
    }
  }
});
}
});