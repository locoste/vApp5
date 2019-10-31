var app = angular.module('simpleChat', ['faye','luegg.directives']);

app.factory('Faye', ['$faye', function($faye) {
  return $faye("http://159.84.143.247:8003/cps");
}]);
//var bayeux = new faye.NodeAdapter({mount: 'http://159.84.143.247:8003/cps'});
app.controller('ChatCtrl', function($rootScope, $scope, Faye) {
  var userTimeStamp = Date.now();
  $scope.chatMessages = []; //Init chat message array
  console.log(Faye)

  Faye.subscribe("/control", function(msg) {
    console.log(msg)
    $scope.chatMessages.push(msg);
  });

  $scope.sendMessage = function($event) {
    if($event.which != 13) return;
    if($scope.message.length === 0) return;

    Faye.publish("/control", {
      message: $scope.message,
      user: userTimeStamp
    });
    $scope.message = '';
  };

});
