app.controller('PubController', function($scope, $http, config, Faye) {
  const url = config.api_url;
  const port = config.api_port;
  

  var client = new Faye.Client('http://'+url+':'+port+'/cps');
  client.subscribe('/control', function(blob){
    console.log(blob);
    console.log(client);
  })

  $scope.logout = function(){
    $http.post('http://'+url+':'+port+'/logout').then(function(response){console.log(response)})
  }

  $scope.startControl = function(){
    $http.post('http://'+url+':'+port+'/startCPSControl');
  }

  $scope.stopControl = function(){
    $http.post('http://'+url+':'+port+'/stopCPSControl');
  }
});